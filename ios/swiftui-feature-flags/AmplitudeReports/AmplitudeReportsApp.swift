import SwiftUI

@main
@MainActor
struct AmplitudeReportsApp: App {
    @StateObject private var analytics = ReportAnalytics.shared
    @Environment(\.scenePhase) private var phase

    var body: some Scene {
        WindowGroup { ContentView(analytics: analytics) }
            .onChange(of: phase) { _, next in
                if next == .background { analytics.flushAndShowDevice() }
            }
    }
}
