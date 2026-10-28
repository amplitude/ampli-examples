import Foundation

struct AnalyticsSettings {
    enum Zone: String { case US, EU }
    let apiKey: String
    let zone: Zone

    init?(info: [String: Any]) {
        let key = (info["AMPLITUDE_API_KEY"] as? String ?? "")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        let region = (info["AMPLITUDE_SERVER_ZONE"] as? String ?? "US")
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard !key.isEmpty, !key.contains("$("), let zone = Zone(rawValue: region) else {
            return nil
        }
        self.apiKey = key
        self.zone = zone
    }
}
