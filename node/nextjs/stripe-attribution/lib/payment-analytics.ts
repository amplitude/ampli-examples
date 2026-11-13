// lib/payment-analytics.ts
import 'server-only';
import { createInstance } from '@amplitude/analytics-node';
import type Stripe from 'stripe';

const billing = createInstance();
let ready: Promise<void> | undefined;

export async function recordPayment(session: Stripe.Checkout.Session, time: number) {
  const userId = session.metadata?.amplitude_user_id;
  if (!userId || userId.length < 5) throw new Error('Missing Amplitude user ID');
  if (session.currency !== 'usd' || session.amount_total == null) {
    throw new Error('This example requires a USD payment amount');
  }
  const key = process.env.AMPLITUDE_API_KEY;
  if (!key) throw new Error('Missing AMPLITUDE_API_KEY');
  ready ??= billing.init(key, { requestTimeoutMillis: 3000, flushMaxRetries: 1, serverZone: process.env.AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US' }).promise;
  await ready;

  const pending = billing.track('Payment Completed', {
    checkout_session_id: session.id,
    amount_usd: session.amount_total / 100,
    currency: 'USD',
  }, {
    user_id: userId,
    // Stable on both webhook redelivery and a separate event for this Session.
    device_id: `stripe-${session.id}`,
    insert_id: `checkout-paid-${session.id}`,
    time,
    session_id: -1,
  });
  await billing.flush().promise;
  const result = await pending.promise;
  if (result.code !== 200) throw new Error(`Amplitude upload failed: ${result.code}`);
}
