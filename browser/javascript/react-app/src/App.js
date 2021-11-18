/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';

import { ampli, DefaultConfig, Environment, EventWithOptionalProperties } from './ampli';
import { getSegmentMiddleware, loggingMiddleware, stopMiddleware } from './middleware';

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
 * OR Specify a Ampli.Environment
 */
// ampli.load({ environment: Environment.development})

/** OR Provide a specific Amplitude API key */
// ampli.load({ client: { apiKey: REACT_APP_AMPLITUDE_API_KEY } })

/**
 * OR Use an existing Amplitude instance
 * requires "import amplitude from 'amplitude-js';"
 */
// const instance = amplitude.getInstance();
// instance.init(REACT_APP_AMPLITUDE_API_KEY, undefined, { ...DefaultConfig, logLevel: "INFO" });
// ampli.load({ client: { instance } });

/**
 * OR Use an existing window.amplitude instance from code snippet (not recommended)
 */
// const instance = window.amplitude.getInstance().init(REACT_APP_AMPLITUDE_API_KEY);
// ampli.load({ client: { instance as any } });

/**
 * OR Specify AmplitudeClient 'config'
 */
ampli.load({
  client: {
    apiKey: REACT_APP_AMPLITUDE_API_KEY,
    config: { ...DefaultConfig, logLevel: "INFO" }
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
        <h2>Ampli Browser JavaScript Example with React</h2>

        <button onClick={() => {
          ampli.identify(userId, undefined, {
            requiredNumber: 42,
          })
        }}>Identify</button>

        <button onClick={() => {
          ampli.setGroup('test group', 'browser-js-ampli')
        }}>Group</button>

        <button onClick={() => {
          ampli.track(new EventWithOptionalProperties({
            optionalBoolean: true,
          }));
        }}>Event w/ Optional Properties</button>

        <button onClick={() => {
          ampli.eventWithAllProperties({
            requiredNumber: 1.23,
            requiredArray: ["I'm", 'required'],
            requiredBoolean: false,
            requiredEnum: 'Enum1',
            requiredInteger: 42,
            requiredString: 'Hi!',
          })
        }}>Event w/ All Properties</button>

        <button onClick={() => {
          ampli.track(new EventWithOptionalProperties({
            optionalString: "Event with segment middleware extras",
          }), undefined, {
            segment: {
              callback: () => { console.log('Segment track complete') },
              anonymousId: 'anon-id',
            }
          });
        }}>Event w/ Segment</button>
      </header>
    </div>
  );
}

export default App;
