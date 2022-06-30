//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli-v2'
//
// Required dependencies: com.amplitude:analytics-android:1.0.0
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: android:java-ampli-v2
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli-v2)
//
package com.amplitude.ampli;

import com.amplitude.android.Amplitude;
import com.amplitude.android.Configuration;

public class LoadClientOptions {
    private String apiKey;
    private Amplitude instance;
    private Configuration configuration;

    public LoadClientOptions() {
    }

    public LoadClientOptions setApiKey(String apiKey) {
        this.apiKey = apiKey;
        return this;
    }

    public String getApiKey() { return this.apiKey; }

    public LoadClientOptions setInstance(Amplitude instance) {
        this.instance = instance;
        return this;
    }

    public Amplitude getInstance() { return this.instance; }

    public LoadClientOptions setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        return this;
    }

    public Configuration getConfiguration() { return this.configuration; }
}
