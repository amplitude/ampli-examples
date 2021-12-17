//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.34.1, com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 0
// Build: 1.0.0
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli)
//
package com.amplitude.ampli;

import java.util.HashMap;

public class EventNoProperties extends Event {
    private EventNoProperties(Builder builder) {
        super("Event No Properties", builder.properties);
    }

    public static EventNoProperties build() {
        return new Builder().build();
    }

    // Inner Builder class with required properties
    public static class Builder implements IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        public EventNoProperties build() {
            return new EventNoProperties(this);
        }
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventNoProperties build();
    }
}
