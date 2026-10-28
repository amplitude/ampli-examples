import XCTest
@testable import ReportCore

final class SettingsTests: XCTestCase {
    func testEmptyKeyDisablesClient() { XCTAssertNil(AnalyticsSettings(info: [:])) }
    func testUnexpandedBuildSettingDisablesClient() {
        XCTAssertNil(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": "$(AMPLITUDE_API_KEY)"]))
    }
    func testTrimsKeyAndDefaultsUS() {
        let settings = AnalyticsSettings(info: ["AMPLITUDE_API_KEY": " test-project-key \n"])
        XCTAssertEqual(settings?.apiKey, "test-project-key")
        XCTAssertEqual(settings?.zone, .US)
    }
    func testExplicitEU() {
        XCTAssertEqual(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": "test-project-key", "AMPLITUDE_SERVER_ZONE": "EU"])?.zone, .EU)
    }
    func testInvalidRegionDisablesClient() {
        XCTAssertNil(AnalyticsSettings(info: ["AMPLITUDE_API_KEY": "test-project-key", "AMPLITUDE_SERVER_ZONE": "Europe"]))
    }
}
