import SwiftUI

struct ContentView: View {
    @ObservedObject var model: ReportModel

    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 16) {
                Text(model.status).font(.footnote).textSelection(.enabled)
                Text(model.report)
                Button("Open report", action: model.openReport)
                Button("Change date range", action: model.changeRange)
                Button("Flush and show device ID", action: model.flushAndShowDevice)
                Spacer()
            }
            .padding()
            .navigationTitle("Usage reports")
        }
    }
}
