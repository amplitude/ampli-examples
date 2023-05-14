/* tslint:disable */
/* eslint-disable */
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull browser-js-ampli'
 *
 * Required dependencies: amplitude-js@^8.21.0
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: browser:javascript-ampli
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/browser-js-ampli)
 */

import amplitude from 'amplitude-js';

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
 * Data to be processed by middleware
 * @typedef MiddlewarePayload
 * @type {object}
 * @property {BaseEvent} event
 * @property {MiddlewareExtra} [extra]
 */

/**
 * Function called at the end of each Middleware to run the next middleware in the chain
 * @typedef MiddlewareNext
 * @type {function}
 * @param {MiddlewarePayload} payload
 *
 * @return
 */

/**
 * A function to run on the Event stream (each logEvent call)
 * @typedef Middleware
 * @type {function}
 * @param {MiddlewarePayload} payload The event and extra data being sent
 * @param {MiddlewareNext} next Function to run the next middleware in the chain, not calling next will end the middleware chain
 * @return
 */

/**
 * @typedef LoadClientOptions
 * @type {object}
 * @property {string} [apiKey]
 * @property {Object} [options]
 * @property {AmplitudeClient} [instance]
 */

/**
 * @typedef LoadOptions
 * @type {object}
 * @property {'prod'|'dev'} [environment]
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
 * @property {string} prod
 * @property {string} dev
 */
export const ApiKey = {
  prod: '',
  dev: ''
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

export const SpecialEventType = {
  Identify: "Identify",
  Group: "Group"
}

/**
 * Default Amplitude configuration options. Contains tracking plan information.
 */
export const DefaultOptions = {
  plan: {
    version: '1',
    branch: 'main',
    source: 'browser-js-ampli',
    versionId: 'a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'browser-javascript-ampli',
      sourceVersion: '1.0.0'
    }
  }
};

export class Identify {
  constructor(properties) {
    this.event_type = 'Identify';
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
      'Boolean Const': true,
      'Integer Const': 10,
      'Number Const': 2.2,
      'String Const': "String-Constant",
      'String Const WIth Quotes': "\"String \"Const With\" Quotes\"",
      'String Int Const': 0,
    };
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

export class EventWithTemplateProperties {
  constructor(properties) {
    this.event_type = 'Event With Template Properties';
    this.event_properties = properties;
  }
}

export class EventWithDifferentCasingTypes {
  constructor(properties) {
    this.event_type = 'event withDifferent_CasingTypes';
    this.event_properties = properties;
  }
}

export class EventMaxIntForTest {
  constructor(properties) {
    this.event_type = 'EventMaxIntForTest';
    this.event_properties = properties;
  }
}

// prettier-ignore
export class Ampli {
  constructor() {
    /* @type {AmplitudeClient|undefined} */
    this.amplitude = undefined;
    this.disabled = false;
    /* @type {Middleware[]} */
    this.middlewares = [];
  }

  /**
   * @return {AmplitudeClient}
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
   * @param {LoadOptions} options Configuration options to initialize the Ampli SDK with. 'environment', 'client.apiKey' or 'client.instance' is required.
   */
  load(options) {
    this.disabled = options?.disabled ?? false;

    if (this.isLoaded) {
      console.warn('WARNING: Ampli is already initialized. Ampli.load() should be called once at application startup.');
      return;
    }

    let apiKey;
    if (options?.client?.apiKey) {
      apiKey = options.client.apiKey;
    } else if (options?.environment) {
      apiKey = ApiKey[options.environment];
    }

    if (options?.client?.instance) {
      this.amplitude = options?.client?.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.getInstance();
      this.amplitude?.init(apiKey, undefined, { ...DefaultOptions, ...(options?.client?.options ?? options?.client?.config) });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }
  }

  /**
   * Identify a user and set or update that user's properties.
   *
   * @param {string|undefined} userId The user's id.
   * @param {Object} properties The user's properties.
   * @param {string[]} [properties.optionalArray] Description for identify optionalArray
   * @param {number} properties.requiredNumber Description for identify requiredNumber
   * @param {IdentifyOptions} [options] Optional event options.
   * @param {MiddlewareExtra} [extra] Extra unstructured data for middleware.
   */
  identify(userId, properties, options, extra) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const event = {
      event_type: SpecialEventType.Identify,
      event_properties: properties,
      user_id: userId || options?.user_id,
      device_id: options?.device_id
    };
    this.runMiddleware({ event, extra }, payload => {
      if (payload.event.user_id) {
        this.amplitude?.setUserId(payload.event.user_id);
      }
      if (payload.event.device_id) {
        this.amplitude?.setDeviceId(payload.event.device_id);
      }

      this._identify(payload.event, options);
    });
  }

  _identify(event, options) {
    const ampIdentify = new amplitude.Identify();
    if (event.event_properties != null) {
      for (const [key, value] of Object.entries(event.event_properties)) {
        ampIdentify.set(key, value);
      }
    }
    this.amplitude.identify(
      ampIdentify,
      options?.callback,
      options?.errorCallback
    );
  }

  /**
   * Track event
   *
   * @param {BaseEvent} event The event to track.
   * @param {EventOptions} [options] Optional event options.
   * @param {MiddlewareExtra} [extra] Extra unstructured data for middleware.
   */
  track(event, options, extra) {
    if (!this.isInitializedAndEnabled()) {
      return;
    }

    const trackEvent = { ...event, ...options };
    this.runMiddleware({ event: trackEvent, extra }, payload => {
      if (payload.event.user_id) {
        this.amplitude?.setUserId(payload.event.user_id);
      }
      if (payload.event.device_id) {
        this.amplitude?.setDeviceId(payload.event.device_id);
      }

      const userProperties = payload.event.user_properties;
      if (userProperties) {
        const identifyEvent = {
          event_type: SpecialEventType.Identify,
          event_properties: userProperties,
          user_id: payload.event.user_id,
          device_id: payload.event.device_id
        };
        this._identify(identifyEvent, options);
      }

      this.amplitude.logEvent(
        payload.event.event_type,
        payload.event.event_properties,
        options?.callback,
        options?.errorCallback,
      );
    });
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
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventNoProperties(options, extra) {
    this.track(new EventNoProperties(), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {*} properties.requiredObject Property Object Type
   * @param {*[]} properties.requiredObjectArray Property Object Array Type
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventObjectTypes(properties, options, extra) {
    this.track(new EventObjectTypes(properties), options, extra);
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
   */
  eventWithAllProperties(properties, options, extra) {
    this.track(new EventWithAllProperties(properties), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {boolean[]} properties.requiredBooleanArray description for required boolean array
   * @param {string[]} properties.requiredEnumArray Description for enum array property
   * @param {number[]} properties.requiredNumberArray Description for required number array
   * @param {*[]} properties.requiredObjectArray Description for required object array
   * @param {string[]} properties.requiredStringArray description for required string array
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithArrayTypes(properties, options, extra) {
    this.track(new EventWithArrayTypes(properties), options, extra);
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
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithConstTypes(options, extra) {
    this.track(new EventWithConstTypes(), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {'optional enum 1'|'optional enum 2'} [properties.optional enum] Description for required enum
   * @param {'required enum 1'|'required enum 2'} properties.required enum Description for optional enum
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithEnumTypes(properties, options, extra) {
    this.track(new EventWithEnumTypes(properties), options, extra);
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
   * @param {Object} [properties] The event's properties.
   * @param {boolean[]} [properties.optionalBooleanArray] Description for optional boolean array
   * @param {string[]} [properties.optionalEnumArray] Description for optional enum array
   * @param {*[]} [properties.optionalJSONArray] Description for optional object array
   * @param {number[]} [properties.optionalNumberArray] Description for optional number array
   * @param {string[]} [properties.optionalStringArray] Description for optional string array
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithOptionalArrayTypes(properties, options, extra) {
    this.track(new EventWithOptionalArrayTypes(properties), options, extra);
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
   * @param {Object} [properties] The event's properties.
   * @param {number[]} [properties.optionalArrayNumber] Property has no description in tracking plan.
   * @param {string[]} [properties.optionalArrayString] Property has no description in tracking plan.
   * @param {boolean} [properties.optionalBoolean] Property has no description in tracking plan.
   * @param {number} [properties.optionalNumber] Property has no description in tracking plan.
   * @param {string} [properties.optionalString] Optional String property description
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithOptionalProperties(properties, options, extra) {
    this.track(new EventWithOptionalProperties(properties), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {number} [properties.optional_event_property] optional_event_property description
   * @param {number} [properties.optional_template_property] optional_template_property description
   * @param {string} properties.required_event_property required_event_property description
   * @param {string} properties.required_template_property required_template_property description
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithTemplateProperties(properties, options, extra) {
    this.track(new EventWithTemplateProperties(properties), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {'enum with space'} properties.enum with space Description for enum with space
   * @param {'enum_snake_case'} properties.enum_snake_case description_for_enum_snake_case
   * @param {'enumCamelCase'} properties.enumCamelCase descriptionForEnumCamelCase
   * @param {'EnumPascalCase'} properties.EnumPascalCase DescirptionForEnumPascalCase
   * @param {string} properties.property with space Description for case with space
   * @param {string} properties.property_with_snake_case Description_for_snake_case
   * @param {string} properties.propertyWithCamelCase descriptionForCamelCase
   * @param {string} properties.PropertyWithPascalCase DescriptionForPascalCase
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventWithDifferentCasingTypes(properties, options, extra) {
    this.track(new EventWithDifferentCasingTypes(properties), options, extra);
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
   * @param {Object} properties The event's properties.
   * @param {number} properties.intMax10 property to test schema validation
   * @param {EventOptions} [options] Options for this track call.
   * @param {MiddlewareExtra} [extra] Extra untyped parameters for use in middleware.
   */
  eventMaxIntForTest(properties, options, extra) {
    this.track(new EventMaxIntForTest(properties), options, extra);
  }

  /**
   * Add new middleware to end of chain
   *
   * @param {Middleware} middleware
   */
  addEventMiddleware(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Runs all middleware
   *
   * @param {MiddlewarePayload} payload
   * @param {MiddlewareNext} next The method to run after all middleware.
   *
   * @protected
   */
  runMiddleware(payload, next) {
    let curMiddlewareIndex = -1;
    const middlewareCount = this.middlewares.length;

    const middlewareNext = curPayload => {
      curMiddlewareIndex += 1;
      if (curMiddlewareIndex < middlewareCount) {
        this.middlewares[curMiddlewareIndex](curPayload, _next);
      } else {
        next(curPayload);
      }
    };

    const _next = middlewareCount > 0 ? middlewareNext : next;

    _next(payload);
  }
}

export const ampli = new Ampli();
