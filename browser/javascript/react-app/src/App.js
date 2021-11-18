/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';

import * as Ampli from "./ampli";
import { DefaultConfig, Environment, EventWithOptionalProperties } from "./ampli";
import { getSegmentMiddleware, loggingMiddleware, stopMiddleware } from "./middleware";

const { REACT_APP_AMPLITUDE_API_KEY = '', REACT_APP_SEGMENT_WRITE_KEY = '' } = process.env;

// Get the default Ampli instance
// const ampli = Ampli.getInstance();

// Get Ampli instance for a particular Environment
// const ampliProd = Ampli.getInstance(Environment.production);

// Set your own Config and Amplitude API key
const ampli = Ampli.getInstance(undefined, {
  ...DefaultConfig,
  logLevel: "INFO",
}, REACT_APP_AMPLITUDE_API_KEY);

const userId = 'ampli-browser-js-user-id';

ampli.addEventMiddleware(loggingMiddleware);

/**
 * You can add middleware for 3rd party destination support
 */
// const segmentMiddleware = getSegmentMiddleware(REACT_APP_SEGMENT_WRITE_KEY);
// ampli.addEventMiddleware(segmentMiddleware);

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
