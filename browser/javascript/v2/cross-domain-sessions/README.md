# Cross-domain sessions with Vite

Two small pages model a marketing site and a product app. Run the marketing page at http://localhost:5173/index.html and open the product app through its button at http://127.0.0.1:5173/product.html . These local hostnames have separate browser storage. Deploy the two pages to different HTTPS domains for a production integration.

```sh
corepack pnpm install --frozen-lockfile
cp .env.example .env.local
# Set the same Amplitude test project key and US/EU region for both pages.
corepack pnpm test
corepack pnpm build
corepack pnpm dev
```

The configured product URL is a trusted application destination. The button adds ampDeviceId, ampSessionId and ampTimestamp at click time. The destination lets the SDK consume them during initialization, then removes them with history.replaceState. The link expires after 60 seconds. It is a tracking handoff, not authentication. Use HTTPS and your existing consent controls on both domains; avoid third-party scripts before URL cleanup. Both HTML pages set no-referrer.

Autocapture is disabled to keep verification to explicit demo events. Session replay sampleRate is 0 and guides and surveys initialization is skipped. The SDK still maintains its session ID. The displayed run ID and IDs are test diagnostics.

Compare deviceId and sessionId before and after the handoff. They should match. The page-view, handoff and sample-feature events share demo_run_id. Check processed events in Amplitude User Profiles, including their top-level device_id and session_id. A direct first visit without a handoff has its own identity. An expired handoff must not overwrite an existing destination identity. A clean-URL reload preserves the adopted IDs. A blank key and failed uploads keep navigation usable. The three-second event wait limits navigation delay; it does not cancel an upload or guarantee delivery.

For production, merge the handoff into existing analytics and login code. Do not force one session across devices or unrelated visits, reset identities at the domain boundary, or decorate untrusted links. This demo has no account creation, authentication, real report creation, campaign attribution claim or automatic cross-domain link rewriting.

References:
https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/instrument-and-configure#track-users-across-domains
https://amplitude.com/docs/data/sources/instrument-track-unique-users#set-up-cross-domain-tracking
