import { randomUUID } from 'node:crypto';
import {dirname} from 'node:path';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
const path=process.argv[2]||'data/fixture.jsonl';
if(existsSync(path))throw Error('Fixture already exists. Keep it unchanged for resume/replay.');
mkdirSync(dirname(path),{recursive:true});const user='build-backfill-'+randomUUID();
const rows=['viewed','saved','viewed'].map((action,i)=>({record_id:randomUUID(),user_id:user,occurred_at:Date.now()-3600000+i*1000,action,private_note:'PRIVATE_BACKFILL_FIXTURE_20261113'}));
writeFileSync(path,rows.map(x=>JSON.stringify(x)).join('\n')+'\n',{mode:0o600,flag:'wx'});
console.log(JSON.stringify({path,user,records:rows.length}));
