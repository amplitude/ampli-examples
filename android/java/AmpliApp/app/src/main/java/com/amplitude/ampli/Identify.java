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

public class Identify extends Event {
    private Identify(Builder builder) {
        super("identify", builder.properties);
    }

    public static IRequiredNumber builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IRequiredNumber, IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {

        }

        /**
         * Description for identify requiredNumber
         * <p>
         * Must be followed by by additional optional properties or build() method
         */
        public IBuild requiredNumber(Double requiredNumber) {
            this.properties.put("requiredNumber", requiredNumber);
            return this;
        }

        /**
         * Description for identify optionalArray
         */
        public IBuild optionalArray(String[] optionalArray) {
            this.properties.put("optionalArray", optionalArray);
            return this;
        }

        public Identify build() {
            return new Identify(this);
        }
    }

    // Required property interfaces
    public interface IRequiredNumber {
        IBuild requiredNumber(Double requiredNumber);
    }

    /** Build interface with optional properties */
    public interface IBuild {
        IBuild optionalArray(String[] optionalArray);
        Identify build();
    }
}
