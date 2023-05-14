/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull node-ts-ampli-v2'
 *
 * Required dependencies: @amplitude/analytics-node@^1.0.0
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: node.js:typescript-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/node-ts-ampli-v2)
 */

import * as amplitude from '@amplitude/analytics-node';

export type NodeClient = amplitude.Types.NodeClient;
export type BaseEvent = amplitude.Types.BaseEvent;
export type Event = amplitude.Types.Event;
export type EventOptions = amplitude.Types.EventOptions;
export type Result = amplitude.Types.Result;
export type NodeOptions = amplitude.Types.NodeOptions;

export type Environment = 'prod' | 'dev';

export const ApiKey: Record<Environment, string> = {
  prod: '',
  dev: ''
};

/**
* Default Amplitude configuration options. Contains tracking plan information.
*/
export const DefaultConfiguration: NodeOptions = {
  plan: {
    version: '1',
    branch: 'main',
    source: 'node-ts-ampli-v2',
    versionId: 'a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'node.js-typescript-ampli',
      sourceVersion: '2.0.0'
    }
  }
};

export interface LoadOptionsBase { disabled?: boolean }

export type LoadOptionsWithEnvironment = LoadOptionsBase & { environment: Environment; client?: { configuration?: NodeOptions; }; };
export type LoadOptionsWithApiKey = LoadOptionsBase & { client: { apiKey: string; configuration?: NodeOptions; } };
export type LoadOptionsWithClientInstance = LoadOptionsBase & { client: { instance: NodeClient; } };

export type LoadOptions = LoadOptionsWithEnvironment | LoadOptionsWithApiKey | LoadOptionsWithClientInstance;

export interface IdentifyProperties {
  /**
   * Description for identify optionalArray
   *
   * | Rule | Value |
   * |---|---|
   * | Unique Items | false |
   * | Item Type | string |
   */
  optionalArray?: string[];
  /**
   * Description for identify requiredNumber
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  requiredNumber: number;
}

export interface EventObjectTypesProperties {
  /**
   * Property Object Type
   */
  requiredObject: any;
  /**
   * Property Object Array Type
   */
  requiredObjectArray: any[];
}

export interface EventWithAllPropertiesProperties {
  /**
   * Event 2 Property - Optional String    *     * Examples:    * Some string, or another
   */
  optionalString?: string;
  /**
   * Event 2 Property - Array
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 0 |
   * | Item Type | string |
   *
   * @minItems 0
   */
  requiredArray: string[];
  /**
   * Event 2 Property - Boolean
   */
  requiredBoolean: boolean;
  /**
   * Event 2 Property - Enum
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | Enum1, Enum2 |
   */
  requiredEnum: "Enum1" | "Enum2";
  /**
   * Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  requiredInteger: number;
  /**
   * Event 2 Property - Number
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  requiredNumber: number;
  /**
   * Event 2 Property - String
   */
  requiredString: string;
}

export interface EventWithArrayTypesProperties {
  /**
   * description for required boolean array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | boolean |
   */
  requiredBooleanArray: boolean[];
  /**
   * Description for enum array property
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  requiredEnumArray: ("enum1" | "enum2")[];
  /**
   * Description for required number array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | number |
   */
  requiredNumberArray: number[];
  /**
   * Description for required object array
   */
  requiredObjectArray: any[];
  /**
   * description for required string array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  requiredStringArray: string[];
}

export interface EventWithEnumTypesProperties {
  /**
   * Description for required enum
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | optional enum 1, optional enum 2 |
   */
  "optional enum"?: "optional enum 1" | "optional enum 2";
  /**
   * Description for optional enum
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | required enum 1, required enum 2 |
   */
  "required enum": "required enum 1" | "required enum 2";
}

export interface EventWithOptionalArrayTypesProperties {
  /**
   * Description for optional boolean array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | boolean |
   */
  optionalBooleanArray?: boolean[];
  /**
   * Description for optional enum array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  optionalEnumArray?: ("enum1" | "enum2")[];
  /**
   * Description for optional object array
   */
  optionalJSONArray?: any[];
  /**
   * Description for optional number array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | number |
   */
  optionalNumberArray?: number[];
  /**
   * Description for optional string array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  optionalStringArray?: string[];
}

export interface EventWithOptionalPropertiesProperties {
  /**
   * | Rule | Value |
   * |---|---|
   * | Item Type | number |
   */
  optionalArrayNumber?: number[];
  /**
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  optionalArrayString?: string[];
  optionalBoolean?: boolean;
  /**
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  optionalNumber?: number;
  /**
   * Optional String property description
   */
  optionalString?: string;
}

export interface EventWithTemplatePropertiesProperties {
  /**
   * optional_event_property description
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  optional_event_property?: number;
  /**
   * optional_template_property description
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  optional_template_property?: number;
  /**
   * required_event_property description
   */
  required_event_property: string;
  /**
   * required_template_property description
   */
  required_template_property: string;
}

export interface EventWithDifferentCasingTypesProperties {
  /**
   * Description for enum with space
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | enum with space |
   */
  "enum with space": "enum with space";
  /**
   * description_for_enum_snake_case
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | enum_snake_case |
   */
  enum_snake_case: "enum_snake_case";
  /**
   * descriptionForEnumCamelCase
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | enumCamelCase |
   */
  enumCamelCase: "enumCamelCase";
  /**
   * DescirptionForEnumPascalCase
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | EnumPascalCase |
   */
  EnumPascalCase: "EnumPascalCase";
  /**
   * Description for case with space
   */
  "property with space": string;
  /**
   * Description_for_snake_case
   */
  property_with_snake_case: string;
  /**
   * descriptionForCamelCase
   */
  propertyWithCamelCase: string;
  /**
   * DescriptionForPascalCase
   */
  PropertyWithPascalCase: string;
}

export interface EventMaxIntForTestProperties {
  /**
   * property to test schema validation
   *
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   * | Max Value | 10 |
   */
  intMax10: number;
}

export interface EventTemplateProperties {
  /**
   * optional_template_property description
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  optional_template_property?: number;
  /**
   * required_template_property description
   */
  required_template_property: string;
}

export interface SourceTemplateProperties {
  /**
   * description for context optionalEnum
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | Value 1, Value 2 |
   */
  optionalEnum?: "Value 1" | "Value 2";
  /**
   * description for context requiredString
   */
  requiredString: string;
}

export class Identify implements BaseEvent {
  event_type = 'Identify';

  constructor(
    public event_properties: IdentifyProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventNoProperties implements BaseEvent {
  event_type = 'Event No Properties';
}

export class EventObjectTypes implements BaseEvent {
  event_type = 'Event Object Types';

  constructor(
    public event_properties: EventObjectTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithAllProperties implements BaseEvent {
  event_type = 'Event With All Properties';
  event_properties: EventWithAllPropertiesProperties & {
    'requiredConst': "some-const-value";
  };

  constructor(
    event_properties: EventWithAllPropertiesProperties,
  ) {
    this.event_properties = {
      ...event_properties,
      'requiredConst': "some-const-value",
    };
  }
}

export class EventWithArrayTypes implements BaseEvent {
  event_type = 'Event With Array Types';

  constructor(
    public event_properties: EventWithArrayTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithConstTypes implements BaseEvent {
  event_type = 'Event With Const Types';
  event_properties = {
    'Boolean Const': true,
    'Integer Const': 10,
    'Number Const': 2.2,
    'String Const': "String-Constant",
    'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
    'String Int Const': 0,
  };
}

export class EventWithEnumTypes implements BaseEvent {
  event_type = 'Event With Enum Types';

  constructor(
    public event_properties: EventWithEnumTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithOptionalArrayTypes implements BaseEvent {
  event_type = 'Event With Optional Array Types';

  constructor(
    public event_properties?: EventWithOptionalArrayTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithOptionalProperties implements BaseEvent {
  event_type = 'Event With Optional Properties';

  constructor(
    public event_properties?: EventWithOptionalPropertiesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithTemplateProperties implements BaseEvent {
  event_type = 'Event With Template Properties';

  constructor(
    public event_properties: EventWithTemplatePropertiesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventWithDifferentCasingTypes implements BaseEvent {
  event_type = 'event withDifferent_CasingTypes';

  constructor(
    public event_properties: EventWithDifferentCasingTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class EventMaxIntForTest implements BaseEvent {
  event_type = 'EventMaxIntForTest';

  constructor(
    public event_properties: EventMaxIntForTestProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export type PromiseResult<T> = { promise: Promise<T | void> };

const getVoidPromiseResult = () => ({ promise: Promise.resolve() });

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude?: NodeClient;

  get client(): NodeClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.amplitude) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   *
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options: LoadOptions): PromiseResult<void> {
    this.disabled = options.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already initialized. Ampli.load() should be called once at application startup.');
      return getVoidPromiseResult();
    }

    let apiKey: string | null = null;
    if (options.client && 'apiKey' in options.client) {
      apiKey = options.client.apiKey;
    } else if ('environment' in options) {
      apiKey = ApiKey[options.environment];
    }

    if (options.client && 'instance' in options.client) {
      this.amplitude = options.client.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.createInstance();
      return this.amplitude.init(apiKey, { ...DefaultConfiguration, ...options.client?.configuration });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }

    return getVoidPromiseResult();
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId The user's id.
   * @param properties The user properties.
   * @param options Optional event options.
   */
  identify(
    userId: string | undefined,
    properties: IdentifyProperties,
    options?: EventOptions,
  ): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = {...options,  user_id: userId};
    }

    const amplitudeIdentify = new amplitude.Identify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        amplitudeIdentify.set(key, value);
      }
    }

    return this.amplitude!.identify(amplitudeIdentify, options);
  }

  /**
   * Track event
   *
   * @param userId The user's id.
   * @param event The event to track.
   * @param options Optional event options.
   */
  track(userId: string | undefined, event: Event, options?: EventOptions): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = {...options,  user_id: userId};
    }

    return this.amplitude!.track(event, undefined, options);
  }

  flush(): PromiseResult<void> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.flush();
  }

  /**
   * Event No Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)
   *
   * Event w no properties description
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param options Amplitude event options.
   */
  eventNoProperties(
    userId: string | undefined,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventNoProperties(), options);
  }

  /**
   * Event Object Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types)
   *
   * Event with Object and Object Array
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. requiredObject)
   * @param options Amplitude event options.
   */
  eventObjectTypes(
    userId: string | undefined,
    properties: EventObjectTypesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventObjectTypes(properties), options);
  }

  /**
   * Event With All Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties)
   *
   * Event w all properties description
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. optionalString)
   * @param options Amplitude event options.
   */
  eventWithAllProperties(
    userId: string | undefined,
    properties: EventWithAllPropertiesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithAllProperties(properties), options);
  }

  /**
   * Event With Array Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)
   *
   * Description for event with Array Types
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. requiredBooleanArray)
   * @param options Amplitude event options.
   */
  eventWithArrayTypes(
    userId: string | undefined,
    properties: EventWithArrayTypesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithArrayTypes(properties), options);
  }

  /**
   * Event With Const Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)
   *
   * Description for event with const types
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param options Amplitude event options.
   */
  eventWithConstTypes(
    userId: string | undefined,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithConstTypes(), options);
  }

  /**
   * Event With Enum Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types)
   *
   * Description for event with enum types
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. optional enum)
   * @param options Amplitude event options.
   */
  eventWithEnumTypes(
    userId: string | undefined,
    properties: EventWithEnumTypesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithEnumTypes(properties), options);
  }

  /**
   * Event With Optional Array Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)
   *
   * Description for event with optional array types
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. optionalBooleanArray)
   * @param options Amplitude event options.
   */
  eventWithOptionalArrayTypes(
    userId: string | undefined,
    properties?: EventWithOptionalArrayTypesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithOptionalArrayTypes(properties), options);
  }

  /**
   * Event With Optional Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)
   *
   * Event w optional properties description
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. optionalArrayNumber)
   * @param options Amplitude event options.
   */
  eventWithOptionalProperties(
    userId: string | undefined,
    properties?: EventWithOptionalPropertiesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithOptionalProperties(properties), options);
  }

  /**
   * Event With Template Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties)
   *
   * Event with template properties description
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. optional_event_property)
   * @param options Amplitude event options.
   */
  eventWithTemplateProperties(
    userId: string | undefined,
    properties: EventWithTemplatePropertiesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithTemplateProperties(properties), options);
  }

  /**
   * event withDifferent_CasingTypes
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)
   *
   * Description for case with space
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. enum with space)
   * @param options Amplitude event options.
   */
  eventWithDifferentCasingTypes(
    userId: string | undefined,
    properties: EventWithDifferentCasingTypesProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventWithDifferentCasingTypes(properties), options);
  }

  /**
   * EventMaxIntForTest
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest)
   *
   * Event to test schema validation
   *
   * Owner: Test codegen
   *
   * @param userId The user's ID.
   * @param properties The event's properties (e.g. intMax10)
   * @param options Amplitude event options.
   */
  eventMaxIntForTest(
    userId: string | undefined,
    properties: EventMaxIntForTestProperties,
    options?: EventOptions,
  ) {
    return this.track(userId, new EventMaxIntForTest(properties), options);
  }
}

export const ampli = new Ampli();
