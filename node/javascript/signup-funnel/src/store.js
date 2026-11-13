import { DatabaseSync } from 'node:sqlite';
import { randomUUID, scryptSync, randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
export function openStore(path) {
  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path, { timeout: 5000 });
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS attempts(id TEXT PRIMARY KEY, user_id TEXT, session TEXT, exited INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT, role TEXT);
    CREATE TABLE IF NOT EXISTS outbox(event_key TEXT PRIMARY KEY, body TEXT NOT NULL, sent INTEGER DEFAULT 0);`);
  return db;
}
function enqueue(db, id, type, userId) {
  const key = id + ':' + type;
  const event = { event_type: type, device_id: id, ...(userId ? { user_id: userId } : {}),
    insert_id: randomUUID(), time: Date.now(), event_properties: { attempt_id: id, funnel: 'local_signup_v1' } };
  db.prepare('INSERT OR IGNORE INTO outbox(event_key,body) VALUES (?,?)').run(key,JSON.stringify(event));
}
export function start(db, prior) {
  const old = prior && db.prepare('SELECT * FROM attempts WHERE id=?').get(prior);
  if (old && !old.exited) return old.id;
  const id = 'build-signup-' + randomUUID();
  db.exec('BEGIN IMMEDIATE');
  try { db.prepare('INSERT INTO attempts(id) VALUES (?)').run(id);enqueue(db,id,'Signup Started');db.exec('COMMIT');return id; }
  catch(e) { db.exec('ROLLBACK');throw e; }
}
export function register(db, id, username, password) {
  if (typeof username !== 'string' || !/^demo_[a-z0-9_]{3,40}$/.test(username) || typeof password !== 'string' || password.length < 12 || password.length > 128) throw Error('Use a demo_ username and a 12-128 character synthetic password.');
  const salt=randomBytes(16).toString('hex');const hash=salt+':'+scryptSync(password,salt,32).toString('hex');
  db.exec('BEGIN IMMEDIATE');
  try {
    const attempt=db.prepare('SELECT * FROM attempts WHERE id=?').get(id);
    if (!attempt || attempt.exited) throw Error('Start a fresh attempt.');
    if (attempt.user_id) { db.exec('COMMIT'); return { userId:attempt.user_id, session:attempt.session }; }
    const userId='build-signup-user-'+randomUUID(), session=randomBytes(32).toString('hex');
    db.prepare('INSERT INTO users(id,username,password_hash) VALUES (?,?,?)').run(userId,username,hash);
    db.prepare('UPDATE attempts SET user_id=?,session=? WHERE id=?').run(userId,session,id);
    enqueue(db,id,'Signup Completed',userId);db.exec('COMMIT');return {userId,session};
  } catch(e) { db.exec('ROLLBACK');throw e; }
}
export function saveProfile(db,id,session,role) {
  if (!['developer','analyst'].includes(role)) throw Error('Choose a listed role.');
  db.exec('BEGIN IMMEDIATE');
  try {
    const a=db.prepare('SELECT * FROM attempts WHERE id=? AND session=?').get(id,session);
    if (!session || !a?.user_id) throw Error('Create the local account first.');
    db.prepare('UPDATE users SET role=? WHERE id=?').run(role,a.user_id);
    enqueue(db,id,'Signup Profile Completed',a.user_id);db.exec('COMMIT');return {userId:a.user_id};
  } catch(e) { db.exec('ROLLBACK');throw e; }
}
export function leave(db,id) {
  db.exec('BEGIN IMMEDIATE');
  try {const a=db.prepare('SELECT * FROM attempts WHERE id=?').get(id);if(!a||a.user_id)throw Error('Only an incomplete attempt can exit.');
    db.prepare('UPDATE attempts SET exited=1 WHERE id=?').run(id);enqueue(db,id,'Signup Exited');db.exec('COMMIT');
  }catch(e){db.exec('ROLLBACK');throw e;}
}
export async function deliver(db,send) {
  const results=[];
  for(const row of db.prepare('SELECT event_key,body FROM outbox WHERE sent=0 ORDER BY rowid').all()) {
    const event=JSON.parse(row.body);
    if(Date.now()-event.time>=7*86400000)throw Error('Outbox exceeds deduplication window; reconcile before replay.');
    const code=await send(event);
    if(code!==200){results.push({event_type:event.event_type,code});break;}
    db.prepare('UPDATE outbox SET sent=1 WHERE event_key=?').run(row.event_key);
    results.push({event_type:event.event_type,code});
  }
  return results;
}
