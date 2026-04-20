import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  CodegenArrayExperiment,
  Xpmt
} from './xpmt';
import { ExperimentUser } from "@amplitude/experiment-js-client";
import { CodeBlock, EXPERIMENT_CODE, XPMT_FLAG_CODE } from "./code-snippets";

const {
  REACT_APP_EXPERIMENT_DEPLOYMENT_KEY = '',
  REACT_APP_EXPERIMENT_DEPLOYMENT_NAME = '',
} = process.env;

// (1) Initialize the experiment client
const xpmt = Xpmt.initialize(REACT_APP_EXPERIMENT_DEPLOYMENT_KEY);

// (2) Fetch variants for a user
const ampliUser: ExperimentUser = {
  user_id: 'justin.fiedler@amplitude.com',
  device_id: 'experiment-codegen-device-id',
  user_properties: {
    'premium': true,
  },
};

const genericUser = {
  user_id: 'user@company.com',
  device_id: 'experiment-codegen-device-id-generic',
};

function App() {
  const [userType, setUserType] = useState<string>();
  const [words, setWords] = useState<string[]>([]);

  const switchUser = async (user: ExperimentUser) => {
    await xpmt.fetch(user);

    // Each variant has a named, strongly typed property on the Experiment
    if (xpmt.codegenStringExperiment().control) {
      // Handle control case
    } else if (xpmt.codegenStringExperiment().treatment) {
      // Handle treatment case
    }

    const words = xpmt.codegenArrayExperiment();
    // You can also access the current variant (semi-typed)
    if (words.variant) {
      setWords([...words.variant?.payload]);

      switch (words.variant.key) {
        // Variant keys can be accessed easily without typos
        case CodegenArrayExperiment.Variants.Ampli:
          setUserType('ampli');
          break;
        case CodegenArrayExperiment.Variants.Generic:
          setUserType('generic');
          break;
      }
    } else {
      setWords([]);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Experiment Code Generation with Ampli.
        </p>

        <div>
          <button onClick={() => switchUser(genericUser)} className={userType === 'generic' ? 'highlighted' : ''}>
            Generic User
          </button>
          <button onClick={() => switchUser(ampliUser)} className={userType === 'ampli' ? 'highlighted' : ''}>
            Ampli User
          </button>
        </div>

        <div>
          {words.map(str => <button key={str} className={`word ${str}`}>{str}</button>)}
        </div>

        <CodeBlock code={userType === 'ampli' ? XPMT_FLAG_CODE : EXPERIMENT_CODE}/>
      </header>
    </div>
  );
}

export default App;
