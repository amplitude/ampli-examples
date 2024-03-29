//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:[2.37.0,3.0), com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 1
// Build: 1.0.0
// Runtime: android:java-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli)
//
package com.amplitude.ampli;

public class EventOptions {
    String userId;
    String deviceId;

    public EventOptions setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public EventOptions setDeviceId(String deviceId) {
        this.deviceId = deviceId;
        return this;
    }
}
