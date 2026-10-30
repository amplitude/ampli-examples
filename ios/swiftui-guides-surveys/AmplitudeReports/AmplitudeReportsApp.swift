import SwiftUI

@main
struct AmplitudeReportsApp: App {
    @StateObject private var engagement = ReportEngagement(
        settings: AnalyticsSettings(info: Bundle.main.infoDictionary ?? [:]))

    var body: some Scene {
        WindowGroup {
            ContentView(engagement: engagement)
                .onOpenURL { engagement.handleURL($0) }
        }
    }
}
