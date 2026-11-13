# React login and logout identity

A standalone React/Vite app with a loopback Node server and two seeded local demo
users. It exercises a real cookie-based local session without a hosted auth vendor.
The Browser Unified SDK sets a stable user ID after login and rotates device ID
with reset after confirmed logout. Analytics initializes after session resolution;
loading or a missing user doesn't trigger reset.

## Run

Use Node.js 22.12+ and Corepack. From this directory:

```sh
corepack enable
corepack prepare pnpm@10.33.2 --activate
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm test
pnpm build
pnpm start
```

Set the existing Amplitude test-project ingestion key and US/EU zone in .env.local
before building. Open http://127.0.0.1:5190. The demo usernames are alex and sam;
each uses local-demo-password. The server binds only to loopback, stores sessions
in memory, and uses an HttpOnly SameSite=Strict cookie. Sessions expire after one
hour and are invalid after server restart. This is a local teaching fixture, not
production authentication; use your existing auth implementation in a real app.

Record an anonymous visit, sign in as Alex and record again, reload and record,
sign out and record anonymously, then sign in as Sam and record. Inspect actual
Identity Demo Viewed events in Amplitude. The first device ID persists through
Alex's sign-in/reload; logout clears the analytics user and generates a new device
ID for the next anonymous visit. It doesn't start a new analytics session by itself.

If cached analytics identity disagrees with the local session, the app disables
visit recording until you explicitly sign out and clear it. No automatic tracking
runs on startup. Blank-key mode still supports the local session with analytics
disabled. Replay is set to sample rate zero, guides and surveys are skipped, and
autocapture is off so the identity sequence is easy to inspect.
