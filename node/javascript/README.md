# Ampli Node SDK (JavaScript)
An example app using the Ampli Node SDK

# Usage

### Setup the project
You will need to do the following before running the app.
1. Create a `.env` with your API keys
   1. `cp .env.example .env`
   2. Set your Amplitude API key
   3. (Optional) To use Segment middleware set a Segment write key
2. `yarn install`

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.
* `yarn start`

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `app.ts` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* src/ 
  * [app.js][1] - Example user app using Amply SDK. A good place to start.
  * ampli/
    * [index.js][2] - Generated SDK, don't modify by hand. Update with `ampli pull`
    * [schema.json][4] - The full event schema for the tracking plan
  * [middleware/*][5] - Example middlewares for Segment and Event filtering

[1]: src/app.ts
[2]: src/ampli/index.ts
[3]: src/ampli/amplitude-node.ts
[4]: src/ampli/schema.json
[5]: src/middleware
