import { openStore, deliver } from './store.js';
import { createSender } from './analytics.js';
const db=openStore(process.env.BUILD_DB_PATH||'data/signup.sqlite');
try { const send=await createSender();console.log(send?await deliver(db,send):{analytics:'disabled',pending:db.prepare('SELECT COUNT(*) AS n FROM outbox WHERE sent=0').get().n}); }
catch(e){console.error(e.message);process.exitCode=1;}finally{db.close();}
