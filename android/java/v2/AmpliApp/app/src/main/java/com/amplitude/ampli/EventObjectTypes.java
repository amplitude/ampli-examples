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

public class EventObjectTypes extends BaseEvent {
    private EventObjectTypes(Builder builder) {
        eventType = "Event Object Types";
        setEventProperties(builder.properties);
    }

    public static IRequiredObjectArray builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IRequiredObjectArray, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {
            this.properties.put("requiredObject", null);
        }

        /**
         * Property Object Array Type
         * <p>
         * Must be followed by by additional optional properties or build() method
         */
        public IBuild requiredObjectArray(Object[] requiredObjectArray) {
            this.properties.put("requiredObjectArray", requiredObjectArray);
            return this;
        }

        public EventObjectTypes build() {
            return new EventObjectTypes(this);
        }
    }

    // Required property interfaces
    public interface IRequiredObjectArray {
        IBuild requiredObjectArray(Object[] requiredObjectArray);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventObjectTypes build();
    }
}
