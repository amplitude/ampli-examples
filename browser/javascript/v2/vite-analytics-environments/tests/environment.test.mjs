import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {modes,resolveEnvironment,validateProfiles} from '../src/environment.js';import {readProfiles} from '../scripts/check-environments.mjs';
const profiles=()=>Object.fromEntries(modes.map((mode,i)=>[mode,{VITE_APP_ENV:mode,VITE_AMPLITUDE_API_KEY:'fixture-key-'+mode,VITE_AMPLITUDE_PROJECT_ID:String(700001+i),VITE_AMPLITUDE_SERVER_ZONE:'US',VITE_BUILD_MARKER:'build-env-'+mode+'-test'}]));
test('mode/label/region/id validation and disabled mode fail closed',()=>{
 const p=profiles();assert.equal(validateProfiles(p).length,3);
 assert.deepEqual(resolveEnvironment('development',{}),{mode:'development',status:'disabled'});
 assert.throws(()=>resolveEnvironment('preview',{}),/Unknown/);
 for(const bad of [{VITE_APP_ENV:'production'},{VITE_AMPLITUDE_SERVER_ZONE:'unknown'},{VITE_AMPLITUDE_PROJECT_ID:'wrong'},{VITE_BUILD_MARKER:'raw-url'},{VITE_AMPLITUDE_API_KEY:'${OTHER_KEY}'}])assert.throws(()=>resolveEnvironment('development',{...p.development,...bad}));
 for(const key of ['VITE_AMPLITUDE_API_KEY','VITE_AMPLITUDE_PROJECT_ID','VITE_BUILD_MARKER']){const p=profiles();p.staging[key]=p.development[key];assert.throws(()=>validateProfiles(p),/distinct/);}
});
test('actual mode-file reader rejects missing/reused destinations without printing keys',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'env-'));try{
  await assert.rejects(async()=>readProfiles(dir));const p=profiles();
  for(const mode of modes)await writeFile(join(dir,`.env.${mode}.local`),Object.entries(p[mode]).map(([k,v])=>k+'='+v).join('\n'));
  assert.deepEqual(readProfiles(dir).map(x=>x.mode),modes);
  assert.throws(()=>readProfiles(dir,{VITE_AMPLITUDE_API_KEY:'global-key-override'}),/global VITE/);
  p.staging.VITE_AMPLITUDE_PROJECT_ID=p.development.VITE_AMPLITUDE_PROJECT_ID;
  await writeFile(join(dir,'.env.staging.local'),Object.entries(p.staging).map(([k,v])=>k+'='+v).join('\n'));
  assert.throws(()=>readProfiles(dir),/distinct projectId/);
 }finally{await rm(dir,{recursive:true,force:true});}
});
