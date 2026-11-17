# Campaign signup attribution in React

A standalone React/Vite landing page creates a browser-local demo account and sends its completed signup to Amplitude. The signup route removes the UTM query string. SDK user-property attribution preserves first-touch and most recent recorded campaign properties for analysis.

This is a local account demonstration, not server authentication or a payment integration. The account commits to localStorage before its signup event is sent. A failed account save sends no signup, while an analytics failure leaves the account in place.

## Run

Use Node.js 22.12.0 or later and Corepack:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm test
cp .env.example .env.local
```

Set VITE_AMPLITUDE_API_KEY to an existing test project's ingestion key and set VITE_AMPLITUDE_SERVER_ZONE to US or EU. Then:

```sh
corepack pnpm dev
```

Paste this URL into the browser address bar:

```text
http://localhost:5173/?utm_source=newsletter&utm_medium=email&utm_campaign=launch
```

For a returning-campaign example, load the newsletter URL first, then paste this URL into the same browser before creating the account:

```text
http://localhost:5173/?utm_source=search&utm_medium=cpc&utm_campaign=retargeting
```

Continue to signup and create the demo account. In Amplitude, analyze Campaign Signup Completed, filter demo_source to build-react-campaign-signups, and group by the user properties initial_utm_campaign and utm_campaign. Expected first/most recent values are launch/retargeting. Use a separate fresh browser profile for an independent newsletter-only or untagged control; don't clear unrelated browser data.

## Boundaries

- SDK initialization happens before React can rewrite the landing URL. Attribution is explicitly userProperty; SPA changes later in that page load do not recapture campaign user properties. A new campaign entry in this example is a full page load.
- First-touch initial_* values are set once. An initially untagged visit uses the SDK's EMPTY value, rather than a later campaign becoming the initial campaign.
- No replay recording is enabled. Other autocapture features and remote analytics configuration are explicitly disabled. Implement your application's consent policy before initializing analytics where required.
- No email, password or payment details are requested. Never place sensitive data in campaign URLs.
- Reload restores the local account and does not send a second signup. This sample is not a transactional cross-tab account service or a durable analytics outbox. It does not retry failed signup uploads or guarantee delivery across page closes.
- The blank-key build creates the local demo account without SDK initialization.

## Primary references

- [Browser Unified SDK](https://amplitude.com/docs/sdks/analytics/browser/browser-unified-sdk/get-started)
- [Marketing attribution](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/instrument-and-configure#marketing-attribution)
- [Event segmentation](https://amplitude.com/docs/analytics/charts/event-segmentation/event-segmentation-build)
