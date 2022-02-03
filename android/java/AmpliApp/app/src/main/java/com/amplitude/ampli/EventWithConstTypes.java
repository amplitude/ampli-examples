//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.34.1, com.squareup.okhttp3:okhttp:4.2.2
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

public class EventWithConstTypes extends Event {
    private EventWithConstTypes(Builder builder) {
        super("Event With Const Types", builder.properties);
    }

    public static IBuild builder() { return new Builder(); }

    // Inner Builder class with required properties
    public static class Builder implements IBuild {
        private final HashMap<String, Object> properties = new HashMap<>();

        private Builder() {
            this.properties.put("Boolean Const", true);
            this.properties.put("Integer Const", 10);
            this.properties.put("Number Const", 2.2);
            this.properties.put("String Const", "String-Constant");
            this.properties.put("String Const WIth Quotes", "\"String \"Const With\" Quotes\"");
            this.properties.put("String Int Const", 0);
        }

        public EventWithConstTypes build() {
            return new EventWithConstTypes(this);
        }
    }

    /** Build interface with optional properties */
    public interface IBuild {
        EventWithConstTypes build();
    }
}
