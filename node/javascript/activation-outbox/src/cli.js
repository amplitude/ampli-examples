import { openStore, applyOperation, deliverPending, pending } from './store.js';
import { createSender } from './analytics.js';
const [operation, userId, value] = process.argv.slice(2);
const db = openStore(process.env.BUILD_DB_PATH || 'data/activation.sqlite');
try {
  if (operation === 'deliver') {
    const send = await createSender();
    console.log(send ? { uploads: await deliverPending(db, send) } : { analytics: 'disabled', pending: pending(db).length });
  } else console.log(applyOperation(db, userId, operation, value));
} catch (error) { console.error(error.message); process.exitCode = 1; }
finally { db.close(); }
