# Usage report: feature flags and experiments

Standalone Vite browser example with `@amplitude/unified` 1.1.43. Use Node 22.12 or later and the pinned pnpm version in package.json.

Copy `.env.example` to `.env.local`, supply development client configuration, then run `pnpm install --frozen-lockfile` and `pnpm dev`. Start demo explicitly initializes the SDK. Use synthetic data. `pnpm build` produces the static application.

The client API key and any client deployment key are visible in the browser bundle. Never supply an admin key, secret key or server deployment key. Keep `.env.local` out of source control.

Outcome: fetch a report-layout flag, render its assigned layout, and track an exposure only after the assigned report appears. Confirm service-side results separately. Use the [Unified SDK reference](https://amplitude.com/docs/sdks/analytics/browser/browser-unified-sdk/reference) and the relevant product documentation to configure development targeting and verify delivery.

The sample uses a fixed synthetic identity. Merge it into an existing client and confirmed authentication/consent lifecycle rather than installing a second client or replacing project files. The test Start demo button is not a production consent manager.
