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

public class EventWithEnumTypes extends Event {
    private EventWithEnumTypes(Builder builder) {
        super("Event With Enum Types", builder.properties);
    }

    /**
     * Description for optional enum
     * <p>
     * Must be followed by by additional optional properties or build() method
     */
    public static IBuild requiredEnum(EventWithEnumTypesRequiredEnum requiredEnum) {
        Builder builder = new Builder();
        builder.properties.put("required enum", requiredEnum.toValue());
        return builder;
    }

    // Inner Builder class with required properties
    public static class Builder implements IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**
         * Description for required enum
         */
        public IBuild optionalEnum(EventWithEnumTypesOptionalEnum optionalEnum) {
            this.properties.put("optional enum", optionalEnum.toValue());
            return this;
        }

        public EventWithEnumTypes build() {
            return new EventWithEnumTypes(this);
        }
    }

    /** Build interface with optional properties */
    public interface IBuild {
        IBuild optionalEnum(EventWithEnumTypesOptionalEnum optionalEnum);
        EventWithEnumTypes build();
    }
}
