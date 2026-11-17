import test from 'node:test';
import assert from 'node:assert/strict';
import { reportEvent, createAnalytics } from '../src/analytics.js';
import { createFixture, DAY } from '../src/fixture.js';

test('fixture has four starters, distinct Day 1/7 returns and a negative control', () => {
  const { events } = createFixture('local-run', Date.parse('2026-11-17T20:00:00Z'));
  const start = events[0].time;
  const first = events.filter(e => e.event_properties.usage_stage === 'first_use');
  const repeats = events.filter(e => e.event_properties.usage_stage === 'repeat_use'
    && e.event_properties.feature_name === 'report_builder');
  const users = list => new Set(list.map(e => e.user_id)).size;
  assert.equal(users(first), 4);
  assert.equal(users(repeats.filter(e => e.time === start + DAY)), 2);
  assert.equal(users(repeats.filter(e => e.time === start + 7 * DAY)), 1);
  assert.equal(users(repeats.filter(e => e.time >= start + DAY)), 3);
  assert.equal(events.filter(e => e.event_properties.feature_name === 'dashboard').length, 1);
  assert.equal(new Set(events.map(e => e.insert_id)).size, 10);
});

test('real SDK preserves historical timestamps and per-event properties', async () => {
  const received = [];
  const transportProvider = { async send(_url, payload) {
    received.push(...structuredClone(payload.events));
    return { status: 'success', statusCode: 200, body: {
      eventsIngested: payload.events.length, payloadSizeBytes: 0, serverUploadTime: Date.now() } };
  } };
  const analytics = await createAnalytics({ apiKey: 'local-test-key', transportProvider });
  const { events } = createFixture('local-run');
  assert.equal(await analytics.send(events), 10);
  assert.deepEqual(received.map(e => [e.user_id, e.device_id, e.insert_id, e.time, e.event_properties]),
    events.map(e => [e.user_id, e.device_id, e.insert_id, e.time, e.event_properties]));
});

test('bad configuration and rejected uploads fail visibly', async () => {
  await assert.rejects(createAnalytics(), /AMPLITUDE_API_KEY/);
  await assert.rejects(createAnalytics({ apiKey: 'local', serverZone: 'invalid' }), /US or EU/);
  assert.throws(() => reportEvent({ userId: 'alice', reportId: 'r1', runId: 'run' }), /firstUse/);
  const analytics = await createAnalytics({ apiKey: 'local-test-key', transportProvider: {
    async send() { return { status: 'invalid', statusCode: 400, body: { error: 'Rejected by test' } }; },
  } });
  await assert.rejects(analytics.send(createFixture('local-run').events), /400/);
});
