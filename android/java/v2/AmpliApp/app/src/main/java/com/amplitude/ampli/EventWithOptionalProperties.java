//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli-v2'
//
// Required dependencies: com.amplitude:analytics-android:[1.0.0,2.0)
// Tracking Plan Version: 1
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

public class EventWithOptionalProperties extends BaseEvent {
    private EventWithOptionalProperties(Builder builder) {
        eventType = "Event With Optional Properties";
        setEventProperties(builder.properties);
    }

    public static IBuild builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**

         */
        public IBuild optionalArrayNumber(Double[] optionalArrayNumber) {
            this.properties.put("optionalArrayNumber", optionalArrayNumber);
            return this;
        }

        /**

         */
        public IBuild optionalArrayString(String[] optionalArrayString) {
            this.properties.put("optionalArrayString", optionalArrayString);
            return this;
        }

        /**

         */
        public IBuild optionalBoolean(boolean optionalBoolean) {
            this.properties.put("optionalBoolean", optionalBoolean);
            return this;
        }

        /**

         */
        public IBuild optionalNumber(Double optionalNumber) {
            this.properties.put("optionalNumber", optionalNumber);
            return this;
        }

        /**
         * Optional String property description
         */
        public IBuild optionalString(String optionalString) {
            this.properties.put("optionalString", optionalString);
            return this;
        }

        public EventWithOptionalProperties build() {
            return new EventWithOptionalProperties(this);
        }
    }

    /** Build interface with optional properties */
    public interface IBuild {
        IBuild optionalArrayNumber(Double[] optionalArrayNumber);
        IBuild optionalArrayString(String[] optionalArrayString);
        IBuild optionalBoolean(boolean optionalBoolean);
        IBuild optionalNumber(Double optionalNumber);
        IBuild optionalString(String optionalString);
        EventWithOptionalProperties build();
    }
}
