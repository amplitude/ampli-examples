# Feature retention in Node.js

Simulate report-builder usage for four people and verify Amplitude retention. The fixture sends ten synthetic events with historical timestamps, ten days before execution through three days before execution. Use a dedicated Amplitude test project. It doesn't create reports or implement authentication.

```sh
corepack pnpm install --frozen-lockfile
cp .env.example .env.local
# Set the test project's API key and US/EU region in .env.local.
corepack pnpm test
corepack pnpm demo
# Inspect the dry-run data before sending ten events:
corepack pnpm demo --send
```

In a Retention Analysis chart, use Build Retention Report Created as both events. On both events, filter demo_run_id to the printed run ID and feature_name to report_builder. Start event: usage_stage is first_use. Return event: usage_stage is repeat_use. Use daily Return On with rolling 24-hour windows and Last 30 Days. Expect four starters, Day 1 50%, Day 2 25%, Day 7 25%. Return On or After gives Day 1 75%. Multiple reports from Bob count as one returning user. Dana's dashboard activity doesn't count as report_builder retention.

This is controlled test history, not observed customer behavior. In a production service, send report completion after a successful committed action. Determine first use from durable per-user, per-feature application state, preserve stable user IDs, and keep analytics failures separate from the business result. Use actual occurrence timestamps in milliseconds; don't fabricate production history. The demo's zero-retry delivery policy is intentionally bounded.

Requires Node.js 24.14+, integrity-pinned pnpm 10.33.2, @amplitude/analytics-node 1.5.83. Retention is available on all Amplitude plans.

References:
https://amplitude.com/docs/sdks/analytics/node/node-js-sdk
https://amplitude.com/docs/analytics/charts/retention-analysis/retention-analysis-build
https://amplitude.com/docs/analytics/charts/retention-analysis/retention-analysis-time
