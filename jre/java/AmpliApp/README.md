# Ampli JRE SDK (Java)
An example app using the Ampli JRE SDK

# Usage

### Setup the project
You will need to do the following before running the app.

1. Create a `.env` with your API key
    1. `cp .env.example .env`
    2. Set your Amplitude API key
    ```properties
    AMPLITUDE_API_KEY=your-amplitide-api-key
    ```

### Run the App
Run the application with `mvn clean compile exec:java  -Dexec.cleanupDaemonThreads=false` or using your favorite IDE.

### Pull your Ampli SDK
If you want to use your own tracking plan to generate the Ampli SDK:
1. `npm i -g @amplitude/ampli`
2. `ampli pull`
3. Update [App.java](src/main/java/org/example/App.java) to track your events.

# Project structure
* README.md - you are here *
* src/main/java/
    * org/example/
        * [App.java](src/main/java/org/example/App.java) - Example user app using Amply SDK. A good place to start.
    * com/amplitude/ampli/
        * [*.java](src/main/java/com/amplitude/ampli) - Generated SDK, don't modify by hand. Update with `ampli pull`
