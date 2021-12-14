//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull kotlin-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.34.1, com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 0
// Build: 1.0.0
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/kotlin-ampli)
//

package com.amplitude.ampli

import android.content.Context
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

import com.amplitude.api.Amplitude
import com.amplitude.api.AmplitudeClient
import com.amplitude.api.Plan

/**
 * Unstructured object to let users pass extra data to middleware
 */
typealias MiddlewareExtra = Map<String, Any>

open class Event(
    val eventType: String,
    val eventProperties: Map<String, Any?>?
)

private data class EventProperties (
    val context: ContextProperties? = null,
    val eventMaxIntForTest: EventMaxIntForTestProperties? = null,
    val eventNoProperties: EventNoPropertiesProperties? = null,
    val eventObjectTypes: EventObjectTypesProperties? = null,
    val eventWithAllProperties: EventWithAllPropertiesProperties? = null,
    val eventWithArrayTypes: EventWithArrayTypesProperties? = null,
    val eventWithConstTypes: EventWithConstTypesProperties? = null,
    val eventWithDifferentCasingTypes: EventWithDifferentCasingTypesProperties? = null,
    val eventWithEnumTypes: EventWithEnumTypesProperties? = null,
    val eventWithOptionalArrayTypes: EventWithOptionalArrayTypesProperties? = null,
    val eventWithOptionalProperties: EventWithOptionalPropertiesProperties? = null,
    val group: GroupProperties? = null,
    val identify: IdentifyProperties? = null
)

class ContextProperties()

/**
 * Event to test schema validation
 */
data class EventMaxIntForTestProperties (
    /**
     * property to test schema validation
     */
    val intMax10: Long
)

/**
 * Event w no properties description
 */
class EventNoPropertiesProperties()

/**
 * Event with Object and Object Array
 */
data class EventObjectTypesProperties (
    /**
     * Property Object Type
     */
    val requiredObject: Any?,

    /**
     * Property Object Array Type
     */
    val requiredObjectArray: List<Any?>
)

/**
 * Event w all properties description
 */
data class EventWithAllPropertiesProperties (
    /**
     * Event 2 Property - Optional String    *     * Examples:    * Some string, or another
     */
    val optionalString: String? = null,

    /**
     * Event 2 Property - Array
     */
    val requiredArray: List<String>,

    /**
     * Event 2 Property - Boolean
     */
    val requiredBoolean: Boolean,

    /**
     * Event 2 Property - Enum
     */
    val requiredEnum: EventWithAllPropertiesRequiredEnum,

    /**
     * Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
     */
    val requiredInteger: Long,

    /**
     * Event 2 Property - Number
     */
    val requiredNumber: Double,

    /**
     * Event 2 Property - String
     */
    val requiredString: String
)

/**
 * Event 2 Property - Enum
 */
enum class EventWithAllPropertiesRequiredEnum {
    Enum1,
    Enum2
}

/**
 * Description for event with Array Types
 */
data class EventWithArrayTypesProperties (
    /**
     * description for required boolean array
     */
    val requiredBooleanArray: List<Boolean>,

    /**
     * Description for required number array
     */
    val requiredNumberArray: List<Double>,

    /**
     * Description for required object array
     */
    val requiredObjectArray: List<Any?>,

    /**
     * description for required string array
     */
    val requiredStringArray: List<String>
)

/**
 * Description for event with const types
 */
class EventWithConstTypesProperties()

/**
 * Description for case with space
 */
data class EventWithDifferentCasingTypesProperties (
    /**
     * Description for enum with space
     */
    val enumWithSpace: EventWithDifferentCasingTypesEnumWithSpace,

    /**
     * description_for_enum_snake_case
     */
    val enumSnakeCase: EventWithDifferentCasingTypesEnumSnakeCase,

    /**
     * descriptionForEnumCamelCase
     */
    val enumCamelCase: EventWithDifferentCasingTypesEnumCamelCase,

    /**
     * DescirptionForEnumPascalCase
     */
    val enumPascalCase: EventWithDifferentCasingTypesEnumPascalCase,

    /**
     * Description for case with space
     */
    val propertyWithSpace: String,

    /**
     * Description_for_snake_case
     */
    val propertyWithSnakeCase: String,

    /**
     * descriptionForCamelCase
     */
    val propertyWithCamelCase: String,

    /**
     * DescriptionForPascalCase
     */
    val propertyWithPascalCase: String
)

/**
 * descriptionForEnumCamelCase
 */
enum class EventWithDifferentCasingTypesEnumCamelCase {
    EnumCamelCase
}

/**
 * DescirptionForEnumPascalCase
 */
enum class EventWithDifferentCasingTypesEnumPascalCase {
    EnumPascalCase
}

/**
 * description_for_enum_snake_case
 */
enum class EventWithDifferentCasingTypesEnumSnakeCase {
    EnumSnakeCase
}

/**
 * Description for enum with space
 */
enum class EventWithDifferentCasingTypesEnumWithSpace {
    EnumWithSpace
}

/**
 * Description for event with enum types
 */
data class EventWithEnumTypesProperties (
    /**
     * Description for required enum
     */
    val optionalEnum: EventWithEnumTypesOptionalEnum? = null,

    /**
     * Description for optional enum
     */
    val requiredEnum: EventWithEnumTypesRequiredEnum
)

/**
 * Description for required enum
 */
enum class EventWithEnumTypesOptionalEnum {
    OptionalEnum1,
    OptionalEnum2
}

/**
 * Description for optional enum
 */
enum class EventWithEnumTypesRequiredEnum {
    RequiredEnum1,
    RequiredEnum2
}

/**
 * Description for event with optional array types
 */
data class EventWithOptionalArrayTypesProperties (
    /**
     * Description for optional boolean array
     */
    val optionalBooleanArray: List<Boolean>? = null,

    /**
     * Description for optional object array
     */
    val optionalJSONArray: List<Any?>? = null,

    /**
     * Description for optional number array
     */
    val optionalNumberArray: List<Double>? = null,

    /**
     * Description for optional string array
     */
    val optionalStringArray: List<String>? = null
)

/**
 * Event w optional properties description
 */
data class EventWithOptionalPropertiesProperties (
    val optionalArrayNumber: List<Double>? = null,
    val optionalArrayString: List<String>? = null,
    val optionalBoolean: Boolean? = null,
    val optionalNumber: Double? = null,

    /**
     * Optional String property description
     */
    val optionalString: String? = null
)

data class GroupProperties (
    /**
     * Description for group optionalString
     */
    val optionalString: String? = null,

    /**
     * Description for group requiredBoolean
     */
    val requiredBoolean: Boolean
)

data class IdentifyProperties (
    /**
     * Description for identify optionalArray
     */
    val optionalArray: List<String>? = null,

    /**
     * Description for identify requiredNumber
     */
    val requiredNumber: Double
)

class Context : Event(
    eventType = "Context",
    eventProperties = null
)

class Identify(
    eventProperties: IdentifyProperties
) : Event(
    eventType = "Identify",
    eventProperties = mapOf(
        *(if (eventProperties.optionalArray != null) arrayOf("optionalArray" to eventProperties.optionalArray) else arrayOf()),
        "requiredNumber" to eventProperties.requiredNumber
    )
)

class Group(
    eventProperties: GroupProperties
) : Event(
    eventType = "Group",
    eventProperties = mapOf(
        *(if (eventProperties.optionalString != null) arrayOf("optionalString" to eventProperties.optionalString) else arrayOf()),
        "requiredBoolean" to eventProperties.requiredBoolean
    )
)

class EventMaxIntForTest(
    eventProperties: EventMaxIntForTestProperties
) : Event(
    eventType = "EventMaxIntForTest",
    eventProperties = mapOf(
        "intMax10" to eventProperties.intMax10
    )
)

class EventNoProperties : Event(
    eventType = "Event No Properties",
    eventProperties = null
)

class EventObjectTypes(
    eventProperties: EventObjectTypesProperties
) : Event(
    eventType = "Event Object Types",
    eventProperties = mapOf(
        "requiredObject" to eventProperties.requiredObject,
        "requiredObjectArray" to eventProperties.requiredObjectArray
    )
)

class EventWithAllProperties(
    eventProperties: EventWithAllPropertiesProperties
) : Event(
    eventType = "Event With All Properties",
    eventProperties = mapOf(
        *(if (eventProperties.optionalString != null) arrayOf("optionalString" to eventProperties.optionalString) else arrayOf()),
        "requiredArray" to eventProperties.requiredArray,
        "requiredBoolean" to eventProperties.requiredBoolean,
        "requiredConst" to "some-const-value",
        "requiredEnum" to eventProperties.requiredEnum,
        "requiredInteger" to eventProperties.requiredInteger,
        "requiredNumber" to eventProperties.requiredNumber,
        "requiredString" to eventProperties.requiredString
    )
)

class EventWithArrayTypes(
    eventProperties: EventWithArrayTypesProperties
) : Event(
    eventType = "Event With Array Types",
    eventProperties = mapOf(
        "requiredBooleanArray" to eventProperties.requiredBooleanArray,
        "requiredNumberArray" to eventProperties.requiredNumberArray,
        "requiredObjectArray" to eventProperties.requiredObjectArray,
        "requiredStringArray" to eventProperties.requiredStringArray
    )
)

class EventWithConstTypes : Event(
    eventType = "Event With Const Types",
    eventProperties = mapOf(
        "Boolean Const" to true,
        "Integer Const" to 10,
        "Number Const" to 2.2,
        "String Const" to "String-Constant",
        "String Const WIth Quotes" to "\"String \"Const With\" Quotes\"",
        "String Int Const" to 0
    )
)

class EventWithDifferentCasingTypes(
    eventProperties: EventWithDifferentCasingTypesProperties
) : Event(
    eventType = "event withDifferent_CasingTypes",
    eventProperties = mapOf(
        "enumCamelCase" to eventProperties.enumCamelCase,
        "EnumPascalCase" to eventProperties.enumPascalCase,
        "enum_snake_case" to eventProperties.enumSnakeCase,
        "enum with space" to eventProperties.enumWithSpace,
        "propertyWithCamelCase" to eventProperties.propertyWithCamelCase,
        "PropertyWithPascalCase" to eventProperties.propertyWithPascalCase,
        "property_with_snake_case" to eventProperties.propertyWithSnakeCase,
        "property with space" to eventProperties.propertyWithSpace
    )
)

class EventWithEnumTypes(
    eventProperties: EventWithEnumTypesProperties
) : Event(
    eventType = "Event With Enum Types",
    eventProperties = mapOf(
        *(if (eventProperties.optionalEnum != null) arrayOf("optional enum" to eventProperties.optionalEnum) else arrayOf()),
        "required enum" to eventProperties.requiredEnum
    )
)

class EventWithOptionalArrayTypes(
    eventProperties: EventWithOptionalArrayTypesProperties
) : Event(
    eventType = "Event With Optional Array Types",
    eventProperties = mapOf(
        *(if (eventProperties.optionalBooleanArray != null) arrayOf("optionalBooleanArray" to eventProperties.optionalBooleanArray) else arrayOf()),
        *(if (eventProperties.optionalJSONArray != null) arrayOf("optionalJSONArray" to eventProperties.optionalJSONArray) else arrayOf()),
        *(if (eventProperties.optionalNumberArray != null) arrayOf("optionalNumberArray" to eventProperties.optionalNumberArray) else arrayOf()),
        *(if (eventProperties.optionalStringArray != null) arrayOf("optionalStringArray" to eventProperties.optionalStringArray) else arrayOf())
    )
)

class EventWithOptionalProperties(
    eventProperties: EventWithOptionalPropertiesProperties
) : Event(
    eventType = "Event With Optional Properties",
    eventProperties = mapOf(
        *(if (eventProperties.optionalArrayNumber != null) arrayOf("optionalArrayNumber" to eventProperties.optionalArrayNumber) else arrayOf()),
        *(if (eventProperties.optionalArrayString != null) arrayOf("optionalArrayString" to eventProperties.optionalArrayString) else arrayOf()),
        *(if (eventProperties.optionalBoolean != null) arrayOf("optionalBoolean" to eventProperties.optionalBoolean) else arrayOf()),
        *(if (eventProperties.optionalNumber != null) arrayOf("optionalNumber" to eventProperties.optionalNumber) else arrayOf()),
        *(if (eventProperties.optionalString != null) arrayOf("optionalString" to eventProperties.optionalString) else arrayOf())
    )
)

class LoadClientOptions(
    val apiKey: String? = null,
    val instance: AmplitudeClient? = null,
    val plan: Plan? = null
)

class LoadOptions(
    val androidContext: Context,
    val environment: Ampli.Environment? = null,
    val disabled: Boolean? = null,
    val client: LoadClientOptions? = null
)

class EventOptions(
    val deviceId: String? = null,
    val userId: String? = null
)

val ampli = Ampli()

open class Ampli {
    companion object {
        val API_KEY: Map<Environment, String> = mapOf(
            Environment.DEVELOPMENT to "",
            Environment.PRODUCTION to ""
        )

        private val observePlan: Plan = Plan()
            .setBranch("main")
            .setSource("kotlin-ampli")
            .setVersion("0")
    }

    enum class Environment {
        DEVELOPMENT,
        PRODUCTION
    }

    @android.annotation.SuppressLint("StaticFieldLeak")
    var client: AmplitudeClient? = null
        private set

    private var disabled: Boolean = false

    open fun load(options: LoadOptions) {
        this.disabled = options.disabled ?: false
        if (this.client != null) {
            System.err.println("Warning: Ampli is already initialized. Ampli.instance.load() should be called once at application start up.")
            return
        }
        val env = options.environment ?: Environment.DEVELOPMENT
        val apiKey = options.client?.apiKey ?: API_KEY[env]

        when {
            options.client?.instance != null -> {
                this.client = options.client.instance
            }
            apiKey != null -> {
                this.client = Amplitude.getInstance()
                this.client?.initialize(options.androidContext.applicationContext, apiKey)
            }
            else -> {
                System.err.println("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'")
                return
            }
        }

        this.client?.setPlan(options.client?.plan ?: observePlan)
    }

    open fun track(event: Event, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(options)
        this.client?.logEvent(event.eventType, this.getEventPropertiesJson(event))
    }

    open fun identify(userId: String?, properties: IdentifyProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(options, userId)
        this.client?.setUserProperties(this.getEventPropertiesJson(Identify(properties)))
    }

    open fun setGroup(name: String, value: String, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(options)
        this.client?.setGroup(name, value)
    }

    open fun setGroup(name: String, value: Array<String>, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(options)
        this.client?.setGroup(name, value)
    }

    open fun flush() {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.client?.uploadEvents()
    }

    /**
     * EventMaxIntForTest
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)
     *
     * Event to test schema validation
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventMaxIntForTest(properties: EventMaxIntForTestProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventMaxIntForTest(properties), options, extra)
    }

    /**
     * Event No Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)
     *
     * Event w no properties description
     *
     * Owner: Test codegen
     *
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventNoProperties(options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventNoProperties(), options, extra)
    }

    /**
     * Event Object Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)
     *
     * Event with Object and Object Array
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventObjectTypes(properties: EventObjectTypesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventObjectTypes(properties), options, extra)
    }

    /**
     * Event With All Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)
     *
     * Event w all properties description
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithAllProperties(properties: EventWithAllPropertiesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithAllProperties(properties), options, extra)
    }

    /**
     * Event With Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)
     *
     * Description for event with Array Types
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithArrayTypes(properties: EventWithArrayTypesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithArrayTypes(properties), options, extra)
    }

    /**
     * Event With Const Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)
     *
     * Description for event with const types
     *
     * Owner: Test codegen
     *
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithConstTypes(options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithConstTypes(), options, extra)
    }

    /**
     * event withDifferent_CasingTypes
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)
     *
     * Description for case with space
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithDifferentCasingTypes(properties: EventWithDifferentCasingTypesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithDifferentCasingTypes(properties), options, extra)
    }

    /**
     * Event With Enum Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)
     *
     * Description for event with enum types
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithEnumTypes(properties: EventWithEnumTypesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithEnumTypes(properties), options, extra)
    }

    /**
     * Event With Optional Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)
     *
     * Description for event with optional array types
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithOptionalArrayTypes(properties: EventWithOptionalArrayTypesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithOptionalArrayTypes(properties), options, extra)
    }

    /**
     * Event With Optional Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)
     *
     * Event w optional properties description
     *
     * Owner: Test codegen
     *
     * @param properties The event's properties
     * @param options The event's options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithOptionalProperties(properties: EventWithOptionalPropertiesProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(EventWithOptionalProperties(properties), options, extra)
    }

    private fun isInitializedAndEnabled(): Boolean {
        if (this.client == null) {
            System.err.println("Ampli is not yet initialized. Have you called `ampli.load()` on app start?")
            return false
        }
        return !this.disabled
    }

    private fun handleEventOptions(options: EventOptions?, userId: String? = null) {
        if (options?.deviceId != null) {
            this.client?.deviceId = options.deviceId
        }
        if (userId != null || options?.userId != null) {
            this.client?.userId = userId ?: options?.userId
        }
    }

    private fun getEventPropertiesJson(event: Event): JSONObject? {
        if (event.eventProperties == null) {
            return null
        }

        val json = JSONObject()

        event.eventProperties.entries.forEach { eventPropertyEntry ->
            val key = eventPropertyEntry.key
            val value = eventPropertyEntry.value

            try {
                value?.let {
                    json.put(key, if (value.javaClass.isArray) JSONArray(value) else value)
                } ?: run {
                    json.put(key, JSONObject.NULL)
                }
            } catch (e: JSONException) {
                System.err.println("Error converting properties to JSONObject: ${e.message}")
            }
        }

        return json
    }
}
