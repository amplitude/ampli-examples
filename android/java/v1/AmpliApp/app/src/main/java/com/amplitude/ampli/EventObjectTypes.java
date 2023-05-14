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

import java.util.HashMap;

public class EventObjectTypes extends Event {
    private EventObjectTypes(Builder builder) {
        super("Event Object Types", builder.properties);
    }

    public static IRequiredObject builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IRequiredObject, IRequiredObjectArray, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**
         * Property Object Type
         * <p>
         * Must be followed by {@link IRequiredObjectArray#requiredObjectArray(Object[])
         */
        public IRequiredObjectArray requiredObject(Object requiredObject) {
            this.properties.put("requiredObject", requiredObject);
            return this;
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
    public interface IRequiredObject {
        IRequiredObjectArray requiredObject(Object requiredObject);
    }

    public interface IRequiredObjectArray {
        IBuild requiredObjectArray(Object[] requiredObjectArray);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventObjectTypes build();
    }
}
