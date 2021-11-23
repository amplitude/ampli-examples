# Ampli iOS SDK (Swift)
An example app using the Ampli Swift SDK

# Usage

### Setup the project
You will need to do the following before running the app.
1.Set up environment variable with your API keys
   1. Go to schema edit and find `Environment Variables` section
   2. Set your Amplitude API key with name `AMPLITUDE_API_KEY`
2. `pod install`
3. Open `AmpliSwiftSampleApp.xcworkspace` with Xcode

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.
* Just click on run in Xcode

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `ContentView.swift` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* Podfile - pods dependency
* Shared/ 
  * [ContentView](Shared/ContentView.swift) - Example user app using Ampli SDK. A good place to start.
  * Ampli/
    * [Ampli.swift](src/Ampli/index.swift) - Generated SDK, don't modify by hand. Update with `ampli pull`
    * [schema.json](src/Ampli/schema.json) - The full event schema for the tracking plan