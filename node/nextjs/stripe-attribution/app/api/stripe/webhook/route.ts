// app/api/stripe/webhook/route.ts
import type Stripe from 'stripe';
import { stripeClient } from '@/lib/stripe';
import { recordPayment } from '@/lib/payment-analytics';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response('Webhook is not configured', { status: 500 });
  if (!signature) return new Response('Missing signature', { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(
      await request.text(), signature, secret,
    );
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }
  if (event.livemode) return new Response('Test mode only', { status: 400 });
  if (event.type !== 'checkout.session.completed') {
    return Response.json({ received: true });
  }
  // Retrieve through the pinned API version instead of assuming the event snapshot's shape.
  let session: Stripe.Checkout.Session;
  try { session = await stripeClient().checkout.sessions.retrieve(event.data.object.id); }
  catch { return new Response('Retry Session lookup', { status: 500 }); }
  if (session.livemode) return new Response('Test mode only', { status: 400 });
  if (session.mode !== 'payment' || session.payment_status !== 'paid') {
    return Response.json({ received: true });
  }
  try {
    await recordPayment(session, event.created * 1000);
    return Response.json({ received: true });
  } catch (error) {
    console.error('Payment analytics failed', error);
    // A failed upload remains a failed delivery, so Stripe can retry it.
    return new Response('Retry payment analytics', { status: 500 });
  }
}
