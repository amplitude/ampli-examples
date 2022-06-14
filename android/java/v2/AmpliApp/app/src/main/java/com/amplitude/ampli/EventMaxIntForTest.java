//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli-v2'
//
// Required dependencies: com.amplitude:analytics-android:0.1.0-beta.9
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

public class EventMaxIntForTest extends BaseEvent {
    private EventMaxIntForTest(Builder builder) {
        eventType = "EventMaxIntForTest";
        setEventProperties(builder.properties);
    }

    public static IIntMax10 builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IIntMax10, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**
         * property to test schema validation
         * <p>
         * Must be followed by by additional optional properties or build() method
         */
        public IBuild intMax10(Integer intMax10) {
            this.properties.put("intMax10", intMax10);
            return this;
        }

        public EventMaxIntForTest build() {
            return new EventMaxIntForTest(this);
        }
    }

    // Required property interfaces
    public interface IIntMax10 {
        IBuild intMax10(Integer intMax10);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventMaxIntForTest build();
    }
}
