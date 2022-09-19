/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull node-js-ampli'
 *
 * Required dependencies: @amplitude/node@^1.10.0
 * Tracking Plan Version: 0
 * Build: 1.0.0
 * Runtime: node.js:javascript-ampli
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/node-js-ampli)
 */

const { Identify: AmplitudeIdentify, IdentifyEvent } = require('@amplitude/identify');
const { init: initNodeClient, NodeClient, Status, Options } = require('@amplitude/node');

/**
 * @typedef {Object} BaseEvent
 * @property {string} event_type
 * @property {Object.<string, *>} [event_properties]
 */

/**
 * @typedef LoadClientOptions
 * @type {object}
 * @property {string} [apiKey]
 * @property {Options} [options]
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
 * @typedef {Object} IdentifyOptions
 * @type {object}
 */

/**
 * @typedef {Object} GroupOptions
 * @type {object}
 */

/**
 * @typedef {Object} MiddlewareExtra
 * @type {Object.<string, *>}
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
 * Default NodeClient Options. Contains tracking plan information.
 */
const DefaultOptions = {
  plan: {
    version: '0',
    branch: 'main',
    source: 'node-js-ampli',
    versionId: '79154a50-f057-4db5-9755-775e4e9f05e6'
  },
  ...{
    ingestionMetadata: {
      source_name: 'node-javascript-ampli',
      source_version: '1.0.0'
    }
  }
};

class Identify {
  constructor(properties) {
    this.event_type = 'Identify';
    this.event_properties = properties;
  }
}

class Group {
  constructor(properties) {
    this.event_type = 'Group';
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

const getDefaultPromiseResponse = () => Promise.resolve<Response>({
  status: Status.Skipped,
  statusCode: 200,
});

/**
 * getIdentifyEvent
 * @param {AmplitudeIdentify} amplitudeIdentify
 * @param {string} [userId]
 * @param {string} [deviceId]
 * @return {IdentifyEvent}
 */
function getIdentifyEvent(amplitudeIdentify, userId, deviceId) {
  const identifyEvent = amplitudeIdentify.identifyUser('tmp-user-id-to-pass-validation');
  identifyEvent.user_id = userId;
  identifyEvent.device_id = deviceId;

  return identifyEvent;
}

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
    if (!this.isLoaded) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   * @param {LoadOptions} [options] Configuration options to initialize the Ampli SDK with.
   */
  load(options) {
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

  /**
   * Identify a user and set or update that user's properties.
   *
   * @param {string|undefined} userId The user's ID.
   * @param {Object} properties The user's properties.
   * @param {string[]} [properties.optionalArray] Description for identify optionalArray
   * @param {number} properties.requiredNumber Description for identify requiredNumber
   * @param {IdentifyOptions} [options] Options for this identify call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  identify(userId, properties, options, extra) {
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
      ? this.amplitude?.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  /**
   * Set Group name and value
   *
   * @param {string|undefined} userId The user's Id
   * @param {string} name
   * @param {string} value
   * @param {GroupOptions} [options]
   * @param {MiddlewareExtra} [extra]
   *
   * @return {{promise: Promise<Response>}}
   */
  setGroup(userId, name, value, options, extra) {
    const identify = new AmplitudeIdentify().setGroup(name, value);
    const identifyEvent = getIdentifyEvent(identify, userId || options?.user_id, options?.device_id);
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude.logEvent({ ...options, ...identifyEvent }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  /**
   * Identify a group and set or update that group's properties.
   *
   * @param {string} groupType The group type.
   * @param {string} groupName The group name.
   * @param {Object} properties The group's properties.
   * @param {string} [properties.optionalString] Description for group optionalString
   * @param {boolean} properties.requiredBoolean Description for group requiredBoolean
   * @param {GroupOptions} [options] Options for this groupIdentify call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  groupIdentify(groupType, groupName, properties, options, extra) {
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
      ? this.amplitude?.logEvent({ ...options, ...groupIdentifyEvent }, extra)
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {number} properties.intMax10 property to test schema validation
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventMaxIntForTest(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventNoProperties(userId, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {*} properties.requiredObject Property Object Type
   * @param {*[]} properties.requiredObjectArray Property Object Array Type
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventObjectTypes(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {string} [properties.optionalString] Event 2 Property - Optional String    *     * Examples:    * Some string, or another
   * @param {string[]} properties.requiredArray Event 2 Property - Array
   * @param {boolean} properties.requiredBoolean Event 2 Property - Boolean
   * @param {'Enum1'|'Enum2'} properties.requiredEnum Event 2 Property - Enum
   * @param {number} properties.requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
   * @param {number} properties.requiredNumber Event 2 Property - Number
   * @param {string} properties.requiredString Event 2 Property - String
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithAllProperties(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {boolean[]} properties.requiredBooleanArray description for required boolean array
   * @param {number[]} properties.requiredNumberArray Description for required number array
   * @param {*[]} properties.requiredObjectArray Description for required object array
   * @param {string[]} properties.requiredStringArray description for required string array
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithArrayTypes(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithConstTypes(userId, options, extra) {
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
   * @param {string} userId The user's ID.
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
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithDifferentCasingTypes(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {'optional enum 1'|'optional enum 2'} [properties.optional enum] Description for required enum
   * @param {'required enum 1'|'required enum 2'} properties.required enum Description for optional enum
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithEnumTypes(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} [properties] The event's properties.
   * @param {boolean[]} [properties.optionalBooleanArray] Description for optional boolean array
   * @param {*[]} [properties.optionalJSONArray] Description for optional object array
   * @param {number[]} [properties.optionalNumberArray] Description for optional number array
   * @param {string[]} [properties.optionalStringArray] Description for optional string array
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithOptionalArrayTypes(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} [properties] The event's properties.
   * @param {number[]} [properties.optionalArrayNumber] Property has no description in tracking plan.
   * @param {string[]} [properties.optionalArrayString] Property has no description in tracking plan.
   * @param {boolean} [properties.optionalBoolean] Property has no description in tracking plan.
   * @param {number} [properties.optionalNumber] Property has no description in tracking plan.
   * @param {string} [properties.optionalString] Optional String property description
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithOptionalProperties(userId, properties, options, extra) {
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
   * @param {string} userId The user's ID.
   * @param {Object} properties The event's properties.
   * @param {number} [properties.optional_event_property] optional_event_property description
   * @param {number} [properties.optional_template_property] optional_template_property description
   * @param {string} properties.required_event_property required_event_property description
   * @param {string} properties.required_template_property required_template_property description
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  eventWithTemplateProperties(userId, properties, options, extra) {
    return this.track(userId, new EventWithTemplateProperties(properties), options, extra);
  }

  /**
   * Track any event.
   * @param {string|undefined} userId The user's ID.
   * @param {BaseEvent} event The event.
   * @param {EventOptions} [options] Amplitude event options.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   *
   * @return {{promise: Promise<Response>}}
   */
  track(userId, event, options, extra) {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude.logEvent({ ...options, ...event,  user_id: userId }, extra)
      : getDefaultPromiseResponse();

    return { promise };
  }

  /**
   * Flush pending events in queue
   *
   * @return {{promise: Promise<Response>}}
   */
  flush() {
    const promise = this.isInitializedAndEnabled()
      ? this.amplitude.flush()
      : getDefaultPromiseResponse();

    return { promise };
  }
}

module.exports.Ampli = Ampli;
module.exports.ApiKey = ApiKey;
module.exports.DefaultOptions = DefaultOptions;
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
