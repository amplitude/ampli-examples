import { createInstance, Revenue, Types } from '@amplitude/analytics-node';

export function revenueInput(record) {
  const sign = record.kind === 'refund' ? -1 : 1;
  const amount = sign * record.unitAmountCents * record.quantity / 100;
  return {
    revenue: new Revenue()
      .setProductId(record.productId)
      .setPrice(sign * record.unitAmountCents / 100)
      .setQuantity(record.quantity)
      .setRevenue(amount)
      .setRevenueType(record.kind === 'refund' ? 'refund' : 'income')
      .setCurrency(record.currency)
      .setEventProperties({
        transaction_id: record.id, transaction_kind: record.kind,
        ...(record.purchaseId ? { purchase_id: record.purchaseId } : {}),
        source: 'build-nodejs-revenue-refunds',
      }),
    options: {
      user_id: record.userId, device_id: record.userId,
      insert_id: `revenue-${record.id}`, time: Date.parse(record.occurredAt),
    },
  };
}

export async function sendRecords(records, env = process.env, transportProvider) {
  const key = env.AMPLITUDE_API_KEY?.trim();
  if (!key) throw Error('Set AMPLITUDE_API_KEY before sending.');
  const serverZone = env.AMPLITUDE_SERVER_ZONE || 'US';
  if (!['US', 'EU'].includes(serverZone)) throw Error('AMPLITUDE_SERVER_ZONE must be US or EU.');
  const client = createInstance();
  await client.init(key, {
    serverZone, flushQueueSize: 100, flushIntervalMillis: 1000,
    flushMaxRetries: 0, requestTimeoutMillis: 5000, logLevel: Types.LogLevel.None,
    ...(transportProvider ? { transportProvider } : {}),
  }).promise;
  const pending = records.map((record) => {
    const { revenue, options } = revenueInput(record);
    return client.revenue(revenue, options).promise;
  });
  await client.flush().promise;
  const results = await Promise.all(pending);
  return records.map((record, i) => ({
    transactionId: record.id, code: results[i].code,
    status: results[i].code === 200 ? 'accepted' : 'failed',
  }));
}
