import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,readFile,rm,access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {initializeTelemetry} from '../src/telemetry.js';
const run=(args,env)=>new Promise((resolve,reject)=>{const c=spawn(process.execPath,['src/cli.js',...args],{cwd:new URL('../',import.meta.url),env:{...process.env,...env},stdio:['ignore','pipe','pipe']});let out='',err='';c.stdout.on('data',d=>out+=d);c.stderr.on('data',d=>err+=d);c.on('error',reject);c.on('exit',code=>resolve({code,out,err}));});
test('both opt-outs and blank key skip SDK loader and identity storage',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'cli-'));const path=join(dir,'identity');let imports=0;
 try{
  const loadSdk=async()=>{imports++;throw Error('Must not import');};
  for(const options of [{disabled:true,env:{AMPLITUDE_API_KEY:'fake-key',BUILD_TELEMETRY_DIR:path}},{env:{DO_NOT_TRACK:'1',AMPLITUDE_API_KEY:'fake-key',BUILD_TELEMETRY_DIR:path}},{env:{BUILD_TELEMETRY_DIR:path}}]){
   const t=await initializeTelemetry({...options,loadSdk});assert.equal((await t.finish({status:'success'})).status,'disabled');
  }
  assert.equal(imports,0);await assert.rejects(access(path));
  for(const args of [['sample.txt','--no-telemetry'],['sample.txt']]){const r=await run(args,{DO_NOT_TRACK:'1',AMPLITUDE_API_KEY:'fake-key',BUILD_TELEMETRY_DIR:path});assert.equal(r.code,0);assert.equal(r.out.trim(),'Lines: 3');}
  await assert.rejects(access(path));
 }finally{await rm(dir,{recursive:true,force:true});}
});
test('real SDK awaits loopback upload result; stable device, safe payload and business failure stay separate',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'cli-'));const bodies=[];let code=200;
 const server=createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;bodies.push(JSON.parse(raw));setTimeout(()=>{res.writeHead(code,{'content-type':'application/json'});res.end(JSON.stringify({code,events_ingested:code===200?1:0}));},80);});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try {
  const sdk=await import('@amplitude/analytics-node');const loadSdk=async()=>({...sdk,createInstance:()=>{const c=sdk.createInstance(),init=c.init;return {...c,init:(key,options)=>init(key,{...options,serverUrl:`http://127.0.0.1:${server.address().port}`})};}});
  const t=await initializeTelemetry({env:{AMPLITUDE_API_KEY:'fake-key',BUILD_TELEMETRY_DIR:dir},loadSdk});
  assert.equal((await t.finish({status:'success',fileType:'txt',lines:3,path:'PRIVATE_CLI_FIXTURE'})).code,200);
  code=500;assert.equal((await t.finish({status:'not_found',fileType:'other',error:'PRIVATE_CLI_FIXTURE'})).status,'failed');
  assert.equal(bodies.length,2);assert.equal(bodies[0].events[0].device_id,bodies[1].events[0].device_id);assert.ok(!JSON.stringify(bodies).includes('PRIVATE_CLI_FIXTURE'));
  assert.deepEqual(bodies[0].events[0].event_properties,{command:'count-lines',outcome:'success',file_type:'txt',line_count:3});
  const failed=await run(['missing-PRIVATE_CLI_FIXTURE'],{DO_NOT_TRACK:'1',BUILD_TELEMETRY_DIR:dir});assert.equal(failed.code,1);assert.match(failed.out,/not_found/);assert.ok(!failed.out.includes('PRIVATE_CLI_FIXTURE'));
 }finally{await new Promise(r=>server.close(r));await rm(dir,{recursive:true,force:true});}
});
