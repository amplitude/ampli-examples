import { createInstance, Identify, Types } from '@amplitude/analytics-node';

export async function createAnalytics({ apiKey, serverZone = 'US', transportProvider } = {}) {
  if (!apiKey) throw new Error('Set AMPLITUDE_API_KEY before running the demo.');
  if (!['US', 'EU'].includes(serverZone)) throw new Error('Use US or EU for AMPLITUDE_SERVER_ZONE.');
  const client = createInstance();
  await client.init(apiKey, {
    serverZone, flushQueueSize: 100, flushIntervalMillis: 1000,
    flushMaxRetries: 0, requestTimeoutMillis: 5000, logLevel: Types.LogLevel.None,
    ...(transportProvider ? { transportProvider } : {}),
  }).promise;

  async function send(operation) {
    const pending = operation.promise;
    await client.flush().promise;
    const result = await pending;
    if (result.code !== 200) throw new Error(`Amplitude upload failed (${result.code}).`);
  }

  return {
    async describeAccount(account) {
      const properties = new Identify()
        .set('account_name', account.name).set('account_plan', account.plan);
      await send(client.groupIdentify('org_id', account.id, properties));
    },
    async reportCreated({ userId, accountId, runId }) {
      await send(client.track({
        event_type: 'Build Account Report Created', user_id: userId,
        groups: { org_id: accountId }, event_properties: { demo_run_id: runId },
      }));
    },
    async helpOpened({ userId, runId }) {
      await send(client.track({
        event_type: 'Build Account Help Opened', user_id: userId,
        event_properties: { demo_run_id: runId },
      }));
    },
  };
}
