# Ampli Browser SDK (Ember.js)
An example Ember.js app using the Ampli Browser SDK

# Usage

### Setup the project
You will need to do the following before running the app.

`yarn install`

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.

`AMPLITUDE_API_KEY=<YOUR-AMPLITUDE-API-KEY> yarn start`

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK

1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `app/components/ampli-events.js` and `app/components/ampli-events.hbs` to use the events from your tracking plan

# Project structure

* README.md - you are here *
* app/
  * [init-ampli.js](app/init-ampli.js) - Example Ampli initialization. A good place to start.
  * components
    * [ampli-events.hbs](app/components/ampli-events.hbs)/[ampli-events.js](app/components/ampli-events.js) - Example user component using Amply SDK. A good place to start. 
  * ampli/
    * [index.js](app/ampli/index.js) - Generated SDK, don't modify by hand. Update with `ampli pull`
