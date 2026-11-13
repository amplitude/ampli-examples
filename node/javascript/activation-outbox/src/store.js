import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function openStore(path) {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path, { timeout: 5000 });
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS workspaces (user_id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS activations (user_id TEXT PRIMARY KEY, insert_id TEXT NOT NULL UNIQUE, occurred_at INTEGER NOT NULL, sent INTEGER NOT NULL DEFAULT 0);`);
  return db;
}
export function applyOperation(db, userId, operation, value = '') {
  if (!/^build-activation-[a-z0-9-]{5,80}$/.test(userId)) throw new Error('Use a synthetic build-activation- ID.');
  if (!['workspace', 'record'].includes(operation)) throw new Error('Unknown operation.');
  if (operation === 'record' && (!value || value.length > 100)) throw new Error('Record needs 1-100 characters.');
  db.exec('BEGIN IMMEDIATE');
  try {
    if (operation === 'workspace') db.prepare('INSERT OR IGNORE INTO workspaces VALUES (?)').run(userId);
    else {
      if (!db.prepare('SELECT user_id FROM workspaces WHERE user_id = ?').get(userId)) throw new Error('Create the workspace first.');
      db.prepare('INSERT INTO records VALUES (?, ?, ?)').run(randomUUID(), userId, value);
    }
    const ready = db.prepare('SELECT COUNT(*) AS n FROM records WHERE user_id = ?').get(userId).n > 0;
    if (ready) db.prepare('INSERT OR IGNORE INTO activations(user_id,insert_id,occurred_at) VALUES (?,?,?)').run(userId, randomUUID(), Date.now());
    db.exec('COMMIT');
    return { operation, activated: ready };
  } catch (error) { db.exec('ROLLBACK'); throw error; }
}
export function pending(db) { return db.prepare('SELECT user_id,insert_id,occurred_at FROM activations WHERE sent=0 ORDER BY occurred_at').all(); }
export async function deliverPending(db, send) {
  const results = [];
  for (const row of pending(db)) {
    if (Date.now() - row.occurred_at >= 7 * 24 * 60 * 60 * 1000) throw new Error('Activation outbox exceeds the deduplication window; reconcile before replay.');
    const code = await send({ event_type: 'Workspace Activated', user_id: row.user_id,
      device_id: row.user_id, insert_id: row.insert_id, time: row.occurred_at,
      event_properties: { activation_rule: 'workspace_first_record_v1' } });
    if (code === 200) db.prepare('UPDATE activations SET sent=1 WHERE insert_id=?').run(row.insert_id);
    results.push({ insert_id: row.insert_id, code });
  }
  return results;
}
