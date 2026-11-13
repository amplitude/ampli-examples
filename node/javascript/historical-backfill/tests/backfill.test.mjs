import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm,access} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join} from 'node:path';import {randomUUID} from 'node:crypto';import {createServer} from 'node:http';
import {readDataset,backfill} from '../src/backfill.js';
async function fixture(){const dir=await mkdtemp(join(tmpdir(),'backfill-'));const path=join(dir,'source.jsonl');const user='build-backfill-'+randomUUID();await writeFile(path,[0,1,2].map(i=>JSON.stringify({record_id:randomUUID(),user_id:user,occurred_at:Date.now()-3600000+i,action:i===1?'saved':'viewed',private_note:'PRIVATE_BACKFILL_FIXTURE'})).join('\n'));return {dir,path,checkpoint:join(dir,'checkpoint.json'),dataset:readDataset(path)};}
const ok=n=>new Response(JSON.stringify({code:200,events_ingested:n}),{status:200});
test('projection, dry run, stable retries, checkpoint resume and binding guard',async()=>{
 const f=await fixture();try{
  assert.equal(JSON.stringify(f.dataset.events).includes('PRIVATE_BACKFILL_FIXTURE'),false);
  const dry=await backfill({...f});assert.equal(dry.mode,'dry-run');await assert.rejects(access(f.checkpoint));
  const requests=[],delays=[];let n=0;
  const options={...f,apiKey:'fake-test-key',send:true,sleep:async ms=>delays.push(ms),fetcher:async(url,o)=>{requests.push(JSON.parse(o.body));if(n++===0)return new Response('',{status:503});return ok(3);}};
  await backfill(options);assert.deepEqual(requests[0],requests[1]);assert.deepEqual(delays,[1000]);
  assert.equal(JSON.parse(await readFile(f.checkpoint)).next,3);await backfill(options);assert.equal(requests.length,2);
  await assert.rejects(backfill({...options,apiKey:'other-test-key'}),/does not match/);
  assert.ok(!(await readFile(f.checkpoint,'utf8')).includes('fake-test-key'));
 }finally{await rm(f.dir,{recursive:true,force:true});}
});
test('429 saves cooldown;400 and exhausted5xx preserve position; stale checkpoint stops',async()=>{
 const f=await fixture();let time=Date.now(),calls=0;const base={...f,apiKey:'fake-test-key',send:true,now:()=>time,sleep:async()=>{}};
 try{
  await assert.rejects(backfill({...base,fetcher:async()=>{calls++;return new Response('',{status:429,headers:{'retry-after':'120'}})}}),/Rate limited/);
  const state=JSON.parse(await readFile(f.checkpoint));assert.equal(state.next,0);assert.equal(state.retryAfter,time+120000);
  await assert.rejects(backfill({...base,fetcher:async()=>{calls++;return ok(3)}}),/cooldown/);assert.equal(calls,1);
  time+=120001;await assert.rejects(backfill({...base,fetcher:async()=>new Response('',{status:400})}),/HTTP 400/);
  let retries=0;await assert.rejects(backfill({...base,fetcher:async()=>{retries++;return new Response('',{status:500})}}),/after3 attempts/);assert.equal(retries,3);assert.equal(JSON.parse(await readFile(f.checkpoint)).next,0);
  time=state.createdAt+8*86400000;await assert.rejects(backfill({...base,fetcher:async()=>ok(3)}),/replay window/);
 }finally{await rm(f.dir,{recursive:true,force:true});}
});
test('actual HTTP sender waits for accepted response; lock rejects concurrent writer; ambiguous body preserves stable replay',async()=>{
 const f=await fixture();let release,entered;const started=new Promise(r=>entered=r);const gate=new Promise(r=>release=r);const bodies=[];
 const server=createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;bodies.push(JSON.parse(raw));entered();await gate;res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({code:200,events_ingested:3}));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base={...f,apiKey:'fake-test-key',send:true,fetcher:(url,options)=>fetch(`http://127.0.0.1:${server.address().port}`,options)};
 try{
  const first=backfill(base);await started;await assert.rejects(backfill(base),/locked/);assert.equal(JSON.parse(await readFile(f.checkpoint)).next,0);release();await first;assert.equal(bodies.length,1);
  const nextCheckpoint=join(f.dir,'ambiguous.json');await assert.rejects(backfill({...base,checkpoint:nextCheckpoint,fetcher:async()=>new Response('not-json',{status:200})}),/Invalid success body/);
  assert.equal(JSON.parse(await readFile(nextCheckpoint)).next,0);
  await backfill({...base,checkpoint:nextCheckpoint});assert.deepEqual(bodies[0].events,bodies[1].events);
 }finally{release();await new Promise(r=>server.close(r));await rm(f.dir,{recursive:true,force:true});}
});
