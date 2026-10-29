import XCTest
@testable import ReportCore

final class SettingsTests: XCTestCase {
    private let valid: [String: Any] = ["AMPLITUDE_API_KEY": "test-analytics",
                                       "AMPLITUDE_DEPLOYMENT_KEY": "test-deployment",
                                       "AMPLITUDE_SERVER_ZONE": "US"]
    func testBothKeysAndRegionAreRequired() {
        XCTAssertNotNil(AnalyticsSettings(info: valid))
        for field in valid.keys {
            var input = valid
            input[field] = ""
            XCTAssertNil(AnalyticsSettings(info: input), field)
        }
    }
    func testUnexpandedBuildSettingsAndUnknownRegionFailClosed() {
        for field in ["AMPLITUDE_API_KEY", "AMPLITUDE_DEPLOYMENT_KEY"] {
            var input = valid
            input[field] = "$(MISSING)"
            XCTAssertNil(AnalyticsSettings(info: input))
        }
        var input = valid
        input["AMPLITUDE_SERVER_ZONE"] = "APAC"
        XCTAssertNil(AnalyticsSettings(info: input))
    }
    func testWhitespaceAndEU() {
        var input = valid
        input["AMPLITUDE_API_KEY"] = " test-analytics \n"
        input["AMPLITUDE_SERVER_ZONE"] = " EU "
        XCTAssertEqual(AnalyticsSettings(info: input)?.apiKey, "test-analytics")
        XCTAssertEqual(AnalyticsSettings(info: input)?.zone, .EU)
    }
}
