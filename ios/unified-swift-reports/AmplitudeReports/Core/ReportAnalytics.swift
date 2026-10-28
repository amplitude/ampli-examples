import AmplitudeUnified
import Foundation

@MainActor
final class ReportAnalytics {
    static let shared = ReportAnalytics(settings: AnalyticsSettings(info: Bundle.main.infoDictionary ?? [:]))
    private let client: Amplitude?
    var configured: Bool { client != nil }

    convenience init(settings: AnalyticsSettings?) {
        guard let settings else {
            self.init(client: nil)
            return
        }
        let analytics = AnalyticsConfig(autocapture: [], enableAutoCaptureRemoteConfig: false)
        #if os(iOS)
        let replay = SessionReplayPlugin.Config(
            sampleRate: 0,
            enableRemoteConfig: false,
            autoStart: false
        )
        let client = Amplitude(
            apiKey: settings.apiKey,
            serverZone: settings.zone == .EU ? .EU : .US,
            analyticsConfig: analytics,
            sessionReplayConfig: replay
        )
        #else
        // The same event/auth helper can be checked on macOS; replay is iOS-only.
        let client = Amplitude(
            apiKey: settings.apiKey,
            serverZone: settings.zone == .EU ? .EU : .US,
            analyticsConfig: analytics
        )
        #endif
        self.init(client: client)
    }

    init(client: Amplitude?) { self.client = client }

    func reportPreviewed(days: Int) {
        client?.track(eventType: "Report Previewed", eventProperties: properties(days: days))
    }

    func reportRangeChanged(days: Int) {
        client?.track(eventType: "Report Range Changed", eventProperties: properties(days: days))
    }

    // Call after the existing authentication system confirms the account.
    func accountSignedIn(userID: String, plan: String) {
        precondition(userID.count >= 5, "Use your canonical user ID, at least five characters")
        client?.setUserId(userId: userID)
        let identify = Identify()
        identify.set(property: "plan", value: plan)
        client?.identify(identify: identify)
    }

    // Call only after confirmed logout, never for an anonymous/loading auth state.
    func accountSignedOut() { client?.reset() }
    func flush() { client?.flush() }
    func deviceID() -> String? { client?.getDeviceId() }

    private func properties(days: Int) -> [String: Any] {
        ["report_type": "usage", "days": days, "platform": "iOS"]
    }
}
