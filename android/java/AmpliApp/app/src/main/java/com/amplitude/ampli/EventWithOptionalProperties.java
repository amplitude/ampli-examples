//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.36.3, com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: android:java-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli)
//
package com.amplitude.ampli;

import java.util.HashMap;

public class EventWithOptionalProperties extends Event {
    private EventWithOptionalProperties(Builder builder) {
        super("Event With Optional Properties", builder.properties);
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
