import AmplitudeUnified
import Combine
import Foundation

@MainActor
final class ReportAnalytics: ObservableObject {
    static let shared = ReportAnalytics(settings: AnalyticsSettings(info: Bundle.main.infoDictionary ?? [:]))
    static let flagKey = "report-layout"
    private let client: Amplitude?
    @Published private(set) var state = FlagState()
    @Published private(set) var status = "Flags off: check both client keys and region"
    private var started = false
    var configured: Bool { client != nil }

    convenience init(settings: AnalyticsSettings?) {
        guard let settings else { self.init(client: nil); return }
        let experiment = ExperimentPlugin.Config(
            deploymentKey: settings.deploymentKey,
            fetchTimeoutMillis: 5000,
            retryFetchOnFailure: false,
            automaticExposureTracking: false,
            automaticFetchOnAmplitudeIdentityChange: false
        )
        let analytics = AnalyticsConfig(autocapture: [], enableAutoCaptureRemoteConfig: false)
        #if os(iOS)
        let replay = SessionReplayPlugin.Config(sampleRate: 0, enableRemoteConfig: false, autoStart: false)
        let client = Amplitude(apiKey: settings.apiKey,
                               serverZone: settings.zone == .EU ? .EU : .US,
                               analyticsConfig: analytics,
                               experimentConfig: experiment,
                               sessionReplayConfig: replay)
        #else
        let client = Amplitude(apiKey: settings.apiKey,
                               serverZone: settings.zone == .EU ? .EU : .US,
                               analyticsConfig: analytics,
                               experimentConfig: experiment)
        #endif
        self.init(client: client)
    }

    init(client: Amplitude?) { self.client = client }

    func start() {
        guard !started else { return }
        started = true
        refresh()
    }

    func refresh() {
        guard client?.experiment != nil else { return }
        state.request()
        status = "Loading flags; compact fallback available"
        fetchNext()
    }

    private func fetchNext() {
        guard let experiment = client?.experiment, let token = state.begin() else { return }
        experiment.clear()
        experiment.fetch(user: nil) { [weak self] _, error in
            let succeeded = error == nil
            Task { @MainActor [weak self] in
                guard let self else { return }
                // A completion can arrive after confirmed logout changed identity.
                let value = succeeded ? experiment.variant(Self.flagKey).value : nil
                let accepted = self.state.complete(token, value: value, succeeded: succeeded)
                if !accepted { experiment.clear() }
                if !self.state.pending {
                    self.status = self.state.assigned
                        ? "Assigned layout: \(self.state.layout.rawValue)"
                        : "Compact fallback: fetch failed or no supported variant"
                }
                self.fetchNext()
            }
        }
    }

    // Called by the report view's onAppear, not by a variant read in body.
    func reportDisplayed(revision: Int) {
        guard revision == state.revision, !state.loading else { return }
        if state.canExpose(displayedRevision: revision) {
            client?.experiment?.exposure(key: Self.flagKey)
        }
        client?.track(eventType: "Report Previewed", eventProperties: properties())
    }

    func exportReport() {
        guard !state.loading else { return }
        client?.track(eventType: "Report Exported", eventProperties: properties())
    }

    // Merge these callbacks into existing authentication; they don't implement login.
    func accountSignedIn(userID: String) {
        precondition(userID.count >= 5, "Use your canonical user ID, at least five characters")
        client?.setUserId(userId: userID)
        refresh()
    }

    func accountSignedOut() {
        client?.reset()
        client?.setDeviceId(deviceId: UUID().uuidString)
        client?.experiment?.clear()
        refresh()
    }

    func flushAndShowDevice() {
        client?.flush()
        status = "Device ID: \(client?.getDeviceId() ?? "not available"); flush requested"
    }

    private func properties() -> [String: Any] {
        ["report_type": "usage", "days": 7, "platform": "iOS",
         "layout": state.layout.rawValue, "layout_source": state.assigned ? "assignment" : "fallback"]
    }
}
