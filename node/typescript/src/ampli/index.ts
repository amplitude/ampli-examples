/**
 * Ampli - A strong typed wrapper for your Analytics
 * 
 * This file is generated by Amplitude.
 * To update run 'ampli pull node-ts-ampli'
 * 
 * Required dependencies: @amplitude/node@^1.8.2
 * Tracking Plan Version: [object Object]
 * Build: 1.0.0
 *
 * Tracking Plan:
 * https://analytics.amplitude.com/amplitude/govern/events/main/latest
 *
 * Full setup Instuctions:
 * https://analytics.amplitude.com/amplitude/govern/implementation/node-ts-ampli
 */
import { Identify as AmplitudeIdentify } from '@amplitude/identify';
import {
  init as initNodeClient, NodeClient, Event, AmpliMethod, IdentifyOptions, TrackOptions, Extra, cloneDeep,
} from './amplitude-node';

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


export class Context implements Event {
  name = 'Context';
  id = 'context';
  version = '0.0.0';
  constructor() {}
}
export class Identify implements Event {
  name = 'Identify';
  id = 'identify';
  version = '0.0.0';
  properties: IdentifyProperties;

  constructor(properties: IdentifyProperties) {
    this.properties = properties;
  }
}
export class Group implements Event {
  name = 'Group';
  id = 'group';
  version = '0.0.0';
  properties: GroupProperties;

  constructor(properties: GroupProperties) {
    this.properties = properties;
  }
}
export class EventMaxIntForTest implements Event {
  name = 'EventMaxIntForTest';
  id = 'aa0f08ac-8928-4569-a524-c1699e7da6f4';
  version = '1.0.0';
  properties: EventMaxIntForTestProperties;

  constructor(properties: EventMaxIntForTestProperties) {
    this.properties = properties;
  }
}
export class EventNoProperties implements Event {
  name = 'Event No Properties';
  id = '26af925a-be3a-40e5-947d-33da66a5352f';
  version = '1.0.0';
  constructor() {}
}
export class EventObjectTypes implements Event {
  name = 'Event Object Types';
  id = 'aea72ecc-5a10-4bd7-99a6-81a464aabaed';
  version = '1.0.0';
  properties: EventObjectTypesProperties;

  constructor(properties: EventObjectTypesProperties) {
    this.properties = properties;
  }
}
export class EventWithAllProperties implements Event {
  name = 'Event With All Properties';
  id = '311ba144-8532-4474-a9bd-8b430625e29a';
  version = '1.0.0';
  properties: EventWithAllPropertiesProperties & {
    "requiredConst": "some-const-value"
  };

  constructor(properties: EventWithAllPropertiesProperties) {
    this.properties = {
      ...properties,
      'requiredConst': "some-const-value",
    };
  }
}
export class EventWithArrayTypes implements Event {
  name = 'Event With Array Types';
  id = '5ded19cd-6015-441b-a2be-f954425be1fe';
  version = '1.0.0';
  properties: EventWithArrayTypesProperties;

  constructor(properties: EventWithArrayTypesProperties) {
    this.properties = properties;
  }
}
export class EventWithConstTypes implements Event {
  name = 'Event With Const Types';
  id = '321b8f02-1bb3-4b33-8c21-8c55401d62da';
  version = '1.0.0';
  properties: EventWithConstTypesProperties & {
    "String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
    "String Const": "String-Constant",
    "String Int Const": 0,
    "Integer Const": 10,
    "Boolean Const": true,
    "Number Const": 2.2
  };

  constructor(properties: EventWithConstTypesProperties) {
    this.properties = {
      'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
      'String Const': "String-Constant",
      'String Int Const': 0,
      'Integer Const': 10,
      'Boolean Const': true,
      'Number Const': 2.2,
    };
  }
}
export class EventWithDifferentCasingTypes implements Event {
  name = 'event withDifferent_CasingTypes';
  id = 'fcb3d82d-208f-4bc2-b8e1-843683d9b595';
  version = '1.0.0';
  properties: EventWithDifferentCasingTypesProperties;

  constructor(properties: EventWithDifferentCasingTypesProperties) {
    this.properties = properties;
  }
}
export class EventWithEnumTypes implements Event {
  name = 'Event With Enum Types';
  id = 'b4fc8366-b05d-40d3-b698-79795701624b';
  version = '1.0.0';
  properties: EventWithEnumTypesProperties;

  constructor(properties: EventWithEnumTypesProperties) {
    this.properties = properties;
  }
}
export class EventWithOptionalArrayTypes implements Event {
  name = 'Event With Optional Array Types';
  id = '2755da0e-a507-4b18-8f17-86d1d5c499ab';
  version = '1.0.0';
  properties: EventWithOptionalArrayTypesProperties;

  constructor(properties: EventWithOptionalArrayTypesProperties) {
    this.properties = properties;
  }
}
export class EventWithOptionalProperties implements Event {
  name = 'Event With Optional Properties';
  id = '00b99136-9d1a-48d8-89d5-25f165ff3ae0';
  version = '1.0.0';
  properties: EventWithOptionalPropertiesProperties;

  constructor(properties: EventWithOptionalPropertiesProperties) {
    this.properties = properties;
  }
}

export class Ampli {
  private amplitude: NodeClient;

  constructor(amplitude: NodeClient) {
    this.amplitude = amplitude;
  }
  
  get client() {
    return this.amplitude;
  }

  identify(userId?: string, deviceId?: string, properties?: IdentifyProperties, options?: IdentifyOptions, extra?: Extra) {
    this.amplitude.runMiddleware({
      method: AmpliMethod.Identify, args: { deviceId }, userId, event: new Identify(properties), options, extra
    }, (payload) => {
      const amplitudeIdentify = new AmplitudeIdentify();
      for (const [key, value] of Object.entries({ ...properties })) {
        amplitudeIdentify.set(key, value);
      }
      this.amplitude.logEvent({
        ...(options || {}),
        ...amplitudeIdentify.identifyUser(userId, deviceId)
      });
    });
  }

  track(userId, event: Event, options?: TrackOptions, extra?: Extra) {
    this.amplitude.runMiddleware({
      method: AmpliMethod.Track, userId, event, options, extra
    }, (payload) => {
      // Merge in
      const ampEvent = {
        ...(options || {}),
        event_type: payload.event.name,
        user_id: payload.userId,
        event_properties: payload.event.properties,
      };
      return this.amplitude.logEvent(ampEvent)
    });
  }

  flush() {
    return this.amplitude.flush();
  }

  // GENERATED EVENT FUNCTIONS
  eventMaxIntForTest(userId: String | undefined, properties: EventMaxIntForTestProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventMaxIntForTest(properties), options, extra);
  }

  eventNoProperties(userId: String | undefined, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventNoProperties(), options, extra);
  }

  eventObjectTypes(userId: String | undefined, properties: EventObjectTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventObjectTypes(properties), options, extra);
  }

  eventWithAllProperties(userId: String | undefined, properties: EventWithAllPropertiesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithAllProperties(properties), options, extra);
  }

  eventWithArrayTypes(userId: String | undefined, properties: EventWithArrayTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithArrayTypes(properties), options, extra);
  }

  eventWithConstTypes(userId: String | undefined, properties: EventWithConstTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithConstTypes(properties), options, extra);
  }

  eventWithDifferentCasingTypes(userId: String | undefined, properties: EventWithDifferentCasingTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithDifferentCasingTypes(properties), options, extra);
  }

  eventWithEnumTypes(userId: String | undefined, properties: EventWithEnumTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithEnumTypes(properties), options, extra);
  }

  eventWithOptionalArrayTypes(userId: String | undefined, properties: EventWithOptionalArrayTypesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithOptionalArrayTypes(properties), options, extra);
  }

  eventWithOptionalProperties(userId: String | undefined, properties: EventWithOptionalPropertiesProperties, options?: TrackOptions, extra?: Extra) {
    return this.track(userId, new EventWithOptionalProperties(properties), options, extra);
  }
}

export enum Environment {
  development = 'development',
  production = 'production'
}

export const ApiKey: Record<Environment, string> = {
  development: '',
  production: ''
}

/**
 * Initializes and returns a Ampli instance
 * 
 * @param apiKeyOrNodeClient  A API key (string) or Amplitude.NodeClient instance
 * @return {Ampli}
 */
export function init(apiKeyOrNodeClient: string | NodeClient) {
  const apiKey = typeof(apiKeyOrNodeClient) === 'string' ? apiKeyOrNodeClient : undefined;
  const nodeClient = typeof(apiKeyOrNodeClient) === 'object' ? apiKeyOrNodeClient : initNodeClient(apiKey);
  return new Ampli(nodeClient);
}

const DEFAULT_INSTANCE: string = Environment.development;
const _instances: { [name: string]: Ampli } = {};

/**
 * Get an Ampli instance
 * 
 * @param instance The Environment or name of the desired instance 
 */ 
export function getInstance(instance: Environment | string = DEFAULT_INSTANCE): Ampli {
  let ampli = _instances[instance];
  if (!ampli) {
    const apiKey = ApiKey[instance];
    if (apiKey === undefined || apiKey === '') {
      throw new Error(`No API key or instance found for '${instance}'. Provide a valid environment or call Ampli.setInstance('${instance}', ...) before making this call.`);
    }
    ampli = init(apiKey);
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
