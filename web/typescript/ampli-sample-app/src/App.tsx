import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Ampli, getInstance, EventWithOptionalProperties} from './ampli';

const AMPLITUDE_API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY ?? '';
const ampli: Ampli= getInstance(AMPLITUDE_API_KEY);
const userId = 'ampli-user-id';

const handleClick = () => {
  ampli.track(new EventWithOptionalProperties({
    optionalBoolean: true,
  }), undefined, userId);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p onClick={handleClick}>
          Welcome to Ampli Example with React
        </p>
      </header>
    </div>
  );
}

export default App;
