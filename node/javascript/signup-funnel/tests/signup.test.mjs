import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,rm } from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {openStore,deliver} from '../src/store.js';
import {createApp} from '../src/server.js';

test('real HTTP signup commits account/profile; duplicate submit and failed operations do not add stages',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'signup-'));const db=openStore(join(dir,'db.sqlite'));const port=5195;const app=createApp(db,port);await new Promise(r=>app.listen(port,'127.0.0.1',r));
 let cookies='';const origin=`http://127.0.0.1:${port}`;
 const post=async(path,body={},withOrigin=true)=>{const res=await fetch(origin+'/api/'+path,{method:'POST',headers:{'content-type':'application/json',...(withOrigin?{origin}:{}),cookie:cookies},body:JSON.stringify(body)});const incoming=res.headers.getSetCookie().map(x=>x.split(';')[0]);if(incoming.length)cookies=[...new Map([...cookies.split('; ').filter(Boolean),...incoming].map(x=>x.split('='))).entries()].map(x=>x.join('=')).join('; ');return {status:res.status,data:await res.json()};};
 try{
  assert.equal((await post('start',{},false)).status,403);
  const started=await post('start');assert.equal(started.status,200);const id=started.data.attempt;
  assert.equal((await post('start')).data.attempt,id);
  assert.equal((await post('profile',{role:'developer'})).status,400);
  assert.equal((await post('signup',{username:'bad',password:'short'})).status,400);
  const account=await post('signup',{username:'demo_test_fixture',password:'PRIVATE_SIGNUP_FIXTURE'});assert.equal(account.status,201);
  assert.equal((await post('signup',{username:'demo_test_fixture',password:'PRIVATE_SIGNUP_FIXTURE'})).data.userId,account.data.userId);
  assert.equal((await post('profile',{role:'analyst'})).status,200);
  assert.equal((await post('profile',{role:'developer'})).status,200);
  const rows=db.prepare('SELECT body FROM outbox ORDER BY rowid').all().map(x=>JSON.parse(x.body));
  assert.deepEqual(rows.map(x=>x.event_type),['Signup Started','Signup Completed','Signup Profile Completed']);
  assert.ok(rows.every(x=>x.device_id===id&&x.event_properties.attempt_id===id));
  assert.equal(rows[0].user_id,undefined);assert.equal(rows[1].user_id,account.data.userId);
  assert.ok(!JSON.stringify(rows).includes('PRIVATE_SIGNUP_FIXTURE'));assert.ok(!JSON.stringify(rows).includes('demo_test_fixture'));
  assert.equal(db.prepare('SELECT role FROM users').get().role,'developer');
  await post('new');await post('start');assert.equal((await post('signup',{username:'demo_test_fixture',password:'PRIVATE_SIGNUP_FIXTURE'})).status,400);await post('leave');
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM users').get().n,1);
  assert.deepEqual(db.prepare('SELECT body FROM outbox ORDER BY rowid').all().slice(3).map(x=>JSON.parse(x.body).event_type),['Signup Started','Signup Exited']);
  let calls=0;await deliver(db,async()=>{calls++;return 500});assert.equal(calls,1);
  const replay=[];await deliver(db,async e=>{replay.push(e);return 200});assert.equal(replay.length,5);
  assert.deepEqual(replay.slice(0,3),rows);
 }finally{await new Promise(r=>app.close(r));db.close();await rm(dir,{recursive:true,force:true});}
});
