
import amplitude from 'amplitude-js';

/**
 * @typedef {Object} EventOptions
 */

/**
 * @typedef {Object} IdentifyOptions
 */

/**
 * @typedef {Object} GroupOptions
 */

/**
 * @typedef {Object} Extra
 */

/**
 * @typedef Environment
 * @readonly
 * @type {object}
 * @property {string} development
 * @property {string} production
 */
export const Environment = {
  development: 'development',
  production: 'production'
}

/**
 * @typedef ApiKey
 * @type {object}
 * @property {string} development
 * @property {string} production
 */
export const ApiKey = {
  development: '',
  production: ''
};

/**
 *  Default Amplitude Config. Contains tracking plan information.
 */
export const DefaultConfig = {
  plan: {
    version: '0',
    branch: 'main',
    source: 'browser-js-ampli'
  }
};

export class EventMaxIntForTest {
  constructor(properties) {
    this.event_type = 'EventMaxIntForTest';
    this.event_properties = properties;
  }
}

export class EventNoProperties {
  constructor() {
    this.event_type = 'Event No Properties';
  }
}

export class EventObjectTypes {
  constructor(properties) {
    this.event_type = 'Event Object Types';
    this.event_properties = properties;
  }
}

export class EventWithAllProperties {
  constructor(properties) {
    this.event_type = 'Event With All Properties';
    this.event_properties = {
      ...properties,
      'requiredConst': "some-const-value",
    };
  }
}

export class EventWithArrayTypes {
  constructor(properties) {
    this.event_type = 'Event With Array Types';
    this.event_properties = properties;
  }
}

export class EventWithConstTypes {
  constructor() {
    this.event_type = 'Event With Const Types';
    this.event_properties = {
      'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
      'String Const': "String-Constant",
      'String Int Const': 0,
      'Integer Const': 10,
      'Boolean Const': true,
      'Number Const': 2.2,
    };
  }
}

export class EventWithDifferentCasingTypes {
  constructor(properties) {
    this.event_type = 'event withDifferent_CasingTypes';
    this.event_properties = properties;
  }
}

export class EventWithEnumTypes {
  constructor(properties) {
    this.event_type = 'Event With Enum Types';
    this.event_properties = properties;
  }
}

export class EventWithOptionalArrayTypes {
  constructor(properties) {
    this.event_type = 'Event With Optional Array Types';
    this.event_properties = properties;
  }
}

export class EventWithOptionalProperties {
  constructor(properties) {
    this.event_type = 'Event With Optional Properties';
    this.event_properties = properties;
  }
}

// prettier-ignore
export class Ampli {
  constructor(amplitude) {
    this.amplitude = amplitude;
  }

  get client() {
    return this.amplitude;
  }

  /**
   * Identify a user and set or update that user's properties.
   * @param {string} [userId] The user's ID.
   * @param {Object} properties The user's properties.
   * @param {string[]} [properties.optionalArray] Description for identify optionalArray
   * @param {number} properties.requiredNumber Description for identify requiredNumber
   * @param {IdentifyOptions} [options] Options for this identify call.
   */
  identify(userId, properties, options) {
    this.itly.identify(userId, properties, options);
  }

  /**
   * Associate the current user with a group and set or update that group's properties.
   * @param {string} groupId The group's ID.
   * @param {Object} properties The group's properties.
   * @param {boolean} properties.requiredBoolean Description for group requiredBoolean
   * @param {string} [properties.optionalString] Description for group optionalString
   * @param {GroupOptions} [options] Options for this group call.
   */
  group(groupId, properties, options) {
    this.itly.group(groupId, properties, options);
  }

  /**
   * Event to test schema validation
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {number} properties.intMax10 property to test schema validation
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventMaxIntForTest(properties, options) {
    this.itly.track(new EventMaxIntForTest(properties), options);
  }

  /**
   * Event w no properties description
   *
   * Owner: Test codegen
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventNoProperties(options) {
    this.itly.track(new EventNoProperties(), options);
  }

  /**
   * Event with Object and Object Array
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {Object[]} properties.requiredObjectArray Property Object Array Type
   * @param {Object} properties.requiredObject Property Object Type
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventObjectTypes(properties, options) {
    this.itly.track(new EventObjectTypes(properties), options);
  }

  /**
   * Event w all properties description
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {number} properties.requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
   * @param {string} [properties.optionalString] Event 2 Property - Optional String    *     * Examples:    * Some string, or another
   * @param {string} properties.requiredEnum Event 2 Property - Enum
   * @param {string[]} properties.requiredArray Event 2 Property - Array
   * @param {boolean} properties.requiredBoolean Event 2 Property - Boolean
   * @param {number} properties.requiredNumber Event 2 Property - Number
   * @param {string} properties.requiredString Event 2 Property - String
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithAllProperties(properties, options) {
    this.itly.track(new EventWithAllProperties(properties), options);
  }

  /**
   * Description for event with Array Types
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {Object[]} properties.requiredObjectArray Description for required object array
   * @param {string[]} properties.requiredStringArray description for required string array
   * @param {number[]} properties.requiredNumberArray Description for required number array
   * @param {boolean[]} properties.requiredBooleanArray description for required boolean array
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithArrayTypes(properties, options) {
    this.itly.track(new EventWithArrayTypes(properties), options);
  }

  /**
   * Description for event with const types
   *
   * Owner: Test codegen
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithConstTypes(options) {
    this.itly.track(new EventWithConstTypes(), options);
  }

  /**
   * Description for case with space
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {string} properties.EnumPascalCase DescirptionForEnumPascalCase
   * @param {string} properties.enum_snake_case description_for_enum_snake_case
   * @param {string} properties.enum with space Description for enum with space
   * @param {string} properties.PropertyWithPascalCase DescriptionForPascalCase
   * @param {string} properties.enumCamelCase descriptionForEnumCamelCase
   * @param {string} properties.propertyWithCamelCase descriptionForCamelCase
   * @param {string} properties.property_with_snake_case Description_for_snake_case
   * @param {string} properties.property with space Description for case with space
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithDifferentCasingTypes(properties, options) {
    this.itly.track(new EventWithDifferentCasingTypes(properties), options);
  }

  /**
   * Description for event with enum types
   *
   * Owner: Test codegen
   * @param {Object} properties The event's properties.
   * @param {string} [properties.optional enum] Description for required enum
   * @param {string} properties.required enum Description for optional enum
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithEnumTypes(properties, options) {
    this.itly.track(new EventWithEnumTypes(properties), options);
  }

  /**
   * Description for event with optional array types
   *
   * Owner: Test codegen
   * @param {Object} [properties] The event's properties.
   * @param {Object[]} [properties.optionalJSONArray] Description for optional object array
   * @param {string[]} [properties.optionalStringArray] Description for optional string array
   * @param {number[]} [properties.optionalNumberArray] Description for optional number array
   * @param {boolean[]} [properties.optionalBooleanArray] Description for optional boolean array
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithOptionalArrayTypes(properties, options) {
    this.itly.track(new EventWithOptionalArrayTypes(properties), options);
  }

  /**
   * Event w optional properties description
   *
   * Owner: Test codegen
   * @param {Object} [properties] The event's properties.
   * @param {number[]} [properties.optionalArrayNumber] Property has no description in tracking plan.
   * @param {string[]} [properties.optionalArrayString] Property has no description in tracking plan.
   * @param {number} [properties.optionalNumber] Property has no description in tracking plan.
   * @param {boolean} [properties.optionalBoolean] Property has no description in tracking plan.
   * @param {string} [properties.optionalString] Optional String property description
   * @param {TrackOptions} [options] Options for this track call.
   */
  eventWithOptionalProperties(properties, options) {
    this.itly.track(new EventWithOptionalProperties(properties), options);
  }

  /**
   * Track any event.
   * @param {Object} event The event.
   * @param {string} event.name The event's name.
   * @param {string} [event.properties] The event's properties.
   * @param {string} [event.id] The event's ID.
   * @param {string} [event.version] The event's version.
   * @param {TrackOptions} [options] Options for this track call.
   */
  track(event, options) {
    this.itly.track(event, options);
  }

  flush() {
    return this.itly.flush();
  }
}

export const DefaultInstance = Environment.development;
/**
* @type {Object.<string, {Ampli}> }
* @private
*/
const _instances = {};

/**
 * Get an Ampli instance
 *
 * @param {(Environment.development|Environment.production|string)} [instance] The Environment or name of the desired instance.
 * @param {Config} [config] Amplitude configuration options.
 * @param {string} [apiKey] An Amplitude API key.
 *
 * @return {Ampli}
 */
export function getInstance(instance = DefaultInstance, config = DefaultConfig, apiKey) {
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
 * @param {Ampli} ampli The Ampli instance
 * @param {(Environment.development|Environment.production|string)} instance  The Environment or name of this instance
 */
export function setInstance(ampli, instance = DefaultInstance) {
  _instances[instance] = ampli;
}
