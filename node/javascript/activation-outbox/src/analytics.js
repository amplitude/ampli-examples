export async function createSender(env = process.env) {
  if (!env.AMPLITUDE_API_KEY?.trim()) return null;
  const { createInstance } = await import('@amplitude/analytics-node');
  const client = createInstance();
  await client.init(env.AMPLITUDE_API_KEY.trim(), {
    serverZone: env.AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
    flushIntervalMillis: 1000, flushQueueSize: 100,
    flushMaxRetries: 0, requestTimeoutMillis: 5000,
  }).promise;
  return async (event) => {
    const queued = client.track(event);
    await client.flush().promise;
    return (await queued.promise).code;
  };
}
