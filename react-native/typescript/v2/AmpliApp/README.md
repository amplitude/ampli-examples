# Ampli React Native SDK 2.0 (TypeScript)
An example app using the Ampli React Native SDK V2.

# Usage

### Setup the project
You will need to do the following before running the app.
1. Create a `.env` with your API keys
    1. `cp .env.example .env`
    2. Set your Amplitude API key
    3. (Optional) To use Segment plugin set a Segment write key
2. `yarn install`
3. iOS: `cd ./ios && pod install`

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.
* `yarn start`
* `yarn run android` (Android)
* `yarn run ios` (iOS)

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `App.tsx` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* src/
    * [App.tsx](src/App.tsx) - Example user app using Amply SDK. A good place to start.
    * ampli/
        * [index.ts](src/ampli/index.ts) - Generated SDK, don't modify by hand. Update with `ampli pull`
    * [plugins/*](src/plugins) - Example plugins for Segment and Event logging
