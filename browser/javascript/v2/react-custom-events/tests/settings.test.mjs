import test from 'node:test';
import assert from 'node:assert/strict';
import { createSettingsSaver, loadSettings, storageKey } from '../src/settings.js';

const value = { theme: 'dark', digest: 'daily', customerEmail: 'do-not-send@example.test' };

test('save commits before one custom event and projects only allowed properties', async () => {
  const order = [];
  const save = createSettingsSaver({ pause: async () => {},
    persistSettings: async (settings) => { order.push(['persist', settings]); },
    trackSaved: (properties) => { order.push(['event', properties]); },
  });
  assert.deepEqual(await save(value), { status: 'saved', settings: { theme: 'dark', digest: 'daily' } });
  assert.deepEqual(order, [
    ['persist', { theme: 'dark', digest: 'daily' }],
    ['event', { settings_section: 'workspace', theme: 'dark', digest_frequency: 'daily', save_source: 'preferences_form' }],
  ]);
});

test('simulated and storage failures emit no success event; a later retry works', async () => {
  const events = [];
  let storageFails = true;
  const save = createSettingsSaver({ pause: async () => {},
    persistSettings: () => { if (storageFails) throw new Error('Storage unavailable'); },
    trackSaved: (p) => events.push(p),
  });
  await assert.rejects(save(value, { fail: true }), /Demo failure/);
  await assert.rejects(save(value), /Storage unavailable/);
  assert.equal(events.length, 0);
  storageFails = false;
  await save(value);
  assert.equal(events.length, 1);
});

test('overlapping submissions share a busy guard, separate completed saves remain separate', async () => {
  let release;
  let events = 0;
  const save = createSettingsSaver({ pause: () => new Promise((resolve) => { release = resolve; }),
    persistSettings: () => {}, trackSaved: () => { events += 1; },
  });
  const first = save(value);
  assert.deepEqual(await save(value), { status: 'busy' });
  release(); await first;
  assert.equal(events, 1);
  const next = save(value); release(); await next;
  assert.equal(events, 2);
});

test('telemetry error does not turn a committed preference save into a failed save', async (t) => {
  t.mock.method(console, 'warn', () => {});
  let committed = false;
  const save = createSettingsSaver({ pause: async () => {},
    persistSettings: () => { committed = true; },
    trackSaved: () => { throw new Error('Telemetry unavailable'); },
  });
  assert.equal((await save(value)).status, 'saved');
  assert.equal(committed, true);
});

test('invalid input never commits; reload handles missing and malformed storage', async () => {
  let writes = 0;
  const save = createSettingsSaver({ pause: async () => {}, persistSettings: () => { writes += 1; }, trackSaved: () => {} });
  await assert.rejects(save({ theme: 'private free text', digest: 'daily' }), /supported/);
  assert.equal(writes, 0);
  assert.deepEqual(loadSettings({ getItem: () => '{broken' }), { theme: 'light', digest: 'weekly' });
  assert.deepEqual(loadSettings({ getItem: (key) => key === storageKey ? JSON.stringify(value) : null }), { theme: 'dark', digest: 'daily' });
});
