/**
 * Ampli - A strong typed wrapper for your Analytics
 * 
 * This file is generated by Amplitude.
 * To update run 'ampli pull browser-ts-ampli'
 * 
 * Required dependencies: @amplitude/node@^1.8.5
 * Tracking Plan Version: 0
 * Build: 1.0.0
 *
 * Tracking Plan:
 * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest
 *
 * Full setup Instuctions:
 * https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/browser-ts-ampli
 */

import amplitude, { AmplitudeClient, Callback, Config, Identify as AmplitudeIdentify } from 'amplitude-js';

export enum Environment {
  development = 'development',
  production = 'production'
}

export const ApiKey: Record<Environment | string, string> = {
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

export interface EventProperties {
    Context?:                       ContextProperties;
    EventMaxIntForTest?:            EventMaxIntForTestProperties;
    EventNoProperties?:             EventNoPropertiesProperties;
    EventObjectTypes?:              EventObjectTypesProperties;
    EventWithAllProperties?:        EventWithAllPropertiesProperties;
    EventWithArrayTypes?:           EventWithArrayTypesProperties;
    EventWithConstTypes?:           EventWithConstTypesProperties;
    EventWithDifferentCasingTypes?: EventWithDifferentCasingTypesProperties;
    EventWithEnumTypes?:            EventWithEnumTypesProperties;
    EventWithOptionalArrayTypes?:   EventWithOptionalArrayTypesProperties;
    EventWithOptionalProperties?:   EventWithOptionalPropertiesProperties;
    Group?:                         GroupProperties;
    Identify?:                      IdentifyProperties;
}

export interface ContextProperties {
}

/**
 * Event to test schema validation
 */
export interface EventMaxIntForTestProperties {
    /**
     * property to test schema validation
     */
    intMax10: number;
}

/**
 * Event w no properties description
 */
export interface EventNoPropertiesProperties {
}

/**
 * Event with Object and Object Array
 */
export interface EventObjectTypesProperties {
    /**
     * Property Object Type
     */
    requiredObject: { [key: string]: any };
    /**
     * Property Object Array Type
     */
    requiredObjectArray: { [key: string]: any }[];
}

/**
 * Event w all properties description
 */
export interface EventWithAllPropertiesProperties {
    /**
     * Event 2 Property - Optional String    *     * Examples:    * Some string, or another
     */
    optionalString?: string;
    /**
     * Event 2 Property - Array
     */
    requiredArray: string[];
    /**
     * Event 2 Property - Boolean
     */
    requiredBoolean: boolean;
    /**
     * Event 2 Property - Enum
     */
    requiredEnum: RequiredEnum;
    /**
     * Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
     */
    requiredInteger: number;
    /**
     * Event 2 Property - Number
     */
    requiredNumber: number;
    /**
     * Event 2 Property - String
     */
    requiredString: string;
}

/**
 * Event 2 Property - Enum
 */
export enum RequiredEnum {
    Enum1 = "Enum1",
    Enum2 = "Enum2",
}

/**
 * Description for event with Array Types
 */
export interface EventWithArrayTypesProperties {
    /**
     * description for required boolean array
     */
    requiredBooleanArray: boolean[];
    /**
     * Description for required number array
     */
    requiredNumberArray: number[];
    /**
     * Description for required object array
     */
    requiredObjectArray: { [key: string]: any }[];
    /**
     * description for required string array
     */
    requiredStringArray: string[];
}

/**
 * Description for event with const types
 */
export interface EventWithConstTypesProperties {
}

/**
 * Description for case with space
 */
export interface EventWithDifferentCasingTypesProperties {
    /**
     * Description for enum with space
     */
    "enum with space": EnumWithSpace;
    /**
     * description_for_enum_snake_case
     */
    enum_snake_case: EnumSnakeCase;
    /**
     * descriptionForEnumCamelCase
     */
    enumCamelCase: EnumCamelCase;
    /**
     * DescirptionForEnumPascalCase
     */
    EnumPascalCase: EnumPascalCase;
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

/**
 * DescirptionForEnumPascalCase
 */
export enum EnumPascalCase {
    EnumPascalCase = "EnumPascalCase",
}

/**
 * Description for enum with space
 */
export enum EnumWithSpace {
    EnumWithSpace = "enum with space",
}

/**
 * descriptionForEnumCamelCase
 */
export enum EnumCamelCase {
    EnumCamelCase = "enumCamelCase",
}

/**
 * description_for_enum_snake_case
 */
export enum EnumSnakeCase {
    EnumSnakeCase = "enum_snake_case",
}

/**
 * Description for event with enum types
 */
export interface EventWithEnumTypesProperties {
    /**
     * Description for required enum
     */
    "optional enum"?: OptionalEnum;
    /**
     * Description for optional enum
     */
    "required enum": RequiredEnumEnum;
}

/**
 * Description for required enum
 */
export enum OptionalEnum {
    OptionalEnum1 = "optional enum 1",
    OptionalEnum2 = "optional enum 2",
}

/**
 * Description for optional enum
 */
export enum RequiredEnumEnum {
    RequiredEnum1 = "required enum 1",
    RequiredEnum2 = "required enum 2",
}

/**
 * Description for event with optional array types
 */
export interface EventWithOptionalArrayTypesProperties {
    /**
     * Description for optional boolean array
     */
    optionalBooleanArray?: boolean[];
    /**
     * Description for optional object array
     */
    optionalJSONArray?: { [key: string]: any }[];
    /**
     * Description for optional number array
     */
    optionalNumberArray?: number[];
    /**
     * Description for optional string array
     */
    optionalStringArray?: string[];
}

/**
 * Event w optional properties description
 */
export interface EventWithOptionalPropertiesProperties {
    optionalArrayNumber?: number[];
    optionalArrayString?: string[];
    optionalBoolean?:     boolean;
    optionalNumber?:      number;
    /**
     * Optional String property description
     */
    optionalString?: string;
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


export class Context implements BaseEvent {
  event_type = 'Context';
  plan = {
    event_id: 'context',
    event_version: '0.0.0',
  };
  constructor() {}
}
export class Identify implements BaseEvent {
  event_type = 'Identify';
  plan = {
    event_id: 'identify',
    event_version: '0.0.0',
  };
  event_properties: IdentifyProperties;

  constructor(event_properties: IdentifyProperties) {
    this.event_properties = event_properties;
  }
}
export class Group implements BaseEvent {
  event_type = 'Group';
  plan = {
    event_id: 'group',
    event_version: '0.0.0',
  };
  event_properties: GroupProperties;

  constructor(event_properties: GroupProperties) {
    this.event_properties = event_properties;
  }
}

export class EventMaxIntForTest implements BaseEvent {
  event_type = 'EventMaxIntForTest';
  plan = { 
    event_id: 'aa0f08ac-8928-4569-a524-c1699e7da6f4',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties: EventMaxIntForTestProperties,
  ) {}
}

export class EventNoProperties implements BaseEvent {
  event_type = 'Event No Properties';
  plan = { 
    event_id: '26af925a-be3a-40e5-947d-33da66a5352f',
    event_version: '1.0.0',
  };
}

export class EventObjectTypes implements BaseEvent {
  event_type = 'Event Object Types';
  plan = { 
    event_id: 'aea72ecc-5a10-4bd7-99a6-81a464aabaed',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties: EventObjectTypesProperties,
  ) {}
}

export class EventWithAllProperties implements BaseEvent {
  event_type = 'Event With All Properties';
  plan = { 
    event_id: '311ba144-8532-4474-a9bd-8b430625e29a',
    event_version: '1.0.0',
  };
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
  plan = { 
    event_id: '5ded19cd-6015-441b-a2be-f954425be1fe',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties: EventWithArrayTypesProperties,
  ) {}
}

export class EventWithConstTypes implements BaseEvent {
  event_type = 'Event With Const Types';
  plan = { 
    event_id: '321b8f02-1bb3-4b33-8c21-8c55401d62da',
    event_version: '1.0.0',
  };
  event_properties = {
    'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
    'String Const': "String-Constant",
    'String Int Const': 0,
    'Integer Const': 10,
    'Boolean Const': true,
    'Number Const': 2.2,
  };
}

export class EventWithDifferentCasingTypes implements BaseEvent {
  event_type = 'event withDifferent_CasingTypes';
  plan = { 
    event_id: 'fcb3d82d-208f-4bc2-b8e1-843683d9b595',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties: EventWithDifferentCasingTypesProperties,
  ) {}
}

export class EventWithEnumTypes implements BaseEvent {
  event_type = 'Event With Enum Types';
  plan = { 
    event_id: 'b4fc8366-b05d-40d3-b698-79795701624b',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties: EventWithEnumTypesProperties,
  ) {}
}

export class EventWithOptionalArrayTypes implements BaseEvent {
  event_type = 'Event With Optional Array Types';
  plan = { 
    event_id: '2755da0e-a507-4b18-8f17-86d1d5c499ab',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties?: EventWithOptionalArrayTypesProperties,
  ) {}
}

export class EventWithOptionalProperties implements BaseEvent {
  event_type = 'Event With Optional Properties';
  plan = { 
    event_id: '00b99136-9d1a-48d8-89d5-25f165ff3ae0',
    event_version: '1.0.0',
  };

  constructor(
    public event_properties?: EventWithOptionalPropertiesProperties,
  ) {}
}


export class Ampli {
  private readonly amplitude: AmplitudeClient;
  private middlewares: Middleware[] = [];

  constructor(amplitude: AmplitudeClient) {
    this.amplitude = amplitude;
  }
  
  get client(): AmplitudeClient {
    return this.amplitude;
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId  The user's id.
   * @param deviceId The device id.
   * @param properties The user properties.
   * @param options Optional event options.
   * @param extra Extra unstructured data for middleware.
   */
  identify(
    userId: string | undefined,
    deviceId: string | undefined,
    properties: IdentifyProperties,
    options?: IdentifyOptions,
    extra?: Extra
  ) {
    const event: IdentifyEvent = {
      event_type: SpecialEventType.Identify,
      event_properties: properties,
      plan: { event_id: 'identify', event_version: '0.0.0' },
      user_id: userId,
      device_id: deviceId,
    };
    this.runMiddleware({ event, extra }, payload => {
      if (userId) {
        this.amplitude.setUserId(userId);
      }
      if (deviceId) {
        this.amplitude.setDeviceId(deviceId);
      }
      const amplitudeIdentify = new AmplitudeIdentify();
      for (const [key, value] of Object.entries({ ...payload.event.event_properties })) {
        amplitudeIdentify.set(key, value as any);
      }
      this.amplitude.identify(
        amplitudeIdentify,
        options?.callback,
        // options?.errorCallback
      );
    });
  }

  /**
   * Track event
   *
   * @param event The event to track.
   * @param options Optional event options.
   * @param extra Extra unstructured data for middleware.
   */
  track(event: Event, options?: EventOptions, extra?: Extra) {
    this.runMiddleware({ event, extra }, payload => {
      this.amplitude.logEvent(
        payload.event.event_type,
        payload.event.event_properties,
        options?.callback,
        // options?.errorCallback,
      );
    });
  }

  // GENERATED EVENT FUNCTIONS
  /**
   * EventMaxIntForTest
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest
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
    extra?: Extra,
  ) {
    return this.track(new EventMaxIntForTest(properties), options, extra);
  }

  /**
   * Event No Properties
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties
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
    extra?: Extra,
  ) {
    return this.track(new EventNoProperties(), options, extra);
  }

  /**
   * Event Object Types
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types
   *
   * Event with Object and Object Array
   * 
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. requiredObjectArray)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventObjectTypes(
    properties: EventObjectTypesProperties,
    options?: EventOptions,
    extra?: Extra,
  ) {
    return this.track(new EventObjectTypes(properties), options, extra);
  }

  /**
   * Event With All Properties
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties
   *
   * Event w all properties description
   * 
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. requiredInteger)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithAllProperties(
    properties: EventWithAllPropertiesProperties,
    options?: EventOptions,
    extra?: Extra,
  ) {
    return this.track(new EventWithAllProperties(properties), options, extra);
  }

  /**
   * Event With Array Types
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types
   *
   * Description for event with Array Types
   * 
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. requiredObjectArray)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithArrayTypes(
    properties: EventWithArrayTypesProperties,
    options?: EventOptions,
    extra?: Extra,
  ) {
    return this.track(new EventWithArrayTypes(properties), options, extra);
  }

  /**
   * Event With Const Types
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types
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
    extra?: Extra,
  ) {
    return this.track(new EventWithConstTypes(), options, extra);
  }

  /**
   * event withDifferent_CasingTypes
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes
   *
   * Description for case with space
   * 
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. EnumPascalCase)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithDifferentCasingTypes(
    properties: EventWithDifferentCasingTypesProperties,
    options?: EventOptions,
    extra?: Extra,
  ) {
    return this.track(new EventWithDifferentCasingTypes(properties), options, extra);
  }

  /**
   * Event With Enum Types
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types
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
    extra?: Extra,
  ) {
    return this.track(new EventWithEnumTypes(properties), options, extra);
  }

  /**
   * Event With Optional Array Types
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types
   *
   * Description for event with optional array types
   * 
   * Owner: Test codegen
   *
   * @param properties The event's properties (e.g. optionalJSONArray)
   * @param options Amplitude event options.
   * @param extra Extra untyped parameters for use in middleware.
   */
  eventWithOptionalArrayTypes(
    properties?: EventWithOptionalArrayTypesProperties,
    options?: EventOptions,
    extra?: Extra,
  ) {
    return this.track(new EventWithOptionalArrayTypes(properties), options, extra);
  }

  /**
   * Event With Optional Properties
   * https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties
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
    extra?: Extra,
  ) {
    return this.track(new EventWithOptionalProperties(properties), options, extra);
  }
  
  addEventMiddleware(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }
  
  private runMiddleware(payload: MiddlewarePayload, next: Next): void {
    let curMiddlewareIndex = -1;
    const middlewareCount = this.middlewares.length;

    const middlewareNext: Next = curPayload => {
      curMiddlewareIndex += 1;
      if (curMiddlewareIndex < middlewareCount) {
        this.middlewares[curMiddlewareIndex](curPayload, _next);
      } else {
        next(curPayload);
      }
    };

    const _next: Next = middlewareCount > 0 ? middlewareNext : next;

    _next(payload);
  }
}

const DEFAULT_INSTANCE: string = Environment.development;
const _instances: { [name: string]: Ampli } = {};

/**
 * Get an Ampli instance
 * 
 * @param instance The Environment or name of the desired instance.
 * @param config Amplitude configuration options.
 * @param apiKey An Amplitude API key.
 */ 
export function getInstance(
  instance: Environment | string = DEFAULT_INSTANCE,
  config: ConfigExt = DefaultConfig,
  apiKey?: string
): Ampli {
  let ampli = _instances[instance];
  if (!ampli) {
    const key = ApiKey[instance] || apiKey;
    if (key === undefined || key === '') {
      throw new Error(`No API key or instance found for '${instance}'. Provide a valid environment or call Ampli.setInstance('${instance}', ...) before making this call.`);
    }
    const amplitudeClient = amplitude.getInstance(instance);
    amplitudeClient.init(key, undefined, config);
    ampli = new Ampli(amplitudeClient);
    setInstance(ampli, instance);
  }
  return ampli;
}

/**
 * Stores and instance of Ampli for later retrieval via getInstance()
 *
 * @param ampli     The Ampli instance
 * @param instance  The Environment or name of this instance
 */
export function setInstance(ampli: Ampli, instance: Environment | string = DEFAULT_INSTANCE) {
  _instances[instance] = ampli;
}


// BASE TYPES
type ConfigExt = Partial<Config> & { plan?: Plan };

export type Plan = {
  branch?: string;
  source?: string;
  version?: string;
  event_id?: string;
  event_version?: string;
}

export enum SpecialEventType {
  Identify = "Identify",
  Group = "Group"
}

export type BaseEvent = {
  event_type: string;
  event_properties?: { [key: string]: any },
  plan?: Plan;
}
export type IdentifyEvent = BaseEvent & {
  event_type: SpecialEventType.Identify,
  user_id?: string;
  device_id?: string;
};
export type GroupEvent = BaseEvent & {
  event_type: SpecialEventType.Group,
};
export type Event = BaseEvent | IdentifyEvent | GroupEvent;

type BaseEventOptions = Omit<BaseEvent, 'event_type' | 'event_properties'> & {
  callback: Callback;
  errorCallback: Callback,
};
export type EventOptions = BaseEventOptions ;
export type IdentifyOptions = BaseEventOptions;
export type GroupOptions = BaseEventOptions;

/**
 * Unstructured object to let users pass extra data to middleware
 */
export interface Extra {
  [name: string]: any;
}

/**
 * Data to be processed by middleware
 */
export interface MiddlewarePayload {
  event: Event;
  extra?: Extra;
}

/**
 * Function called at the end of each Middleware to run the next middleware in the chain
 */
export type Next = (payload: MiddlewarePayload) => void;

/**
 * A function to run on the Event stream (each logEvent call)
 *
 * @param payload The event and extra data being sent
 * @param next Function to run the next middleware in the chain, not calling next will end the middleware chain
 */
export type Middleware = (payload: MiddlewarePayload, next: Next) => void;

