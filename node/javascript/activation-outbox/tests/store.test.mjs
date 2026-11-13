import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { openStore, applyOperation, deliverPending, pending } from '../src/store.js';
const user = 'build-activation-test-user';

test('rollback, durable state and stable failed-send retry', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'activation-')); const path = join(dir,'db.sqlite');
  let db = openStore(path);
  try {
    assert.throws(() => applyOperation(db,user,'record','private marker'));
    assert.equal(pending(db).length,0);
    applyOperation(db,user,'workspace'); assert.equal(pending(db).length,0);
    applyOperation(db,user,'record','PRIVATE_ACTIVATION_FIXTURE');
    const first = pending(db)[0]; db.close(); db = openStore(path);
    assert.deepEqual(pending(db)[0],first);
    const bodies=[]; await deliverPending(db,async e=>{bodies.push(e);return 500;});
    assert.equal(pending(db).length,1);
    await deliverPending(db,async e=>{bodies.push(e);return 200;});
    assert.equal(pending(db).length,0); assert.deepEqual(bodies[0],bodies[1]);
    db.prepare('UPDATE activations SET sent=0, occurred_at=?').run(Date.now()-8*86400000);
    await assert.rejects(deliverPending(db,async()=>200),/deduplication window/);
    db.prepare('UPDATE activations SET sent=1').run();
    assert.ok(!JSON.stringify(bodies).includes('PRIVATE_ACTIVATION_FIXTURE'));
    applyOperation(db,user,'record','second'); assert.equal(pending(db).length,0);
  } finally { db.close(); await rm(dir,{recursive:true,force:true}); }
});
test('concurrent processes commit all records but one activation', async () => {
  const dir=await mkdtemp(join(tmpdir(),'activation-')); const path=join(dir,'db.sqlite');
  let db=openStore(path); applyOperation(db,user,'workspace');db.close();
  const run=()=>new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,['src/cli.js','record',user,'synthetic'],{cwd:new URL('../',import.meta.url),env:{...process.env,BUILD_DB_PATH:path,AMPLITUDE_API_KEY:''},stdio:['ignore','pipe','pipe']});
    let stderr=''; child.stderr.on('data',d=>stderr+=d);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(stderr)));
  });
  try { await Promise.all([run(),run(),run(),run()]);db=openStore(path);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM records').get().n,4);
    assert.equal(pending(db).length,1);
  } finally { db?.close();await rm(dir,{recursive:true,force:true}); }
});
