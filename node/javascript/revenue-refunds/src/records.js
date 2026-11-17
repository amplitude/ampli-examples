import { randomUUID } from 'node:crypto';

export function demoRecords() {
  const run = randomUUID();
  const base = {
    userId: `revenue-demo-${run}`, productId: 'report-pack',
    currency: 'USD', occurredAt: new Date().toISOString(),
  };
  return [
    { ...base, id: `${run}-sale-a`, kind: 'purchase', unitAmountCents: 3999, quantity: 1 },
    { ...base, id: `${run}-refund-a`, kind: 'refund', purchaseId: `${run}-sale-a`, unitAmountCents: 1000, quantity: 1 },
    { ...base, id: `${run}-sale-b`, kind: 'purchase', unitAmountCents: 2500, quantity: 2 },
    { ...base, id: `${run}-refund-b`, kind: 'refund', purchaseId: `${run}-sale-b`, unitAmountCents: 2500, quantity: 2 },
  ];
}

const validId = (value) => typeof value === 'string' && /^[a-zA-Z0-9_-]{5,100}$/.test(value);

export function validateRecords(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 100) {
    throw Error('Supply 1 to 100 completed transaction records.');
  }
  const ids = new Set();
  const records = input.map((r) => {
    if (!r || !validId(r.id) || !validId(r.userId) || !validId(r.productId)
      || !['purchase', 'refund'].includes(r.kind) || r.currency !== 'USD'
      || !Number.isSafeInteger(r.unitAmountCents) || r.unitAmountCents <= 0
      || !Number.isSafeInteger(r.quantity) || r.quantity <= 0
      || !Number.isSafeInteger(r.unitAmountCents * r.quantity)
      || typeof r.occurredAt !== 'string' || !Number.isFinite(Date.parse(r.occurredAt))
      || (r.kind === 'refund' && !validId(r.purchaseId)) || ids.has(r.id)) {
      throw Error('Invalid or duplicate transaction record.');
    }
    ids.add(r.id);
    // Copy only approved metadata, even if the source contains payment details.
    return {
      id: r.id, userId: r.userId, productId: r.productId, kind: r.kind,
      currency: r.currency, unitAmountCents: r.unitAmountCents, quantity: r.quantity,
      occurredAt: r.occurredAt,
      ...(r.kind === 'refund' ? { purchaseId: r.purchaseId } : {}),
    };
  });
  const purchases = new Map(records.filter((r) => r.kind === 'purchase').map((r) => [r.id, r]));
  const refunded = new Map();
  for (const r of records.filter((r) => r.kind === 'refund')) {
    const p = purchases.get(r.purchaseId);
    const total = (refunded.get(r.purchaseId) || 0) + r.unitAmountCents * r.quantity;
    if (!p || p.userId !== r.userId || p.productId !== r.productId
      || Date.parse(r.occurredAt) < Date.parse(p.occurredAt)
      || total > p.unitAmountCents * p.quantity) {
      throw Error('Refund must match a purchase in this file and stay within its amount.');
    }
    refunded.set(r.purchaseId, total);
  }
  return records;
}

export function totalCents(records) {
  return records.reduce((sum, r) => sum + (r.kind === 'refund' ? -1 : 1) * r.unitAmountCents * r.quantity, 0);
}
