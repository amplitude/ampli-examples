import XCTest

final class SmokeTests: XCTestCase {
    @MainActor
    func testBlankKeyKeepsReportUsable() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.staticTexts["Demo stopped"].waitForExistence(timeout: 10))
        app.buttons["Export report"].tap()
        XCTAssertTrue(app.staticTexts["Demo exports: 1"].exists)
        app.buttons["Start demo"].tap()
        XCTAssertTrue(app.staticTexts["Guides off: check API key and region"].waitForExistence(timeout: 5))
        XCTAssertFalse(app.buttons["Refresh guides"].isEnabled)
        XCTAssertFalse(app.buttons["Pause guides"].isEnabled)
        app.buttons["Export report"].tap()
        XCTAssertTrue(app.staticTexts["Demo exports: 2"].exists)
    }
}
