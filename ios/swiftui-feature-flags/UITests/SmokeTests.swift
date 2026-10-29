import XCTest

final class SmokeTests: XCTestCase {
    @MainActor
    func testBlankKeysKeepCompactReportUsable() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.staticTexts["Flags off: check both client keys and region"].waitForExistence(timeout: 10))
        XCTAssertFalse(app.buttons["Refresh flags"].isEnabled)
        app.buttons["Open report"].tap()
        XCTAssertTrue(app.staticTexts["Layout: compact"].exists)
        XCTAssertFalse(app.staticTexts["Daily average: 12 actions"].exists)
        app.buttons["Export report"].tap()
        app.buttons["Flush and show device ID"].tap()
        XCTAssertTrue(app.staticTexts["Device ID: not available; flush requested"].exists)
    }
}
