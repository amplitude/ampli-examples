/* eslint-disable no-unused-vars */
import * as amplitude from '@amplitude/analytics-browser';
import logo from "./logo.svg";
import "./App.css";

import { ampli, DefaultConfiguration, EventWithOptionalProperties } from "./ampli";

const { REACT_APP_AMPLITUDE_API_KEY = "", REACT_APP_SEGMENT_WRITE_KEY = "" } =
  process.env;

const userId = "ampli-browser-js-user-id";

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
 * requires "import amplitude from '@amplitude/analytics-browser';"
 */
// amplitude.init(REACT_APP_AMPLITUDE_API_KEY, undefined, { ...DefaultConfiguration, logLevel: 3 });
// ampli.load({ client: { instance: amplitude } });

/**
 * OR Use an existing window.amplitude instance from code snippet (not recommended)
 */
// window.amplitude.init(REACT_APP_AMPLITUDE_API_KEY);
// ampli.load({ client: { instance: window.amplitude } });

/**
 * OR Specify AmplitudeClient 'options'
 */
ampli.load({
  client: {
    apiKey: REACT_APP_AMPLITUDE_API_KEY,
    configuration: { ...DefaultConfiguration, logLevel: 3 },
  },
});

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Ampli Browser JavaScript Example with React</h2>

        <button onClick={() => ampli.identify(userId, { requiredNumber: 42 })}>
          Identify
        </button>

        <button
          onClick={() => ampli.client.setGroup("test group", "browser-js-ampli")}
        >
          Group
        </button>

        <button onClick={() => {
          const amplitudeIdentify = new amplitude.Identify();
          amplitudeIdentify.set('requiredBoolean', true);
          ampli.client.groupIdentify('test group', 'browser-js-ampli', amplitudeIdentify);
        }}>
          Group Identify
        </button>

        <button
          onClick={() =>
            ampli.track(
              new EventWithOptionalProperties({ optionalBoolean: true })
            )
          }
        >
          Event w/ Optional Properties
        </button>

        <button
          onClick={() => {
            ampli.eventWithAllProperties({
              requiredNumber: 1.23,
              requiredArray: ["I'm", "required"],
              requiredBoolean: false,
              requiredEnum: "Enum1",
              requiredInteger: 42,
              requiredString: "Hi!",
            });
          }}
        >
          Event w/ All Properties
        </button>

        <button
          onClick={() => {
            ampli.eventNoProperties();

            ampli.eventWithConstTypes();

            ampli.eventWithOptionalProperties({
              optionalBoolean: true,
            });

            ampli.eventMaxIntForTest({
              intMax10: 5,
            });

            ampli.eventObjectTypes({
              requiredObject: { "key-1": "value-1" },
              requiredObjectArray: [
                { "key-1": "value-1" },
                { "key-2": "value-2" },
              ],
            });

            ampli.eventWithArrayTypes({
              requiredBooleanArray: [true, false],
              requiredNumberArray: [1.2, 3, 4.56],
              requiredObjectArray: [
                { "key-1": "value-1" },
                { "key-2": "value-2" },
              ],
              requiredStringArray: ["string-1", "string-2", "string-3"],
            });

            ampli.eventWithEnumTypes({
              "required enum": "required enum 2",
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
              "enum with space": "enum with space",
              enum_snake_case: "enum_snake_case",
              enumCamelCase: "enumCamelCase",
              EnumPascalCase: "EnumPascalCase",
              "property with space": "property with space",
              property_with_snake_case: "property with snake case",
              propertyWithCamelCase: "property with camel case",
              PropertyWithPascalCase: "property with pascal case",
            });
          }}
        >
          Other Events
        </button>
      </header>
    </div>
  );
}

export default App;
