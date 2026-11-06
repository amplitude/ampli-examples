# Report heatmaps reference

A standalone Vite app with weekly and monthly report paths, session replay privacy selectors, guarded development initialization and a report export event. Use Node.js 22.12+, Corepack and the pinned pnpm version. Run pnpm install --frozen-lockfile and pnpm build.

Copy .env.example to ignored .env.local for local development. Use only a development project's client ingestion key and the correct region. Run pnpm dev. Exports remain usable with blank configuration; Start demo requests recording only after valid configuration. Replit Run uses the included .replit mapping and narrow host allowlist. Preserve an existing app's workflow and inspect its actual Preview host.

Use synthetic data. Verify masked text, input masking and excluded contents in a processed recording. Recording pause keeps analytics active and is not a complete consent manager. Confirm the project's capture and sampling settings. Heatmap data requirements may exceed this small test; do not fabricate clicks to claim a populated overlay. Local builds and route checks are separate from capture and processed heatmap verification.

Merge into the existing SDK, authentication, consent and router when adapting. VITE_ values are browser-public. Keep private keys out of source, project rules and frontend configuration.
