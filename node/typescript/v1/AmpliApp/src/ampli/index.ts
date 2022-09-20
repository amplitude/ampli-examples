/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull node-ts-ampli'
 *
 * Required dependencies: @amplitude/node@^1.10.0
 * Tracking Plan Version: 0
 * Build: 1.0.0
 * Runtime: node.js:typescript-ampli
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/node-ts-ampli)
 */

import { Identify as AmplitudeIdentify } from '@amplitude/identify';
import { init as initNodeClient, NodeClient, Response, Status } from '@amplitude/node';
import {
  BaseEvent, Event, EventOptions, GroupOptions, IdentifyEvent, IdentifyOptions, Options, MiddlewareExtra,
} from '@amplitude/types';

export type Environment = 'development' | 'production';

export const ApiKey: Record<Environment, string> = {
  development: '',
  production: ''
};

/**
* Default NodeClient Options. Contains tracking plan information.
*/
export const DefaultOptions: Partial<Options> = {
  plan: {
    version: '0',
    branch: 'main',
    source: 'node-ts-ampli',
    versionId: '79154a50-f057-4db5-9755-775e4e9f05e6'
  },
  ...{
    ingestionMetadata: {
      source_name: 'node.js-typescript-ampli',
      source_version: '1.0.0'
    }
  }
};

export interface LoadOptions {
  environment?: Environment;
  disabled?: boolean;
  client?: {
    apiKey?: string;
    options?: Partial<Options>;
    instance?: NodeClient;
  }
}

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

export interface GroupProperties {
  /**
   * Description for group optionalString
   */
  optionalString?: string;
  /**
   * Description for group requiredBoolean
   */
  requiredBoolean: boolean;
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

export interface EventObjectTypesProperties {
  /**
   * Property Object Type
   */
  requiredObject: {
    [k: string]: any;
  };
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

export interface EventWithDifferentCasingTypesProperties {
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
   * description_for_enum_snake_case
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | enum_snake_case |
   */
  enum_snake_case: "enum_snake_case";
  /**
   * Description for enum with space
   *
   * | Rule | Value |
   * |---|---|
   * | Enum Values | enum with space |
   */
  "enum with space": "enum with space";
  /**
   * descriptionForCamelCase
   */
  propertyWithCamelCase: string;
  /**
   * DescriptionForPascalCase
   */
  PropertyWithPascalCase: string;
  /**
   * Description_for_snake_case
   */
  property_with_snake_case: string;
  /**
   * Description for case with space
   */
  "property with space": string;
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

export class Group implements BaseEvent {
  event_type = 'Group';

  constructor(
    public event_properties: GroupProperties,
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

export class EventWithDifferentCasingTypes implements BaseEvent {
  event_type = 'event withDifferent_CasingTypes';

  constructor(
    public event_properties: EventWithDifferentCasingTypesProperties,
  ) {
    this.event_properties = event_properties;
  }
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

const getDefaultPromiseResponse = () => Promise.resolve<Response>({
  status: Status.Skipped,
  statusCode: 200,
});

function getIdentifyEvent(amplitudeIdentify: AmplitudeIdentify, userId?: string, deviceId?: string): IdentifyEvent {
  const identifyEvent = amplitudeIdentify.identifyUser('tmp-user-id-to-pass-validation');
  identifyEvent.user_id = userId;
  identifyEvent.device_id = deviceId;

  return identifyEvent;
}

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude: NodeClient | undefined;

  get client(): NodeClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.isLoaded) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options?: LoadOptions): void {
    this.disabled = options?.disabled ?? false;

    if (this.isLoaded) {
      console.warn('WARNING: Ampli is already initialized. Ampli.load() should be called once at application startup.');
      return;
    }

    const env = options?.environment ?? 'development';
    const apiKey = options?.client?.apiKey || ApiKey[env];
    if (options?.client?.instance) {
      this.amplitude = options?.client?.instance;
    } else if (apiKey) {
      this.amplitude = initNodeClient(apiKey, { ...DefaultOptions, ...options?.client?.options });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }
  }

  identify(
    userId: string | undefined,
    properties: IdentifyProperties,
    options?: IdentifyOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        if (value !== undefined) {
          identify.set(key, value);
        }
      }
    }
    const identifyEvent = getIdentifyEvent(identify, userId || options?.user_id, options?.device_id);
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  setGroup(
    userId: string | undefined,
    name: string,
    value: string,
    options?: GroupOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify().setGroup(name, value);
    const identifyEvent = getIdentifyEvent(identify, userId || options?.user_id, options?.device_id);
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  groupIdentify(
    groupType: string,
    groupName: string,
    properties: GroupProperties,
    options?: GroupOptions,
    extra?: MiddlewareExtra,
  ) {
    const identify = new AmplitudeIdentify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        if (value !== undefined) {
          identify.set(key, value);
        }
      }
    }
    const groupIdentifyEvent = identify.identifyGroup(groupType, groupName);

    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...groupIdentifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  track(userId: string | undefined, event: Event, options?: EventOptions, extra?: MiddlewareExtra) {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.logEvent({ ...options, ...event,  user_id: userId }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  flush() {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude!.flush()
      : getDefaultPromiseResponse();

    return { promise };
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventMaxIntForTest(
    userId: string | undefined,
    properties: EventMaxIntForTestProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventMaxIntForTest(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventNoProperties(
    userId: string | undefined,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventNoProperties(), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventObjectTypes(
    userId: string | undefined,
    properties: EventObjectTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventObjectTypes(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithAllProperties(
    userId: string | undefined,
    properties: EventWithAllPropertiesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithAllProperties(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithArrayTypes(
    userId: string | undefined,
    properties: EventWithArrayTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithArrayTypes(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithConstTypes(
    userId: string | undefined,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithConstTypes(), options, extra);
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
   * @param properties The event's properties (e.g. enumCamelCase)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithDifferentCasingTypes(
    userId: string | undefined,
    properties: EventWithDifferentCasingTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithDifferentCasingTypes(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithEnumTypes(
    userId: string | undefined,
    properties: EventWithEnumTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithEnumTypes(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithOptionalArrayTypes(
    userId: string | undefined,
    properties?: EventWithOptionalArrayTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithOptionalArrayTypes(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithOptionalProperties(
    userId: string | undefined,
    properties?: EventWithOptionalPropertiesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithOptionalProperties(properties), options, extra);
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
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithTemplateProperties(
    userId: string | undefined,
    properties: EventWithTemplatePropertiesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(userId, new EventWithTemplateProperties(properties), options, extra);
  }
}

/**
 * Export 'ampli' the default instance of Ampli.
 *
 * More instances can be created with 'const a = new Ampli()'
 */
export const ampli = new Ampli();
