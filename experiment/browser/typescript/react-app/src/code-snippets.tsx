import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const EXPERIMENT_CODE = `\
import { Experiment } from '@amplitude/experiment-js-client';

// (1) Initialize
const experiment = Experiment.initialize('<API_KEY>');

// (2) Fetch variants for a user
await experiment.fetch({ user_id: 'user@company.com' });

// (3) Lookup a flag's variant
const myFlag = experiment.variant('<FLAG_KEY>');
if (myFlag.value === 'on') {
  // Flag is on
  // myFlag.payload is untyped
} else {
  // Flag is off
}

// (4) Look up experiment variant
const myExperiment = experiment.variant('<EXPERIMENT_KEY>');

// (5) Use magic strings to determine variant
switch (myExperiment.value) {
  case 'control':
    break;
  case 'treatment':
    break;
  default:
    // off
}
`;

export const XPMT_FLAG_CODE = `\
import { xpmt, MyFlagName, MyExperimentName } from './xpmt';

// (1) Initialize
xpmt.load();

// (2) Fetch variants for a user
await xpmt.fetch({ user_id: 'user@company.com' });

// (3) Lookup a flag's variant
const myFlag = xpmt.myFlagName();
if (myFlag.on) {
  // myFlag.on.key is MyFlagName.Variants.On
  // myFlag.on.payload is strongly typed
} else {
  // Flag is off
}

// (4) Each Experiment has a strongly typed method
const myExperiment = xpmt.myExperimentName();

// (5) Each variant can be checked by name
if (myExperiment.control) {
  // (6) Variants have strongly typed payloads
  assertEquals(typeof(myFlag.control.payload), 'boolean');
} else (myExperiment.treatment) {
  assertEquals(typeof(myFlag.treatment.payload), 'string[]');
}

// (7) More types!
assertEquals(myExperiment.key, MyExperimentName.Key)
switch (myExperiment.variant.key) {
  case MyExperimentName.Variants.Control:
    // Handle control variant
    break;
  default:
    // off
}
`;

export type CodeBlockParams = {
  code: string;
}

export const CodeBlock = (params: CodeBlockParams) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {params.code}
    </SyntaxHighlighter>
  );
};
