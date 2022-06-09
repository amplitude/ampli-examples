import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Xpmt } from './xpmt';

const {
  REACT_APP_EXPERIMENT_DEPLOYMENT_KEY = '',
  REACT_APP_EXPERIMENT_DEPLOYMENT_NAME = '',
} = process.env;

// (1) Initialize the experiment client
// const experiment = Experiment.initialize(REACT_APP_EXPERIMENT_DEPLOYMENT_KEY);
const xpmt = Xpmt.initialize(REACT_APP_EXPERIMENT_DEPLOYMENT_KEY);

// (2) Fetch variants for a user
const user = {
  user_id: 'user@company.com',
  device_id: 'abcdefg',
  user_properties: {
    'premium': true,
  },
};

// const variants = Object.keys(experiment.all()).map(variant => {
//   console.log(`${variant}`);
// });

// (3) Lookup a flag's variant
// const variant = experiment.variant('<FLAG_KEY>');
// if (variant.value === 'on') {
//   // Flag is on
// } else {
//   // Flag is off
// }

const jsons = (obj: any) => JSON.stringify(obj, null, 2);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={async () => {
          await xpmt.fetch(user);
        }}>
          Fetch user
        </button>
        <button onClick={() => {
          console.log(`Listing variants`); // eslint-disable-line no-console
          Object.keys(xpmt.client.all()).forEach(variant => {
            console.log(`${variant}`);
          });
        }}>
          List variants
        </button>
        <button onClick={() => {
          const codegenExperiment = xpmt.codegenExperiment();
          console.log(`${codegenExperiment.name}: ${jsons(codegenExperiment)}`);

          if (codegenExperiment.treatment) {
            // Access the payload (optional)
            // payload = codegenExperiment.treatment.payload;
          } else if (codegenExperiment.control) {
            // Access the payload (optional)
            // payload = codegenExperiment.control.payload;
          }
        }}>
          Show "Codegen Experiment"
        </button>
        <button onClick={() => {
          const codegenStringExperiment = xpmt.codegenStringExperiment();
          console.log(`${codegenStringExperiment.name}: ${jsons(codegenStringExperiment)}`);

          if (codegenStringExperiment.treatment) {
            // Access the payload (optional)
            // payload = codegenStringExperiment.treatment.payload;
          } else if (codegenStringExperiment.control) {
            // Access the payload (optional)
            // payload = codegenStringExperiment.control.payload;
          }
        }}>
          Show "Codegen String Experiment"
        </button>
      </header>
    </div>
  );
}

export default App;
