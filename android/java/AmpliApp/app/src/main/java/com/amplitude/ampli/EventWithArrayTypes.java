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

public class EventWithArrayTypes extends Event {
    private EventWithArrayTypes(Builder builder) {
        super("Event With Array Types", builder.properties);
    }

    public static IRequiredBooleanArray builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IRequiredBooleanArray, IRequiredNumberArray, IRequiredObjectArray, IRequiredStringArray, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**
         * description for required boolean array
         * <p>
         * Must be followed by {@link IRequiredNumberArray#requiredNumberArray(Double[])
         */
        public IRequiredNumberArray requiredBooleanArray(Boolean[] requiredBooleanArray) {
            this.properties.put("requiredBooleanArray", requiredBooleanArray);
            return this;
        }

        /**
         * Description for required number array
         * <p>
         * Must be followed by {@link IRequiredObjectArray#requiredObjectArray(Object[])
         */
        public IRequiredObjectArray requiredNumberArray(Double[] requiredNumberArray) {
            this.properties.put("requiredNumberArray", requiredNumberArray);
            return this;
        }

        /**
         * Description for required object array
         * <p>
         * Must be followed by {@link IRequiredStringArray#requiredStringArray(String[])
         */
        public IRequiredStringArray requiredObjectArray(Object[] requiredObjectArray) {
            this.properties.put("requiredObjectArray", requiredObjectArray);
            return this;
        }

        /**
         * description for required string array
         * <p>
         * Must be followed by by additional optional properties or build() method
         */
        public IBuild requiredStringArray(String[] requiredStringArray) {
            this.properties.put("requiredStringArray", requiredStringArray);
            return this;
        }

        public EventWithArrayTypes build() {
            return new EventWithArrayTypes(this);
        }
    }

    // Required property interfaces
    public interface IRequiredBooleanArray {
        IRequiredNumberArray requiredBooleanArray(Boolean[] requiredBooleanArray);
    }

    public interface IRequiredNumberArray {
        IRequiredObjectArray requiredNumberArray(Double[] requiredNumberArray);
    }

    public interface IRequiredObjectArray {
        IRequiredStringArray requiredObjectArray(Object[] requiredObjectArray);
    }

    public interface IRequiredStringArray {
        IBuild requiredStringArray(String[] requiredStringArray);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventWithArrayTypes build();
    }
}
