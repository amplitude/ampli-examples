import AmplitudeUnified
import AmplitudeEngagementSwift
import Combine
import Foundation

@MainActor
final class ReportEngagement: ObservableObject {
    @Published private(set) var status = "Demo stopped"
    @Published private(set) var ready = false
    @Published private(set) var paused = false
    private let settings: AnalyticsSettings?
    private var client: Amplitude?
    private var connecting = false
    private var pendingURL: URL?
    static let screenName = "UsageReport"
    static let demoUserID = "build-ios-guides-demo"

    init(settings: AnalyticsSettings?) { self.settings = settings }

    // Call only after the host app's consent and identity requirements are met.
    func start() async {
        guard !connecting, !ready else { return }
        guard let settings else {
            status = "Guides off: check API key and region"
            return
        }
        connecting = true
        defer { connecting = false }
        if client == nil {
            let analytics = AnalyticsConfig(autocapture: [], enableAutoCaptureRemoteConfig: false)
            let replay = SessionReplayPlugin.Config(sampleRate: 0, enableRemoteConfig: false, autoStart: false)
            let amplitude = Amplitude(apiKey: settings.apiKey,
                                      serverZone: settings.zone == .EU ? .EU : .US,
                                      analyticsConfig: analytics,
                                      sessionReplayConfig: replay)
            // A fixed synthetic account for this development sample only.
            amplitude.setUserId(userId: Self.demoUserID)
            amplitude.add(plugin: AmplitudeEngagementPluginFactory.make(
                AmplitudeInitOptions(serverZone: settings.zone == .EU ? .EU : .US)))
            client = amplitude
        }
        status = "Waiting for guides plugin"
        // Bound the optional-getter wait without constructing another client.
        for _ in 0..<50 {
            guard !Task.isCancelled else { status = "Start cancelled"; return }
            if let engagement = client?.engagement {
                engagement.screen(Self.screenName)
                ready = true
                status = "Plugin attached; guide display still needs verification"
                client?.track(eventType: "Report Previewed", eventProperties: properties)
                if let url = pendingURL {
                    pendingURL = nil
                    status = engagement.handleUrl(url) ? "Preview link handled" : "Link not handled by guides"
                }
                return
            }
            do { try await Task.sleep(nanoseconds: 100_000_000) }
            catch { status = "Start cancelled"; return }
        }
        status = "Plugin unavailable; tap Start demo to retry"
    }

    func exportReport() {
        client?.track(eventType: "Report Exported", eventProperties: properties)
    }

    func refresh() {
        guard ready, !paused else { return }
        client?.engagement?.screen(Self.screenName)
        client?.engagement?.refresh()
    }

    func toggleGuides() {
        guard let engagement = client?.engagement, ready else { return }
        if paused {
            engagement.enable()
            engagement.screen(Self.screenName)
            engagement.refresh()
        } else {
            engagement.disable()
        }
        paused.toggle()
    }

    func handleURL(_ url: URL) {
        // An incoming preview link never starts collection by itself.
        guard let engagement = client?.engagement, ready else {
            pendingURL = url
            status = "Preview link waiting; tap Start demo"
            return
        }
        status = engagement.handleUrl(url) ? "Preview link handled" : "Link not handled by guides"
    }

    func flush() { client?.flush() }

    private var properties: [String: Any] {
        ["report_type": "usage", "days": 7, "platform": "iOS"]
    }
}
