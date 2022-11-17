//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull jre-kotlin-ampli'
//
// Required dependencies: com.amplitude:java-sdk:1.8.0, org.json:json:20201115
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: jre:kotlin-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/jre-kotlin-ampli)
//

package com.amplitude.ampli

import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

import com.amplitude.Amplitude
import com.amplitude.MiddlewareExtra
import com.amplitude.Plan

abstract class Event<E: Event<E>>(
    val eventType: String,
    val eventProperties: Map<String, Any?>?,
    val options: EventOptions?,
    private val eventFactory: (eventProperties: Map<String, Any?>?, options: EventOptions?) -> E
) {
    fun options(userId: String? = null, deviceId: String? = null): E {
        return this.options(EventOptions(
            userId = userId,
            deviceId = deviceId,
        ))
    }

    fun options(options: EventOptions): E {
        return this.eventFactory(this.eventProperties?.toMap(), options)
    }
}

class LoadOptions(
    val environment: Ampli.Environment? = null,
    val disabled: Boolean? = null,
    val client: LoadClientOptions? = null
)

class EventOptions(
    val userId: String? = null,
    val deviceId: String? = null,
    val sessionId: Long = -1L
)

class LoadClientOptions(
    val apiKey: String? = null,
    val instance: Amplitude? = null,
    val plan: Plan? = null
)

class Identify private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<Identify>("Identify", eventProperties, options, ::Identify) {
    /**
     * Identify
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Identify)
     *
     * Identify properties.
     *
     * @param requiredNumber Description for identify requiredNumber
     * @param optionalArray Description for identify optionalArray
     */
    constructor(
        requiredNumber: Double,
        optionalArray: Array<String>? = null
    ) : this(mapOf(
        *(if (optionalArray != null) arrayOf("optionalArray" to optionalArray) else arrayOf()),
        "requiredNumber" to requiredNumber
    ), null as EventOptions?)
}

class EventMaxIntForTest private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventMaxIntForTest>("EventMaxIntForTest", eventProperties, options, ::EventMaxIntForTest) {
    /**
     * EventMaxIntForTest
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest)
     *
     * Event to test schema validation
     *
     * Owner: Test codegen
     *
     * @param intMax10 property to test schema validation
     */
    constructor(
        intMax10: Int
    ) : this(mapOf(
        "intMax10" to intMax10
    ), null as EventOptions?)
}

class EventNoProperties private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventNoProperties>("Event No Properties", eventProperties, options, ::EventNoProperties) {
    /**
     * Event No Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)
     *
     * Event w no properties description
     *
     * Owner: Test codegen
     */
    constructor() : this(null, null as EventOptions?)
}

class EventObjectTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventObjectTypes>("Event Object Types", eventProperties, options, ::EventObjectTypes) {
    /**
     * Event Object Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types)
     *
     * Event with Object and Object Array
     *
     * Owner: Test codegen
     *
     * @param requiredObject Property Object Type
     * @param requiredObjectArray Property Object Array Type
     */
    constructor(
        requiredObject: Any,
        requiredObjectArray: Array<Any>
    ) : this(mapOf(
        "requiredObject" to requiredObject,
        "requiredObjectArray" to requiredObjectArray
    ), null as EventOptions?)
}

class EventWithAllProperties private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithAllProperties>("Event With All Properties", eventProperties, options, ::EventWithAllProperties) {
    /**
     * Event With All Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties)
     *
     * Event w all properties description
     *
     * Owner: Test codegen
     *
     * @param requiredArray Event 2 Property - Array
     * @param requiredBoolean Event 2 Property - Boolean
     * @param requiredEnum Event 2 Property - Enum
     * @param requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
     * @param requiredNumber Event 2 Property - Number
     * @param requiredString Event 2 Property - String
     * @param optionalString Event 2 Property - Optional String    *     * Examples:    * Some string, or another
     */
    constructor(
        requiredArray: Array<String>,
        requiredBoolean: Boolean,
        requiredEnum: RequiredEnum,
        requiredInteger: Int,
        requiredNumber: Double,
        requiredString: String,
        optionalString: String? = null
    ) : this(mapOf(
        *(if (optionalString != null) arrayOf("optionalString" to optionalString) else arrayOf()),
        "requiredArray" to requiredArray,
        "requiredBoolean" to requiredBoolean,
        "requiredConst" to "some-const-value",
        "requiredEnum" to requiredEnum.value,
        "requiredInteger" to requiredInteger,
        "requiredNumber" to requiredNumber,
        "requiredString" to requiredString
    ), null as EventOptions?)

    enum class RequiredEnum(val value: String) {
        ENUM_1("Enum1"),
        ENUM_2("Enum2")
    }
}

class EventWithArrayTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithArrayTypes>("Event With Array Types", eventProperties, options, ::EventWithArrayTypes) {
    /**
     * Event With Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)
     *
     * Description for event with Array Types
     *
     * Owner: Test codegen
     *
     * @param requiredBooleanArray description for required boolean array
     * @param requiredNumberArray Description for required number array
     * @param requiredObjectArray Description for required object array
     * @param requiredStringArray description for required string array
     */
    constructor(
        requiredBooleanArray: Array<Boolean>,
        requiredNumberArray: Array<Double>,
        requiredObjectArray: Array<Any>,
        requiredStringArray: Array<String>
    ) : this(mapOf(
        "requiredBooleanArray" to requiredBooleanArray,
        "requiredNumberArray" to requiredNumberArray,
        "requiredObjectArray" to requiredObjectArray,
        "requiredStringArray" to requiredStringArray
    ), null as EventOptions?)
}

class EventWithConstTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithConstTypes>("Event With Const Types", eventProperties, options, ::EventWithConstTypes) {
    /**
     * Event With Const Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)
     *
     * Description for event with const types
     *
     * Owner: Test codegen
     */
    constructor() : this(mapOf(
        "Boolean Const" to true,
        "Integer Const" to 10,
        "Number Const" to 2.2,
        "String Const" to "String-Constant",
        "String Const WIth Quotes" to "\"String \"Const With\" Quotes\"",
        "String Int Const" to 0
    ), null as EventOptions?)
}

class EventWithDifferentCasingTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithDifferentCasingTypes>("event withDifferent_CasingTypes", eventProperties, options, ::EventWithDifferentCasingTypes) {
    /**
     * event withDifferent_CasingTypes
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)
     *
     * Description for case with space
     *
     * Owner: Test codegen
     *
     * @param enumCamelCase descriptionForEnumCamelCase
     * @param enumPascalCase DescirptionForEnumPascalCase
     * @param enumSnakeCase description_for_enum_snake_case
     * @param enumWithSpace Description for enum with space
     * @param propertyWithCamelCase descriptionForCamelCase
     * @param propertyWithPascalCase DescriptionForPascalCase
     * @param propertyWithSnakeCase Description_for_snake_case
     * @param propertyWithSpace Description for case with space
     */
    constructor(
        enumCamelCase: EnumCamelCase,
        enumPascalCase: EnumPascalCase,
        enumSnakeCase: EnumSnakeCase,
        enumWithSpace: EnumWithSpace,
        propertyWithCamelCase: String,
        propertyWithPascalCase: String,
        propertyWithSnakeCase: String,
        propertyWithSpace: String
    ) : this(mapOf(
        "enumCamelCase" to enumCamelCase.value,
        "EnumPascalCase" to enumPascalCase.value,
        "enum_snake_case" to enumSnakeCase.value,
        "enum with space" to enumWithSpace.value,
        "propertyWithCamelCase" to propertyWithCamelCase,
        "PropertyWithPascalCase" to propertyWithPascalCase,
        "property_with_snake_case" to propertyWithSnakeCase,
        "property with space" to propertyWithSpace
    ), null as EventOptions?)

    enum class EnumCamelCase(val value: String) {
        ENUM_CAMEL_CASE("enumCamelCase")
    }

    enum class EnumPascalCase(val value: String) {
        ENUM_PASCAL_CASE("EnumPascalCase")
    }

    enum class EnumSnakeCase(val value: String) {
        ENUM_SNAKE_CASE("enum_snake_case")
    }

    enum class EnumWithSpace(val value: String) {
        ENUM_WITH_SPACE("enum with space")
    }
}

class EventWithEnumTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithEnumTypes>("Event With Enum Types", eventProperties, options, ::EventWithEnumTypes) {
    /**
     * Event With Enum Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types)
     *
     * Description for event with enum types
     *
     * Owner: Test codegen
     *
     * @param requiredEnum Description for optional enum
     * @param optionalEnum Description for required enum
     */
    constructor(
        requiredEnum: RequiredEnum,
        optionalEnum: OptionalEnum? = null
    ) : this(mapOf(
        *(if (optionalEnum != null) arrayOf("optional enum" to optionalEnum.value) else arrayOf()),
        "required enum" to requiredEnum.value
    ), null as EventOptions?)

    enum class OptionalEnum(val value: String) {
        OPTIONAL_ENUM_1("optional enum 1"),
        OPTIONAL_ENUM_2("optional enum 2")
    }

    enum class RequiredEnum(val value: String) {
        REQUIRED_ENUM_1("required enum 1"),
        REQUIRED_ENUM_2("required enum 2")
    }
}

class EventWithOptionalArrayTypes private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithOptionalArrayTypes>("Event With Optional Array Types", eventProperties, options, ::EventWithOptionalArrayTypes) {
    /**
     * Event With Optional Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)
     *
     * Description for event with optional array types
     *
     * Owner: Test codegen
     *
     * @param optionalBooleanArray Description for optional boolean array
     * @param optionalJsonArray Description for optional object array
     * @param optionalNumberArray Description for optional number array
     * @param optionalStringArray Description for optional string array
     */
    constructor(
        optionalBooleanArray: Array<Boolean>? = null,
        optionalJsonArray: Array<Any>? = null,
        optionalNumberArray: Array<Double>? = null,
        optionalStringArray: Array<String>? = null
    ) : this(mapOf(
        *(if (optionalBooleanArray != null) arrayOf("optionalBooleanArray" to optionalBooleanArray) else arrayOf()),
        *(if (optionalJsonArray != null) arrayOf("optionalJSONArray" to optionalJsonArray) else arrayOf()),
        *(if (optionalNumberArray != null) arrayOf("optionalNumberArray" to optionalNumberArray) else arrayOf()),
        *(if (optionalStringArray != null) arrayOf("optionalStringArray" to optionalStringArray) else arrayOf())
    ), null as EventOptions?)
}

class EventWithOptionalProperties private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithOptionalProperties>("Event With Optional Properties", eventProperties, options, ::EventWithOptionalProperties) {
    /**
     * Event With Optional Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)
     *
     * Event w optional properties description
     *
     * Owner: Test codegen
     *
     * @param optionalArrayNumber Property has no description provided in tracking plan.
     * @param optionalArrayString Property has no description provided in tracking plan.
     * @param optionalBoolean Property has no description provided in tracking plan.
     * @param optionalNumber Property has no description provided in tracking plan.
     * @param optionalString Optional String property description
     */
    constructor(
        optionalArrayNumber: Array<Double>? = null,
        optionalArrayString: Array<String>? = null,
        optionalBoolean: Boolean? = null,
        optionalNumber: Double? = null,
        optionalString: String? = null
    ) : this(mapOf(
        *(if (optionalArrayNumber != null) arrayOf("optionalArrayNumber" to optionalArrayNumber) else arrayOf()),
        *(if (optionalArrayString != null) arrayOf("optionalArrayString" to optionalArrayString) else arrayOf()),
        *(if (optionalBoolean != null) arrayOf("optionalBoolean" to optionalBoolean) else arrayOf()),
        *(if (optionalNumber != null) arrayOf("optionalNumber" to optionalNumber) else arrayOf()),
        *(if (optionalString != null) arrayOf("optionalString" to optionalString) else arrayOf())
    ), null as EventOptions?)
}

class EventWithTemplateProperties private constructor(
    eventProperties: Map<String, Any?>?,
    options: EventOptions? = null
) : Event<EventWithTemplateProperties>("Event With Template Properties", eventProperties, options, ::EventWithTemplateProperties) {
    /**
     * Event With Template Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties)
     *
     * Event with template properties description
     *
     * Owner: Test codegen
     *
     * @param requiredEventProperty required_event_property description
     * @param requiredTemplateProperty required_template_property description
     * @param optionalEventProperty optional_event_property description
     * @param optionalTemplateProperty optional_template_property description
     */
    constructor(
        requiredEventProperty: String,
        requiredTemplateProperty: String,
        optionalEventProperty: Double? = null,
        optionalTemplateProperty: Double? = null
    ) : this(mapOf(
        *(if (optionalEventProperty != null) arrayOf("optional_event_property" to optionalEventProperty) else arrayOf()),
        *(if (optionalTemplateProperty != null) arrayOf("optional_template_property" to optionalTemplateProperty) else arrayOf()),
        "required_event_property" to requiredEventProperty,
        "required_template_property" to requiredTemplateProperty
    ), null as EventOptions?)
}

val ampli = Ampli()

open class Ampli {
    companion object {
        val API_KEY: Map<Environment, String> = mapOf(
            Environment.DEVELOPMENT to "",
            Environment.PRODUCTION to ""
        )

        private val observePlan: Plan = Plan()
            .setBranch("main")
            .setSource("jre-kotlin-ampli")
            .setVersion("0")
            .setVersionId("79154a50-f057-4db5-9755-775e4e9f05e6")
    }

    enum class Environment {
        DEVELOPMENT,
        PRODUCTION
    }

    private var disabled: Boolean = false

    val isLoaded: Boolean
        get() {
            return this._client != null
        }

    private var _client: Amplitude? = null
    val client: Amplitude
        get() {
            this.isInitializedAndEnabled()
            return this._client!!
        }

    open fun load(options: LoadOptions? = null) {
        this.disabled = options?.disabled ?: false
        if (this.isLoaded) {
            System.err.println("Warning: Ampli is already initialized. ampli.load() should be called once at application start up.")
            return
        }
        val env = options?.environment ?: Environment.DEVELOPMENT
        val apiKey = options?.client?.apiKey ?: API_KEY[env]

        when {
            options?.client?.instance != null -> {
                this._client = options.client.instance
            }
            apiKey != null && apiKey != "" -> {
                this._client = Amplitude.getInstance()
                this._client?.init(apiKey)
            }
            else -> {
                System.err.println("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'")
                return
            }
        }

        this._client?.setPlan(options?.client?.plan ?: observePlan)

        // set IngestionMetadata with backwards compatibility, min Java SDK version 1.10.1.
        try {
            val clazz = Class.forName("com.amplitude.IngestionMetadata")
            val setSourceNameMethod = clazz.getMethod("setSourceName", String::class.java)
            val setSourceVersionMethod = clazz.getMethod("setSourceVersion", String::class.java)
            val ingestionMetadata = clazz.newInstance()
            setSourceNameMethod.invoke(ingestionMetadata, "jre-kotlin-ampli")
            setSourceVersionMethod.invoke(ingestionMetadata, "1.0.0")
            val setIngestionMetadata = Amplitude::class.java.getMethod("setIngestionMetadata", clazz)
            setIngestionMetadata.invoke(this._client, ingestionMetadata)
        } catch (e: ClassNotFoundException) {
            println("com.amplitude.IngestionMetadata is available starting from Java SDK 1.10.1 version")
        } catch (e: NoSuchMethodException) {
            println("com.amplitude.IngestionMetadata is available starting from Java SDK 1.10.1 version")
        } catch (e: SecurityException) {
            println("com.amplitude.IngestionMetadata is available starting from Java SDK 1.10.1 version")
        } catch (e: Exception) {
            System.err.println("Unexpected error when setting IngestionMetadata")
        }
    }

    open fun track(userId: String?, event: Event<*>, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!isInitializedAndEnabled()) {
            return
        }
        val amplitudeEvent = this.createAmplitudeEvent(event.eventType, event.options, options, userId)
        amplitudeEvent.eventProperties = this.getEventPropertiesJson(event)

        this._client?.logEvent(amplitudeEvent, extra)
    }

    open fun identify(userId: String?, event: Identify, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        val amplitudeEvent = this.createAmplitudeEvent(event.eventType, event.options, options, userId)
        amplitudeEvent.userProperties = this.getEventPropertiesJson(event)

        this._client?.logEvent(amplitudeEvent, extra)
    }

    open fun setGroup(userId: String?, name: String, value: String, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.setGroupProperties(userId, name, value, options, extra)
    }

    open fun setGroup(userId: String?, name: String, value: Array<String>, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.setGroupProperties(userId, name, this.getJsonArray(value), options, extra)
    }

    private fun setGroupProperties(userId: String?, name: String, value: Any, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }

        val groupProperties = JSONObject()
        try {
            groupProperties.put(name, value)
        } catch (e: JSONException) {
            System.err.println("Error converting properties to JSONObject: ${e.message}")
        }

        val amplitudeEvent = this.createAmplitudeEvent("\$identify", null, options, userId)
        amplitudeEvent.groupProperties = groupProperties

        this._client?.logEvent(amplitudeEvent, extra)
    }

    open fun flush() {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this._client?.flushEvents()
    }

    /**
     * EventMaxIntForTest
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest)
     *
     * Event to test schema validation
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventMaxIntForTest(userId: String?, event: EventMaxIntForTest, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event No Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)
     *
     * Event w no properties description
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventNoProperties(userId: String?, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, EventNoProperties(), options, extra)
    }

    /**
     * Event Object Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types)
     *
     * Event with Object and Object Array
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventObjectTypes(userId: String?, event: EventObjectTypes, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event With All Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties)
     *
     * Event w all properties description
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithAllProperties(userId: String?, event: EventWithAllProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event With Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)
     *
     * Description for event with Array Types
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithArrayTypes(userId: String?, event: EventWithArrayTypes, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event With Const Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)
     *
     * Description for event with const types
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithConstTypes(userId: String?, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, EventWithConstTypes(), options, extra)
    }

    /**
     * event withDifferent_CasingTypes
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)
     *
     * Description for case with space
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithDifferentCasingTypes(userId: String?, event: EventWithDifferentCasingTypes, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event With Enum Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types)
     *
     * Description for event with enum types
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithEnumTypes(userId: String?, event: EventWithEnumTypes, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    /**
     * Event With Optional Array Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)
     *
     * Description for event with optional array types
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithOptionalArrayTypes(userId: String?, event: EventWithOptionalArrayTypes? = null, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event ?: EventWithOptionalArrayTypes(), options, extra)
    }

    /**
     * Event With Optional Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)
     *
     * Event w optional properties description
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithOptionalProperties(userId: String?, event: EventWithOptionalProperties? = null, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event ?: EventWithOptionalProperties(), options, extra)
    }

    /**
     * Event With Template Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties)
     *
     * Event with template properties description
     *
     * Owner: Test codegen
     *
     * @param userId The user's ID
     * @param event The event
     * @param options Amplitude event options
     * @param extra Extra untyped parameters for use in middleware
     */
    fun eventWithTemplateProperties(userId: String?, event: EventWithTemplateProperties, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        this.track(userId, event, options, extra)
    }

    private fun createAmplitudeEvent(eventType: String, options: EventOptions?, overrideOptions: EventOptions?, overrideUserId: String?): com.amplitude.Event {
        val event = com.amplitude.Event(
            eventType,
            overrideUserId ?: overrideOptions?.userId ?: options?.userId,
            overrideOptions?.deviceId ?: options?.deviceId
        )
        if (overrideOptions != null && overrideOptions.sessionId != -1L) {
            event.sessionId = overrideOptions.sessionId
        } else if (options != null && options.sessionId != -1L) {
            event.sessionId = options.sessionId
        }
        return event
    }

    private fun isInitializedAndEnabled(): Boolean {
        if (!this.isLoaded) {
            System.err.println("Ampli is not yet initialized. Have you called `ampli.load()` on app start?")
            return false
        }
        return !this.disabled
    }

    private fun getEventPropertiesJson(event: Event<*>?): JSONObject? {
        if (event?.eventProperties == null) {
            return null
        }

        val json = JSONObject()

        event.eventProperties.entries.forEach { eventPropertyEntry ->
            val key = eventPropertyEntry.key
            val value = eventPropertyEntry.value

            try {
                value?.let {
                    json.put(key, if (value.javaClass.isArray) getJsonArray(value) else value)
                } ?: run {
                    json.put(key, JSONObject.NULL)
                }
            } catch (e: JSONException) {
                System.err.println("Error converting properties to JSONObject: ${e.message}")
            }
        }

        return json
    }

    private fun getJsonArray(value: Any): JSONArray {
        return try {
            JSONArray(value)
        } catch (e: JSONException) {
            System.err.printf("Error converting value to JSONArray: %s%n", e.message)
            JSONArray()
        }
    }
}
