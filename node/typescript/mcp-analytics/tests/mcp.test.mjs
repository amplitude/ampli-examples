import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {spawn} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {createInstance} from '@amplitude/analytics-node';
import {initializeAnalytics} from '../dist/analytics.js';
import {executeTool} from '../dist/handler.js';

test('actual AI and Node SDKs: success/failure/cancel exactly once, metadata-only payloads and delivery-code checks',async()=>{
 const uploads=[];let status=200;
 const server=createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;uploads.push(JSON.parse(raw).events);res.writeHead(status,{'content-type':'application/json'});res.end(JSON.stringify({code:status,events_ingested:status===200?uploads.at(-1).length:0}));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{
  const factory=()=>{const c=createInstance(),init=c.init;return {...c,init:(key,opts)=>init(key,{...opts,serverUrl:`http://127.0.0.1:${server.address().port}`})};};
  const analytics=await initializeAnalytics({AMPLITUDE_API_KEY:'fake-key'},factory);const runId=randomUUID();
  for(const [index,mode] of ['success','fail','wait'].entries()){
    const controller=new AbortController();const result=await executeTool({value:7,mode,runId,privateNote:'PRIVATE_MCP_FIXTURE_20261113'},controller.signal,String(index),analytics,'build-mcp-test-user',async()=>{if(mode==='wait')controller.abort();});
    assert.equal(result.isError===true,mode!=='success');
  }
  await analytics.flush();const events=uploads.flat(),tools=events.filter(x=>x.event_type==='[Agent] Tool Call');
  assert.equal(tools.length,3);assert.equal(new Set(tools.map(x=>x.event_properties['[Agent] Session ID'])).size,3);
  assert.ok(!JSON.stringify(events).includes('PRIVATE_MCP_FIXTURE_20261113'));
  assert.deepEqual(tools.map(x=>x.event_properties['[Agent] Tool Success']),[true,false,false]);
  assert.deepEqual(tools.map(x=>x.event_properties['[Agent] Invocation ID']),['0','1','2']);
  status=500;await executeTool({value:7,mode:'success',runId:randomUUID()},new AbortController().signal,'4',analytics,'build-mcp-test-user',async()=>{});
  await assert.rejects(analytics.flush(),/not accepted/);
 }finally{await new Promise(r=>server.close(r));}
});
test('real stdio client discovers tool, succeeds, fails, cancels after progress, and completes flush handshake with blank key',async()=>{
 const result=await new Promise((resolve,reject)=>{const c=spawn(process.execPath,['dist/client.js'],{cwd:new URL('../',import.meta.url),env:{...process.env,AMPLITUDE_API_KEY:''},stdio:['ignore','pipe','pipe']});let out='',err='';c.stdout.on('data',d=>out+=d);c.stderr.on('data',d=>err+=d);c.on('error',reject);c.on('exit',code=>resolve({out,err,code}));});
 assert.equal(result.code,0,result.err);const summary=JSON.parse(result.out.trim());assert.ok(summary.success&&summary.failure&&summary.cancelled&&summary.flushed);
 assert.ok(!result.out.includes('PRIVATE_MCP_FIXTURE'));assert.ok(!result.out.includes('telemetry flush finished'));
});
