import SwiftUI

struct ContentView: View {
    @ObservedObject var analytics: ReportAnalytics
    @State private var opened = false

    var body: some View {
        let displayed = analytics.state
        VStack(alignment: .leading, spacing: 16) {
            Text("Usage report").font(.title)
            Text(analytics.status).accessibilityIdentifier("flag-status")
            Button("Refresh flags") { analytics.refresh() }
                .disabled(!analytics.configured)
            Button("Open report") { opened = true }
                .disabled(analytics.state.loading)
            if opened && !displayed.loading {
                ReportPanel(layout: displayed.layout, analytics: analytics)
                    .id(displayed.revision)
                    .onAppear { analytics.reportDisplayed(revision: displayed.revision) }
            }
            Button("Flush and show device ID") { analytics.flushAndShowDevice() }
        }
        .padding()
        .task { analytics.start() }
    }
}

private struct ReportPanel: View {
    let layout: ReportLayout
    @ObservedObject var analytics: ReportAnalytics

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("7-day report: 84 sample actions")
            Text("Layout: \(layout.displayName)").accessibilityIdentifier("report-layout")
            if layout == .expanded {
                Text("Daily average: 12 actions")
                Text("Most active day: Tuesday")
            }
            Button("Export report") { analytics.exportReport() }
        }
        .padding()
        .background(Color.blue.opacity(0.1))
    }
}
