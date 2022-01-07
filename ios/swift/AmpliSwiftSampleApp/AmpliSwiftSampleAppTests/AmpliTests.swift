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
        ampli?.load(LoadOptions(client: LoadClientOptions(apiKey: "test-api-key")))
    }

    func testIdenify() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        let identifyProperties = Identify(requiredNumber: 22.0, optionalArray: ["optional array str"])
        let eventOptions = EventOptions(deviceId: deviceId)
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Identify")
            XCTAssertNil(payload.event["event_properties"])
            XCTAssertEqual(payload.event["user_id"] as! String, userId)
            XCTAssertEqual(payload.event["device_id"] as! String, deviceId)
        })
        ampli?.identify(userId, identifyProperties, options: eventOptions)
    }

    func testTrackWithNoProperies() throws {
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Event No Properties")
            XCTAssertNil(payload.event["event_properties"])
            XCTAssertNil(payload.event["user_id"])
            XCTAssertNil(payload.event["device_id"])
        })
        ampli?.eventNoProperties()
    }

    func testTrackEventWithAllTypes() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        let eventOptions = EventOptions(deviceId: deviceId)
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
            XCTAssertEqual(payload.event["user_id"] as! String, userId)
            XCTAssertEqual(payload.event["device_id"] as! String, deviceId)
            XCTAssertEqual(payload.extra?["test"] as! String, "extra test")
        })
        ampli?.track(
            EventWithAllProperties(
                requiredArray: ["array element 1", "array element 2"],
                requiredBoolean: true,
                requiredEnum: EventWithAllProperties.RequiredEnum.enum1,
                requiredInteger: 10,
                requiredNumber: 2.0,
                requiredString: "required string"
            ).options(userId: userId),
            options: eventOptions,
            extra: extraDict
        )
    }

    func testSetGroup() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";
        ampli?.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Identify")
            XCTAssertNil(payload.event["event_properties"])
            let userProperties = payload.event["user_properties"] as? Dictionary<String, Any>
            let userPropertiesSet = userProperties!["$set"] as? Dictionary<String, Any>
            XCTAssertEqual(userPropertiesSet![groupType] as! String, groupName)
        })
        ampli?.setGroup(groupType, groupName)
    }
}
