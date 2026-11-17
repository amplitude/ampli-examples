import test from 'node:test';
import assert from 'node:assert/strict';
import { ACCOUNT_KEY, createAccount, readAccount } from '../src/accounts.js';

const uuid = () => '11111111-2222-4333-8444-555555555555';
function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
}

test('commit a local account once and restore it without another creation', () => {
  const s = storage();
  const first = createAccount(s, 'starter', uuid);
  assert.equal(first.created, true);
  assert.equal(readAccount(s).userId, `campaign-user-${uuid()}`);
  assert.deepEqual(createAccount(s, 'pro', uuid), { created: false, account: first.account });
});

test('reject invalid plans, corrupt storage and failed commits', () => {
  assert.throws(() => createAccount(storage(), 'other', uuid));
  const s = storage(); s.setItem(ACCOUNT_KEY, 'broken');
  assert.throws(() => readAccount(s));
  assert.throws(() => createAccount({ getItem: () => null, setItem: () => { throw Error('quota'); } }, 'starter', uuid));
});
