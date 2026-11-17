# Revenue and refunds in Node.js

Send synthetic completed purchases and partial or full refunds to an Amplitude test project. The fixture generates transaction records locally; it does not execute payments. The two purchases total USD 89.99, the refunds total USD 60.00, and net revenue is USD 29.99.

## Run

Use Node.js 24.14.0 or later and Corepack. From this directory:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm test
corepack pnpm demo seed
corepack pnpm demo preview
cp .env.example .env.local
```

Set AMPLITUDE_API_KEY in .env.local to an existing test project's ingestion key. Set AMPLITUDE_SERVER_ZONE to US or EU to match that project. Then run:

```sh
corepack pnpm demo send
```

Preview works without a key. Send reports each upload result; a failed result exits nonzero. Check the generated user ID in Amplitude's user profile and inspect its revenue amounts. An accepted upload alone does not establish processing.

Seed refuses to overwrite data/transactions.json. Keep that file for retries. Sending it again preserves insert_id, device_id and time. Amplitude deduplicates matching device and insert IDs within seven days; this fixture does not persist delivery state or provide permanent transaction uniqueness. Use your payment ledger or an outbox for production delivery.

## Scope

The USD-only input format uses positive integer cents and quantities. Mapping applies a negative price and revenue total to refunds. Each refund must reference a purchase in the same input file, match its user and product, and remain within the original amount. Production integrations should read trusted completed transactions and validate against their durable ledger.

Only approved transaction metadata is copied into events. Keep payment credentials, card details and provider responses out of analytics. Use the application's existing stable user identity when integrating into a backend; the standalone demo sets device_id to its generated synthetic user ID.

Local tests use the actual SDK with a controlled transport and make no service calls. They check signed amounts, quantities, currency, refund metadata, stable retry identities, invalid inputs, metadata projection and rejected uploads.

## References

- [Amplitude Node.js SDK](https://amplitude.com/docs/sdks/analytics/node/node-js-sdk)
- [Revenue properties](https://amplitude.com/docs/data/sources/instrument-track-revenue)
- [HTTP V2 deduplication](https://amplitude.com/docs/apis/analytics/http-v2)
