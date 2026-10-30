import SwiftUI
import AmplitudeEngagementSwift

struct ContentView: View {
    @ObservedObject var engagement: ReportEngagement
    @State private var exportCount = 0
    @State private var startRequested = false

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 20) {
                Text("Usage report").font(.title)
                Text("84 actions in the past 7 days")
                Button("Export report") {
                    exportCount += 1
                    engagement.exportReport()
                }
                .amplitudeView("report-export")
                Text("Demo exports: \(exportCount)")
                Divider()
                Text("Development demo: uses a synthetic account and sends report events after Start demo.")
                Button("Start demo") { startRequested = true }
                    .disabled(engagement.ready)
                Button("Refresh guides") { engagement.refresh() }
                    .disabled(!engagement.ready || engagement.paused)
                Button(engagement.paused ? "Resume guides" : "Pause guides") {
                    engagement.toggleGuides()
                }.disabled(!engagement.ready)
                Text("Pausing guides leaves analytics running.").font(.footnote)
                Button("Flush events") { engagement.flush() }
                Text(engagement.status).accessibilityIdentifier("engagement-status")
                Spacer()
            }
            .padding()
            .navigationTitle("Reports")
        }
        .task(id: startRequested) {
            if startRequested {
                await engagement.start()
                startRequested = false
            }
        }
    }
}
