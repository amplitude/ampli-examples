import { readFileSync, writeFileSync, renameSync, mkdirSync, rmdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
const hash=text=>createHash('sha256').update(text).digest('hex');
export function readDataset(path){
 const raw=readFileSync(path,'utf8');if(Buffer.byteLength(raw)>200000)throw Error('Use a file under200KB.');
 const lines=raw.trim().split('\n');if(!raw.trim()||lines.length>100)throw Error('Use1-100 JSONL records.');
 const seen=new Set();
 const events=lines.map(line=>{
  const r=JSON.parse(line);if(!r||typeof r!=='object')throw Error('Invalid source record.');
  if(!/^[0-9a-f-]{36}$/i.test(r.record_id)||seen.has(r.record_id)||!/^build-backfill-[a-z0-9-]{5,80}$/.test(r.user_id)||!Number.isSafeInteger(r.occurred_at)||r.occurred_at<=0||r.occurred_at>Date.now()||!['viewed','saved'].includes(r.action))throw Error('Invalid or repeated source record.');
  seen.add(r.record_id);
  return {event_type:r.action==='viewed'?'Historical Report Viewed':'Historical Report Saved',user_id:r.user_id,device_id:r.user_id,time:r.occurred_at,insert_id:'backfill-v1-'+hash(r.user_id+':'+r.record_id),event_properties:{source_record_id:r.record_id,backfill_source:'local-jsonl-v1'}};
 });return {fingerprint:hash(raw),events};
}
function save(path,state){const temp=path+'.'+randomUUID()+'.tmp';writeFileSync(temp,JSON.stringify(state),{mode:0o600});renameSync(temp,path);}
export async function backfill({dataset,checkpoint,apiKey,zone='US',send=false,fetcher=fetch,sleep=delay,now=()=>Date.now()}){
 if(!send)return {mode:'dry-run',events:dataset.events};
 if(!apiKey?.trim())throw Error('Set the test ingestion key before --send.');
 const endpoint=zone==='EU'?'https://api.eu.amplitude.com/2/httpapi':'https://api2.amplitude.com/2/httpapi';
 const binding=hash(dataset.fingerprint+':'+endpoint+':'+hash(apiKey.trim()));
 mkdirSync(dirname(checkpoint),{recursive:true});const lock=checkpoint+'.lock';
 try{mkdirSync(lock);}catch{throw Error('Checkpoint is locked. Confirm no other sender runs before clearing a stale lock.');}
 try{
  const state=existsSync(checkpoint)?JSON.parse(readFileSync(checkpoint,'utf8')):{binding,next:0,createdAt:now(),retryAfter:0};
  if(state.binding!==binding||!Number.isInteger(state.next)||state.next<0||state.next>dataset.events.length||!Number.isFinite(state.createdAt)||!Number.isFinite(state.retryAfter))throw Error('Checkpoint does not match this file/project or is invalid.');
  if(now()-state.createdAt>=7*86400000)throw Error('Checkpoint exceeds replay window; reconcile before resuming.');
  if(now()<state.retryAfter)throw Error('Rate-limit cooldown is still active. Retry later.');
  if(!existsSync(checkpoint))save(checkpoint,state);
  const results=[];
  while(state.next<dataset.events.length){
   const batch=dataset.events.slice(state.next,state.next+10);const body=JSON.stringify({api_key:apiKey.trim(),events:batch});
   if(Buffer.byteLength(body)>=1000000)throw Error('Batch too large.');
   let accepted=false;
   for(let attempt=0;attempt<3;attempt++){
    let response;
    try{response=await fetcher(endpoint,{method:'POST',headers:{'content-type':'application/json'},body,signal:AbortSignal.timeout(5000)});}
    catch{if(attempt===2)throw Error('Upload unavailable after3 attempts; checkpoint preserved.');await sleep(1000*2**attempt);continue;}
    if(response.status!==200)await response.body?.cancel();
    if(response.status===429){
     const retry=response.headers.get('retry-after');const seconds=Number(retry);const parsed=retry&&Number.isFinite(seconds)?now()+seconds*1000:Date.parse(retry||'');
     state.retryAfter=Math.max(now()+60000,Number.isFinite(parsed)?parsed:0);save(checkpoint,state);throw Error('Rate limited. Cooldown saved; retry after at least60 seconds.');
    }
    if(response.status>=500){if(attempt===2)throw Error('Server failure after3 attempts; checkpoint preserved.');await sleep(1000*2**attempt);continue;}
    if(response.status!==200)throw Error(`Upload rejected with HTTP ${response.status}; checkpoint preserved.`);
    let result;try{result=await response.json();}catch{throw Error('Invalid success body; checkpoint preserved.');}
    if(result.code!==200||!Number.isInteger(result.events_ingested)||result.events_ingested<0||result.events_ingested>batch.length)throw Error('Unexpected success body; checkpoint preserved.');
    state.next+=batch.length;state.retryAfter=0;save(checkpoint,state);results.push({accepted_through:state.next,events_ingested:result.events_ingested});accepted=true;break;
   }
   if(!accepted)throw Error('No accepted upload.');
  }
  return {mode:'sent',next:state.next,results};
 }finally{rmdirSync(lock);}
}
