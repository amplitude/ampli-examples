# React autocapture selection example

A standalone workspace-settings demo for configuring Amplitude autocapture. Settings and billing pages capture selected controls. Admin and welcome pages are excluded. Saving only changes local display state; there is no billing backend.

## Run

Use Node.js 22.12 or later and the Corepack-pinned pnpm version in package.json.

```bash
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Set VITE_AMPLITUDE_API_KEY to an existing test project's ingestion API key. Use VITE_AMPLITUDE_SERVER_ZONE=EU for an EU project. Do not add a secret or management key.

```bash
pnpm dev
```

Open http://127.0.0.1:5173/app/settings/. With no key the app displays disabled and does not initialize Amplitude.

## Verify

- On settings, save preferences and change the plan. Expect an Element Clicked event for save and an Element Changed event for plan.
- Toggle help and click More help. Those controls are outside the element selector policy.
- On billing, save preferences. The same selected control is captured on another allowed page.
- On admin and welcome, exercise the same controls. Expect no page-view or element-interaction events for those pages under this example's configuration.
- Check upload status in the browser Network tab, then inspect the device ID shown by the app in Amplitude User Lookup. Inspect attributes on the save event under [Amplitude] Element Attributes.

The policy explicitly disables analytics remote configuration, unrelated autocapture features and supplemental viewport exposure events. Element filters do not automatically apply to page views; both policies are configured separately. The Unified SDK sets replay sampleRate to zero and skips guides and surveys in this example. This configuration is not a universal privacy or consent control for an existing app.

## Checks

```bash
pnpm test
pnpm build
```

The Node tests check URL boundary behavior. They do not substitute for browser execution or processed-event verification. No project keys are included in this repository.

## References

- [Autocapture configuration](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/instrument-and-configure#element-interactions)
- [Browser option reference](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2/reference#elementinteractionsoptions)
- [Unified SDK installation](https://amplitude.com/docs/sdks/analytics/browser/browser-unified-sdk/get-started)
