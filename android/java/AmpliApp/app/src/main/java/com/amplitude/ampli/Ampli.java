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
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.amplitude.api.Amplitude;
import com.amplitude.api.AmplitudeClient;
import com.amplitude.api.MiddlewareExtra;
import com.amplitude.api.Plan;

public class Ampli {
    private static volatile Ampli singleton = null;

    public static Ampli getInstance() {
        if (singleton == null) {
            createSingleton();
        }
        return singleton;
    }

    private synchronized static void createSingleton() {
        if (singleton == null) {
            singleton = new Ampli();
        }
    }

    public enum Environment {
        DEVELOPMENT,
        PRODUCTION
    }

    public static final Map<Environment, String> API_KEY = new HashMap<>();

    static {
        API_KEY.put(Environment.DEVELOPMENT, "");
        API_KEY.put(Environment.PRODUCTION, "");
    }

    private final Plan observePlan = new Plan()
        .setBranch("main")
        .setSource("java-ampli")
        .setVersion("0");

    private AmplitudeClient client;

    public AmplitudeClient getClient() {
        return this.client;
    }

    private boolean disabled = false;

    public void load(android.content.Context appContext) {
        this.load(appContext, null);
    }

    public void load(android.content.Context appContext, LoadOptions options) {
        Boolean disabled = options != null ? options.getDisabled() : null;
        this.disabled = disabled != null ? disabled : false;

        if (this.client != null) {
            System.err.println("Warning: Ampli is already initialized. Ampli.getInstance().load() should be called once at application start up.");
            return;
        }

        Environment env = options != null ? options.getEnvironment() : null;
        if (env == null) {
            env = Environment.DEVELOPMENT;
        }

        LoadClientOptions clientOptions = options != null ? options.getClient() : null;

        String apiKey = Ampli.API_KEY.get(env);
        AmplitudeClient client = null;
        if (clientOptions != null) {
            String optionsApiKey = clientOptions.getApiKey();
            if (optionsApiKey != null) {
                apiKey = optionsApiKey;
            }

            client = clientOptions.getInstance();
        }

        if (client != null) {
            this.client = client;
        } else if (apiKey != null && !apiKey.equals("")) {
            this.client = Amplitude.getInstance();
            this.client.initialize(appContext.getApplicationContext(), apiKey);
        } else {
            System.err.println("Ampli.getInstance().load() requires 'environment', 'client.apiKey', or 'client.instance'");
            return;
        }

        Plan plan = observePlan;
        if (clientOptions != null) {
            Plan optionsPlan = clientOptions.getPlan();
            if (optionsPlan != null) {
                plan = optionsPlan;
            }
        }
        this.client.setPlan(plan);
    }

    public void track(Event event) {
        this.track(event, null, null);
    }

    public void track(Event event, EventOptions options) {
        this.track(event, options, null);
    }

    public void track(Event event, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, null);
        this.client.logEvent(event.eventType, this.getEventPropertiesJson(event), null, System.currentTimeMillis(), false, extra);
    }

    public void identify(String userId, IdentifyProperties properties) {
        this.identify(userId, properties, null, null);
    }

    public void identify(String userId, IdentifyProperties properties, EventOptions options) {
        this.identify(userId, properties, options, null);
    }

    public void identify(String userId, IdentifyProperties properties, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, userId);
        this.client.setUserProperties(this.getEventPropertiesJson(new Identify(properties)), extra);
    }

    public void setGroup(String name, String value) {
        this.setGroup(name, value, null, null);
    }

    public void setGroup(String name, String value, EventOptions options) {
        this.setGroup(name, value, options, null);
    }

    public void setGroup(String name, String value, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, null);
        this.client.setGroup(name, value, extra);
    }

    public void setGroup(String name, String[] value) {
        this.setGroup(name, value, null, null);
    }

    public void setGroup(String name, String[] value, EventOptions options) {
        this.setGroup(name, value, options, null);
    }

    public void setGroup(String name, String[] value, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, null);
        this.client.setGroup(name, value, extra);
    }

    public void flush() {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.client.uploadEvents();
    }

    /**
     * EventMaxIntForTest
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest">View in Tracking Plan</a>
     * <p>
     * Event to test schema validation
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventMaxIntForTest(EventMaxIntForTestProperties properties) {
        this.eventMaxIntForTest(properties, null, null);
    }

    /**
     * EventMaxIntForTest
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest">View in Tracking Plan</a>
     * <p>
     * Event to test schema validation
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventMaxIntForTest(EventMaxIntForTestProperties properties, EventOptions options) {
        this.eventMaxIntForTest(properties, options, null);
    }

    /**
     * EventMaxIntForTest
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest">View in Tracking Plan</a>
     * <p>
     * Event to test schema validation
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventMaxIntForTest(EventMaxIntForTestProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventMaxIntForTest(properties), options, extra);
    }

    /**
     * Event No Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w no properties description
     * <p>
     * Owner: Test codegen
     *
     */
    public void eventNoProperties() {
        this.eventNoProperties(null, null);
    }

    /**
     * Event No Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w no properties description
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     */
    public void eventNoProperties(EventOptions options) {
        this.eventNoProperties(options, null);
    }

    /**
     * Event No Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w no properties description
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventNoProperties(EventOptions options, MiddlewareExtra extra) {
        this.track(new EventNoProperties(), options, extra);
    }

    /**
     * Event Object Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types">View in Tracking Plan</a>
     * <p>
     * Event with Object and Object Array
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventObjectTypes(EventObjectTypesProperties properties) {
        this.eventObjectTypes(properties, null, null);
    }

    /**
     * Event Object Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types">View in Tracking Plan</a>
     * <p>
     * Event with Object and Object Array
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventObjectTypes(EventObjectTypesProperties properties, EventOptions options) {
        this.eventObjectTypes(properties, options, null);
    }

    /**
     * Event Object Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types">View in Tracking Plan</a>
     * <p>
     * Event with Object and Object Array
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventObjectTypes(EventObjectTypesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventObjectTypes(properties), options, extra);
    }

    /**
     * Event With All Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w all properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithAllProperties(EventWithAllPropertiesProperties properties) {
        this.eventWithAllProperties(properties, null, null);
    }

    /**
     * Event With All Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w all properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithAllProperties(EventWithAllPropertiesProperties properties, EventOptions options) {
        this.eventWithAllProperties(properties, options, null);
    }

    /**
     * Event With All Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w all properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithAllProperties(EventWithAllPropertiesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithAllProperties(properties), options, extra);
    }

    /**
     * Event With Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with Array Types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithArrayTypes(EventWithArrayTypesProperties properties) {
        this.eventWithArrayTypes(properties, null, null);
    }

    /**
     * Event With Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with Array Types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithArrayTypes(EventWithArrayTypesProperties properties, EventOptions options) {
        this.eventWithArrayTypes(properties, options, null);
    }

    /**
     * Event With Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with Array Types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithArrayTypes(EventWithArrayTypesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithArrayTypes(properties), options, extra);
    }

    /**
     * Event With Const Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with const types
     * <p>
     * Owner: Test codegen
     *
     */
    public void eventWithConstTypes() {
        this.eventWithConstTypes(null, null);
    }

    /**
     * Event With Const Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with const types
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     */
    public void eventWithConstTypes(EventOptions options) {
        this.eventWithConstTypes(options, null);
    }

    /**
     * Event With Const Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with const types
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithConstTypes(EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithConstTypes(), options, extra);
    }

    /**
     * event withDifferent_CasingTypes
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes">View in Tracking Plan</a>
     * <p>
     * Description for case with space
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypesProperties properties) {
        this.eventWithDifferentCasingTypes(properties, null, null);
    }

    /**
     * event withDifferent_CasingTypes
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes">View in Tracking Plan</a>
     * <p>
     * Description for case with space
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypesProperties properties, EventOptions options) {
        this.eventWithDifferentCasingTypes(properties, options, null);
    }

    /**
     * event withDifferent_CasingTypes
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes">View in Tracking Plan</a>
     * <p>
     * Description for case with space
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithDifferentCasingTypes(properties), options, extra);
    }

    /**
     * Event With Enum Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with enum types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithEnumTypes(EventWithEnumTypesProperties properties) {
        this.eventWithEnumTypes(properties, null, null);
    }

    /**
     * Event With Enum Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with enum types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithEnumTypes(EventWithEnumTypesProperties properties, EventOptions options) {
        this.eventWithEnumTypes(properties, options, null);
    }

    /**
     * Event With Enum Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with enum types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithEnumTypes(EventWithEnumTypesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithEnumTypes(properties), options, extra);
    }

    /**
     * Event With Optional Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with optional array types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypesProperties properties) {
        this.eventWithOptionalArrayTypes(properties, null, null);
    }

    /**
     * Event With Optional Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with optional array types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypesProperties properties, EventOptions options) {
        this.eventWithOptionalArrayTypes(properties, options, null);
    }

    /**
     * Event With Optional Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with optional array types
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithOptionalArrayTypes(properties), options, extra);
    }

    /**
     * Event With Optional Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w optional properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     */
    public void eventWithOptionalProperties(EventWithOptionalPropertiesProperties properties) {
        this.eventWithOptionalProperties(properties, null, null);
    }

    /**
     * Event With Optional Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w optional properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     */
    public void eventWithOptionalProperties(EventWithOptionalPropertiesProperties properties, EventOptions options) {
        this.eventWithOptionalProperties(properties, options, null);
    }

    /**
     * Event With Optional Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w optional properties description
     * <p>
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalProperties(EventWithOptionalPropertiesProperties properties, EventOptions options, MiddlewareExtra extra) {
        this.track(new EventWithOptionalProperties(properties), options, extra);
    }

    private boolean isInitializedAndEnabled() {
        if (this.client == null) {
            System.err.println("Ampli is not yet initialized. Have you called `Ampli.getInstance().load()` on app start?");
            return false;
        }
        return !this.disabled;
    }

    private void handleEventOptions(EventOptions options, String userId) {
        if (options != null && options.deviceId != null) {
            this.client.setDeviceId(options.deviceId);
        }
        if (userId != null || (options != null && options.userId != null)) {
            this.client.setUserId(userId != null ? userId : options.userId);
        }
    }

    private JSONObject getEventPropertiesJson(Event event) {
        if (event.eventProperties == null) {
            return null;
        }

        JSONObject json = new JSONObject();

        for (Map.Entry<String, Object> entry : event.eventProperties.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            try {
                if (value != null) {
                    json.put(key, value.getClass().isArray() ? new JSONArray(value) : value);
                } else {
                    json.put(key, JSONObject.NULL);
                }
            } catch (JSONException e) {
                System.err.printf("Error converting properties to JSONObject: %s%n", e.getMessage());
            }
        }

        return json;
    }
}
