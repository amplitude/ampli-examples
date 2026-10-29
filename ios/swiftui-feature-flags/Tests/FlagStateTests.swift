import XCTest
@testable import ReportCore

final class FlagStateTests: XCTestCase {
    func testNoAssignmentStartsCompactWithoutExposure() {
        let state = FlagState()
        XCTAssertEqual(state.layout, .compact)
        XCTAssertFalse(state.canExpose(displayedRevision: 0))
    }

    func testBothKnownVariantsCanBeExposedAfterFetch() {
        for value in ["control", "expanded"] {
            var state = FlagState()
            state.request()
            let request = state.begin()!
            XCTAssertFalse(state.canExpose(displayedRevision: request))
            XCTAssertTrue(state.complete(request, value: value, succeeded: true))
            XCTAssertEqual(state.layout.rawValue, value)
            XCTAssertTrue(state.canExpose(displayedRevision: request))
        }
    }

    func testMissingUnknownAndFailedVariantsStayUnexposedFallback() {
        for value: String? in [nil, "unexpected", ""] {
            var state = FlagState()
            state.request()
            let request = state.begin()!
            XCTAssertTrue(state.complete(request, value: value, succeeded: true))
            XCTAssertEqual(state.layout, .compact)
            XCTAssertFalse(state.canExpose(displayedRevision: request))
        }
        var state = FlagState()
        state.request()
        let request = state.begin()!
        _ = state.complete(request, value: "expanded", succeeded: false)
        XCTAssertFalse(state.assigned)
    }

    func testIdentityChangeRejectsLateResponseBeforeNextFetch() {
        var state = FlagState()
        state.request()
        let old = state.begin()!
        state.request() // confirmed identity change
        XCTAssertNil(state.begin(), "Don't overlap SDK fetches")
        XCTAssertFalse(state.complete(old, value: "expanded", succeeded: true),
                       "Adapter must clear this response from SDK storage")
        XCTAssertFalse(state.assigned)
        XCTAssertFalse(state.canExpose(displayedRevision: old))
        let fresh = state.begin()!
        XCTAssertNotEqual(fresh, old)
        XCTAssertTrue(state.complete(fresh, value: "control", succeeded: true))
        XCTAssertTrue(state.canExpose(displayedRevision: fresh))
        XCTAssertFalse(state.canExpose(displayedRevision: old))
    }

    func testRapidRefreshesCoalesceToLatestRevision() {
        var state = FlagState()
        state.request()
        let old = state.begin()!
        state.request()
        state.request()
        XCTAssertFalse(state.complete(old, value: "expanded", succeeded: true))
        XCTAssertEqual(state.begin(), 3)
        XCTAssertNil(state.begin())
    }

    func testRefreshDropsPreviousAssignmentImmediately() {
        var state = FlagState()
        state.request()
        let old = state.begin()!
        _ = state.complete(old, value: "expanded", succeeded: true)
        state.request()
        XCTAssertEqual(state.layout, .compact)
        XCTAssertFalse(state.assigned)
        XCTAssertFalse(state.canExpose(displayedRevision: old))
    }
}
