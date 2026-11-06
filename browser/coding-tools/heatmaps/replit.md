
Inspect existing Amplitude initialization, consent, authentication and project rules first.
Use the existing client and current official SDK documentation. Initialize once.
In a Unified integration, keep serverZone at the options' top level.
Preserve enabled products, identity, routes, private-data controls and the lockfile.
Synthetic users, sampling and skip options in a standalone demo are not host-app defaults.
Do not add a parallel client when merging into an existing integration.
Keep private and server credentials out of browser configuration and source.
Preserve replay privacy and consent. Heatmaps use replay interactions. Give different report views distinct path URLs using the existing router; do not fabricate traffic or claim an overlay from a local build.
Use sessionReplay.privacyConfig for the standalone Unified reference's DOM selectors.
Confirm masking and excluded contents in the processed recording.
Keep capture active while checking interactions; pausing replay stops new heatmap input too.
Never put private form values in Report Exported event properties.
Record what was built, locally tested and observed in the live service separately.
If sources conflict, record both and pause the affected claim before implementation.
Preserve the project's framework and hosting configuration. Browser SDK imports and initialization must never run during server rendering.
Load browser-only SDK code dynamically in a client lifecycle or user action; guard initialization across remounts and repeated actions.
Use Replit Secrets for private credentials, Configurations for non-sensitive settings, and VITE_ only for browser-public values. Preserve the existing Run workflow and mapped port; never disable host checks globally.
