# Ampli Android SDK (Java)
An example app using the Ampli Android SDK

# Usage

### Setup the project
You will need to do the following before running the app.

1. Configure Android SDK path
   * Set `ANDROID_SDK_ROOT` in your environment, or
   * Create a `local.properties` file and set `sdk.dir` to your Android SDK path. See [local.properties.example](local.properties.example).


2. Update [secrets.xml](app/src/main/res/values/secrets.xml) with your Amplitude API key:
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <string name="AMPLITUDE_API_KEY">your-amplitide-api-key</string>
    </resources>
    ```
    If you want to try the segment plugin, please also update your segment API key in the same file.
    
### Run the App
Run the application using Android Studio or your favorite IDE.

### Pull your Ampli SDK
If you want to use your own tracking plan to generate the Ampli SDK:
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update [MainActivity.java](app/src/main/java/com/example/ampliapp/MainActivity.java) to track your events.

# Project structure
* README.md - you are here *
* app/src/main/java/
    * com/example/ampliapp/
        * [MainActivity.java](app/src/main/java/com/example/ampliapp/MainActivity.java) - Example user app using Amply SDK. A good place to start.
        * [App.java](app/src/main/java/com/example/ampliapp/App.java) - Initialization logic.
    * com/amplitude/ampli/
        * [*.java](app/src/main/java/com/amplitude/ampli) - Generated SDK, don't modify by hand. Update with `ampli pull`
        * [schema.json](app/src/main/java/com/amplitude/ampli/schema.json) - The full event schema for the tracking plan
