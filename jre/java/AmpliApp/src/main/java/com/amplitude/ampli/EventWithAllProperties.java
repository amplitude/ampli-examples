//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull jre-java-ampli'
//
// Required dependencies: com.amplitude:java-sdk:[1.8.0,2.0), org.json:json:20201115
// Tracking Plan Version: 1
// Build: 1.0.0
// Runtime: jre:java-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/jre-java-ampli)
//
package com.amplitude.ampli;

import java.util.HashMap;

public class EventWithAllProperties extends Event {
    public enum RequiredEnum {
        ENUM1("Enum1"), ENUM2("Enum2");

        private final String value;

        public String getValue()
        {
            return this.value;
        }

        RequiredEnum(String value)
        {
            this.value = value;
        }
    }

    private EventWithAllProperties(Builder builder) {
        super("Event With All Properties", builder.properties);
    }

    public static IRequiredArray builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IRequiredArray, IRequiredBoolean, IRequiredEnum, IRequiredInteger, IRequiredNumber, IRequiredString, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {
            this.properties.put("requiredConst", "some-const-value");
        }

        /**
         * Event 2 Property - Array
         * <p>
         * Must be followed by {@link IRequiredBoolean#requiredBoolean(boolean)
         */
        public IRequiredBoolean requiredArray(String[] requiredArray) {
            this.properties.put("requiredArray", requiredArray);
            return this;
        }

        /**
         * Event 2 Property - Boolean
         * <p>
         * Must be followed by {@link IRequiredEnum#requiredEnum(RequiredEnum)
         */
        public IRequiredEnum requiredBoolean(boolean requiredBoolean) {
            this.properties.put("requiredBoolean", requiredBoolean);
            return this;
        }

        /**
         * Event 2 Property - Enum
         * <p>
         * Must be followed by {@link IRequiredInteger#requiredInteger(Integer)
         */
        public IRequiredInteger requiredEnum(RequiredEnum requiredEnum) {
            this.properties.put("requiredEnum", requiredEnum.getValue());
            return this;
        }

        /**
         * Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
         * <p>
         * Must be followed by {@link IRequiredNumber#requiredNumber(Double)
         */
        public IRequiredNumber requiredInteger(Integer requiredInteger) {
            this.properties.put("requiredInteger", requiredInteger);
            return this;
        }

        /**
         * Event 2 Property - Number
         * <p>
         * Must be followed by {@link IRequiredString#requiredString(String)
         */
        public IRequiredString requiredNumber(Double requiredNumber) {
            this.properties.put("requiredNumber", requiredNumber);
            return this;
        }

        /**
         * Event 2 Property - String
         * <p>
         * Must be followed by by additional optional properties or build() method
         */
        public IBuild requiredString(String requiredString) {
            this.properties.put("requiredString", requiredString);
            return this;
        }

        /**
         * Event 2 Property - Optional String    *     * Examples:    * Some string, or another
         */
        public IBuild optionalString(String optionalString) {
            this.properties.put("optionalString", optionalString);
            return this;
        }

        public EventWithAllProperties build() {
            return new EventWithAllProperties(this);
        }
    }

    // Required property interfaces
    public interface IRequiredArray {
        IRequiredBoolean requiredArray(String[] requiredArray);
    }

    public interface IRequiredBoolean {
        IRequiredEnum requiredBoolean(boolean requiredBoolean);
    }

    public interface IRequiredEnum {
        IRequiredInteger requiredEnum(RequiredEnum requiredEnum);
    }

    public interface IRequiredInteger {
        IRequiredNumber requiredInteger(Integer requiredInteger);
    }

    public interface IRequiredNumber {
        IRequiredString requiredNumber(Double requiredNumber);
    }

    public interface IRequiredString {
        IBuild requiredString(String requiredString);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        IBuild optionalString(String optionalString);
        EventWithAllProperties build();
    }
}
