/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull swift-ampli-v2'
 *
 * Required dependencies: AmplitudeSwift ~> 0.4
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: ios:swift-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/swift-ampli-v2)
 */

import Foundation
import Amplitude_Swift

public enum AmpliEnvironment: Int {
    case prod, dev
}

let ApiKey: [AmpliEnvironment: String] = [
    .prod: "",
    .dev: ""
]

let AmpliObservePlan = Plan(
    branch: "main",
    source: "swift-ampli-v2",
    version: "1",
    versionId: "a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c"
)

public class Event {
    public let eventType: String
    public let eventProperties: [String:Any]?
    public let options: EventOptions?;

    init(eventType: String, eventProperties: [String:Any?]?, options: EventOptions?) {
        self.eventType = eventType;
        self.eventProperties = eventProperties?.compactMapValues { $0 };
        self.options = options;
    }
}

public class GenericEvent<E> : Event {
    private let eventFactory: (_ eventProperties: [String: Any?]?, _ options: EventOptions?) -> E

    init(eventType: String, eventProperties: [String:Any?]?, options: EventOptions?, eventFactory: @escaping (_ eventProperties: [String: Any?]?, _ options: EventOptions?) -> E) {
        self.eventFactory = eventFactory;
        super.init(eventType: eventType, eventProperties: eventProperties, options: options)
    }

    public func options(_ options: EventOptions) -> E {
        return self.eventFactory(self.eventProperties, options);
    }

    public func options(deviceId: String? = nil, userId: String? = nil) -> E {
        return self.options(EventOptions(userId: userId, deviceId: deviceId));
    }
}

public class Identify : GenericEvent<Identify> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "$identify",
            eventProperties: eventProperties,
            options: options,
            eventFactory: Identify.init
        );
    }

    /**
    Identify properties.

    - Parameter requiredNumber: Description for identify requiredNumber
    - Parameter optionalArray: Description for identify optionalArray
    */
    public convenience init(
        requiredNumber: Double,
        optionalArray: [String]? = nil
    ) {
        self.init([
            "optionalArray": optionalArray,
            "requiredNumber": requiredNumber
        ]);
    }
}

public class EventNoProperties : GenericEvent<EventNoProperties> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event No Properties",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventNoProperties.init
        );
    }

    /**
    Event w no properties description

    Owner: Test codegen
    */
    public convenience init() {
        self.init(nil);
    }
}

public class EventObjectTypes : GenericEvent<EventObjectTypes> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event Object Types",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventObjectTypes.init
        );
    }

    /**
    Event with Object and Object Array

    Owner: Test codegen

    - Parameter requiredObject: Property Object Type
    - Parameter requiredObjectArray: Property Object Array Type
    */
    public convenience init(
        requiredObject: Any,
        requiredObjectArray: [Any]
    ) {
        self.init([
            "requiredObject": requiredObject,
            "requiredObjectArray": requiredObjectArray
        ]);
    }
}

public class EventWithAllProperties : GenericEvent<EventWithAllProperties> {

    public enum RequiredEnum: String {
        case enum1 = "Enum1"
        case enum2 = "Enum2"
    }

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With All Properties",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithAllProperties.init
        );
    }

    /**
    Event w all properties description

    Owner: Test codegen

    - Parameter requiredArray: Event 2 Property - Array
    - Parameter requiredBoolean: Event 2 Property - Boolean
    - Parameter requiredEnum: Event 2 Property - Enum
    - Parameter requiredInteger: Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
    - Parameter requiredNumber: Event 2 Property - Number
    - Parameter requiredString: Event 2 Property - String
    - Parameter optionalString: Event 2 Property - Optional String    *     * Examples:    * Some string, or another
    */
    public convenience init(
        requiredArray: [String],
        requiredBoolean: Bool,
        requiredEnum: EventWithAllProperties.RequiredEnum,
        requiredInteger: Int,
        requiredNumber: Double,
        requiredString: String,
        optionalString: String? = nil
    ) {
        self.init([
            "optionalString": optionalString,
            "requiredArray": requiredArray,
            "requiredBoolean": requiredBoolean,
            "requiredConst": "some-const-value",
            "requiredEnum": requiredEnum.rawValue,
            "requiredInteger": requiredInteger,
            "requiredNumber": requiredNumber,
            "requiredString": requiredString
        ]);
    }
}

public class EventWithArrayTypes : GenericEvent<EventWithArrayTypes> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Array Types",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithArrayTypes.init
        );
    }

    /**
    Description for event with Array Types

    Owner: Test codegen

    - Parameter requiredBooleanArray: description for required boolean array
    - Parameter requiredEnumArray: Description for enum array property
    - Parameter requiredNumberArray: Description for required number array
    - Parameter requiredObjectArray: Description for required object array
    - Parameter requiredStringArray: description for required string array
    */
    public convenience init(
        requiredBooleanArray: [Bool],
        requiredEnumArray: [String],
        requiredNumberArray: [Double],
        requiredObjectArray: [Any],
        requiredStringArray: [String]
    ) {
        self.init([
            "requiredBooleanArray": requiredBooleanArray,
            "requiredEnumArray": requiredEnumArray,
            "requiredNumberArray": requiredNumberArray,
            "requiredObjectArray": requiredObjectArray,
            "requiredStringArray": requiredStringArray
        ]);
    }
}

public class EventWithConstTypes : GenericEvent<EventWithConstTypes> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Const Types",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithConstTypes.init
        );
    }

    /**
    Description for event with const types

    Owner: Test codegen
    */
    public convenience init() {
        self.init([
            "Boolean Const": true,
            "Integer Const": 10,
            "Number Const": 2.2,
            "String Const": "String-Constant",
            "String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
            "String Int Const": 0
        ]);
    }
}

public class EventWithEnumTypes : GenericEvent<EventWithEnumTypes> {

    public enum OptionalEnum: String {
        case optionalEnum1 = "optional enum 1"
        case optionalEnum2 = "optional enum 2"
    }

    public enum RequiredEnum: String {
        case requiredEnum1 = "required enum 1"
        case requiredEnum2 = "required enum 2"
    }

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Enum Types",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithEnumTypes.init
        );
    }

    /**
    Description for event with enum types

    Owner: Test codegen

    - Parameter requiredEnum: Description for optional enum
    - Parameter optionalEnum: Description for required enum
    */
    public convenience init(
        requiredEnum: EventWithEnumTypes.RequiredEnum,
        optionalEnum: EventWithEnumTypes.OptionalEnum? = nil
    ) {
        self.init([
            "optional enum": optionalEnum?.rawValue,
            "required enum": requiredEnum.rawValue
        ]);
    }
}

public class EventWithOptionalArrayTypes : GenericEvent<EventWithOptionalArrayTypes> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Optional Array Types",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithOptionalArrayTypes.init
        );
    }

    /**
    Description for event with optional array types

    Owner: Test codegen

    - Parameter optionalBooleanArray: Description for optional boolean array
    - Parameter optionalEnumArray: Description for optional enum array
    - Parameter optionalJsonArray: Description for optional object array
    - Parameter optionalNumberArray: Description for optional number array
    - Parameter optionalStringArray: Description for optional string array
    */
    public convenience init(
        optionalBooleanArray: [Bool]? = nil,
        optionalEnumArray: [String]? = nil,
        optionalJsonArray: [Any]? = nil,
        optionalNumberArray: [Double]? = nil,
        optionalStringArray: [String]? = nil
    ) {
        self.init([
            "optionalBooleanArray": optionalBooleanArray,
            "optionalEnumArray": optionalEnumArray,
            "optionalJSONArray": optionalJsonArray,
            "optionalNumberArray": optionalNumberArray,
            "optionalStringArray": optionalStringArray
        ]);
    }
}

public class EventWithOptionalProperties : GenericEvent<EventWithOptionalProperties> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Optional Properties",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithOptionalProperties.init
        );
    }

    /**
    Event w optional properties description

    Owner: Test codegen

    - Parameter optionalArrayNumber: Property has no description provided in tracking plan.
    - Parameter optionalArrayString: Property has no description provided in tracking plan.
    - Parameter optionalBoolean: Property has no description provided in tracking plan.
    - Parameter optionalNumber: Property has no description provided in tracking plan.
    - Parameter optionalString: Optional String property description
    */
    public convenience init(
        optionalArrayNumber: [Double]? = nil,
        optionalArrayString: [String]? = nil,
        optionalBoolean: Bool? = nil,
        optionalNumber: Double? = nil,
        optionalString: String? = nil
    ) {
        self.init([
            "optionalArrayNumber": optionalArrayNumber,
            "optionalArrayString": optionalArrayString,
            "optionalBoolean": optionalBoolean,
            "optionalNumber": optionalNumber,
            "optionalString": optionalString
        ]);
    }
}

public class EventWithTemplateProperties : GenericEvent<EventWithTemplateProperties> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "Event With Template Properties",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithTemplateProperties.init
        );
    }

    /**
    Event with template properties description

    Owner: Test codegen

    - Parameter requiredEventProperty: required_event_property description
    - Parameter requiredTemplateProperty: required_template_property description
    - Parameter optionalEventProperty: optional_event_property description
    - Parameter optionalTemplateProperty: optional_template_property description
    */
    public convenience init(
        requiredEventProperty: String,
        requiredTemplateProperty: String,
        optionalEventProperty: Double? = nil,
        optionalTemplateProperty: Double? = nil
    ) {
        self.init([
            "optional_event_property": optionalEventProperty,
            "optional_template_property": optionalTemplateProperty,
            "required_event_property": requiredEventProperty,
            "required_template_property": requiredTemplateProperty
        ]);
    }
}

public class EventWithDifferentCasingTypes : GenericEvent<EventWithDifferentCasingTypes> {

    public enum EnumWithSpace: String {
        case enumWithSpace = "enum with space"
    }

    public enum EnumSnakeCase: String {
        case enumSnakeCase = "enum_snake_case"
    }

    public enum EnumCamelCase: String {
        case enumCamelCase = "enumCamelCase"
    }

    public enum EnumPascalCase: String {
        case enumPascalCase = "EnumPascalCase"
    }

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "event withDifferent_CasingTypes",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventWithDifferentCasingTypes.init
        );
    }

    /**
    Description for case with space

    Owner: Test codegen

    - Parameter enumWithSpace: Description for enum with space
    - Parameter enumSnakeCase: description_for_enum_snake_case
    - Parameter enumCamelCase: descriptionForEnumCamelCase
    - Parameter enumPascalCase: DescirptionForEnumPascalCase
    - Parameter propertyWithSpace: Description for case with space
    - Parameter propertyWithSnakeCase: Description_for_snake_case
    - Parameter propertyWithCamelCase: descriptionForCamelCase
    - Parameter propertyWithPascalCase: DescriptionForPascalCase
    */
    public convenience init(
        enumWithSpace: EventWithDifferentCasingTypes.EnumWithSpace,
        enumSnakeCase: EventWithDifferentCasingTypes.EnumSnakeCase,
        enumCamelCase: EventWithDifferentCasingTypes.EnumCamelCase,
        enumPascalCase: EventWithDifferentCasingTypes.EnumPascalCase,
        propertyWithSpace: String,
        propertyWithSnakeCase: String,
        propertyWithCamelCase: String,
        propertyWithPascalCase: String
    ) {
        self.init([
            "enum with space": enumWithSpace.rawValue,
            "enum_snake_case": enumSnakeCase.rawValue,
            "enumCamelCase": enumCamelCase.rawValue,
            "EnumPascalCase": enumPascalCase.rawValue,
            "property with space": propertyWithSpace,
            "property_with_snake_case": propertyWithSnakeCase,
            "propertyWithCamelCase": propertyWithCamelCase,
            "PropertyWithPascalCase": propertyWithPascalCase
        ]);
    }
}

public class EventMaxIntForTest : GenericEvent<EventMaxIntForTest> {

    private init(_ eventProperties: [String: Any?]?, _ options: EventOptions? = nil) {
        super.init(
            eventType: "EventMaxIntForTest",
            eventProperties: eventProperties,
            options: options,
            eventFactory: EventMaxIntForTest.init
        );
    }

    /**
    Event to test schema validation

    Owner: Test codegen

    - Parameter intMax10: property to test schema validation
    */
    public convenience init(
        intMax10: Int
    ) {
        self.init([
            "intMax10": intMax10
        ]);
    }
}

public struct LoadClientConfig {
    public let configuration: Configuration?

    public init(configuration: Configuration? = nil) {
        self.configuration = configuration
    }
}

public struct LoadClientOptions {
    public let apiKey: String?
    public let instance: Amplitude?
    public let config: LoadClientConfig?

    public init(apiKey: String? = nil, instance: Amplitude? = nil, config: LoadClientConfig? = nil) {
        self.apiKey = apiKey
        self.instance = instance
        self.config = config
    }
}

public struct LoadOptions {
    public let environment: AmpliEnvironment?
    public let disabled: Bool?
    public let client: LoadClientOptions?

    public init(environment: AmpliEnvironment? = nil, disabled: Bool? = nil, client: LoadClientOptions? = nil) {
        self.environment = environment
        self.disabled = disabled
        self.client = client
    }
}

public class Ampli {
    private var amplitude: Amplitude?
    public var client: Amplitude {
        get {
            _ = isInitializedAndEnabled()
            return amplitude!
        }
    }

    public var isLoaded: Bool {
        get {
            return self.amplitude != nil
        }
    }

    public private(set) var disabled: Bool

    public init() {
        disabled = false
    }

    // options should have 'environment', 'client.api_key' or 'client.instance'
    public func load(_ options: LoadOptions) -> Void {
        self.disabled = options.disabled ?? false
        if self.isLoaded {
            NSLog("Warning: Ampli is already initialized. Ampli.instance.load() should be called once at application start up.")
            return
        }

        var apiKey: String?

        if let clientApiKey = options.client?.apiKey {
            apiKey = clientApiKey
        } else if let environment = options.environment {
            apiKey = ApiKey[environment]
        }

        if let instance = options.client?.instance {
            self.amplitude = instance
        } else if let apiKey {
            let configuration = options.client?.config?.configuration ?? Configuration(apiKey: apiKey)
            if configuration.plan == nil {
                configuration.plan = AmpliObservePlan
            }
            if configuration.ingestionMetadata == nil {
                configuration.ingestionMetadata = IngestionMetadata(
                    sourceName: "ios-swift-ampli-v2", sourceVersion: "1.0.0"
                )
            }
            self.amplitude = Amplitude(configuration: configuration)
        } else {
            NSLog("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'")
            return
        }
    }

    public func track(_ event: Event, options: EventOptions? = nil) -> Void {
        if !isInitializedAndEnabled() {
            return
        }
        let eventOptions = getEventOptions(event.options, options)
        amplitude?.track(eventType: event.eventType, eventProperties: event.eventProperties, options: eventOptions)
    }

    public func identify(_ userId: String?, _ event: Identify, options: EventOptions? = nil) -> Void {
        if !isInitializedAndEnabled() {
            return
        }
        let eventOptions = getEventOptions(event.options, options, userId)
        amplitude?.identify(userProperties: event.eventProperties, options: eventOptions)
    }

    public func flush() -> Void {
        if !isInitializedAndEnabled() {
            return
        }
        amplitude?.flush()
    }

    /**
    Event No Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)

    Event w no properties description

    Owner: Test codegen
    */
    public func eventNoProperties() {
        self.track(EventNoProperties())
    }

    /**
    Event Object Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types)

    Event with Object and Object Array

    Owner: Test codegen

    - Parameter requiredObject: Property Object Type
    - Parameter requiredObjectArray: Property Object Array Type
    */
    public func eventObjectTypes(
        requiredObject: Any,
        requiredObjectArray: [Any]
    ) {
        self.track(EventObjectTypes(
            requiredObject: requiredObject,
            requiredObjectArray: requiredObjectArray
        ))
    }

    /**
    Event With All Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties)

    Event w all properties description

    Owner: Test codegen

    - Parameter requiredArray: Event 2 Property - Array
    - Parameter requiredBoolean: Event 2 Property - Boolean
    - Parameter requiredEnum: Event 2 Property - Enum
    - Parameter requiredInteger: Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
    - Parameter requiredNumber: Event 2 Property - Number
    - Parameter requiredString: Event 2 Property - String
    - Parameter optionalString: Event 2 Property - Optional String    *     * Examples:    * Some string, or another
    */
    public func eventWithAllProperties(
        requiredArray: [String],
        requiredBoolean: Bool,
        requiredEnum: EventWithAllProperties.RequiredEnum,
        requiredInteger: Int,
        requiredNumber: Double,
        requiredString: String,
        optionalString: String? = nil
    ) {
        self.track(EventWithAllProperties(
            requiredArray: requiredArray,
            requiredBoolean: requiredBoolean,
            requiredEnum: requiredEnum,
            requiredInteger: requiredInteger,
            requiredNumber: requiredNumber,
            requiredString: requiredString,
            optionalString: optionalString
        ))
    }

    /**
    Event With Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)

    Description for event with Array Types

    Owner: Test codegen

    - Parameter requiredBooleanArray: description for required boolean array
    - Parameter requiredEnumArray: Description for enum array property
    - Parameter requiredNumberArray: Description for required number array
    - Parameter requiredObjectArray: Description for required object array
    - Parameter requiredStringArray: description for required string array
    */
    public func eventWithArrayTypes(
        requiredBooleanArray: [Bool],
        requiredEnumArray: [String],
        requiredNumberArray: [Double],
        requiredObjectArray: [Any],
        requiredStringArray: [String]
    ) {
        self.track(EventWithArrayTypes(
            requiredBooleanArray: requiredBooleanArray,
            requiredEnumArray: requiredEnumArray,
            requiredNumberArray: requiredNumberArray,
            requiredObjectArray: requiredObjectArray,
            requiredStringArray: requiredStringArray
        ))
    }

    /**
    Event With Const Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)

    Description for event with const types

    Owner: Test codegen
    */
    public func eventWithConstTypes() {
        self.track(EventWithConstTypes())
    }

    /**
    Event With Enum Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types)

    Description for event with enum types

    Owner: Test codegen

    - Parameter requiredEnum: Description for optional enum
    - Parameter optionalEnum: Description for required enum
    */
    public func eventWithEnumTypes(
        requiredEnum: EventWithEnumTypes.RequiredEnum,
        optionalEnum: EventWithEnumTypes.OptionalEnum? = nil
    ) {
        self.track(EventWithEnumTypes(
            requiredEnum: requiredEnum,
            optionalEnum: optionalEnum
        ))
    }

    /**
    Event With Optional Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)

    Description for event with optional array types

    Owner: Test codegen

    - Parameter optionalBooleanArray: Description for optional boolean array
    - Parameter optionalEnumArray: Description for optional enum array
    - Parameter optionalJsonArray: Description for optional object array
    - Parameter optionalNumberArray: Description for optional number array
    - Parameter optionalStringArray: Description for optional string array
    */
    public func eventWithOptionalArrayTypes(
        optionalBooleanArray: [Bool]? = nil,
        optionalEnumArray: [String]? = nil,
        optionalJsonArray: [Any]? = nil,
        optionalNumberArray: [Double]? = nil,
        optionalStringArray: [String]? = nil
    ) {
        self.track(EventWithOptionalArrayTypes(
            optionalBooleanArray: optionalBooleanArray,
            optionalEnumArray: optionalEnumArray,
            optionalJsonArray: optionalJsonArray,
            optionalNumberArray: optionalNumberArray,
            optionalStringArray: optionalStringArray
        ))
    }

    /**
    Event With Optional Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)

    Event w optional properties description

    Owner: Test codegen

    - Parameter optionalArrayNumber: Property has no description provided in tracking plan.
    - Parameter optionalArrayString: Property has no description provided in tracking plan.
    - Parameter optionalBoolean: Property has no description provided in tracking plan.
    - Parameter optionalNumber: Property has no description provided in tracking plan.
    - Parameter optionalString: Optional String property description
    */
    public func eventWithOptionalProperties(
        optionalArrayNumber: [Double]? = nil,
        optionalArrayString: [String]? = nil,
        optionalBoolean: Bool? = nil,
        optionalNumber: Double? = nil,
        optionalString: String? = nil
    ) {
        self.track(EventWithOptionalProperties(
            optionalArrayNumber: optionalArrayNumber,
            optionalArrayString: optionalArrayString,
            optionalBoolean: optionalBoolean,
            optionalNumber: optionalNumber,
            optionalString: optionalString
        ))
    }

    /**
    Event With Template Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties)

    Event with template properties description

    Owner: Test codegen

    - Parameter requiredEventProperty: required_event_property description
    - Parameter requiredTemplateProperty: required_template_property description
    - Parameter optionalEventProperty: optional_event_property description
    - Parameter optionalTemplateProperty: optional_template_property description
    */
    public func eventWithTemplateProperties(
        requiredEventProperty: String,
        requiredTemplateProperty: String,
        optionalEventProperty: Double? = nil,
        optionalTemplateProperty: Double? = nil
    ) {
        self.track(EventWithTemplateProperties(
            requiredEventProperty: requiredEventProperty,
            requiredTemplateProperty: requiredTemplateProperty,
            optionalEventProperty: optionalEventProperty,
            optionalTemplateProperty: optionalTemplateProperty
        ))
    }

    /**
    event withDifferent_CasingTypes

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)

    Description for case with space

    Owner: Test codegen

    - Parameter enumWithSpace: Description for enum with space
    - Parameter enumSnakeCase: description_for_enum_snake_case
    - Parameter enumCamelCase: descriptionForEnumCamelCase
    - Parameter enumPascalCase: DescirptionForEnumPascalCase
    - Parameter propertyWithSpace: Description for case with space
    - Parameter propertyWithSnakeCase: Description_for_snake_case
    - Parameter propertyWithCamelCase: descriptionForCamelCase
    - Parameter propertyWithPascalCase: DescriptionForPascalCase
    */
    public func eventWithDifferentCasingTypes(
        enumWithSpace: EventWithDifferentCasingTypes.EnumWithSpace,
        enumSnakeCase: EventWithDifferentCasingTypes.EnumSnakeCase,
        enumCamelCase: EventWithDifferentCasingTypes.EnumCamelCase,
        enumPascalCase: EventWithDifferentCasingTypes.EnumPascalCase,
        propertyWithSpace: String,
        propertyWithSnakeCase: String,
        propertyWithCamelCase: String,
        propertyWithPascalCase: String
    ) {
        self.track(EventWithDifferentCasingTypes(
            enumWithSpace: enumWithSpace,
            enumSnakeCase: enumSnakeCase,
            enumCamelCase: enumCamelCase,
            enumPascalCase: enumPascalCase,
            propertyWithSpace: propertyWithSpace,
            propertyWithSnakeCase: propertyWithSnakeCase,
            propertyWithCamelCase: propertyWithCamelCase,
            propertyWithPascalCase: propertyWithPascalCase
        ))
    }

    /**
    EventMaxIntForTest

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest)

    Event to test schema validation

    Owner: Test codegen

    - Parameter intMax10: property to test schema validation
    */
    public func eventMaxIntForTest(
        intMax10: Int
    ) {
        self.track(EventMaxIntForTest(
            intMax10: intMax10
        ))
    }
    private func isInitializedAndEnabled() -> Bool {
        if !self.isLoaded {
            NSLog("Ampli is not yet initialized. Have you called `ampli.load()` on app start?")
            return false
        }
        return !self.disabled
    }

    private func getEventOptions(_ options: EventOptions?, _ overrideOptions: EventOptions?, _ overrideUserId: String? = nil) -> EventOptions {
        let dummyEvent = BaseEvent(eventType: "dummy")
        if let options {
            dummyEvent.mergeEventOptions(eventOptions: options)
        }
        if let overrideOptions {
            dummyEvent.mergeEventOptions(eventOptions: overrideOptions)
        }
        if let overrideUserId {
            dummyEvent.userId = overrideUserId
        }
        return dummyEvent
    }
}
