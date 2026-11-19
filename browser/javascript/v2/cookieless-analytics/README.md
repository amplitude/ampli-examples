# Cookieless web analytics with browser JavaScript

Store Amplitude analytics identity in localStorage and audit cookie writes. Vite supplies the local server and build; the storage configuration belongs to the browser SDK.

## Run

Use Node.js 22.12 or later and Corepack.

```sh
corepack enable
corepack pnpm install --frozen-lockfile
cp .env.example .env.local
corepack pnpm dev
```

Set your project API key and US or EU server zone in `.env.local` before starting Vite. Never put a secret key in the browser bundle.

Click **Start demo analytics**, then **Generate sample report**. The latter simulates a report; no report contents are sent. Each event carries `demo_run_id` from the URL. Initialization is deferred to the start button, which is a demo control, not a production consent manager.

## Verify

Before starting analytics, observe document.cookie writes in DevTools, then inspect Cookies and Local Storage for the local origin. Expect no new cookie writes from this configuration and a localStorage identity entry. Existing cookies from prior integrations are not removed.

Compare the displayed device and session IDs across an immediate reload and another tab on the same origin, starting analytics on each page. Inspect both processed events in Amplitude User Profiles by device ID. A 200 upload response and a processed event are distinct checks.

The demo records `Cookieless Demo Opened` and `Cookieless Report Generated`. It uses the analytics-only Browser SDK 2 package and disables autocapture and analytics remote configuration.

localStorage persists identifiers. Apply your site's consent and disclosure requirements before initialization. Audit other scripts and products separately. Changing to localStorage does not by itself remove all browser storage or identifiers.

## Build

```sh
corepack pnpm build
```

The report simulation works when tracking is unavailable. Delivery waits are bounded to three seconds without canceling the SDK upload.

## Documentation

- [Build tutorial](https://amplitude.com/build/javascript-cookieless-analytics)
- [Browser SDK 2](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/get-started)
- [Cookies and consent management](https://amplitude.com/docs/sdks/analytics/browser/cookies-and-consent-management)
- [Browser SDK 2 reference](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/reference)

The Build tutorial may remain unpublished while this example is under review.
