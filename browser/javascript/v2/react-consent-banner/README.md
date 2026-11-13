# React consent banner

A first-party local consent controller gates the Browser Unified SDK. A grant
loads the SDK dynamically and initializes analytics opted out; only the current
choice can enable events after initialization finishes. Declined actions are
ignored rather than queued for later. Withdrawal stops new actions and sets SDK
opt-out. It doesn't erase existing SDK storage, retract sent requests, or control
other SDK instances/products. Replay is disabled and guides and surveys are skipped.

## Run

Use Node.js 22.12+ and Corepack. From this directory:

```sh
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm test
pnpm build
pnpm dev
```

Add an existing test-project ingestion key and US/EU zone to .env.local.
Before choosing Allow analytics, confirm no SDK network requests occur and the
record button is disabled. Grant, record, withdraw, and reload. The declined
choice stays off without initializing the SDK. Grant again and record; reload
while granted and record again. Verify Consent Demo Action in the existing test
project. The local tests also hold import/initialization pending and withdraw,
ensuring a stale completion can't enable tracking. This is a technical demo,
not a named CMP integration or a legal-compliance guarantee.
