import dotenv from 'dotenv';
import * as Ampli from './ampli';
import * as Amplitude from './ampli/amplitude-node';

// Read Configuration
dotenv.config()
const { AMPLITUDE_API_KEY } = process.env;

console.log('API key', AMPLITUDE_API_KEY)
// Get Ampli instance using existing Amplitude NodeClient
const client = Amplitude.init(AMPLITUDE_API_KEY, { logLevel: 3 });
const ampli = Ampli.getInstance(client);

// You can also get a default Ampli instance
// This requires connecting your account via `ampli pull`
// Which will set you API key in the generated Ampli SDK
// const ampli = Ampli.getInstance()

// If you want to get creative you can create your own Ampli instance
// and set it yourself
// const ampli = new Ampli.Ampli(client);
// Ampli.setInstance(ampli);

const userId = 'ampli-user-id';

ampli.identify(userId, undefined, {
  requiredNumber: 42,
}, {
  platform: process.platform,
});

ampli.eventNoProperties(userId);
ampli.eventWithAllProperties(userId, {
  requiredNumber: 1.23,
  requiredArray: ["I'm", 'required'],
  requiredBoolean: false,
  requiredEnum: Ampli.RequiredEnum.Enum1,
  requiredInteger: 42,
  requiredString: 'Hi!',
})

ampli.flush().then(() => {
  console.log("Ampli event tracking complete!");
});
