import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";

// One local database; use a shared durable database and a worker when deploying.
const state = globalThis as typeof globalThis & { attributionDB?: DatabaseSync };
export function db() {
  if (!state.attributionDB) {
    mkdirSync("data", { recursive: true });
    const sql = new DatabaseSync("data/attribution.sqlite");
    sql.exec(`
      PRAGMA journal_mode=WAL;
      PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS accounts (id TEXT PRIMARY KEY, token TEXT UNIQUE NOT NULL);
    `);
    state.attributionDB = sql;
  }
  return state.attributionDB;
}
export function findAccount(token?: string) {
  return (token ? db().prepare("SELECT id FROM accounts WHERE token = ?").get(token) : undefined) as { id: string } | undefined;
}
export function createAccount() {
  const account = { id: randomUUID(), token: randomUUID() };
  db().prepare("INSERT INTO accounts (id, token) VALUES (?, ?)").run(account.id, account.token);
  return account;
}
