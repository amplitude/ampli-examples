import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Ampli, getInstance, EventWithOptionalProperties} from './ampli';
 
const userId = 'ampli-user-id';

// Read Configuration
// dotenv.config()
const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY ?? '';

/*
* Get a default Ampli instance via getInstance()
* This requires connecting your account via `ampli pull`
* which will set you API key in the generated Ampli SDK
*/
// const ampli = Ampli.getInstance(AMPLITUDE_API_KEY);

/** OR Provide an instance name */
// const ampli = Ampli.getInstance(AMPLITUDE_API_KEY, INSTANCE_NAME);

const ampli: Ampli= getInstance(AMPLITUDE_API_KEY);

ampli.eventNoProperties();
ampli.track(new EventWithOptionalProperties({
  optionalBoolean: true,
}), undefined, userId);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
