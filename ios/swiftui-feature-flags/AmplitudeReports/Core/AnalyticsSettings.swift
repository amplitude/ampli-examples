import Foundation

struct AnalyticsSettings {
    enum Zone: String { case US, EU }
    let apiKey: String
    let deploymentKey: String
    let zone: Zone

    init?(info: [String: Any]) {
        func key(_ name: String) -> String {
            (info[name] as? String ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        }
        let apiKey = key("AMPLITUDE_API_KEY")
        let deploymentKey = key("AMPLITUDE_DEPLOYMENT_KEY")
        let region = key("AMPLITUDE_SERVER_ZONE")
        guard !apiKey.isEmpty, !deploymentKey.isEmpty,
              !apiKey.contains("$("), !deploymentKey.contains("$("),
              let zone = Zone(rawValue: region) else { return nil }
        self.apiKey = apiKey
        self.deploymentKey = deploymentKey
        self.zone = zone
    }
}
