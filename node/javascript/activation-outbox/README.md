# Durable activation event

Node24.14+ local SQLite fixture. Creates a workspace and stores records; its first record commits one activation outbox row atomically. No external database or account signup required beyond an existing Amplitude test project.

Run `corepack pnpm install`, copy `.env.example` to `.env.local`, set a test key, then `corepack pnpm test`. Use `corepack pnpm demo workspace build-activation-example`, then `corepack pnpm demo record build-activation-example synthetic`, then `corepack pnpm demo deliver`. Delivery is a separate command; blank key preserves pending rows. Records stay local. For a fresh run choose a new synthetic user ID and database path.

Durable outbox is at-least-once: overlapping senders can retry the same event. Stable device/insert IDs deduplicate within Amplitude's documented7-day window; this is not permanent exactly-once delivery. Do not run a backlog older than that window without a recovery policy. Node24's built-in SQLite API is experimental. Schema migrations, worker leasing, auth and hosted deployment are outside this local fixture.
