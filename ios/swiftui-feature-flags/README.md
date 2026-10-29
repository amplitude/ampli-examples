# iOS feature flags with SwiftUI

Fetch a remote report-layout flag with one shared Amplitude Unified Swift client. The sample renders compact or expanded reports, tracks exposure after the assigned report appears, and sends Report Exported from a button. Export is a synthetic event; it does not create a file.

## Run the app

Use full Xcode 26.3 with an iOS 17+ simulator. Generate the project with `python3 ci/generate_project.py`, then open `AmplitudeReports.xcodeproj`.

Copy `Config/Local.xcconfig.example` to ignored `Config/Local.xcconfig`. Enter your development project's ingestion API key, client deployment key and US/EU region. Never use server or administration credentials. The project includes blank configuration only.

In the same development project, create a remote `report-layout` flag with exact values `control` and `expanded`. Associate your client deployment. `control` displays the compact layout. Assign only synthetic testers and keep the general rollout at zero while verifying.

Run the app, select Open report, and confirm the displayed layout before tapping Export report. Use Refresh flags to fetch again. Flush and show device ID requests delivery and shows the ID for user-profile lookup. Inspect processed exposure, preview and export events in Amplitude separately from the app's local state.

## Tests

The committed lock pins Unified 0.0.4 and all ten dependency revisions. Run `python3 ci/check_lock.py` to check those pins.

With Local.xcconfig absent, the generated Xcode test scheme runs the blank-key UI scenario. Start `python3 ci/evaluation_receiver.py` in another terminal, then run `swift test --force-resolved-versions --parallel --num-workers 1` for thirteen settings, state and SDK tests. Stop the receiver afterward. It binds only to 127.0.0.1, uses dummy keys and does not forward requests to Amplitude. Those tests establish local SDK behavior, not service ingestion.

The companion tutorial source passed SDK tests, native blank-key UI and separate synthetic live control/expanded/logout checks in a US development project on 2026-10-29. Live credentials, account controls and service evidence are not included here. Repeat live verification for your own configuration.

## Merge into an existing app

Preserve authentication, routing, consent and instrumentation. Route confirmed sign-in/out callbacks through the shared service. Only confirmed logout resets identity, selects a fresh device UUID and clears assignments. The sample serializes fetches and rejects stale view callbacks after account changes.

Connect your consent policy before initializing or sending data. This sample disables replay capture and automatic analytics events. Preserve existing replay consent and privacy controls when merging it.

A release flag alone does not create a running experiment. Configure its exposure and primary conversion metric and explicitly start an experiment before claiming experiment results. Simulator tests do not establish physical-device, EU-service or production authentication and consent behavior.
