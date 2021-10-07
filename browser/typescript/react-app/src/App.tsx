import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as Ampli from "./ampli";
import { Environment, EventWithOptionalProperties } from "./ampli";

const { REACT_APP_AMPLITUDE_API_KEY = '' } = process.env;

// Get the default Ampli instance
// const ampli = Ampli.getInstance();

// Get Ampli instance for a particular Environment
// const ampliProd = Ampli.getInstance(Environment.production);

// Set your own Config and Amplitude API key
const ampli = Ampli.getInstance(undefined, { logLevel: "INFO" }, REACT_APP_AMPLITUDE_API_KEY);

const userId = 'ampli-browser-ts-user-id';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Welcome to Ampli Example with React</h2>

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
            requiredEnum: Ampli.RequiredEnum.Enum1,
            requiredInteger: 42,
            requiredString: 'Hi!',
          })
        }}>Event w/ All Properties</button>
      </header>
    </div>
  );
}

export default App;
