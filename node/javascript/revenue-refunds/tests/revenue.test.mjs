import test from 'node:test';
import assert from 'node:assert/strict';
import { demoRecords, validateRecords, totalCents } from '../src/records.js';
import { revenueInput, sendRecords } from '../src/analytics.js';

test('real SDK serializes purchase, partial refund, and full refund with stable identities', async () => {
  const records = validateRecords(demoRecords());
  const uploads = [];
  const transport = { send: async (_url, body) => {
    uploads.push(structuredClone(body));
    return { status: 'success', statusCode: 200, body: { eventsIngested: 4, payloadSizeBytes: 0, serverUploadTime: Date.now() } };
  } };
  const results = await sendRecords(records, { AMPLITUDE_API_KEY: 'local-test-key' }, transport);
  assert.deepEqual(results.map((r) => r.code), [200, 200, 200, 200]);
  const events = uploads.flatMap((u) => u.events);
  assert.equal(events.length, 4);
  assert.deepEqual(events.map((e) => e.event_properties.$revenue), [39.99, -10, 50, -50]);
  assert.deepEqual(events.map((e) => e.event_properties.$quantity), [1, 1, 2, 2]);
  assert.deepEqual(events.map((e) => e.event_properties.$revenueType), ['income', 'refund', 'income', 'refund']);
  assert.ok(events.every((e) => e.event_properties.$currency === 'USD' && e.user_id === records[0].userId));
  assert.equal(totalCents(records), 2999);
  await sendRecords(records, { AMPLITUDE_API_KEY: 'local-test-key' }, transport);
  const replay = uploads.slice(1).flatMap((u) => u.events);
  assert.deepEqual(replay.map((e) => [e.insert_id, e.device_id, e.time]), events.map((e) => [e.insert_id, e.device_id, e.time]));
});

test('reject invalid batches before SDK use and project only approved metadata', () => {
  const sample = demoRecords();
  for (const edit of [
    (r) => { r[0].unitAmountCents = -1; },
    (r) => { r[0].quantity = 0; },
    (r) => { r[0].unitAmountCents = 3.99; },
    (r) => { r[0].currency = 'EUR'; },
    (r) => { r[1].userId = 'other-user'; },
    (r) => { r[1].unitAmountCents = 4000; },
    (r) => { r[1].purchaseId = 'missing-purchase'; },
    (r) => { r.push({ ...r[0] }); },
    (r) => { r[1].occurredAt = 'invalid'; },
  ]) {
    const records = structuredClone(sample); edit(records);
    assert.throws(() => validateRecords(records));
  }
  const projected = validateRecords(sample.map((r) => ({ ...r, cardNumber: 'private-marker', receipt: 'private-marker' })));
  assert.ok(!JSON.stringify(projected.map(revenueInput)).includes('private-marker'));
});

test('failed uploads return failed results even when flush resolves', async () => {
  const transport = { send: async () => ({ status: 'invalid', statusCode: 400, body: { error: 'Invalid API key' } }) };
  const results = await sendRecords(validateRecords(demoRecords()), { AMPLITUDE_API_KEY: 'local-test-key' }, transport);
  assert.ok(results.every((r) => r.status === 'failed' && r.code !== 200));
  await assert.rejects(sendRecords([], {}));
  await assert.rejects(sendRecords([], { AMPLITUDE_API_KEY: 'x', AMPLITUDE_SERVER_ZONE: 'unknown' }));
});
