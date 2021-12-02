//
//  AmpliTests.swift
//  AmpliSwiftSampleAppTests
//
//  Created by Qingzhuo Zhen on 12/1/21.
//

import XCTest
import AmpliSwiftSampleApp
import Amplitude

class AmpliTests: XCTestCase {
    private var ampli: Ampli?
    
    override func setUpWithError() throws {
        ampli = Ampli()
        ampli?.load(options: LoadOptions(client: LoadClientOptions(apiKey: "test-api-key")))
    }
    
    func testIdenify() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        let identifyProperties = IdentifyProperties(optionalArray: ["optional array str"], requiredNumber: 22.0)
        let eventOptions = EventOptions(deviceId: deviceId)
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Identify")
            XCTAssertEqual(payload.event["user_id"] as! String, userId)
            XCTAssertEqual(payload.event["device_id"] as! String, deviceId)
        })
        ampli?.identify(userId: userId, properties: identifyProperties, options: eventOptions)
    }
    
    func testTrackWithNoProperies() throws {
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Event No Properties")
        })
        ampli?.eventNoProperties()
    }
    
    func testTrackEventWithAllTypes() throws {
        let extraDict: MiddlewareExtra = ["test" : "extra test"];
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Event With All Properties")
            let eventProperties = payload.event["event_properties"] as? Dictionary<String, Any>
            XCTAssertEqual(eventProperties!["requiredArray"] as! Array, ["array element 1", "array element 2"])
            XCTAssertEqual(eventProperties!["requiredBoolean"] as! Bool, true)
            XCTAssertEqual(eventProperties!["requiredEnum"] as! String, "Enum1")
            XCTAssertEqual(eventProperties!["requiredInteger"] as! Int, 10)
            XCTAssertEqual(eventProperties!["requiredNumber"] as! Double, 2.0)
            XCTAssertEqual(eventProperties!["requiredString"] as! String, "required string")
            XCTAssertNil(eventProperties!["optionalString"])
            XCTAssertEqual(payload.extra?["test"] as! String, "extra test")
        })
        ampli?.track(event: EventWithAllProperties(eventProperties: EventWithAllPropertiesProperties(optionalString: nil, requiredArray: ["array element 1", "array element 2"], requiredBoolean: true, requiredEnum: RequiredEnum.enum1, requiredInteger: 10, requiredNumber: 2.0, requiredString: "required string")), options: nil, extra: extraDict)
    }
}
