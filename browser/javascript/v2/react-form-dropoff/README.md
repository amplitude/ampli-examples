# React form progress without values

A standalone local form records fixed field IDs and validation reasons instead of
input values. It doesn't create an account or send email. Attempt UUIDs distinguish
one completed attempt from a later partial attempt. Automatic capture, replay and
guides and surveys are off in this fixture.

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

Set an existing Amplitude test-project ingestion key and US/EU zone in .env.local.
Use synthetic values containing PRIVATE_FORM_FIXTURE_20261113. Try an invalid email,
then complete the form. Start another attempt, fill one field and choose Leave
form (demo). Verify complete SDK events contain no marker and only the approved
metadata. Check processed Form Submitted and Form Exited events by attempt ID.

Focus/blur events can repeat when revisiting a field. Invalid submission and blur
have different validation_phase values; count attempts with attempt_id rather
than treating raw focus-event totals as unique users or completions. Form Exited
only describes the explicit demo control; it doesn't detect every tab closure.
Preserve the existing application's auth, consent and SDK initialization when
adapting. Other SDK instances, automatic capture, destinations or replay need their
own data policy. Blank-key mode still validates locally without SDK initialization.
