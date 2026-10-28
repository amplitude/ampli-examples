import XCTest

final class SmokeTests: XCTestCase {
    @MainActor
    func testBlankKeyKeepsReplayOff() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.staticTexts["Replay consent: off"].waitForExistence(timeout: 10))
        XCTAssertFalse(app.buttons["Allow replay"].isEnabled)
        XCTAssertFalse(app.buttons["Stop replay"].isEnabled)
        app.buttons["Open report"].tap()
        XCTAssertTrue(app.staticTexts["7-day report: 84 sample actions"].exists)
        app.buttons["Change date range"].tap()
        XCTAssertTrue(app.staticTexts["30-day report: 360 sample actions"].exists)
    }
}
