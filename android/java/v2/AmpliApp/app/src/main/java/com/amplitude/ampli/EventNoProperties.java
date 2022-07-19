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

import java.util.HashMap;
import com.amplitude.android.events.BaseEvent;

public class EventNoProperties extends BaseEvent {
    private EventNoProperties(Builder builder) {
        eventType = "Event No Properties";
        setEventProperties(builder.properties);
    }

    public static IBuild builder() { return new Builder(); }

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
