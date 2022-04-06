//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull jre-java-ampli'
//
// Required dependencies: com.amplitude:java-sdk:1.6.0, org.json:json:20201115
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: jre:java-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/jre-java-ampli)
//
package com.amplitude.ampli;

import java.util.Map;

public abstract class Event {
    final String eventType;
    final Map<String, Object> eventProperties;

    protected Event(String eventType, Map<String, Object> eventProperties) {
        this.eventType = eventType;
        this.eventProperties = eventProperties == null || eventProperties.isEmpty() ? null : eventProperties;
    }
}
