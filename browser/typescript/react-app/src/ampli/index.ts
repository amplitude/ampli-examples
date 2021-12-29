/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull browser-ts-ampli'
 *
 * Required dependencies: amplitude-js
 * Tracking Plan Version: 0
 * Build: 1.0.0
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/browser-ts-ampli)
 */

import amplitude, { AmplitudeClient, Callback, Config, Identify as AmplitudeIdentify } from 'amplitude-js';

export enum Environment {
  development = 'development',
  production = 'production'
}

export const ApiKey: Record<Environment, string> = {
  development: '',
  production: ''
};

/**
 * Default Amplitude Config. Contains tracking plan information.
 */
export const DefaultConfig: ConfigExt = {
  plan: {
    version: '0',
    branch: 'main',
    source: 'browser-ts-ampli'
  }
};

export interface LoadOptions {
  environment?: Environment;
  disabled?: boolean;
  client?: {
    apiKey?: string;
    config?: Partial<ConfigExt>;
    instance?: AmplitudeClient;
  }
}

export interface IdentifyProperties {
  /**
   * Description for identify optionalArray
   */
  optionalArray?: string[];
  /**
   * Description for identify requiredNumber
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
    [k: string]: unknown;
  };
  /**
   * Property Object Array Type
   */
  requiredObjectArray: unknown[];
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
  requiredObjectArray: unknown[];
  /**
   * description for required string array
   *
   * | Rule | Value |
   * |---|---|
   * | Item Type | string |
   */
  requiredStringArray: string[];
}

export interface EventWithDifferent_CasingTypesProperties {
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
  optionalJSONArray?: unknown[];
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

export class Context implements BaseEvent {
  event_type = 'Context';
  constructor() {}
}

export class Identify implements BaseEvent {
  event_type = 'Identify';
  event_properties: IdentifyProperties;

  constructor(event_properties: IdentifyProperties) {
    this.event_properties = event_properties;
  }
}

export class Group implements BaseEvent {
  event_type = 'Group';
  event_properties: GroupProperties;

  constructor(event_properties: GroupProperties) {
    this.event_properties = event_properties;
  }
}

export class EventMaxIntForTest implements BaseEvent {
  event_type = 'EventMaxIntForTest';

  constructor(
    public event_properties: EventMaxIntForTestProperties,
  ) {}
}

export class EventNoProperties implements BaseEvent {
  event_type = 'Event No Properties';
}

export class EventObjectTypes implements BaseEvent {
  event_type = 'Event Object Types';

  constructor(
    public event_properties: EventObjectTypesProperties,
  ) {}
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
  ) {}
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
    public event_properties: EventWithDifferent_CasingTypesProperties,
  ) {}
}

export class EventWithEnumTypes implements BaseEvent {
  event_type = 'Event With Enum Types';

  constructor(
    public event_properties: EventWithEnumTypesProperties,
  ) {}
}

export class EventWithOptionalArrayTypes implements BaseEvent {
  event_type = 'Event With Optional Array Types';

  constructor(
    public event_properties?: EventWithOptionalArrayTypesProperties,
  ) {}
}

export class EventWithOptionalProperties implements BaseEvent {
  event_type = 'Event With Optional Properties';

  constructor(
    public event_properties?: EventWithOptionalPropertiesProperties,
  ) {}
}

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude?: AmplitudeClient;
  private middlewares: Middleware[] = [];

  get client(): AmplitudeClient | undefined {
    return this.amplitude;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.amplitude) {
      throw new Error('Ampli is not yet initialized. Have you called ampli.load() on app start?');
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options?: LoadOptions): void {
    this.disabled = options?.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already intialized. Ampli.load() should be called once at application startup.');
      return;
    }

    const env = options?.environment ?? Environment.development;
    const apiKey = options?.client?.apiKey ?? ApiKey[env];

    if (options?.client?.instance) {
      this.amplitude = options?.client?.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.getInstance();
      this.amplitude?.init(apiKey, undefined, { ...DefaultConfig, ...options?.client?.config });
    } else {
      throw new Error("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId  The user's id.
   * @param properties The user properties.
   * @param options Optional event options.
   * @param extra Extra unstructured data for middleware.
   */
  identify(
    userId: string | undefined,
    properties: IdentifyProperties,
    options?: IdentifyOptions,
    extra?: MiddlewareExtra
  ) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const event: IdentifyEvent = {
      event_type: SpecialEventType.Identify,
      event_properties: properties,
      user_id: userId || options?.user_id,
      device_id: options?.device_id
    };
    this.runMiddleware({ event, extra }, payload => {
      const e = payload.event;
      if (e.user_id) {
        this.amplitude?.setUserId(e.user_id);
      }
      if (e.device_id) {
        this.amplitude?.setDeviceId(e.device_id);
      }
      const amplitudeIdentify = new AmplitudeIdentify();
      for (const [key, value] of Object.entries({ ...e.event_properties })) {
        amplitudeIdentify.set(key, value as any);
      }
      this.amplitude?.identify(
        amplitudeIdentify,
        options?.callback,
        // options?.errorCallback
      );
    });
  }

  setGroup(name: string, value: string | string[], options?: GroupOptions, extra?: MiddlewareExtra) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.amplitude?.setGroup(name, value);
  }

  /**
   * Track event
   *
   * @param event The event to track.
   * @param options Optional event options.
   * @param extra Extra unstructured data for middleware.
   */
  track(event: Event, options?: EventOptions, extra?: MiddlewareExtra) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    this.runMiddleware({ event, extra }, payload => {
      this.amplitude?.logEvent(
        payload.event.event_type,
        payload.event.event_properties,
        options?.callback,
        // options?.errorCallback,
      );
    });
  }

  /**
   * EventMaxIntForTest
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)
   *
   * Event to test schema validation
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. intMax10)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventMaxIntForTest(
    properties: EventMaxIntForTestProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventMaxIntForTest(properties), options, extra);
  }

  /**
   * Event No Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)
   *
   * Event w no properties description
   *
   * Owner: Test codegen
   *
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventNoProperties(
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventNoProperties(), options, extra);
  }

  /**
   * Event Object Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)
   *
   * Event with Object and Object Array
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. requiredObject)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventObjectTypes(
    properties: EventObjectTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventObjectTypes(properties), options, extra);
  }

  /**
   * Event With All Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)
   *
   * Event w all properties description
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. optionalString)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithAllProperties(
    properties: EventWithAllPropertiesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithAllProperties(properties), options, extra);
  }

  /**
   * Event With Array Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)
   *
   * Description for event with Array Types
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. requiredBooleanArray)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithArrayTypes(
    properties: EventWithArrayTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithArrayTypes(properties), options, extra);
  }

  /**
   * Event With Const Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)
   *
   * Description for event with const types
   *
   * Owner: Test codegen
   *
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithConstTypes(
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithConstTypes(), options, extra);
  }

  /**
   * event withDifferent_CasingTypes
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)
   *
   * Description for case with space
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. enumCamelCase)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithDifferentCasingTypes(
    properties: EventWithDifferent_CasingTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithDifferentCasingTypes(properties), options, extra);
  }

  /**
   * Event With Enum Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)
   *
   * Description for event with enum types
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. optional enum)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithEnumTypes(
    properties: EventWithEnumTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithEnumTypes(properties), options, extra);
  }

  /**
   * Event With Optional Array Types
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)
   *
   * Description for event with optional array types
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. optionalBooleanArray)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithOptionalArrayTypes(
    properties?: EventWithOptionalArrayTypesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithOptionalArrayTypes(properties), options, extra);
  }

  /**
   * Event With Optional Properties
   *
   * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)
   *
   * Event w optional properties description
   *
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. optionalArrayNumber)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithOptionalProperties(
    properties?: EventWithOptionalPropertiesProperties,
    options?: EventOptions,
    extra?: MiddlewareExtra,
  ) {
    return this.track(new EventWithOptionalProperties(properties), options, extra);
  }

  addEventMiddleware(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  private runMiddleware(payload: MiddlewarePayload, next: MiddlewareNext): void {
    let curMiddlewareIndex = -1;
    const middlewareCount = this.middlewares.length;

    const middlewareNext: MiddlewareNext = curPayload => {
      curMiddlewareIndex += 1;
      if (curMiddlewareIndex < middlewareCount) {
        this.middlewares[curMiddlewareIndex](curPayload, _next);
      } else {
        next(curPayload);
      }
    };

    const _next: MiddlewareNext = middlewareCount > 0 ? middlewareNext : next;

    _next(payload);
  }
}

export const ampli = new Ampli();

// BASE TYPES
type ConfigExt = Partial<Config> & { plan?: Plan };

export type Plan = {
  branch?: string;
  source?: string;
  version?: string;
}

export enum SpecialEventType {
  Identify = "Identify",
  Group = "Group"
}

export type BaseEvent = {
  event_type: string;
  event_properties?: { [key: string]: any },
  plan?: Plan;
  user_id?: string;
  device_id?: string;
}
export type IdentifyEvent = BaseEvent & { event_type: SpecialEventType.Identify };
export type GroupEvent = BaseEvent & { event_type: SpecialEventType.Group };
export type Event = BaseEvent | IdentifyEvent | GroupEvent;

type BaseEventOptions = Omit<BaseEvent, 'event_type' | 'event_properties'> & {
  callback: Callback;
  errorCallback: Callback;
};
export type EventOptions = BaseEventOptions;
export type IdentifyOptions = BaseEventOptions;
export type GroupOptions = BaseEventOptions;

/**
 * Unstructured object to let users pass extra data to middleware
 */
export interface MiddlewareExtra {
  [name: string]: any;
}

/**
 * Data to be processed by middleware
 */
export interface MiddlewarePayload {
  event: Event;
  extra?: MiddlewareExtra;
}

/**
 * Function called at the end of each Middleware to run the next middleware in the chain
 */
export type MiddlewareNext = (payload: MiddlewarePayload) => void;

/**
 * A function to run on the Event stream (each logEvent call)
 *
 * @param payload The event and extra data being sent
 * @param next Function to run the next middleware in the chain, not calling next will end the middleware chain
 */
export type Middleware = (payload: MiddlewarePayload, next: MiddlewareNext) => void;
