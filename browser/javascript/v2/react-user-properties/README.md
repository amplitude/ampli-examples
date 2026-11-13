# React user properties

A standalone React/Vite example using the Browser Unified SDK. Apply explicit user
properties with Identify, preserve a first value with setOnce, add to a counter,
and unset a property. Every operation is followed by an ordinary event for
processed-event verification. The synthetic user ID persists in this origin's
local storage; it is not an authentication implementation or account-group recipe.

## Run

Use Node.js 22.12+ and Corepack. From this directory:

```sh
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm test
pnpm dev
```

Set your test-project ingestion key and US/EU data center in .env.local. A blank
key skips initialization. Use the synthetic user ID shown in the app for User
Lookup. Apply Starter/Dark, apply Pro/Light, then clear the theme. Inspect both
Preferences Updated events and Theme Preference Cleared: first_theme stays dark,
preference_updates advances from 1 to 2, and preferred_theme disappears on clear.

The controls change analytics properties, not billing or real app preferences.
Merge into your existing initialization and consent/auth flow deliberately.
Autocapture is off, replay sample rate is zero, and guides and surveys are skipped.
Keep credentials and personal text out of the example. An additive property update
isn't an idempotent business counter; don't blindly retry it as a transaction.
