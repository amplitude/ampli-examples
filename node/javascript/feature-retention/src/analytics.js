import { createInstance, Types } from '@amplitude/analytics-node';

export function reportEvent({ userId, reportId, firstUse, occurredAt = Date.now(),
  feature = 'report_builder', runId }) {
  if (typeof userId !== 'string' || userId.length < 5) throw new Error('Use a stable user ID of at least five characters.');
  if (typeof firstUse !== 'boolean') throw new Error('firstUse must come from saved application state.');
  if (!Number.isSafeInteger(occurredAt) || occurredAt <= 0) throw new Error('occurredAt must be epoch milliseconds.');
  if (!reportId || !runId) throw new Error('reportId and runId are required.');
  return {
    event_type: 'Build Retention Report Created', user_id: userId,
    device_id: `build-device-${userId}`, insert_id: `${runId}:${reportId}`,
    time: occurredAt,
    event_properties: { feature_name: feature,
      usage_stage: firstUse ? 'first_use' : 'repeat_use', demo_run_id: runId },
  };
}

export async function createAnalytics({ apiKey, serverZone = 'US', transportProvider } = {}) {
  if (!apiKey) throw new Error('Set AMPLITUDE_API_KEY before sending.');
  if (!['US', 'EU'].includes(serverZone)) throw new Error('Use US or EU for AMPLITUDE_SERVER_ZONE.');
  const client = createInstance();
  await client.init(apiKey, {
    serverZone, flushQueueSize: 100, flushIntervalMillis: 1000,
    flushMaxRetries: 0, requestTimeoutMillis: 5000, logLevel: Types.LogLevel.None,
    ...(transportProvider ? { transportProvider } : {}),
  }).promise;
  return { async send(events) {
    const pending = events.map(event => client.track(event).promise);
    await client.flush().promise;
    const results = await Promise.all(pending);
    const failures = results.filter(result => result.code !== 200);
    if (failures.length) throw new Error(`${failures.length} upload(s) failed; first code ${failures[0].code}.`);
    return results.length;
  } };
}
