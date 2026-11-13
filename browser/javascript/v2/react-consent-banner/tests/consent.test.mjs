import test from 'node:test';
import assert from 'node:assert/strict';
import { createConsentController, readChoice, writeChoice, choiceKey } from '../src/consent.js';

test('off actions are discarded, grant initializes once and withdrawal gates new actions', async () => {
  let loads = 0, starts = 0, tracks = 0; const optOut = [];
  const client = { initialize: async () => { starts++; }, getDeviceId: () => 'demo-device',
    setOptOut: (value) => optOut.push(value), track: async () => { tracks++; return { code: 200 }; } };
  const control = createConsentController({ initialChoice: 'denied', persist: () => {}, loadClient: async () => { loads++; return client; } });
  assert.equal(await control.record(), false); assert.equal(loads, 0);
  await control.grant(); assert.equal(await control.record(), true);
  control.deny(); assert.equal(await control.record(), false);
  await control.grant(); assert.equal(starts, 1); assert.equal(loads, 1); assert.equal(tracks, 1);
  assert.deepEqual(optOut, [false, true, false]);
});

test('withdrawal while initialization is pending never enables the completed client', async () => {
  let release; let started; const entered = new Promise((r) => { started = r; }); const optOut = [];
  const client = { initialize: () => { started(); return new Promise((r) => { release = r; }); },
    setOptOut: (value) => optOut.push(value), getDeviceId: () => 'demo-device' };
  const control = createConsentController({ initialChoice: 'denied', persist: () => {}, loadClient: async () => client });
  const granting = control.grant(); await entered; control.deny(); release(); await granting;
  assert.equal(control.getSnapshot().phase, 'off'); assert.ok(optOut.every(Boolean));
});

test('declining during client import prevents initialization; malformed storage stays off', async () => {
  let release; let starts = 0;
  const control = createConsentController({ initialChoice: 'denied', persist: () => {},
    loadClient: () => new Promise((r) => { release = r; }) });
  const granting = control.grant(); control.deny(); release({ initialize: () => { starts++; } }); await granting;
  assert.equal(starts, 0); assert.equal(readChoice({ getItem: () => 'unknown' }), 'denied');
});

test('storage-write failure removes a stale grant and does not enable collection', async () => {
  let removed;
  const storage = { setItem: () => { throw new Error('Quota'); }, removeItem: (key) => { removed = key; } };
  assert.throws(() => writeChoice(storage, 'denied'), /Tracking remains off/); assert.equal(removed, choiceKey);
});
