import Combine
import Foundation

@MainActor
final class ReportModel: ObservableObject {
    @Published private(set) var days = 7
    @Published private(set) var opened = false
    @Published private(set) var status: String
    let analytics: ReportAnalytics

    init(analytics: ReportAnalytics? = nil) {
        let analytics = analytics ?? .shared
        self.analytics = analytics
        status = analytics.configured
            ? "Analytics configured; verify delivery separately"
            : "Analytics off: check the API key and region in the build configuration"
    }

    var report: String {
        opened ? "\(days)-day report: \(days * 12) sample actions" : "Open the sample report"
    }
    func openReport() {
        opened = true
        analytics.reportPreviewed(days: days)
    }
    func changeRange() {
        days = days == 7 ? 30 : 7
        opened = true
        analytics.reportRangeChanged(days: days)
    }
    func flushAndShowDevice() {
        analytics.flush()
        status = "Device ID: \(analytics.deviceID() ?? "not available yet"); flush requested"
    }
}
