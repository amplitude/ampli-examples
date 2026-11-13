// lib/stripe.ts
import 'server-only';
import Stripe from 'stripe';

export function stripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith('sk_test_')) throw new Error('Use a Stripe sandbox test secret key');
  return new Stripe(key, { apiVersion: '2026-10-28.endive' });
}
