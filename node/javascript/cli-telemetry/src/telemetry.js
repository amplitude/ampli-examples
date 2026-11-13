import { mkdirSync, writeFileSync, linkSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
function deviceId(dir) {
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  const target=join(dir,'device-id'), temp=join(dir,randomUUID()+'.tmp');
  writeFileSync(temp,randomUUID(),{mode:0o600});
  try { try { linkSync(temp,target); } catch(e) { if(e.code!=='EEXIST')throw e; } }
  finally { unlinkSync(temp); }
  const id=readFileSync(target,'utf8').trim();
  if(!/^[0-9a-f-]{36}$/i.test(id))throw Error('Invalid local telemetry identity.');
  return id;
}
export async function initializeTelemetry({env=process.env,disabled=false,loadSdk=()=>import('@amplitude/analytics-node')}={}) {
  const off={finish:async()=>({status:'disabled'})};
  if(disabled || env.DO_NOT_TRACK==='1' || !env.AMPLITUDE_API_KEY?.trim())return off;
  try {
    const sdk=await loadSdk();const id=deviceId(env.BUILD_TELEMETRY_DIR||'data/telemetry');const client=sdk.createInstance();
    await client.init(env.AMPLITUDE_API_KEY.trim(),{serverZone:env.AMPLITUDE_SERVER_ZONE==='EU'?'EU':'US',flushQueueSize:100,flushIntervalMillis:1000,flushMaxRetries:0,requestTimeoutMillis:3000,logLevel:sdk.Types.LogLevel.None}).promise;
    return {finish:async(outcome)=>{
      try {
        const properties={command:'count-lines',outcome:outcome.status,file_type:outcome.fileType,...(outcome.status==='success'?{line_count:outcome.lines}:{})};
        const event=client.track({event_type:'CLI Command Finished',device_id:id,event_properties:properties});
        await client.flush().promise;const result=await event.promise;
        return {status:result.code===200?'accepted':'failed',code:result.code};
      }catch{return {status:'failed'};}
    }};
  }catch{return {finish:async()=>({status:'unavailable'})};}
}
