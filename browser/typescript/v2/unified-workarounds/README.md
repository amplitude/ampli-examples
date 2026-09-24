# Ampli with Browser SDK plugins or Unified

These two runnable examples keep Ampli's generated, typed event methods while adding Session Replay. They use the generated Browser Ampli wrapper in [`src/ampli/index.ts`](src/ampli/index.ts). Replace that file with the wrapper from your own tracking plan when adapting the examples.

## Run

```sh
cd browser/typescript/v2/unified-workarounds
cp .env.example .env
# Set VITE_AMPLITUDE_API_KEY in .env
yarn install
yarn dev
```

Open either page after `yarn dev` starts (Vite uses port 5173 by default):

- [ampli-owned.html](http://localhost:5173/ampli-owned.html): Ampli initializes its Browser Analytics client, then the app adds the Session Replay plugin through `ampli.client.add(...)`.
- [unified-client.html](http://localhost:5173/unified-client.html): The app initializes `@amplitude/unified` with `initAll()`, passes the initialized client to `ampli.load({ client: { instance } })`, then calls the same generated event method.

Both examples set Session Replay `sampleRate` to `1` so a local run can exercise recording. Choose a suitable rate for your application. The Unified example passes Ampli's `DefaultConfiguration` into Unified initialization to preserve the generated tracking-plan metadata. It also initializes Unified's other products, including Experiment and Engagement.

The button on each page calls `ampli.eventNoProperties()` and shows whether its event carries a Session Replay ID. This is a generated, typed method; with your own tracking plan, replace it with one of your generated event methods. Keep those Ampli calls in application code if you use Ampli's source-level instrumentation checks in CI.
