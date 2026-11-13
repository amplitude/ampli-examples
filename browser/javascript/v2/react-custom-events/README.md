# React custom events alongside autocapture

A standalone React/Vite preferences form using Amplitude's Browser Unified SDK.
The save button is autocaptured. `Settings Saved` fires after a successful local
storage write with explicit, enumerated properties. A failure switch and short
delay simulate a request; this example has no backend or email service.

## Run

Use Node.js 22.12+ with Corepack available. From this directory:

```sh
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Set your test project's ingestion API key and US/EU server zone in `.env.local`.
A blank key skips SDK initialization while the preferences app still works.
Keep server secret keys out of browser code.

## Check

```sh
pnpm test
pnpm build
```

Save a changed preference, then enable **Fail the next save** and try again.
The failed attempt leaves saved values unchanged and emits no `Settings Saved`.
Retry successfully and reload to confirm persistence. During a pending save, the
button is disabled and overlapping submissions are guarded. Separate completed
submissions each count as a save; this isn't a general exactly-once delivery system.

Use Instrumentation Explorer for event bodies and User Lookup for processed
`Settings Saved` and `[Amplitude] Element Clicked` events under the displayed device
ID. Inspect `settings_section`, `theme`, `digest_frequency`, and `save_source`.
Initialization is outside React effects. No manual click event is added.
Replay is set to sample rate zero, guides and surveys are skipped, and analytics
remote configuration fetching is disabled so this example's capture policy applies.
Merge those choices into an existing app deliberately; preserve its consent and identity.
