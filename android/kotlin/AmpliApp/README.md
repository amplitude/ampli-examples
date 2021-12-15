# Ampli Android SDK (Kotlin)
An example app using the Ampli Android SDK

# Usage

### Setup the project
You will need to do the following before running the app.
1. Set your Amplitude API key in `src/main/java/com/example/ampliapp/App.kt` file

### Pull your Ampli SDK
If you want to use your own tracking plan and Ampli SDK
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update `src/main/java/com/example/ampliapp/MainActivity.kt` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* src/main/java/
    * com/example/ampliapp/
        * [MainActivity.kt](src/main/java/com/example/ampliapp/MainActivity.kt) - Example user app using Amply SDK. A good place to start.
        * [App.kt](src/main/java/com/example/ampliapp/App.kt) - Initialization logic.
    * com/amplitude/ampli/
        * [Ampli.kt](src/main/java/com/amplitude/ampli/Ampli.kt) - Generated SDK, don't modify by hand. Update with `ampli pull`
        * [schema.json](src/main/java/com/amplitude/ampli/schema.json) - The full event schema for the tracking plan
