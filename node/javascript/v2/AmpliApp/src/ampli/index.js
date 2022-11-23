/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull node-js-ampli-v2'
 *
 * Required dependencies: @amplitude/analytics-node@^0.5.0
 * Tracking Plan Version: 0
 * Build: 1.0.0
 * Runtime: node.js:javascript-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/node-js-ampli-v2)
 */

const amplitude = require('@amplitude/analytics-node');

/**
 * @typedef BaseEvent
 * @type {object}
 * @property {string} event_type
 * @property {Object.<string, *>} [event_properties]
 */

/**
 * @typedef Plan
 * @type {object}
 * @property {string} [branch]
 * @property {string} [source]
 * @property {string} [version]
 * @property {string} [versionId]
 */

/**
 * @typedef LoadClientOptions
 * @type {object}
 * @property {string} [apiKey]
 * @property {Object} [configuration]
 * @property {NodeClient} [instance]
 */

/**
 * @typedef LoadOptions
 * @type {object}
 * @property {'development'|'production'} [environment]
 * @property {boolean} [disabled]
 * @property {LoadClientOptions} [client]
 */

/**
 * @typedef {Object} EventOptions
 * @type {object}
 */

/**
 * @typedef ApiKey
 * @type {object}
 * @property {string} development
 * @property {string} production
 */
const ApiKey = {
  development: '',
  production: ''
};

/**
 * @typedef {Object} EventTemplate
 * @param {number} [optional_template_property] optional_template_property description
 * @param {string} required_template_property required_template_property description
 */

/**
 * @typedef {Object} SourceTemplate
 * @param {'Value 1'|'Value 2'} [optionalEnum] description for context optionalEnum
 * @param {string} requiredString description for context requiredString
 */

/**
 * Default Amplitude configuration options. Contains tracking plan information.
 */
const DefaultConfiguration = {
  plan: {
    version: '0',
    branch: 'main',
    source: 'node-js-ampli-v2',
    versionId: '79154a50-f057-4db5-9755-775e4e9f05e6'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'node.js-javascript-ampli',
      sourceVersion: '2.0.0'
    }
  }
};

class Identify {
  constructor(properties) {
    this.event_type = 'Identify';
    this.event_properties = properties;
  }
}

class EventMaxIntForTest {
  constructor(properties) {
    this.event_type = 'EventMaxIntForTest';
    this.event_properties = properties;
  }
}

class EventNoProperties {
  constructor() {
    this.event_type = 'Event No Properties';
  }
}

class EventObjectTypes {
  constructor(properties) {
    this.event_type = 'Event Object Types';
    this.event_properties = properties;
  }
}

class EventWithAllProperties {
  constructor(properties) {
    this.event_type = 'Event With All Properties';
    this.event_properties = {
      ...properties,
      'requiredConst': "some-const-value",
    };
  }
}

class EventWithArrayTypes {
  constructor(properties) {
    this.event_type = 'Event With Array Types';
    this.event_properties = properties;
  }
}

class EventWithConstTypes {
  constructor() {
    this.event_type = 'Event With Const Types';
    this.event_properties = {
      'Boolean Const': true,
      'Integer Const': 10,
      'Number Const': 2.2,
      'String Const': "String-Constant",
      'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
      'String Int Const': 0,
    };
  }
}

class EventWithDifferentCasingTypes {
  constructor(properties) {
    this.event_type = 'event withDifferent_CasingTypes';
    this.event_properties = properties;
  }
}

class EventWithEnumTypes {
  constructor(properties) {
    this.event_type = 'Event With Enum Types';
    this.event_properties = properties;
  }
}

class EventWithOptionalArrayTypes {
  constructor(properties) {
    this.event_type = 'Event With Optional Array Types';
    this.event_properties = properties;
  }
}

class EventWithOptionalProperties {
  constructor(properties) {
    this.event_type = 'Event With Optional Properties';
    this.event_properties = properties;
  }
}

class EventWithTemplateProperties {
  constructor(properties) {
    this.event_type = 'Event With Template Properties';
    this.event_properties = properties;
  }
}

/**
 * @typedef PromiseResult
 * @type {object}
 * @property {Promise|undefined} promise
 */

const getVoidPromiseResult = () => ({ promise: Promise.resolve() });

// prettier-ignore
class Ampli {
  constructor() {
    /* @type {NodeClient|undefined} */
    this.amplitude = undefined;
    this.disabled = false;
  }

  /**
   * @return {NodeClient}
   */
  get client() {
    this.isInitializedAndEnabled();
    return this.amplitude;
  }

  /**
   * @return {boolean}
   */
  get isLoaded() {
    return this.amplitude != null;
  }

  /**
   * @private
   * @return {boolean}
   */
  isInitializedAndEnabled() {
    if (!this.amplitude) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   *
   * @param {LoadOptions} [options] Configuration options to initialize the Ampli SDK with.
   *
   * @return {PromiseResult}
   */
  load(options) {
    this.disabled = options?.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already initialized. Ampli.load() should be called once at application startup.');
      return getVoidPromiseResult();
    }

    const env = options?.environment ?? 'development';
    const apiKey = options?.client?.apiKey ?? ApiKey[env];

    if (options?.client?.instance) {
      this.amplitude = options?.client?.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.createInstance();
      return this.amplitude.init(apiKey, { ...DefaultConfiguration, ...options?.client?.configuration });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }

    return getVoidPromiseResult();
  }

  /**
   * Identify a user and set or update that user's properties.
   *
   * @param {string|undefined} userId The user's id.
   * @param {Object} properties The user's properties.
   * @param {string[]} [properties.optionalArray] Description for identify optionalArray
   * @param {number} properties.requiredNumber Description for identify requiredNumber
   * @param {EventOptions} [options] Optional event options.
   *
   * @return {PromiseResult}
   */
  identify(userId, properties, options) {
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

    return this.amplitude.identify(amplitudeIdentify, options);
  }

  /**
   * Track event.
   *
   * @param {string|undefined} userId The user's id.
   * @param {BaseEvent} event The event to track.
   * @param {EventOptions} [options] Optional event options.
   *
   * @return {PromiseResult}
   */
  track(userId, event, options) {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = { ...options, user_id: userId };
    }

    return this.amplitude.track(event, undefined, options);
  }

  /**
   * Flush pending events
   *
   * @return {PromiseResult}
   */
  flush() {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude.flush();
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {number} properties.intMax10 property to test schema validation
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventMaxIntForTest(userId, properties, options) {
    return this.track(userId, new EventMaxIntForTest(properties), options);
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
   * @param {string|undefined} userId The user's ID.
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventNoProperties(userId, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {*} properties.requiredObject Property Object Type
   * @param {*[]} properties.requiredObjectArray Property Object Array Type
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventObjectTypes(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {string} [properties.optionalString] Event 2 Property - Optional String    *     * Examples:    * Some string, or another
   * @param {string[]} properties.requiredArray Event 2 Property - Array
   * @param {boolean} properties.requiredBoolean Event 2 Property - Boolean
   * @param {'Enum1'|'Enum2'} properties.requiredEnum Event 2 Property - Enum
   * @param {number} properties.requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
   * @param {number} properties.requiredNumber Event 2 Property - Number
   * @param {string} properties.requiredString Event 2 Property - String
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithAllProperties(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {boolean[]} properties.requiredBooleanArray description for required boolean array
   * @param {number[]} properties.requiredNumberArray Description for required number array
   * @param {*[]} properties.requiredObjectArray Description for required object array
   * @param {string[]} properties.requiredStringArray description for required string array
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithArrayTypes(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithConstTypes(userId, options) {
    return this.track(userId, new EventWithConstTypes(), options);
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {'enumCamelCase'} properties.enumCamelCase descriptionForEnumCamelCase
   * @param {'EnumPascalCase'} properties.EnumPascalCase DescirptionForEnumPascalCase
   * @param {'enum_snake_case'} properties.enum_snake_case description_for_enum_snake_case
   * @param {'enum with space'} properties.enum with space Description for enum with space
   * @param {string} properties.propertyWithCamelCase descriptionForCamelCase
   * @param {string} properties.PropertyWithPascalCase DescriptionForPascalCase
   * @param {string} properties.property_with_snake_case Description_for_snake_case
   * @param {string} properties.property with space Description for case with space
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithDifferentCasingTypes(userId, properties, options) {
    return this.track(userId, new EventWithDifferentCasingTypes(properties), options);
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {'optional enum 1'|'optional enum 2'} [properties.optional enum] Description for required enum
   * @param {'required enum 1'|'required enum 2'} properties.required enum Description for optional enum
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithEnumTypes(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} [properties] The event's properties.
   * @param {boolean[]} [properties.optionalBooleanArray] Description for optional boolean array
   * @param {*[]} [properties.optionalJSONArray] Description for optional object array
   * @param {number[]} [properties.optionalNumberArray] Description for optional number array
   * @param {string[]} [properties.optionalStringArray] Description for optional string array
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithOptionalArrayTypes(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} [properties] The event's properties.
   * @param {number[]} [properties.optionalArrayNumber] Property has no description in tracking plan.
   * @param {string[]} [properties.optionalArrayString] Property has no description in tracking plan.
   * @param {boolean} [properties.optionalBoolean] Property has no description in tracking plan.
   * @param {number} [properties.optionalNumber] Property has no description in tracking plan.
   * @param {string} [properties.optionalString] Optional String property description
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithOptionalProperties(userId, properties, options) {
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
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {number} [properties.optional_event_property] optional_event_property description
   * @param {number} [properties.optional_template_property] optional_template_property description
   * @param {string} properties.required_event_property required_event_property description
   * @param {string} properties.required_template_property required_template_property description
   * @param {EventOptions} [options] Options for this track call.
   *
   * @return {PromiseResult}
   */
  eventWithTemplateProperties(userId, properties, options) {
    return this.track(userId, new EventWithTemplateProperties(properties), options);
  }
}

module.exports.Ampli = Ampli;
module.exports.ApiKey = ApiKey;
module.exports.DefaultConfiguration = DefaultConfiguration;
module.exports.EventMaxIntForTest = EventMaxIntForTest;
module.exports.EventNoProperties = EventNoProperties;
module.exports.EventObjectTypes = EventObjectTypes;
module.exports.EventWithAllProperties = EventWithAllProperties;
module.exports.EventWithArrayTypes = EventWithArrayTypes;
module.exports.EventWithConstTypes = EventWithConstTypes;
module.exports.EventWithDifferentCasingTypes = EventWithDifferentCasingTypes;
module.exports.EventWithEnumTypes = EventWithEnumTypes;
module.exports.EventWithOptionalArrayTypes = EventWithOptionalArrayTypes;
module.exports.EventWithOptionalProperties = EventWithOptionalProperties;
module.exports.EventWithTemplateProperties = EventWithTemplateProperties;
module.exports.ampli = new Ampli();
