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

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
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
        PROD,
        DEV
    }

    public static final Map<Environment, String> API_KEY = new HashMap<>();

    static {
        API_KEY.put(Environment.PROD, "");
        API_KEY.put(Environment.DEV, "");
    }

    private boolean disabled = false;

    public boolean isLoaded() {
        return this.client != null;
    }

    private AmplitudeClient client;

    public AmplitudeClient getClient() {
        this.isInitializedAndEnabled();
        return this.client;
    }

    private final Plan observePlan = new Plan()
        .setBranch("main")
        .setSource("java-ampli")
        .setVersion("1")
        .setVersionId("a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c");

    // Options should have 'environment', 'client.api_key' or 'client.instance'
    public void load(android.content.Context appContext, LoadOptions options) {
        Boolean disabled = options.getDisabled();
        this.disabled = disabled != null ? disabled : false;

        if (this.isLoaded()) {
            System.err.println("Warning: Ampli is already initialized. Ampli.getInstance().load() should be called once at application start up.");
            return;
        }

        LoadClientOptions clientOptions = options.getClient();
        Environment env = options.getEnvironment();

        String apiKey = null;
        AmplitudeClient client = null;
        
        if (clientOptions != null) {
            String optionsApiKey = clientOptions.getApiKey();
            if (optionsApiKey != null) {
                apiKey = optionsApiKey;
            }

            client = clientOptions.getInstance();
        } else if (env != null) {
            apiKey = Ampli.API_KEY.get(env);
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

        // set IngestionMetadata with backwards compatibility, min Android SDK version 2.38.2.
        try {
            Class<?> clazz = Class.forName("com.amplitude.api.IngestionMetadata");
            Method setSourceNameMethod = clazz.getMethod("setSourceName", String.class);
            Method setSourceVersionMethod = clazz.getMethod("setSourceVersion", String.class);
            Object ingestionMetadata = clazz.newInstance();
            setSourceNameMethod.invoke(ingestionMetadata, "android-java-ampli");
            setSourceVersionMethod.invoke(ingestionMetadata, "1.0.0");
            Method setIngestionMetadata = AmplitudeClient.class.getMethod("setIngestionMetadata", clazz);
            setIngestionMetadata.invoke(this.client, ingestionMetadata);
        } catch (ClassNotFoundException | NoSuchMethodException | SecurityException e) {
            System.out.println("com.amplitude.api.IngestionMetadata is available starting from Android SDK 2.38.2 version");
        } catch (Exception e) {
            System.err.println("Unexpected error when setting IngestionMetadata");
        }
    }

    public void track(Event event) {
        this.track(event, null, null);
    }

    public void track(Event event, EventOptions options) {
        this.track(event, options, null);
    }

    public void track(Event event, MiddlewareExtra extra) {
        this.track(event, null, extra);
    }

    public void track(Event event, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, null);
        this.client.logEvent(event.eventType, this.getEventPropertiesJson(event), extra);
    }

    public void identify(String userId, Identify event) {
        this.identify(userId, event, null, null);
    }

    public void identify(String userId, Identify event, EventOptions options) {
        this.identify(userId, event, options, null);
    }

    public void identify(String userId, Identify event, MiddlewareExtra extra) {
        this.identify(userId, event, null, extra);
    }

    public void identify(String userId, Identify event, EventOptions options, MiddlewareExtra extra) {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.handleEventOptions(options, userId);
        this.client.setUserProperties(this.getEventPropertiesJson(event), extra);
    }

    public void flush() {
        if (!this.isInitializedAndEnabled()) {
            return;
        }
        this.client.uploadEvents();
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
        this.eventNoProperties(null, null);
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
        this.eventNoProperties(options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventNoProperties(MiddlewareExtra extra) {
        this.eventNoProperties(null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventNoProperties(EventOptions options, MiddlewareExtra extra) {
        this.track(EventNoProperties.builder().build(), options, extra);
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
        this.eventObjectTypes(event, null, null);
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
        this.eventObjectTypes(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventObjectTypes(EventObjectTypes event, MiddlewareExtra extra) {
        this.eventObjectTypes(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventObjectTypes(EventObjectTypes event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithAllProperties(event, null, null);
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
        this.eventWithAllProperties(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithAllProperties(EventWithAllProperties event, MiddlewareExtra extra) {
        this.eventWithAllProperties(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithAllProperties(EventWithAllProperties event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithArrayTypes(event, null, null);
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
        this.eventWithArrayTypes(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithArrayTypes(EventWithArrayTypes event, MiddlewareExtra extra) {
        this.eventWithArrayTypes(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithArrayTypes(EventWithArrayTypes event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithConstTypes(null, null);
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
        this.eventWithConstTypes(options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithConstTypes(MiddlewareExtra extra) {
        this.eventWithConstTypes(null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithConstTypes(EventOptions options, MiddlewareExtra extra) {
        this.track(EventWithConstTypes.builder().build(), options, extra);
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
        this.eventWithEnumTypes(event, null, null);
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
        this.eventWithEnumTypes(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithEnumTypes(EventWithEnumTypes event, MiddlewareExtra extra) {
        this.eventWithEnumTypes(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithEnumTypes(EventWithEnumTypes event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithOptionalArrayTypes(event, null, null);
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
        this.eventWithOptionalArrayTypes(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypes event, MiddlewareExtra extra) {
        this.eventWithOptionalArrayTypes(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalArrayTypes(EventWithOptionalArrayTypes event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithOptionalProperties(event, null, null);
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
        this.eventWithOptionalProperties(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalProperties(EventWithOptionalProperties event, MiddlewareExtra extra) {
        this.eventWithOptionalProperties(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithOptionalProperties(EventWithOptionalProperties event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithTemplateProperties(event, null, null);
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
        this.eventWithTemplateProperties(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithTemplateProperties(EventWithTemplateProperties event, MiddlewareExtra extra) {
        this.eventWithTemplateProperties(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithTemplateProperties(EventWithTemplateProperties event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventWithDifferentCasingTypes(event, null, null);
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
        this.eventWithDifferentCasingTypes(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypes event, MiddlewareExtra extra) {
        this.eventWithDifferentCasingTypes(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventWithDifferentCasingTypes(EventWithDifferentCasingTypes event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
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
        this.eventMaxIntForTest(event, null, null);
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
        this.eventMaxIntForTest(event, options, null);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventMaxIntForTest(EventMaxIntForTest event, MiddlewareExtra extra) {
        this.eventMaxIntForTest(event, null, extra);
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
     * @param extra Extra untyped parameters for use in middleware
     */
    public void eventMaxIntForTest(EventMaxIntForTest event, EventOptions options, MiddlewareExtra extra) {
        this.track(event, options, extra);
    }

    private void handleEventOptions(EventOptions options, String userId) {
        if (options != null && options.deviceId != null) {
            this.client.setDeviceId(options.deviceId);
        }
        if (userId != null || (options != null && options.userId != null)) {
            this.client.setUserId(userId != null ? userId : options.userId);
        }
    }

    private boolean isInitializedAndEnabled() {
        if (!this.isLoaded()) {
            System.err.println("Ampli is not yet initialized. Have you called `Ampli.getInstance().load()` on app start?");
            return false;
        }
        return !this.disabled;
    }

    private JSONObject getEventPropertiesJson(Event event) {
        if (event == null || event.eventProperties == null) {
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
