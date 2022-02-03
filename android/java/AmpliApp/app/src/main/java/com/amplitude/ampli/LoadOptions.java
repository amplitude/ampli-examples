//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.34.1, com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: android:java-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli)
//
package com.amplitude.ampli;

public class LoadOptions {
    private Ampli.Environment environment;
    private Boolean disabled;
    private LoadClientOptions client;

    public LoadOptions() {
    }

    public LoadOptions setEnvironment(Ampli.Environment environment) {
        this.environment = environment;
        return this;
    }

    public Ampli.Environment getEnvironment() { return this.environment; }

    public LoadOptions setDisabled(boolean disabled) {
        this.disabled = disabled;
        return this;
    }

    public Boolean getDisabled() { return this.disabled; }

    public LoadOptions setClient(LoadClientOptions options) {
        this.client = options;
        return this;
    }

    public LoadClientOptions getClient() { return this.client; }
}
