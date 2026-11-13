# React event redaction policy

A local enrichment plugin projects one allowed event into an explicit schema.
It drops unlisted fields, malformed allowed values, unapproved identifiers, and
unlisted event names. Fake email, text, token and URL values use
PRIVATE_FIXTURE_20261113. This finite policy isn't a general PII detector or an
anonymization system. SDK device identifiers and timing remain.

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

Set the existing test-project ingestion key and US/EU zone in .env.local.
Send an allowed fixture and try the unlisted event. Inspect complete outbound SDK
events and the processed Support Search Completed event, not just the small
property panel. The private marker must be absent, while category=billing and
has_results=true remain. Try putting the marker in the local page query and
fragment too. Upload transport requests no referrer. Other products and SDK
instances need their own policy; don't copy this one-event allowlist over an
existing production taxonomy. Preserve consent and initialize the plugin before
permitting application track calls. A blank key skips SDK initialization.
