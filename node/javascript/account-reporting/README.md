# Account-level reporting in Node.js

Simulate two people creating reports in two accounts. One person switches accounts, then opens personal help. Requires an Amplitude project with the Accounts add-on. Sends two group property updates and four synthetic activity events per run.

```sh
corepack pnpm install --frozen-lockfile
cp .env.example .env.local
# Set your project API key and US/EU region in .env.local.
corepack pnpm test
corepack pnpm demo
```

Filter `Build Account Report Created` to the printed `demo_run_id`: expect three events, two unique people and two distinct `org_id` accounts. `Build Account Help Opened` has one event, one person and zero distinct accounts. Find the printed account IDs in User > Group Profiles to inspect account_name and account_plan.

The script simulates business actions; it has no authentication or report backend. In a real service, resolve the user and account from authorized application context, send activity after a report succeeds, and handle analytics errors separately. The zero-retry demo delivery policy is intentionally bounded. Never commit .env.local.

Node.js 24.14+, pinned pnpm 10.33.2, @amplitude/analytics-node 1.5.83.

References: https://amplitude.com/docs/sdks/analytics/node/node-js-sdk and https://amplitude.com/docs/analytics/account-level-reporting
