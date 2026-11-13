# Next.js feature flags rollout demo

This standalone example demonstrates a pricing feature flag in a Next.js App Router app. Use Node.js 24 and the pinned pnpm version in package.json.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
# Fill in your test-project values.
pnpm dev
```

```bash
pnpm build
node verify-queue.cjs
```

Open `/pricing`. The account and purchase buttons are simulations. Configure `pricing-page-v2` on a client deployment and assign canonical QA users `user-build-flags-on` to on and `user-build-flags-off` to OFF while general rollout stays 0%. Keep all identity mutation/fetch operations inside the serialized helper. Follow the tutorial for 10% rollout and rollback checks; the local tests never change Amplitude targeting.

The queue tests mock the SDK boundary. Browser QA used the actual Unified 1.2.1/Experiment 1.24 SDK with mocked evaluations and uploads. These checks do not prove remote targeting or exposure delivery.

Run this app locally. It is not deployed as a website. Service verification and a human walkthrough are separate from the mocked checks above.
