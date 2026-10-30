# SwiftUI guides and surveys report sample

This standalone development app shows a synthetic usage report, an anchored guide
and an event-triggered rating survey. It creates one Amplitude client after you
tap **Start demo**, using the synthetic user ID `build-ios-guides-demo`.

## Run the app

Use Xcode with an iOS 17 or later simulator or device. The project pins
AmplitudeUnified 0.0.4 and AmplitudeEngagementSwift 4.2.0, with all transitive
revisions recorded in `Package.resolved`.

1. Run `python3 ci/generate_project.py` from this folder.
2. Copy `Config/Local.xcconfig.example` to `Config/Local.xcconfig`.
3. Enter your development project's client API key, `US` or `EU` region, and exact
   mobile URL scheme. Add an iOS app in that project's guides and surveys App Management.
4. Copy `Package.resolved` into
   `AmplitudeReports.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved`.
   Create that directory if needed.
5. Open `AmplitudeReports.xcodeproj`, select an iOS destination, and run.
6. Tap **Start demo**. The status reports plugin attachment; verify guide delivery
   separately using the steps below.

`Config/Local.xcconfig` is ignored by Git. Keep your local configuration out of
commits. With a blank key, the report's demo export remains usable and guide
controls remain disabled.

## Configure development experiences

Create an iOS guide with a Pin step targeting `report-export`. Match the screen
exactly to `UsageReport` and show it immediately. Use the heading **Export your
usage report** and a **Got it** action that completes the guide.

Create a separate modal survey with a five-star rating question, **How useful was
this report?**, and a **Send feedback** submit action. Match `UsageReport` and
trigger it on the first client-side `Report Exported` event.

Add `build-ios-guides-demo` to each experience's test users. Keep both experiences
in **Testing** status while verifying the integration. Complete or dismiss the
guide before exporting. If an unfinished survey is already open, finish it before
using report controls behind the modal. Completion and dismissal limits can
prevent repeat delivery; inspect the test user's history when retesting.

Open the experience's mobile preview link on the installed device to check URL
forwarding and preview behavior. Close preview and relaunch for a separate
Testing-status check. In the survey's **Responses** tab, turn off **Ignore
test/preview data** and confirm the saved rating, user and timestamp after
submitting and flushing events.

## Checks

- `python3 ci/check_lock.py` checks the recorded immutable package revisions.
- `bash ci/check_settings.sh` runs the settings tests in a temporary Swift package.
- Run the Xcode `ReportUITests` target to check blank-key behavior and report usability.

These local checks do not establish live guide delivery or a saved survey response.
Inspect those in your development project. Pausing guides leaves analytics
running: export while paused, flush events, and check the user's event stream.

## Add this to an existing app

Reuse your analytics client, identity and consent flow. Merge the element modifier
and URL forwarding with existing views and handlers, preserving other plugins.
This sample uses a fixed development identity and does not implement login,
logout or consent withdrawal. Incoming preview links do not start collection.

See the [iOS guides SDK documentation](https://amplitude.com/docs/sdks/guides-and-surveys/guides-and-surveys-ios-sdk)
for the supported SDK setup and APIs.
