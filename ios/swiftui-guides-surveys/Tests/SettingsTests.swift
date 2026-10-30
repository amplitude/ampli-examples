import XCTest
@testable import ReportCore

final class SettingsTests: XCTestCase {
    func testBlankAndUnexpandedKeysDisableTheSDK() {
        for key in ["", "  ", "$(AMPLITUDE_API_KEY)"] {
            XCTAssertNil(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": key]))
        }
    }
    func testRegionIsValidated() {
        XCTAssertEqual(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": "synthetic"])?.zone, .US)
        XCTAssertEqual(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": " synthetic ", "AMPLITUDE_SERVER_ZONE": " EU "])?.zone, .EU)
        for zone in ["", "eu", "$(AMPLITUDE_SERVER_ZONE)", "OTHER"] {
            XCTAssertNil(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": "synthetic", "AMPLITUDE_SERVER_ZONE": zone]))
        }
    }
}
