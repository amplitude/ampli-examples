# Ampli iOS SDK 2.0 (Objective-C)
An example app using the Ampli Objective-C SDK V2.

# Usage

### Setup the project
You will need to do the following before running the app.
1. Set up environment variable with your API keys
   1. Go to `Edit Scheme > Run > Arguments > Environment Variables` section
   2. Set your Amplitude API key with name `AMPLITUDE_API_KEY`
2. Open `AmpliObjectiveCSampleApp.xcodeproj` with Xcode

### Run the app
You can run the app using the events from our sample tracking plan.
This will log events to your Amplitude project.
* Just click on run in Xcode

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `AppDelegate.m` or `ViewController.m` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* AmpliObjectiveCSampleApp/ 
  * [AppDelegate.m](AmpliObjectiveCSampleApp/AppDelegate.m) - Ampli SDK usage in an AppDelegate.
  * [ViewController.m](AmpliObjectiveCSampleApp/ViewController.m) - Ampli SDK usage in a ViewController.
  * Ampli/
    * [Ampli.h](AmpliObjectiveCSampleApp/Ampli/Ampli.h) - Generated SDK, don't modify by hand. Update with `ampli pull`
    * [Ampli.m](AmpliObjectiveCSampleApp/Ampli/Ampli.m) - Generated SDK, don't modify by hand. Update with `ampli pull`
