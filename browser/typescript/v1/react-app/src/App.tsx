/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import amplitude from 'amplitude-js';
import logo from './logo.svg';
import './App.css';

import { ampli, Ampli } from "./ampli";
import { DefaultOptions, EventWithOptionalProperties } from "./ampli";
import { getSegmentMiddleware, SegmentExtra } from "./middleware/segmentMiddleware";
import { getSegmentItlyPluginMiddleware } from "./middleware/segmentItlyPluginMiddleware";
import { stopMiddleware } from "./middleware/stopMiddleware";
import loggingMiddleware from "./middleware/loggingMiddleware";

const { REACT_APP_AMPLITUDE_API_KEY = '', REACT_APP_SEGMENT_WRITE_KEY = '' } = process.env;

const userId = 'ampli-browser-ts-user-id';

/**
 * Start by calling ampli.load()
 *
 * 'ampli' is the default instance of Ampli()
 */

/**
 * When you pull your tracking plan you can use the defaults and call load() without arguments
 *
 * This requires connecting your account via `ampli pull`
 * which will set you API key in the generated Ampli SDK
 */
// ampli.load();

/**
 * OR Specify an environment
 */
// ampli.load({ environment: 'development' })

/** OR Provide a specific Amplitude API key */
// ampli.load({ client: { apiKey: REACT_APP_AMPLITUDE_API_KEY } })

/**
 * OR Use an existing Amplitude instance
 * requires "import amplitude from 'amplitude-js';"
 */
// const instance = amplitude.getInstance();
// instance.init(REACT_APP_AMPLITUDE_API_KEY, undefined, { ...DefaultOptions, logLevel: "INFO" });
// ampli.load({ client: { instance } });

/**
 * OR Use an existing window.amplitude instance from code snippet (not recommended)
 */
// const instance = window.amplitude.getInstance().init(REACT_APP_AMPLITUDE_API_KEY);
// ampli.load({ client: { instance: instance as any } });

/**
 * OR Specify AmplitudeClient 'options'
 */
ampli.load({
  client: {
    apiKey: REACT_APP_AMPLITUDE_API_KEY,
    options: { ...DefaultOptions, logLevel: "INFO" }
  }
})

/**
 * For testing you can disable ampli
 */
// ampli.load({
//   disabled: process.env.IS_TESTING ? true : false,
// });

/**
 * Make as many Ampli instances as you want
 */
// const ampli2 = new Ampli();
// ampli2.load({ client: { apiKey: 'api-key-2' } });

/**
 * Middleware can be used for many things including
 * logging, filtering, event modification and more.
 */

/**
 * Logging
 */
ampli.addEventMiddleware(loggingMiddleware);

/**
 * 3rd party destination support
 */
// const segmentMiddleware = getSegmentMiddleware(REACT_APP_SEGMENT_WRITE_KEY);
// ampli.addEventMiddleware(segmentMiddleware);

/**
 * Legacy Itly Plugins can also be adapted to middleware
 * WARNING: This is not recommended, but is shown for legacy Itly customers as an example.
 * WARNING: Instead, we recommend directly integrating with 3rd party destinations
 * WARNING: in Middleware like in the getSegmentMiddleware above.
 */
// const segmentItlyPluginMiddleware = getSegmentItlyPluginMiddleware(REACT_APP_SEGMENT_WRITE_KEY);
// ampli.addEventMiddleware(segmentItlyPluginMiddleware);

/**
 * Middleware can also modify the event stream
 * Adding stop middleware will prevent events from going to Amplitude
 */
// ampli.addEventMiddleware(stopMiddleware);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Ampli Browser TypeScript Example with React</h2>

        <button onClick={() => ampli.identify(userId, { requiredNumber: 42 })}>
          Identify
        </button>

        <button onClick={() => ampli.client.setGroup('test group', 'browser-ts-ampli')}>
          Group
        </button>

        <button onClick={() => {
          const amplitudeIdentify = new amplitude.Identify();
          amplitudeIdentify.set("requiredBoolean", true);
          ampli.client.groupIdentify('test group', 'browser-ts-ampli', amplitudeIdentify);
        }}>
          Group Identify
        </button>

        <button onClick={() => ampli.track(new EventWithOptionalProperties({ optionalBoolean: true }))}>
          Event w/ Optional Properties
        </button>

        <button onClick={() => {
          ampli.eventWithAllProperties({
            requiredNumber: 1.23,
            requiredArray: ["I'm", 'required'],
            requiredBoolean: false,
            requiredEnum: "Enum1",
            requiredInteger: 42,
            requiredString: 'Hi!',
          })
        }}>
          Event w/ All Properties
        </button>

        <button onClick={() => {
          ampli.track(new EventWithOptionalProperties({
            optionalString: "Event with segment middleware extras",
          }), undefined, {
            segment: {
              callback: () => { console.log('Segment track complete') },
              anonymousId: 'anon-id',
            }
          } as SegmentExtra);
        }}>
          Event w/ Segment
        </button>

        <button onClick={() => {
          ampli.eventNoProperties();

          ampli.eventWithConstTypes();

          ampli.eventWithOptionalProperties({
            optionalBoolean: true,
          });

          ampli.eventMaxIntForTest({
            intMax10: 5,
          });

          ampli.eventObjectTypes({
            requiredObject: { 'key-1': 'value-1' },
            requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
          });

          ampli.eventWithArrayTypes({
            requiredBooleanArray: [true, false],
            requiredEnumArray: ['enum1'],
            requiredNumberArray: [1.2, 3, 4.56],
            requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
            requiredStringArray: ['string-1', 'string-2', 'string-3'],
          });

          ampli.eventWithEnumTypes({
            'required enum': 'required enum 2',
          });

          ampli.eventWithOptionalArrayTypes({
            optionalBooleanArray: [true, false],
          });

          ampli.eventWithTemplateProperties({
            required_event_property: 'event property',
            required_template_property: 'template property',
            optional_template_property: 1.23,
          });

          ampli.eventWithDifferentCasingTypes({
            'enum with space': 'enum with space',
            enum_snake_case: 'enum_snake_case',
            enumCamelCase: 'enumCamelCase',
            EnumPascalCase: 'EnumPascalCase',
            'property with space': 'property with space',
            property_with_snake_case: 'property with snake case',
            propertyWithCamelCase: 'property with camel case',
            PropertyWithPascalCase: 'property with pascal case'
          });
        }}>
          Other Events
        </button>
      </header>
    </div>
  );
}

export default App;
