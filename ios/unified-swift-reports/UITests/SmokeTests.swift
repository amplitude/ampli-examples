import XCTest

final class SmokeTests: XCTestCase {
    @MainActor
    func testReportButtonsChangeVisibleReport() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.buttons["Open report"].waitForExistence(timeout: 10))
        app.buttons["Open report"].tap()
        XCTAssertTrue(app.staticTexts["7-day report: 84 sample actions"].exists)
        app.buttons["Change date range"].tap()
        XCTAssertTrue(app.staticTexts["30-day report: 360 sample actions"].exists)
        app.buttons["Change date range"].tap()
        XCTAssertTrue(app.staticTexts["7-day report: 84 sample actions"].exists)
    }

    @MainActor
    func testBlankKeyKeepsAnalyticsOff() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.staticTexts["Analytics off: check the API key and region in the build configuration"].waitForExistence(timeout: 10))
        app.buttons["Flush and show device ID"].tap()
        XCTAssertTrue(app.staticTexts["Device ID: not available yet; flush requested"].exists)
    }
}
