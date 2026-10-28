import SwiftUI
import AmplitudeSessionReplay

@MainActor
struct ContentView: View {
    @ObservedObject var model: ReportModel
    @ObservedObject private var analytics: ReportAnalytics
    @State private var note = "MASK_TEST_NOTE_42"

    init(model: ReportModel) {
        self.model = model
        self.analytics = model.analytics
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    Text(model.status).font(.footnote).textSelection(.enabled)
                    Text(analytics.replayAllowed ? "Replay consent: allowed" : "Replay consent: off")
                        .accessibilityIdentifier("replay-consent")
                    Text("Allow a test recording of this demo report. Choose Stop replay to withdraw.")
                    Button("Allow replay") { analytics.setReplayAllowed(true) }
                        .disabled(!analytics.configured || analytics.replayAllowed)
                    Button("Stop replay") { analytics.setReplayAllowed(false) }
                        .disabled(!analytics.replayAllowed)
                    Divider()
                    Text(model.report)
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color.blue)
                        .frame(width: model.days == 7 ? 80 : 240, height: 40)
                        .accessibilityIdentifier("report-bar")
                    Button("Open report", action: model.openReport)
                    Button("Change date range", action: model.changeRange)
                    VStack(alignment: .leading) {
                        Text("Synthetic account: MASK_TEST_ACCOUNT_42")
                        TextField("Synthetic private note", text: $note)
                            .textFieldStyle(.roundedBorder)
                            .accessibilityIdentifier("private-note")
                    }
                    .amp_setBlocked(true)
                    Button("Flush and show device ID", action: model.flushAndShowDevice)
                }
                .padding()
            }
            .navigationTitle("Usage reports")
        }
    }
}
