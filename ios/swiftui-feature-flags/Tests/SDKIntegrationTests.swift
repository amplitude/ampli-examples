import AmplitudeUnified
import Foundation
import XCTest
@testable import ReportCore

// Real SDK and real application service, with a clearly local test transport.
// These results must never be presented as live Amplitude acceptance.
@MainActor
final class SDKIntegrationTests: XCTestCase {
    private let base = "http://127.0.0.1:28679"

    private func request(_ path: String, post: Bool = false) async throws -> Data {
        var request = URLRequest(url: URL(string: base + path)!)
        request.httpMethod = post ? "POST" : "GET"
        let (data, response) = try await URLSession.shared.data(for: request)
        XCTAssertEqual((response as? HTTPURLResponse)?.statusCode, 200)
        return data
    }

    private func records(_ path: String) async throws -> [[String: Any]] {
        let data = try await request(path)
        let values = try JSONSerialization.jsonObject(with: data) as! [[String: Any]]
        if path == "/test/events" {
            let relevant = ["$exposure", "Report Previewed", "Report Exported"]
            return values.filter { relevant.contains($0["event_type"] as? String ?? "") }
        }
        return values
    }

    private func waitUntil(_ description: String,
                           _ condition: () async throws -> Bool) async throws {
        for _ in 0..<120 {
            if try await condition() { return }
            try await Task.sleep(nanoseconds: 100_000_000)
        }
        XCTFail("Timed out: " + description)
        throw NSError(domain: "SDKIntegration", code: 1)
    }

    private func waitForEvents(assigned: Bool) async throws {
        try await waitUntil("complete expected event set at local receiver") {
            let events = try await self.records("/test/events")
            let names = events.compactMap { $0["event_type"] as? String }
            return names.contains("Report Previewed") && names.contains("Report Exported")
                && (!assigned || names.contains("$exposure"))
        }
    }

    private func make(_ user: String) -> (ReportAnalytics, Amplitude) {
        let analytics = AnalyticsConfig(flushQueueSize: 1, flushIntervalMillis: 1000,
                                         serverURL: base + "/2/httpapi",
                                         autocapture: [], enableAutoCaptureRemoteConfig: false)
        let experiment = ExperimentPlugin.Config(deploymentKey: "local-deployment-" + UUID().uuidString,
                                                  serverUrl: base,
                                                  fetchTimeoutMillis: 15000,
                                                  retryFetchOnFailure: false,
                                                  automaticExposureTracking: false,
                                                  automaticFetchOnAmplitudeIdentityChange: false)
        let client = Amplitude(apiKey: "local-test-ingestion-key",
                               instanceName: "local-test-" + UUID().uuidString,
                               analyticsConfig: analytics, experimentConfig: experiment)
        client.setDeviceId(deviceId: "local-device-" + UUID().uuidString)
        client.setUserId(userId: user)
        return (ReportAnalytics(client: client), client)
    }

    func testRealSDKAssignedLayoutsExposeOnlyAfterDisplay() async throws {
        for value in ["control", "expanded"] {
            _ = try await request("/test/reset", post: true)
            let (model, client) = make(value + "-synthetic")
            model.start()
            try await waitUntil("fetched " + value) { !model.state.loading }
            XCTAssertTrue(model.state.assigned)
            XCTAssertEqual(model.state.layout.rawValue, value)
            let beforeDisplay = try await records("/test/events")
            XCTAssertFalse(beforeDisplay.contains { $0["event_type"] as? String == "$exposure" })
            model.reportDisplayed(revision: model.state.revision)
            model.exportReport()
            client.flush()
            try await waitForEvents(assigned: true)
            let events = try await records("/test/events")
            let exposures = events.filter { $0["event_type"] as? String == "$exposure" }
            XCTAssertEqual(exposures.count, 1)
            XCTAssertEqual((exposures.first?["event_properties"] as? [String: Any])?["variant"] as? String, value)
            XCTAssertTrue(events.allSatisfy { $0["user_id"] as? String == value + "-synthetic" })
            XCTAssertTrue(events.allSatisfy { $0["device_id"] as? String == client.getDeviceId() })
        }
    }

    func testRealSDKMissingUnknownAndFailureStayUnexposed() async throws {
        for prefix in ["missing", "unknown", "failed"] {
            _ = try await request("/test/reset", post: true)
            let (model, client) = make(prefix + "-synthetic")
            model.start()
            try await waitUntil("fallback " + prefix) { !model.state.loading }
            XCTAssertFalse(model.state.assigned)
            XCTAssertEqual(model.state.layout, .compact)
            model.reportDisplayed(revision: model.state.revision)
            model.exportReport()
            client.flush()
            try await waitForEvents(assigned: false)
            let events = try await records("/test/events")
            XCTAssertFalse(events.contains { $0["event_type"] as? String == "$exposure" })
            XCTAssertTrue(events.allSatisfy { ($0["event_properties"] as? [String: Any])?["layout_source"] as? String == "fallback" })
        }
    }

    func testRealSDKLogoutRejectsResponseAlreadyRequestedForOldUser() async throws {
        _ = try await request("/test/reset", post: true)
        let (model, client) = make("delayed-old-account")
        let oldDevice = client.getDeviceId()
        model.start()
        try await waitUntil("server received old identity before logout") {
            try await self.records("/test/requests").contains { $0["user_id"] as? String == "delayed-old-account" }
        }
        XCTAssertTrue(model.state.loading)
        let oldRevision = model.state.revision
        model.accountSignedOut()
        let newDevice = client.getDeviceId()
        XCTAssertNotEqual(newDevice, oldDevice)
        XCTAssertNil(client.getUserId())
        _ = try await request("/test/release", post: true)
        try await waitUntil("new anonymous fetch completed") { !model.state.loading }
        XCTAssertFalse(model.state.assigned)
        XCTAssertNil(client.experiment?.all()[ReportAnalytics.flagKey])
        model.reportDisplayed(revision: oldRevision) // stale view callback is rejected
        model.reportDisplayed(revision: model.state.revision)
        model.exportReport()
        client.flush()
        try await waitForEvents(assigned: false)
        let events = try await records("/test/events")
        XCTAssertFalse(events.contains { $0["event_type"] as? String == "$exposure" })
        for event in events {
            // JSON null is NSNull in [String: Any], not a missing dictionary key.
            let user = event["user_id"]
            XCTAssertTrue(user == nil || user is NSNull,
                          "Logout event must have no user ID: \(event)")
            XCTAssertEqual(event["device_id"] as? String, newDevice,
                           "Logout event must use the fresh device ID: \(event)")
        }
    }

    func testRealSDKRapidRefreshCoalescesAndRejectsOldDisplay() async throws {
        _ = try await request("/test/reset", post: true)
        let (model, client) = make("delayed-refresh-account")
        model.start()
        try await waitUntil("first request received") { try await self.records("/test/requests").count == 1 }
        let oldRevision = model.state.revision
        model.refresh()
        model.refresh()
        _ = try await request("/test/release", post: true)
        try await waitUntil("coalesced request completed") { !model.state.loading }
        let requests = try await records("/test/requests")
        XCTAssertEqual(requests.count, 2)
        XCTAssertTrue(model.state.assigned)
        XCTAssertEqual(model.state.layout, .expanded)
        model.reportDisplayed(revision: oldRevision)
        let beforeCurrentDisplay = try await records("/test/events")
        XCTAssertTrue(beforeCurrentDisplay.isEmpty)
        model.reportDisplayed(revision: model.state.revision)
        model.exportReport()
        client.flush()
        try await waitForEvents(assigned: true)
        let delivered = try await records("/test/events")
        XCTAssertEqual(delivered.filter { $0["event_type"] as? String == "$exposure" }.count, 1)
    }
}
