import SwiftUI

@main
@MainActor
struct AmplitudeReportsApp: App {
    @StateObject private var model = ReportModel()
    @Environment(\.scenePhase) private var phase

    var body: some Scene {
        WindowGroup { ContentView(model: model) }
            .onChange(of: phase) { _, next in
                if next == .background { model.analytics.flush() }
            }
    }
}
