# SwiftUI report analytics with the Unified SDK

A standalone iOS app that tracks report opens and date-range changes with
AmplitudeUnified-Swift 0.0.4. The screen shows its device ID for event lookup.
The app uses one shared analytics client and explicit button events; automatic
capture, replay auto-start and remote capture overrides are disabled.

## Run the app

Use Xcode with an iOS 17+ simulator or device and Python 3 to generate the project.
The full app and its two UI tests passed with Xcode 26.3 on an iPhone 16 simulator
running iOS 18.5. Five settings tests also passed on the hosted Mac.

From this directory:

```sh
python3 ci/generate_project.py
mkdir -p AmplitudeReports.xcodeproj/project.xcworkspace/xcshareddata/swiftpm
cp Package.resolved AmplitudeReports.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved
cp Config/Local.xcconfig.example Config/Local.xcconfig
open AmplitudeReports.xcodeproj
```

Edit the ignored `Config/Local.xcconfig` file. Set `AMPLITUDE_API_KEY` to the client
ingestion key for your development Amplitude project and `AMPLITUDE_SERVER_ZONE`
to `US` or `EU`. Never use a secret key. The client API key is included in the
installed app bundle. Keep the local file out of source control.

Select the AmplitudeReports scheme and an installed iPhone simulator, then run.
With the key blank, analytics stays off and the report buttons still work.

## Verify the events

Tap Open report, Change date range, then Flush and show device ID. Find that exact
device ID in your project's User Profiles and check `Report Previewed` and
`Report Range Changed`, with `report_type=usage`, `platform=iOS`, and `days` 7 then
30. A displayed device ID or a requested flush alone does not prove delivery.

The sample starts anonymously. After your existing authentication confirms a
sign-in, call `ReportAnalytics.shared.accountSignedIn(userID:plan:)` with your
canonical account ID (at least five characters). Call `accountSignedOut()` only
after confirmed logout. The sample does not implement an authentication provider.

## Run the checks

```sh
python3 ci/check_lock.py
swift test --force-resolved-versions --parallel --num-workers 1
```

In Xcode, Product > Test runs the two UI scenarios: changing report ranges and
blank-key behavior. Leave the API key blank for those tests. They do not establish
live event delivery, account attribution, or recording privacy behavior.

The generated project and all build output are disposable; the Swift source,
Info.plist, xcconfig and dependency lock are the maintained inputs. Merge changes
into an existing app without replacing its authentication, navigation, build
settings or other instrumentation.
