import test from 'node:test';
import assert from 'node:assert/strict';
import { createAnalytics } from '../src/analytics.js';

function transport(statusCode = 200) {
  const events = [];
  return { events, async send(_url, payload) {
    events.push(...structuredClone(payload.events));
    return { status: statusCode === 200 ? 'success' : 'invalid', statusCode,
      body: { eventsIngested: payload.events.length, payloadSizeBytes: 0,
        serverUploadTime: Date.now(), error: 'Rejected by test transport' } };
  } };
}

test('real SDK scopes each report to its account and leaves help ungrouped', async () => {
  const wire = transport();
  const analytics = await createAnalytics({ apiKey: 'local-test-key', transportProvider: wire });
  await analytics.describeAccount({ id: 'org-acme', name: 'Acme', plan: 'team' });
  await analytics.reportCreated({ userId: 'alice-1', accountId: 'org-acme', runId: 'run-1' });
  await analytics.reportCreated({ userId: 'bob-123', accountId: 'org-acme', runId: 'run-1' });
  await analytics.reportCreated({ userId: 'alice-1', accountId: 'org-birch', runId: 'run-1' });
  await analytics.helpOpened({ userId: 'alice-1', runId: 'run-1' });
  const [profile, ...activity] = wire.events;
  assert.equal(profile.event_type, '$groupidentify');
  assert.deepEqual(profile.groups, { org_id: 'org-acme' });
  assert.deepEqual(profile.group_properties, { $set: { account_name: 'Acme', account_plan: 'team' } });
  assert.deepEqual(activity.slice(0, 3).map(e => e.groups), [
    { org_id: 'org-acme' }, { org_id: 'org-acme' }, { org_id: 'org-birch' },
  ]);
  assert.ok(!activity[3].groups || Object.keys(activity[3].groups).length === 0);
  assert.ok(activity.every(e => !e.user_properties?.org_id));
});

test('rejected uploads fail the operation', async () => {
  const analytics = await createAnalytics({ apiKey: 'local-test-key', transportProvider: transport(400) });
  await assert.rejects(analytics.reportCreated({ userId: 'alice-1', accountId: 'org-acme', runId: 'run-1' }), /400/);
});

test('configuration fails before sending', async () => {
  await assert.rejects(createAnalytics(), /AMPLITUDE_API_KEY/);
  await assert.rejects(createAnalytics({ apiKey: 'local', serverZone: 'elsewhere' }), /US or EU/);
});
