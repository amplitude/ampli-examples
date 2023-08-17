import XCTest
import AmpliSwiftSampleApp
import AmplitudeSwift

let emptyDictionary = [String: String]()
func isEmptyDictionary(_ dict: Any?) -> Bool {
    dict == nil || NSDictionary(dictionary: dict as! [String: String]).isEqual(to: emptyDictionary)
}

class AmpliTests: XCTestCase {
    private var ampli: Ampli!

    override func setUpWithError() throws {
        ampli = Ampli()
    }
    
    func initAmpliWithNewInstance(_ instanceName: String) {
        ampli.load(LoadOptions(client: LoadClientOptions(config: Configuration(
            apiKey: "test-api-key",
            instanceName: instanceName,
            trackingSessionEvents: false,
            migrateLegacyData: false
        ))))
    }

    func testIdentify() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        
        initAmpliWithNewInstance("testIdentify")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        let identifyProperties = Identify(requiredNumber: 22.0, optionalArray: ["optional array str"])
        let eventOptions = EventOptions(deviceId: deviceId)

        ampli.identify(userId, identifyProperties, options: eventOptions)
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "$identify")
        XCTAssertTrue(isEmptyDictionary(event.eventProperties))
        XCTAssertEqual(event.userId, userId)
        XCTAssertEqual(event.deviceId, deviceId)
    }
    
    func testIdentifyUserIdOnEvent() {
        initAmpliWithNewInstance("testIdentifyUserIdOnEvent")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        let eventOptionsUserId = "test-user-id-options"
        let deviceId = "test-device-id"
        let identifyProperties = Identify(requiredNumber: 22.0, optionalArray: ["optional array str"])
        let eventOptions = EventOptions(userId: eventOptionsUserId, deviceId: deviceId)

        ampli.identify(nil, identifyProperties, options: eventOptions)
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "$identify")
        XCTAssertEqual(event.userId, eventOptionsUserId)
        XCTAssertEqual(event.deviceId, deviceId)
        XCTAssertEqual(ampli.client.getUserId(), eventOptionsUserId)
    }

    func testTrackWithNoProperties() throws {
        initAmpliWithNewInstance("testTrackWithNoProperties")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        ampli.eventNoProperties()
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "Event No Properties")
        XCTAssertTrue(isEmptyDictionary(event.eventProperties))
        XCTAssertNil(event.userId)
        XCTAssertNotNil(event.deviceId)
    }

    func testTrackEventWithAllTypes() throws {
        let userId = "test-user-id";
        let deviceId = "test-device-id";
        let eventOptions = EventOptions(deviceId: deviceId)

        initAmpliWithNewInstance("testTrackEventWithAllTypes")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        ampli.track(
            EventWithAllProperties(
                requiredArray: ["array element 1", "array element 2"],
                requiredBoolean: true,
                requiredEnum: EventWithAllProperties.RequiredEnum.enum1,
                requiredInteger: 10,
                requiredNumber: 2.0,
                requiredString: "required string"
            ).options(userId: userId),
            options: eventOptions
        )
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "Event With All Properties")
        let eventProperties = event.eventProperties
        XCTAssertNotNil(event.eventProperties)
        XCTAssertEqual(eventProperties!["requiredArray"] as! Array, ["array element 1", "array element 2"])
        XCTAssertEqual(eventProperties!["requiredBoolean"] as! Bool, true)
        XCTAssertEqual(eventProperties!["requiredEnum"] as! String, "Enum1")
        XCTAssertEqual(eventProperties!["requiredInteger"] as! Int, 10)
        XCTAssertEqual(eventProperties!["requiredNumber"] as! Double, 2.0)
        XCTAssertEqual(eventProperties!["requiredString"] as! String, "required string")
        XCTAssertFalse(eventProperties!.keys.contains("optionalString"))
        XCTAssertEqual(event.userId, userId)
        XCTAssertEqual(event.deviceId, deviceId)
    }

    func testSetGroup() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";

        initAmpliWithNewInstance("testSetGroup")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        ampli.client.setGroup(groupType: groupType, groupName: groupName)
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "$identify")
        XCTAssertTrue(isEmptyDictionary(event.eventProperties))
         let userProperties = event.userProperties
         let userPropertiesSet = userProperties!["$set"] as? Dictionary<String, Any>
         XCTAssertEqual(userPropertiesSet![groupType] as! String, groupName)
    }

    func testGroupIdentify() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";

        initAmpliWithNewInstance("testGroupIdentify")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        let groupProperties: [String:Any] = [
            "requiredBoolean": false,
            "optionalString": "optional str"
        ]
        ampli.client.groupIdentify(groupType: groupType, groupName: groupName, groupProperties: groupProperties)
        ampli.flush()

        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "$groupidentify")
        XCTAssertTrue(isEmptyDictionary(event.eventProperties))
        XCTAssertTrue(isEmptyDictionary(event.userProperties))
        let groups = event.groups
        XCTAssertEqual(groups![groupType] as! String, groupName)
        let groupPropertiesSet = event.groupProperties!["$set"] as? Dictionary<String, Any>
        XCTAssertEqual(groupPropertiesSet!["requiredBoolean"] as! Bool, false)
        XCTAssertEqual(groupPropertiesSet!["optionalString"] as! String, "optional str")
    }

    func testGroupIdentifyNilOptionalString() throws {
        let groupType = "test-group-type";
        let groupName = "test-group";

        initAmpliWithNewInstance("testGroupIdentifyNilOptionalString")
        let eventCollector = EventCollectorPlugin()
        ampli.client.add(plugin: eventCollector)

        let identify = Identify()
        identify.set(property: "requiredBoolean", value: false)
        identify.set(property: "optionalString", value: nil)
        ampli.client.groupIdentify(groupType: groupType, groupName: groupName, identify: identify)
        ampli.flush()


        XCTAssertEqual(eventCollector.events.count, 1)
        let event = eventCollector.events[0]
        XCTAssertEqual(event.eventType, "$groupidentify")
        XCTAssertTrue(isEmptyDictionary(event.eventProperties))
        XCTAssertTrue(isEmptyDictionary(event.userProperties))
        let groups = event.groups
        XCTAssertEqual(groups![groupType] as! String, groupName)
        let groupPropertiesSet = event.groupProperties!["$set"] as? Dictionary<String, Any>
        XCTAssertEqual(groupPropertiesSet!["requiredBoolean"] as! Bool, false)
        XCTAssertNil(groupPropertiesSet!["optionalString"])
    }
}

class EventCollectorPlugin: Plugin {
    var type: PluginType
    var amplitude: Amplitude?
    var events: [BaseEvent] = Array()

    init() {
        self.type = .destination
    }

    func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    func execute(event: BaseEvent) -> BaseEvent? {
        events.append(event)
        return event
    }
}
