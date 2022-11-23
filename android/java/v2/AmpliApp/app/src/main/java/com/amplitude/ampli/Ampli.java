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
import java.util.Map;

import com.amplitude.android.Amplitude;
import com.amplitude.android.events.BaseEvent;
import com.amplitude.android.events.EventOptions;
import com.amplitude.android.events.Plan;
import com.amplitude.android.Configuration;

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

    private boolean disabled = false;

    public boolean isLoaded() {
        return this.client != null;
    }

    private Amplitude client;

    public Amplitude getClient() {
        this.isInitializedAndEnabled();
        return this.client;
    }

    private Plan defaultObservePlan = new Plan("main","java-ampli-v2","0", "79154a50-f057-4db5-9755-775e4e9f05e6");

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
        Amplitude client = null;
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
            Configuration config;
            if (clientOptions != null && clientOptions.getConfiguration() != null) {
                config = clientOptions.getConfiguration();
            } else {
                config = new DefaultConfiguration(apiKey, appContext.getApplicationContext(), defaultObservePlan);
            }

            this.client = new Amplitude(config);
        } else {
            System.err.println("Ampli.getInstance().load() requires 'environment', 'client.apiKey', or 'client.instance'");
            return;
        }

        if (this.client.getConfiguration() != null && this.client.getConfiguration().getPlan() == null) {
            this.client.getConfiguration().setPlan(defaultObservePlan);
        }
    }

    public void track(BaseEvent event) {
        this.track(event, null);
    }

    public void track(BaseEvent event, EventOptions options) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.client.track(event, options);
    }

    public void identify(String userId, Identify event) {
        this.identify(userId, event, null);
    }

    public void identify(String userId, Identify event, EventOptions options) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        EventOptions overriddenOptions = options != null ? options: new EventOptions();
        String overriddenUserId = userId != null ? userId : (event.getUserId() != null ? event.getUserId() : overriddenOptions.getUserId());
        overriddenOptions.setUserId(overriddenUserId);

        this.client.identify(event.getEventProperties(), overriddenOptions);
    }

    public void flush() {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.client.flush();
    }

    /**
     * EventMaxIntForTest
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest">View in Tracking Plan</a>
     * <p>
     * Event to test schema validation
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventMaxIntForTest(EventMaxIntForTest event) {
        this.eventMaxIntForTest(event, null);
    }

    /**
     * EventMaxIntForTest
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest">View in Tracking Plan</a>
     * <p>
     * Event to test schema validation
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventMaxIntForTest(EventMaxIntForTest event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event No Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w no properties description
     * <p>
     * Owner: Test codegen
     *
     */
    public void eventNoProperties() {
        this.eventNoProperties(null);
    }

    /**
     * Event No Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w no properties description
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     */
    public void eventNoProperties(EventOptions options) {
        this.track(EventNoProperties.builder().build(), options);
    }

    /**
     * Event Object Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types">View in Tracking Plan</a>
     * <p>
     * Event with Object and Object Array
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventObjectTypes(EventObjectTypes event) {
        this.eventObjectTypes(event, null);
    }

    /**
     * Event Object Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types">View in Tracking Plan</a>
     * <p>
     * Event with Object and Object Array
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventObjectTypes(EventObjectTypes event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With All Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w all properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithAllProperties(EventWithAllProperties event) {
        this.eventWithAllProperties(event, null);
    }

    /**
     * Event With All Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w all properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithAllProperties(EventWithAllProperties event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with Array Types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithArrayTypes(EventWithArrayTypes event) {
        this.eventWithArrayTypes(event, null);
    }

    /**
     * Event With Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with Array Types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithArrayTypes(EventWithArrayTypes event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Const Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with const types
     * <p>
     * Owner: Test codegen
     *
     */
    public void eventWithConstTypes() {
        this.eventWithConstTypes(null);
    }

    /**
     * Event With Const Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with const types
     * <p>
     * Owner: Test codegen
     *
     * @param options The event's options
     */
    public void eventWithConstTypes(EventOptions options) {
        this.track(EventWithConstTypes.builder().build(), options);
    }

    /**
     * event withDifferent_CasingTypes
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes">View in Tracking Plan</a>
     * <p>
     * Description for case with space
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypes event) {
        this.eventWithDifferentCasingTypes(event, null);
    }

    /**
     * event withDifferent_CasingTypes
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes">View in Tracking Plan</a>
     * <p>
     * Description for case with space
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypes event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Enum Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with enum types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithEnumTypes(EventWithEnumTypes event) {
        this.eventWithEnumTypes(event, null);
    }

    /**
     * Event With Enum Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with enum types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithEnumTypes(EventWithEnumTypes event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Optional Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with optional array types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypes event) {
        this.eventWithOptionalArrayTypes(event, null);
    }

    /**
     * Event With Optional Array Types
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types">View in Tracking Plan</a>
     * <p>
     * Description for event with optional array types
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypes event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Optional Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w optional properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithOptionalProperties(EventWithOptionalProperties event) {
        this.eventWithOptionalProperties(event, null);
    }

    /**
     * Event With Optional Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties">View in Tracking Plan</a>
     * <p>
     * Event w optional properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithOptionalProperties(EventWithOptionalProperties event, EventOptions options) {
        this.track(event, options);
    }

    /**
     * Event With Template Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties">View in Tracking Plan</a>
     * <p>
     * Event with template properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     */
    public void eventWithTemplateProperties(EventWithTemplateProperties event) {
        this.eventWithTemplateProperties(event, null);
    }

    /**
     * Event With Template Properties
     * <p>
     * <a href="https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties">View in Tracking Plan</a>
     * <p>
     * Event with template properties description
     * <p>
     * Owner: Test codegen
     *
     * @param event The event
     * @param options The event's options
     */
    public void eventWithTemplateProperties(EventWithTemplateProperties event, EventOptions options) {
        this.track(event, options);
    }

    private boolean isInitializedAndEnabled() {
        if (this.client == null) {
            System.err.println("Ampli is not yet initialized. Have you called `Ampli.getInstance().load()` on app start?");
            return false;
        }
        return !this.disabled;
    }
}
