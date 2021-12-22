/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull swift-ampli'
 *
 * Required dependencies: Amplitude-iOS^8.6.0
 * Tracking Plan Version: 0
 * Build: 1.0.0
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/swift-ampli)
 */

import Foundation
import Amplitude

public typealias MiddlewareExtra = [String: Any]

public enum AmpliEnvironment: Int {
  case development, production;
}

let ApiKey: [AmpliEnvironment: String] = [
  .development: "",
  .production: ""
];

let AmpliObservePlan = AMPPlan()
                      .setBranch("main")
                      .setSource("swift-ampli")
                      .setVersion("0");

public class Event {
  var eventType: String
  var eventProperties: [String:Any]?

  init(eventType: String, eventProperties: [String:Any]?) {
      self.eventType = eventType;
      self.eventProperties = eventProperties;
  }
}

// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let eventProperties = try EventProperties(json)

import Foundation

// MARK: - EventProperties
public struct EventProperties {
    public let context: ContextProperties?
    public let eventMaxIntForTest: EventMaxIntForTestProperties?
    public let eventNoProperties: EventNoPropertiesProperties?
    public let eventObjectTypes: EventObjectTypesProperties?
    public let eventWithAllProperties: EventWithAllPropertiesProperties?
    public let eventWithArrayTypes: EventWithArrayTypesProperties?
    public let eventWithConstTypes: EventWithConstTypesProperties?
    public let eventWithDifferentCasingTypes: EventWithDifferentCasingTypesProperties?
    public let eventWithEnumTypes: EventWithEnumTypesProperties?
    public let eventWithOptionalArrayTypes: EventWithOptionalArrayTypesProperties?
    public let eventWithOptionalProperties: EventWithOptionalPropertiesProperties?
    public let group: GroupProperties?
    public let identify: IdentifyProperties?

    public init(context: ContextProperties?, eventMaxIntForTest: EventMaxIntForTestProperties?, eventNoProperties: EventNoPropertiesProperties?, eventObjectTypes: EventObjectTypesProperties?, eventWithAllProperties: EventWithAllPropertiesProperties?, eventWithArrayTypes: EventWithArrayTypesProperties?, eventWithConstTypes: EventWithConstTypesProperties?, eventWithDifferentCasingTypes: EventWithDifferentCasingTypesProperties?, eventWithEnumTypes: EventWithEnumTypesProperties?, eventWithOptionalArrayTypes: EventWithOptionalArrayTypesProperties?, eventWithOptionalProperties: EventWithOptionalPropertiesProperties?, group: GroupProperties?, identify: IdentifyProperties?) {
        self.context = context
        self.eventMaxIntForTest = eventMaxIntForTest
        self.eventNoProperties = eventNoProperties
        self.eventObjectTypes = eventObjectTypes
        self.eventWithAllProperties = eventWithAllProperties
        self.eventWithArrayTypes = eventWithArrayTypes
        self.eventWithConstTypes = eventWithConstTypes
        self.eventWithDifferentCasingTypes = eventWithDifferentCasingTypes
        self.eventWithEnumTypes = eventWithEnumTypes
        self.eventWithOptionalArrayTypes = eventWithOptionalArrayTypes
        self.eventWithOptionalProperties = eventWithOptionalProperties
        self.group = group
        self.identify = identify
    }
}

// MARK: - ContextProperties
public struct ContextProperties {

    public init() {
    }
}

/// Event to test schema validation
// MARK: - EventMaxIntForTestProperties
public struct EventMaxIntForTestProperties {
    /// property to test schema validation
    public let intMax10: Int

    public init(intMax10: Int) {
        self.intMax10 = intMax10
    }
}

/// Event w no properties description
// MARK: - EventNoPropertiesProperties
public struct EventNoPropertiesProperties {

    public init() {
    }
}

/// Event with Object and Object Array
// MARK: - EventObjectTypesProperties
public struct EventObjectTypesProperties {
    /// Property Object Type
    public let requiredObject: Any?
    /// Property Object Array Type
    public let requiredObjectArray: [Any?]

    public init(requiredObject: Any?, requiredObjectArray: [Any?]) {
        self.requiredObject = requiredObject
        self.requiredObjectArray = requiredObjectArray
    }
}

/// Event w all properties description
// MARK: - EventWithAllPropertiesProperties
public struct EventWithAllPropertiesProperties {
    /// Event 2 Property - Optional String    *     * Examples:    * Some string, or another
    public let optionalString: String?
    /// Event 2 Property - Array
    public let requiredArray: [String]
    /// Event 2 Property - Boolean
    public let requiredBoolean: Bool
    /// Event 2 Property - Enum
    public let requiredEnum: EventWithAllPropertiesRequiredEnum
    /// Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
    public let requiredInteger: Int
    /// Event 2 Property - Number
    public let requiredNumber: Double
    /// Event 2 Property - String
    public let requiredString: String

    public init(optionalString: String?, requiredArray: [String], requiredBoolean: Bool, requiredEnum: EventWithAllPropertiesRequiredEnum, requiredInteger: Int, requiredNumber: Double, requiredString: String) {
        self.optionalString = optionalString
        self.requiredArray = requiredArray
        self.requiredBoolean = requiredBoolean
        self.requiredEnum = requiredEnum
        self.requiredInteger = requiredInteger
        self.requiredNumber = requiredNumber
        self.requiredString = requiredString
    }
}

/// Event 2 Property - Enum
public enum EventWithAllPropertiesRequiredEnum {
    case enum1
    case enum2
}

/// Description for event with Array Types
// MARK: - EventWithArrayTypesProperties
public struct EventWithArrayTypesProperties {
    /// description for required boolean array
    public let requiredBooleanArray: [Bool]
    /// Description for required number array
    public let requiredNumberArray: [Double]
    /// Description for required object array
    public let requiredObjectArray: [Any?]
    /// description for required string array
    public let requiredStringArray: [String]

    public init(requiredBooleanArray: [Bool], requiredNumberArray: [Double], requiredObjectArray: [Any?], requiredStringArray: [String]) {
        self.requiredBooleanArray = requiredBooleanArray
        self.requiredNumberArray = requiredNumberArray
        self.requiredObjectArray = requiredObjectArray
        self.requiredStringArray = requiredStringArray
    }
}

/// Description for event with const types
// MARK: - EventWithConstTypesProperties
public struct EventWithConstTypesProperties {

    public init() {
    }
}

/// Description for case with space
// MARK: - EventWithDifferentCasingTypesProperties
public struct EventWithDifferentCasingTypesProperties {
    /// Description for enum with space
    public let enumWithSpace: EventWithDifferentCasingTypesEnumWithSpace
    /// description_for_enum_snake_case
    public let enumSnakeCase: EventWithDifferentCasingTypesEnumSnakeCase
    /// descriptionForEnumCamelCase
    public let enumCamelCase: EventWithDifferentCasingTypesEnumCamelCase
    /// DescirptionForEnumPascalCase
    public let enumPascalCase: EventWithDifferentCasingTypesEnumPascalCase
    /// Description for case with space
    public let propertyWithSpace: String
    /// Description_for_snake_case
    public let propertyWithSnakeCase: String
    /// descriptionForCamelCase
    public let propertyWithCamelCase: String
    /// DescriptionForPascalCase
    public let propertyWithPascalCase: String

    public init(enumWithSpace: EventWithDifferentCasingTypesEnumWithSpace, enumSnakeCase: EventWithDifferentCasingTypesEnumSnakeCase, enumCamelCase: EventWithDifferentCasingTypesEnumCamelCase, enumPascalCase: EventWithDifferentCasingTypesEnumPascalCase, propertyWithSpace: String, propertyWithSnakeCase: String, propertyWithCamelCase: String, propertyWithPascalCase: String) {
        self.enumWithSpace = enumWithSpace
        self.enumSnakeCase = enumSnakeCase
        self.enumCamelCase = enumCamelCase
        self.enumPascalCase = enumPascalCase
        self.propertyWithSpace = propertyWithSpace
        self.propertyWithSnakeCase = propertyWithSnakeCase
        self.propertyWithCamelCase = propertyWithCamelCase
        self.propertyWithPascalCase = propertyWithPascalCase
    }
}

/// descriptionForEnumCamelCase
public enum EventWithDifferentCasingTypesEnumCamelCase {
    case enumCamelCase
}

/// DescirptionForEnumPascalCase
public enum EventWithDifferentCasingTypesEnumPascalCase {
    case enumPascalCase
}

/// description_for_enum_snake_case
public enum EventWithDifferentCasingTypesEnumSnakeCase {
    case enumSnakeCase
}

/// Description for enum with space
public enum EventWithDifferentCasingTypesEnumWithSpace {
    case enumWithSpace
}

/// Description for event with enum types
// MARK: - EventWithEnumTypesProperties
public struct EventWithEnumTypesProperties {
    /// Description for required enum
    public let optionalEnum: EventWithEnumTypesOptionalEnum?
    /// Description for optional enum
    public let requiredEnum: EventWithEnumTypesRequiredEnum

    public init(optionalEnum: EventWithEnumTypesOptionalEnum?, requiredEnum: EventWithEnumTypesRequiredEnum) {
        self.optionalEnum = optionalEnum
        self.requiredEnum = requiredEnum
    }
}

/// Description for required enum
public enum EventWithEnumTypesOptionalEnum {
    case optionalEnum1
    case optionalEnum2
}

/// Description for optional enum
public enum EventWithEnumTypesRequiredEnum {
    case requiredEnum1
    case requiredEnum2
}

/// Description for event with optional array types
// MARK: - EventWithOptionalArrayTypesProperties
public struct EventWithOptionalArrayTypesProperties {
    /// Description for optional boolean array
    public let optionalBooleanArray: [Bool]?
    /// Description for optional object array
    public let optionalJsonArray: [Any?]?
    /// Description for optional number array
    public let optionalNumberArray: [Double]?
    /// Description for optional string array
    public let optionalStringArray: [String]?

    public init(optionalBooleanArray: [Bool]?, optionalJsonArray: [Any?]?, optionalNumberArray: [Double]?, optionalStringArray: [String]?) {
        self.optionalBooleanArray = optionalBooleanArray
        self.optionalJsonArray = optionalJsonArray
        self.optionalNumberArray = optionalNumberArray
        self.optionalStringArray = optionalStringArray
    }
}

/// Event w optional properties description
// MARK: - EventWithOptionalPropertiesProperties
public struct EventWithOptionalPropertiesProperties {
    public let optionalArrayNumber: [Double]?
    public let optionalArrayString: [String]?
    public let optionalBoolean: Bool?
    public let optionalNumber: Double?
    /// Optional String property description
    public let optionalString: String?

    public init(optionalArrayNumber: [Double]?, optionalArrayString: [String]?, optionalBoolean: Bool?, optionalNumber: Double?, optionalString: String?) {
        self.optionalArrayNumber = optionalArrayNumber
        self.optionalArrayString = optionalArrayString
        self.optionalBoolean = optionalBoolean
        self.optionalNumber = optionalNumber
        self.optionalString = optionalString
    }
}

// MARK: - GroupProperties
public struct GroupProperties {
    /// Description for group optionalString
    public let optionalString: String?
    /// Description for group requiredBoolean
    public let requiredBoolean: Bool

    public init(optionalString: String?, requiredBoolean: Bool) {
        self.optionalString = optionalString
        self.requiredBoolean = requiredBoolean
    }
}

// MARK: - IdentifyProperties
public struct IdentifyProperties {
    /// Description for identify optionalArray
    public let optionalArray: [String]?
    /// Description for identify requiredNumber
    public let requiredNumber: Double

    public init(optionalArray: [String]?, requiredNumber: Double) {
        self.optionalArray = optionalArray
        self.requiredNumber = requiredNumber
    }
}

public class Context : Event {
  public init() {
    super.init(
      eventType: "Context",
      eventProperties: nil
    );
  }
}

public class Identify : Event {
  public init(
    _ eventProperties: IdentifyProperties
  ) {
    let propertyDict: [String: Any] = [
      "optionalArray": eventProperties.optionalArray as Any,
      "requiredNumber": eventProperties.requiredNumber
    ];
    super.init(
      eventType: "Identify",
      eventProperties: propertyDict
    );
  }
}

public class Group : Event {
  public init(
    _ eventProperties: GroupProperties
  ) {
    let propertyDict: [String: Any] = [
      "optionalString": eventProperties.optionalString as Any,
      "requiredBoolean": eventProperties.requiredBoolean
    ];
    super.init(
      eventType: "Group",
      eventProperties: propertyDict
    );
  }
}

public class EventMaxIntForTest : Event {
  public init(
    _ eventProperties: EventMaxIntForTestProperties
  ) {
    let propertyDict: [String: Any] = [
      "intMax10": eventProperties.intMax10
    ];
    super.init(
      eventType: "EventMaxIntForTest",
      eventProperties: propertyDict
    );
  }
}

public class EventNoProperties : Event {
  public init() {
    super.init(
      eventType: "Event No Properties",
      eventProperties: nil
    );
  }
}

public class EventObjectTypes : Event {
  public init(
    _ eventProperties: EventObjectTypesProperties
  ) {
    let propertyDict: [String: Any] = [
      "requiredObject": eventProperties.requiredObject,
      "requiredObjectArray": eventProperties.requiredObjectArray
    ];
    super.init(
      eventType: "Event Object Types",
      eventProperties: propertyDict
    );
  }
}

public class EventWithAllProperties : Event {
  public init(
    _ eventProperties: EventWithAllPropertiesProperties
  ) {
    let propertyDict: [String: Any] = [
      "requiredConst": "some-const-value",
      "optionalString": eventProperties.optionalString as Any,
      "requiredArray": eventProperties.requiredArray,
      "requiredBoolean": eventProperties.requiredBoolean,
      "requiredEnum": eventProperties.requiredEnum,
      "requiredInteger": eventProperties.requiredInteger,
      "requiredNumber": eventProperties.requiredNumber,
      "requiredString": eventProperties.requiredString
    ];
    super.init(
      eventType: "Event With All Properties",
      eventProperties: propertyDict
    );
  }
}

public class EventWithArrayTypes : Event {
  public init(
    _ eventProperties: EventWithArrayTypesProperties
  ) {
    let propertyDict: [String: Any] = [
      "requiredBooleanArray": eventProperties.requiredBooleanArray,
      "requiredNumberArray": eventProperties.requiredNumberArray,
      "requiredObjectArray": eventProperties.requiredObjectArray,
      "requiredStringArray": eventProperties.requiredStringArray
    ];
    super.init(
      eventType: "Event With Array Types",
      eventProperties: propertyDict
    );
  }
}

public class EventWithConstTypes : Event {
  public init() {
    let propertyDict: [String: Any] = [
      "Boolean Const": true,
      "Integer Const": 10,
      "Number Const": 2.2,
      "String Const": "String-Constant",
      "String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
      "String Int Const": 0
    ];
    super.init(
      eventType: "Event With Const Types",
      eventProperties: propertyDict
    );
  }
}

public class EventWithDifferentCasingTypes : Event {
  public init(
    _ eventProperties: EventWithDifferentCasingTypesProperties
  ) {
    let propertyDict: [String: Any] = [
      "enumCamelCase": eventProperties.enumCamelCase,
      "EnumPascalCase": eventProperties.enumPascalCase,
      "enum_snake_case": eventProperties.enumSnakeCase,
      "enum with space": eventProperties.enumWithSpace,
      "propertyWithCamelCase": eventProperties.propertyWithCamelCase,
      "PropertyWithPascalCase": eventProperties.propertyWithPascalCase,
      "property_with_snake_case": eventProperties.propertyWithSnakeCase,
      "property with space": eventProperties.propertyWithSpace
    ];
    super.init(
      eventType: "event withDifferent_CasingTypes",
      eventProperties: propertyDict
    );
  }
}

public class EventWithEnumTypes : Event {
  public init(
    _ eventProperties: EventWithEnumTypesProperties
  ) {
    let propertyDict: [String: Any] = [
      "optional enum": eventProperties.optionalEnum as Any,
      "required enum": eventProperties.requiredEnum
    ];
    super.init(
      eventType: "Event With Enum Types",
      eventProperties: propertyDict
    );
  }
}

public class EventWithOptionalArrayTypes : Event {
  public init(
    _ eventProperties: EventWithOptionalArrayTypesProperties
  ) {
    let propertyDict: [String: Any] = [
      "optionalBooleanArray": eventProperties.optionalBooleanArray as Any,
      "optionalJSONArray": eventProperties.optionalJsonArray as Any,
      "optionalNumberArray": eventProperties.optionalNumberArray as Any,
      "optionalStringArray": eventProperties.optionalStringArray as Any
    ];
    super.init(
      eventType: "Event With Optional Array Types",
      eventProperties: propertyDict
    );
  }
}

public class EventWithOptionalProperties : Event {
  public init(
    _ eventProperties: EventWithOptionalPropertiesProperties
  ) {
    let propertyDict: [String: Any] = [
      "optionalArrayNumber": eventProperties.optionalArrayNumber as Any,
      "optionalArrayString": eventProperties.optionalArrayString as Any,
      "optionalBoolean": eventProperties.optionalBoolean as Any,
      "optionalNumber": eventProperties.optionalNumber as Any,
      "optionalString": eventProperties.optionalString as Any
    ];
    super.init(
      eventType: "Event With Optional Properties",
      eventProperties: propertyDict
    );
  }
}
public struct LoadClientConfig {
  let plan: AMPPlan?

  public init(plan: AMPPlan? = nil) {
      self.plan = plan
  }
}

public struct LoadClientOptions {
  let apiKey: String?
  let instance: Amplitude?
  let config: LoadClientConfig?

  public init(apiKey: String? = nil, instance: Amplitude? = nil, config: LoadClientConfig? = nil) {
    self.apiKey = apiKey
    self.instance = instance
    self.config = config
  }
}

public struct LoadOptions {
  let environment: AmpliEnvironment?
  let disabled: Bool?
  let client: LoadClientOptions?

  public init(environment: AmpliEnvironment? = nil, disabled: Bool? = nil, client: LoadClientOptions? = nil) {
    self.environment = environment
    self.disabled = disabled
    self.client = client
  }
}

public struct EventOptions {
  let deviceId: String?
  let userId: String?

  public init(deviceId: String? = nil, userId: String? = nil) {
      self.deviceId = deviceId;
      self.userId = userId;
  }
}

public class Ampli {
  public private(set) var amplitude: Amplitude?;
  public private(set) var disabled: Bool;

  public static let instance: Ampli = Ampli()

  public init() {
      disabled = false;
  }

  public func load(options: LoadOptions? = nil) -> Void {
    self.disabled = options?.disabled ?? false;
    if (self.amplitude != nil) {
        NSLog("Warning: Ampli is already initialized. Ampli.instance.load() should be called once at application start up.");
        return;
    }
    let env = options?.environment ?? AmpliEnvironment.development;
    let apiKey = options?.client?.apiKey ?? ApiKey[env];

    if (options?.client?.instance != nil) {
        self.amplitude = options?.client?.instance;
    } else if (apiKey != nil) {
        self.amplitude = Amplitude.instance();
        self.amplitude?.initializeApiKey(apiKey!);
    } else {
        NSLog("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
        return;
    }

    self.amplitude?.setPlan(options?.client?.config?.plan ?? AmpliObservePlan!);
}

  public func track(_ event: Event, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) -> Void {
    if (!isInitializedAndEnabled()) {
        return;
    }
    amplitude?.logEvent(event.eventType, withEventProperties: event.eventProperties, withMiddlewareExtra: extra as? NSMutableDictionary);
  }

  public func identify(userId: String?, properties: IdentifyProperties?, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) -> Void {
      if (!isInitializedAndEnabled()) {
          return;
      }
      let user = userId ?? options?.userId
      if (user != nil) {
          amplitude?.setUserId(user);
      }
      if (options?.deviceId != nil) {
          amplitude?.setDeviceId((options?.deviceId)!);
      }
      let identifyArgs = AMPIdentify()
      let propertyDict: [String: Any] = [
        "optionalArray": properties?.optionalArray as Any,
        "requiredNumber": properties?.requiredNumber as Any
      ];

      propertyDict.forEach{ key, value in
          identifyArgs.set(key, value: value as? NSObject)
      }

      amplitude?.identify(identifyArgs)
  }

  public func flush() -> Void {
      if (!isInitializedAndEnabled()) {
          return;
      }
      amplitude?.uploadEvents();
  }

  /**
  EventMaxIntForTest

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)

  Event to test schema validation

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventMaxIntForTest(_ properties: EventMaxIntForTestProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventMaxIntForTest(properties), extra: extra);
  }

  /**
  Event No Properties

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)

  Event w no properties description

  Owner: Test codegen

  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventNoProperties(options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventNoProperties(), extra: extra);
  }

  /**
  Event Object Types

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)

  Event with Object and Object Array

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventObjectTypes(_ properties: EventObjectTypesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventObjectTypes(properties), extra: extra);
  }

  /**
  Event With All Properties

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)

  Event w all properties description

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithAllProperties(_ properties: EventWithAllPropertiesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithAllProperties(properties), extra: extra);
  }

  /**
  Event With Array Types

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)

  Description for event with Array Types

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithArrayTypes(_ properties: EventWithArrayTypesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithArrayTypes(properties), extra: extra);
  }

  /**
  Event With Const Types

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)

  Description for event with const types

  Owner: Test codegen

  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithConstTypes(options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithConstTypes(), extra: extra);
  }

  /**
  event withDifferent_CasingTypes

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)

  Description for case with space

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithDifferentCasingTypes(_ properties: EventWithDifferentCasingTypesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithDifferentCasingTypes(properties), extra: extra);
  }

  /**
  Event With Enum Types

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)

  Description for event with enum types

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithEnumTypes(_ properties: EventWithEnumTypesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithEnumTypes(properties), extra: extra);
  }

  /**
  Event With Optional Array Types

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)

  Description for event with optional array types

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithOptionalArrayTypes(_ properties: EventWithOptionalArrayTypesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithOptionalArrayTypes(properties), extra: extra);
  }

  /**
  Event With Optional Properties

  [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)

  Event w optional properties description

  Owner: Test codegen

  - Parameter properties The event's properties
  - Parameter extra Extra untyped parameters for use in middleware.
  */
  public func eventWithOptionalProperties(_ properties: EventWithOptionalPropertiesProperties, options: EventOptions? = nil, extra: MiddlewareExtra? = nil) {
      self.handleEventOptions(options: options);
      self.track(EventWithOptionalProperties(properties), extra: extra);
  }
  private func isInitializedAndEnabled() -> Bool {
    if (self.amplitude == nil) {
        NSLog("Ampli is not yet initialized. Have you called `ampli.load()` on app start?");
        return false;
    }
    return !self.disabled;
  }

  private func handleEventOptions(options: EventOptions? = nil) {
    if (options?.userId != nil) {
        amplitude?.setUserId(options?.userId);
    }
    if (options?.deviceId != nil) {
        amplitude?.setDeviceId((options?.deviceId)!);
    }
  }
}
