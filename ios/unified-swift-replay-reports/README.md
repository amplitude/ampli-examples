# SwiftUI report with consent-controlled session replay

Add session replay to a SwiftUI report screen with one shared Amplitude client, explicit Allow/Stop controls and a blocked synthetic account/note area. The [Build tutorial](https://amplitude.com/build/ios-session-replay) explains the complete nine-file application.

## Run the sample

1. Install Xcode with an iPhone simulator. The sample targets iOS 17+ and Swift 5 language mode. It was verified with Xcode 26.3 and an iOS 18.5 simulator.
2. Keep the committed `Package.resolved`. The package pins AmplitudeUnified-Swift 0.0.4, analytics 1.19.4 and replay 0.16.0.
3. From this directory, run `python3 ci/check_lock.py` and `python3 ci/generate_project.py`. The generator uses Python's standard library and creates an unsigned simulator project.
4. Copy `Config/Local.xcconfig.example` to the ignored `Config/Local.xcconfig`. Enter your development project's client-ingestion API key and `US` or `EU` region. Use a project with replay capture available and quota remaining. Never enter a secret or server deployment key.
5. Open `AmplitudeReports.xcodeproj`, select the `AmplitudeReports` scheme and an iPhone simulator, then run. Without a configured key, the report works and Allow replay stays disabled.

For a physical device, configure your bundle identifier and signing in Xcode. Physical-device behavior and EU ingestion were not part of the recorded simulator verification.

## Check capture and privacy

Start with synthetic content only. Capture starts off. Open the report, then choose Allow replay. Open it again, change its date range twice and edit the synthetic note. Keep the test app open with capture allowed for about forty seconds before choosing Stop replay. Change the range again afterward.

Find the exact device ID and test time in Amplitude. Verify the processed `Report Previewed` and `Report Range Changed` events and their `days`, `platform` and `report_type` properties. Then open the actual recording. Check report-bar changes, the captured interval and the blocked account/note area, including editing states. A replay ID or flush request alone does not prove delivery or privacy. Short captures can end before upload completes.

The explicit `amp_setBlocked(true)` container was hidden in inspected test frames, while other SwiftUI labels remained readable with the conservative preset. Explicitly block every sensitive container and verify your actual hierarchy in playback. Do not treat the preset as a promise that every SwiftUI label is masked. Note/account contents never enter the sample's event properties or logs.

The replay choice lives in memory: backgrounding retains it; terminating and relaunching the process starts it off. Connect a production app's real replay-consent system before capture starts. Analytics consent is separate; the report events continue when replay is off. Stopping capture does not delete earlier collected data. Choose a production sample rate before rollout; rate 1 is for the development test.

Optional account callbacks are in `ReportAnalytics`: call sign-in only after authentication confirms the canonical user ID and plan; call logout only after confirmed logout. Logout stops replay, clears user identity and assigns a fresh UUID device ID. Merge these callbacks into your existing authentication flow rather than calling logout for every anonymous/loading state.

## Local checks

With full Xcode selected, run:

```sh
swift test --force-resolved-versions --parallel --num-workers 1
```

Ten configuration cases cover blank/unresolved keys, valid US/EU settings and invalid regions. The generated Xcode scheme also includes a blank-key UI test. Run that test with the local key file absent; it checks that replay stays off and report controls work.

The tutorial source was also compiled and exercised in a separate private synthetic simulator test: initial-off state, repeated Allow/Stop, background/resume, process relaunch, sign-in/logout, processed report events and recording playback. Those results cover the tested sample and versions. Production consent/auth integration, other OS versions and universal masking are outside that scope.
