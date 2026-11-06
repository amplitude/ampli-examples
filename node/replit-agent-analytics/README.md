# Replit report agent analytics reference

Run one synthetic Node.js report-summary task with @amplitude/ai. Provider wrappers record the input and response; the example avoids a duplicate manual user-message event. One task closes when the report job ends, then awaits flush.

Use Node.js 22.12+, Corepack and the pinned pnpm version. Run pnpm install --frozen-lockfile, pnpm check and pnpm test. Tests use the actual SDK wrapper with a controlled provider transport and in-memory analytics; they require no keys and make no model or ingestion requests.

To run a live synthetic task, copy .env.example to ignored .env.local and supply your own development project key, region, provider key, model and demo user. In Replit, use backend Secrets instead of committing credentials. Run pnpm start. Model inference can incur provider charges. Blank configuration stops before requests.

Amplitude receives metadata-only telemetry. The model provider still receives the prompt. Check ingestion and processed grouping separately; local tests are not live-service evidence. For an ongoing conversation, preserve its actual task identifier across turns and close only at its real end. Preserve authenticated identity, consent and existing integrations when adapting the example.
