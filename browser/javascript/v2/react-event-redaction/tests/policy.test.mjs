import test from 'node:test';
import assert from 'node:assert/strict';
import { projectAllowedEvent, redactionPlugin } from '../src/policy.js';
import { rawFixture, privateMarker } from '../src/fixture.js';

const device = '11111111-2222-4333-8444-555555555555';
test('entire projected event excludes fixture values at every level without mutating input', async () => {
  const input = { ...rawFixture(`https://example.test/?email=${privateMarker}#${privateMarker}`), device_id: device, time: 123 };
  const original = JSON.stringify(input);
  const event = await redactionPlugin().execute(input);
  assert.deepEqual(event, { event_type: 'Support Search Completed', device_id: device, time: 123, event_properties: { category: 'billing', has_results: true } });
  assert.ok(!JSON.stringify(event).includes(privateMarker));
  assert.equal(JSON.stringify(input), original);
});

test('unlisted events, malformed categories and malformed identity are dropped', () => {
  assert.equal(projectAllowedEvent({ event_type: privateMarker, device_id: device }), null);
  assert.equal(projectAllowedEvent({ ...rawFixture('https://example.test'), device_id: privateMarker }), null);
  assert.equal(projectAllowedEvent({ ...rawFixture('https://example.test'), device_id: device, event_properties: { category: privateMarker, has_results: true } }), null);
});

test('unexpected policy read errors fail closed', () => {
  const event = { event_type: 'Support Search Completed', device_id: device,
    get event_properties() { throw new Error('Untrusted getter'); } };
  assert.equal(projectAllowedEvent(event), null);
});
