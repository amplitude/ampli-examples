// app/api/checkout/route.ts
import { getCurrentUser } from '@/lib/session';
import { amplitudeUserId } from '@/lib/amplitude-user-id';
import { stripeClient } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const appUrl = process.env.APP_URL;
  const price = process.env.STRIPE_PRICE_ID;
  if (!appUrl || !price) {
    return Response.json({ error: 'Checkout is not configured' }, { status: 500 });
  }
  // The browser cannot choose the account, price, or return URL.
  if (request.headers.get('origin') !== new URL(appUrl).origin) {
    return new Response('Invalid origin', { status: 403 });
  }
  const user = await getCurrentUser();
  if (!user) return new Response('Sign in first', { status: 401 });

  try {
  const session = await stripeClient().checkout.sessions.create({
    mode: 'payment',
    adaptive_pricing: { enabled: false },
    allowed_payment_method_types: ['card'],
    line_items: [{ price, quantity: 1 }],
    metadata: { amplitude_user_id: amplitudeUserId(user.id) },
    success_url: new URL('/?checkout=success', appUrl).toString(),
    cancel_url: new URL('/?checkout=cancelled', appUrl).toString(),
  });
  if (!session.url) {
    return Response.json({ error: 'No Checkout URL returned' }, { status: 502 });
  }
  return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout failed", error);
    return new Response("Checkout unavailable", { status: 502 });
  }
}
