//
//  AmpliTests.swift
//  AmpliSwiftSampleAppTests
//
//  Created by Qingzhuo Zhen on 12/1/21.
//

import XCTest
import AmpliSwiftSampleApp
import Amplitude

let emptyDictionary = [String: String]()
func isEmptyDictionary(_ dict: Any?) -> Bool {
    return NSDictionary(dictionary: dict as! [String: String]).isEqual(to: emptyDictionary)
}

class AmpliTests: XCTestCase {
    private var ampli: Ampli?
    private var middlewareRun: XCTestExpectation?

    override func setUpWithError() throws {
        ampli = Ampli()
        middlewareRun = expectation(description: "Waiting")
    }
    
    func initAmpliWithNewInstance(_ instanceName: String) {
        let client = Amplitude.instance(withName: instanceName);
        client.initializeApiKey("test-api-key");
        ampli?.load(LoadOptions(client: LoadClientOptions(instance: client)))
    }

    func testIdentify() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        
        initAmpliWithNewInstance("testIdentify")
        
        let identifyProperties = Identify(requiredNumber: 22.0, optionalArray: ["optional array str"])
        let eventOptions = EventOptions(deviceId: deviceId)
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "$identify")
            XCTAssertTrue(isEmptyDictionary(payload.event["event_properties"]))
            XCTAssertEqual(payload.event["user_id"] as! String, userId)
            XCTAssertEqual(payload.event["device_id"] as! String, deviceId)
            self.middlewareRun?.fulfill()
        })
        ampli?.identify(userId, identifyProperties, options: eventOptions)
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }

    func testTrackWithNoProperties() throws {
        initAmpliWithNewInstance("testTrackWithNoProperties")
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "Event No Properties")
            XCTAssertTrue(isEmptyDictionary(payload.event["event_properties"]))
//            XCTAssertNil(payload.event["user_id"])
//            XCTAssertNotNil(payload.event["device_id"])
            self.middlewareRun?.fulfill()
        })
        ampli?.eventNoProperties()
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }

    func testTrackEventWithAllTypes() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        let eventOptions = EventOptions(deviceId: deviceId)
        let extraDict: MiddlewareExtra = ["test" : "extra test"];
        
        initAmpliWithNewInstance("testTrackEventWithAllTypes")
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
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
            self.middlewareRun?.fulfill()
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
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }

    func testSetGroup() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";
        
        initAmpliWithNewInstance("testSetGroup")
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "$identify")
            XCTAssertTrue(isEmptyDictionary(payload.event["event_properties"]))
            let userProperties = payload.event["user_properties"] as? Dictionary<String, Any>
            let userPropertiesSet = userProperties!["$set"] as? Dictionary<String, Any>
            XCTAssertEqual(userPropertiesSet![groupType] as! String, groupName)
            self.middlewareRun?.fulfill()
        })
        ampli?.client.setGroup(groupType, groupName: groupName as NSObject)
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }

    func testGroupIdentify() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";
        
        initAmpliWithNewInstance("testGroupIdentify")
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "$groupidentify")
            XCTAssertTrue(isEmptyDictionary(payload.event["event_properties"]))
            XCTAssertTrue(isEmptyDictionary(payload.event["user_properties"]))
            let groups = payload.event["groups"] as? Dictionary<String, Any>
            XCTAssertEqual(groups![groupType] as! String, groupName)
            let groupProperties = payload.event["group_properties"] as? Dictionary<String, Any>
            let groupPropertiesSet = groupProperties!["$set"] as? Dictionary<String, Any>
            XCTAssertEqual(groupPropertiesSet!["requiredBoolean"] as! Bool, false)
            XCTAssertEqual(groupPropertiesSet!["optionalString"] as! String, "optional str")
            self.middlewareRun?.fulfill()
        })

        let identifyArgs = AMPIdentify()
        identifyArgs.set("requiredBoolean", value: false as NSObject)
        identifyArgs.set("optionalString", value: "optional str" as NSObject)
        ampli?.client.groupIdentify(withGroupType: groupType, groupName: groupName as NSObject, groupIdentify: identifyArgs)
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }

    func testGroupIdentifyNilOptionalString() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";

        initAmpliWithNewInstance("testGroupIdentifyNilOptionalString")
        
        ampli?.client.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            XCTAssertEqual(payload.event["event_type"] as! String, "$groupidentify")
            XCTAssertTrue(isEmptyDictionary(payload.event["event_properties"]))
            XCTAssertTrue(isEmptyDictionary(payload.event["user_properties"]))
            let groups = payload.event["groups"] as? Dictionary<String, Any>
            XCTAssertEqual(groups![groupType] as! String, groupName)
            let groupProperties = payload.event["group_properties"] as? Dictionary<String, Any>
            let groupPropertiesSet = groupProperties!["$set"] as? Dictionary<String, Any>
            XCTAssertEqual(groupPropertiesSet!["requiredBoolean"] as! Bool, false)
            XCTAssertNil(groupPropertiesSet!["optionalString"])
            self.middlewareRun?.fulfill()
        })

        let identifyArgs = AMPIdentify()
        identifyArgs.set("requiredBoolean", value: false as NSObject)
        identifyArgs.set("optionalString", value: nil)
        ampli?.client.groupIdentify(withGroupType: groupType, groupName: groupName as NSObject, groupIdentify: identifyArgs)
        let _ = XCTWaiter.wait(for: [middlewareRun!], timeout: 2.0)
    }
}
