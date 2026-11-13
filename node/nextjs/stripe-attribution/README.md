# Next.js one-time Stripe campaign attribution demo

This standalone example connects campaign visits, demo signup, and one-time Stripe sandbox payments in a Next.js App Router app. Use Node.js 24 and the pinned pnpm version in package.json.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
# Fill in your test-project values.
pnpm dev
```

```bash
pnpm build
node verify-contracts.cjs
node verify-browser-bounds.cjs
```

Use a one-time $20 USD Stripe Price and a test secret key. In a second terminal:

```bash
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

Copy that listener's signing secret into `.env.local` and restart the app. Open `http://localhost:3000/?utm_source=google&utm_medium=cpc&utm_campaign=campaign-a` in a fresh private browser session and create a demo account. In the same session, visit `http://localhost:3000/?utm_source=newsletter&utm_medium=email&utm_campaign=campaign-b` before selecting Buy for $20. Complete Checkout using Stripe's test card `4242 4242 4242 4242`, a future expiration date, and a test CVC. The account is a locally generated ID with an HTTP-only cookie session. No email/password is collected, and report export/fulfillment is simulated. Use real production authentication and shared durable storage when adapting the pattern for deployment.

The webhook is test-only and pins Stripe API 2026-10-28.endive. The tests verify real local Stripe signatures with external API responses mocked. They do not prove Stripe payment acceptance, Amplitude ingestion or reporting. Stable delivery keys cover the documented seven-day Amplitude deduplication scope; longer guarantees require a durable outbox or delivery ledger. The local SQLite store is for accounts, not a payment ledger.

Run this app locally. It is not deployed as a website. Service verification and a human walkthrough are separate from the mocked checks above.
