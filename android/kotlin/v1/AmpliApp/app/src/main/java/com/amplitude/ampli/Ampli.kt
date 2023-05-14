//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull kotlin-ampli'
//
// Required dependencies: com.amplitude:android-sdk:[2.37.0,3.0), com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 1
// Build: 1.0.0
// Runtime: android:kotlin-ampli
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/kotlin-ampli)
//

package com.amplitude.ampli

import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

import com.amplitude.api.Amplitude
import com.amplitude.api.AmplitudeClient
import com.amplitude.api.MiddlewareExtra
import com.amplitude.api.Plan

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
    val deviceId: String? = null
)

class LoadClientOptions(
    val apiKey: String? = null,
    val instance: AmplitudeClient? = null,
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
     * @param requiredEnumArray Description for enum array property
     * @param requiredNumberArray Description for required number array
     * @param requiredObjectArray Description for required object array
     * @param requiredStringArray description for required string array
     */
    constructor(
        requiredBooleanArray: Array<Boolean>,
        requiredEnumArray: Array<String>,
        requiredNumberArray: Array<Double>,
        requiredObjectArray: Array<Any>,
        requiredStringArray: Array<String>
    ) : this(mapOf(
        "requiredBooleanArray" to requiredBooleanArray,
        "requiredEnumArray" to requiredEnumArray,
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
     * @param optionalEnumArray Description for optional enum array
     * @param optionalJsonArray Description for optional object array
     * @param optionalNumberArray Description for optional number array
     * @param optionalStringArray Description for optional string array
     */
    constructor(
        optionalBooleanArray: Array<Boolean>? = null,
        optionalEnumArray: Array<String>? = null,
        optionalJsonArray: Array<Any>? = null,
        optionalNumberArray: Array<Double>? = null,
        optionalStringArray: Array<String>? = null
    ) : this(mapOf(
        *(if (optionalBooleanArray != null) arrayOf("optionalBooleanArray" to optionalBooleanArray) else arrayOf()),
        *(if (optionalEnumArray != null) arrayOf("optionalEnumArray" to optionalEnumArray) else arrayOf()),
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
     * @param enumWithSpace Description for enum with space
     * @param enumSnakeCase description_for_enum_snake_case
     * @param enumCamelCase descriptionForEnumCamelCase
     * @param enumPascalCase DescirptionForEnumPascalCase
     * @param propertyWithSpace Description for case with space
     * @param propertyWithSnakeCase Description_for_snake_case
     * @param propertyWithCamelCase descriptionForCamelCase
     * @param propertyWithPascalCase DescriptionForPascalCase
     */
    constructor(
        enumWithSpace: EnumWithSpace,
        enumSnakeCase: EnumSnakeCase,
        enumCamelCase: EnumCamelCase,
        enumPascalCase: EnumPascalCase,
        propertyWithSpace: String,
        propertyWithSnakeCase: String,
        propertyWithCamelCase: String,
        propertyWithPascalCase: String
    ) : this(mapOf(
        "enum with space" to enumWithSpace.value,
        "enum_snake_case" to enumSnakeCase.value,
        "enumCamelCase" to enumCamelCase.value,
        "EnumPascalCase" to enumPascalCase.value,
        "property with space" to propertyWithSpace,
        "property_with_snake_case" to propertyWithSnakeCase,
        "propertyWithCamelCase" to propertyWithCamelCase,
        "PropertyWithPascalCase" to propertyWithPascalCase
    ), null as EventOptions?)

    enum class EnumWithSpace(val value: String) {
        ENUM_WITH_SPACE("enum with space")
    }

    enum class EnumSnakeCase(val value: String) {
        ENUM_SNAKE_CASE("enum_snake_case")
    }

    enum class EnumCamelCase(val value: String) {
        ENUM_CAMEL_CASE("enumCamelCase")
    }

    enum class EnumPascalCase(val value: String) {
        ENUM_PASCAL_CASE("EnumPascalCase")
    }
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

val ampli = Ampli()

open class Ampli {
    companion object {
        val API_KEY: Map<Environment, String> = mapOf(
            Environment.PROD to "",
            Environment.DEV to ""
        )

        private val observePlan: Plan = Plan()
            .setBranch("main")
            .setSource("kotlin-ampli")
            .setVersion("1")
            .setVersionId("a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c")
    }

    enum class Environment {
        PROD,
        DEV
    }

    private var disabled: Boolean = false

    val isLoaded: Boolean
        get() {
            return this._client != null
        }

    @android.annotation.SuppressLint("StaticFieldLeak")
    private var _client: AmplitudeClient? = null
    val client: AmplitudeClient
        get() {
            this.isInitializedAndEnabled()
            return this._client!!
        }

    /**
     * Options should have 'environment', 'client.api_key' or 'client.instance'
     */
    open fun load(appContext: android.content.Context, options: LoadOptions) {
        this.disabled = options.disabled ?: false
        if (this.isLoaded) {
            System.err.println("Warning: Ampli is already initialized. ampli.load() should be called once at application start up.")
            return
        }
        
        var apiKey = ""
        if (options.client?.apiKey != null) {
          apiKey = options.client.apiKey
        }
        if (options.environment != null) {
          apiKey = API_KEY[options.environment].toString()
        }

        when {
            options.client?.instance != null -> {
                this._client = options.client.instance
            }
            apiKey != "" -> {
                this._client = Amplitude.getInstance()
                this._client?.initialize(appContext.applicationContext, apiKey)
            }
            else -> {
                System.err.println("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'")
                return
            }
        }

        this._client?.setPlan(options.client?.plan ?: observePlan)

        // set IngestionMetadata with backwards compatibility, min Android SDK version 2.38.2.
        try {
            val clazz = Class.forName("com.amplitude.api.IngestionMetadata")
            val setSourceNameMethod = clazz.getMethod("setSourceName", String::class.java)
            val setSourceVersionMethod = clazz.getMethod(
                "setSourceVersion",
                String::class.java
            )
            val ingestionMetadata = clazz.newInstance()
            setSourceNameMethod.invoke(ingestionMetadata, "android-kotlin-ampli")
            setSourceVersionMethod.invoke(ingestionMetadata, "1.0.0")
            val setIngestionMetadata = AmplitudeClient::class.java.getMethod("setIngestionMetadata", clazz)
            setIngestionMetadata.invoke(client, ingestionMetadata)
        } catch (e: ClassNotFoundException) {
            println("com.amplitude.api.IngestionMetadata is available starting from Android SDK 2.38.2 version")
        } catch (e: NoSuchMethodException) {
            println("com.amplitude.api.IngestionMetadata is available starting from Android SDK 2.38.2 version")
        } catch (e: SecurityException) {
            println("com.amplitude.api.IngestionMetadata is available starting from Android SDK 2.38.2 version")
        } catch (e: Exception) {
            System.err.println("Unexpected error when setting IngestionMetadata")
        }
    }

    open fun track(event: Event<*>, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(event.options, options)
        this._client?.logEvent(event.eventType, this.getEventPropertiesJson(event), extra)
    }

    open fun identify(userId: String?, event: Identify, options: EventOptions? = null, extra: MiddlewareExtra? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.handleEventOptions(event.options, options, userId)
        this._client?.setUserProperties(this.getEventPropertiesJson(event), extra)
    }

    open fun flush() {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this._client?.uploadEvents()
    }

    /**
     * Event No Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)
     *
     * Event w no properties description
     *
     * Owner: Test codegen
     */
    fun eventNoProperties() {
        this.track(EventNoProperties())
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
     * @param requiredObject Property Object Type
     * @param requiredObjectArray Property Object Array Type
     */
    fun eventObjectTypes(
        requiredObject: Any,
        requiredObjectArray: Array<Any>
    ) {
        this.track(EventObjectTypes(
            requiredObject = requiredObject,
            requiredObjectArray = requiredObjectArray
        ))
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
     * @param requiredArray Event 2 Property - Array
     * @param requiredBoolean Event 2 Property - Boolean
     * @param requiredEnum Event 2 Property - Enum
     * @param requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
     * @param requiredNumber Event 2 Property - Number
     * @param requiredString Event 2 Property - String
     * @param optionalString Event 2 Property - Optional String    *     * Examples:    * Some string, or another
     */
    fun eventWithAllProperties(
        requiredArray: Array<String>,
        requiredBoolean: Boolean,
        requiredEnum: EventWithAllProperties.RequiredEnum,
        requiredInteger: Int,
        requiredNumber: Double,
        requiredString: String,
        optionalString: String? = null
    ) {
        this.track(EventWithAllProperties(
            requiredArray = requiredArray,
            requiredBoolean = requiredBoolean,
            requiredEnum = requiredEnum,
            requiredInteger = requiredInteger,
            requiredNumber = requiredNumber,
            requiredString = requiredString,
            optionalString = optionalString
        ))
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
     * @param requiredBooleanArray description for required boolean array
     * @param requiredEnumArray Description for enum array property
     * @param requiredNumberArray Description for required number array
     * @param requiredObjectArray Description for required object array
     * @param requiredStringArray description for required string array
     */
    fun eventWithArrayTypes(
        requiredBooleanArray: Array<Boolean>,
        requiredEnumArray: Array<String>,
        requiredNumberArray: Array<Double>,
        requiredObjectArray: Array<Any>,
        requiredStringArray: Array<String>
    ) {
        this.track(EventWithArrayTypes(
            requiredBooleanArray = requiredBooleanArray,
            requiredEnumArray = requiredEnumArray,
            requiredNumberArray = requiredNumberArray,
            requiredObjectArray = requiredObjectArray,
            requiredStringArray = requiredStringArray
        ))
    }

    /**
     * Event With Const Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)
     *
     * Description for event with const types
     *
     * Owner: Test codegen
     */
    fun eventWithConstTypes() {
        this.track(EventWithConstTypes())
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
     * @param requiredEnum Description for optional enum
     * @param optionalEnum Description for required enum
     */
    fun eventWithEnumTypes(
        requiredEnum: EventWithEnumTypes.RequiredEnum,
        optionalEnum: EventWithEnumTypes.OptionalEnum? = null
    ) {
        this.track(EventWithEnumTypes(
            requiredEnum = requiredEnum,
            optionalEnum = optionalEnum
        ))
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
     * @param optionalBooleanArray Description for optional boolean array
     * @param optionalEnumArray Description for optional enum array
     * @param optionalJsonArray Description for optional object array
     * @param optionalNumberArray Description for optional number array
     * @param optionalStringArray Description for optional string array
     */
    fun eventWithOptionalArrayTypes(
        optionalBooleanArray: Array<Boolean>? = null,
        optionalEnumArray: Array<String>? = null,
        optionalJsonArray: Array<Any>? = null,
        optionalNumberArray: Array<Double>? = null,
        optionalStringArray: Array<String>? = null
    ) {
        this.track(EventWithOptionalArrayTypes(
            optionalBooleanArray = optionalBooleanArray,
            optionalEnumArray = optionalEnumArray,
            optionalJsonArray = optionalJsonArray,
            optionalNumberArray = optionalNumberArray,
            optionalStringArray = optionalStringArray
        ))
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
     * @param optionalArrayNumber Property has no description provided in tracking plan.
     * @param optionalArrayString Property has no description provided in tracking plan.
     * @param optionalBoolean Property has no description provided in tracking plan.
     * @param optionalNumber Property has no description provided in tracking plan.
     * @param optionalString Optional String property description
     */
    fun eventWithOptionalProperties(
        optionalArrayNumber: Array<Double>? = null,
        optionalArrayString: Array<String>? = null,
        optionalBoolean: Boolean? = null,
        optionalNumber: Double? = null,
        optionalString: String? = null
    ) {
        this.track(EventWithOptionalProperties(
            optionalArrayNumber = optionalArrayNumber,
            optionalArrayString = optionalArrayString,
            optionalBoolean = optionalBoolean,
            optionalNumber = optionalNumber,
            optionalString = optionalString
        ))
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
     * @param requiredEventProperty required_event_property description
     * @param requiredTemplateProperty required_template_property description
     * @param optionalEventProperty optional_event_property description
     * @param optionalTemplateProperty optional_template_property description
     */
    fun eventWithTemplateProperties(
        requiredEventProperty: String,
        requiredTemplateProperty: String,
        optionalEventProperty: Double? = null,
        optionalTemplateProperty: Double? = null
    ) {
        this.track(EventWithTemplateProperties(
            requiredEventProperty = requiredEventProperty,
            requiredTemplateProperty = requiredTemplateProperty,
            optionalEventProperty = optionalEventProperty,
            optionalTemplateProperty = optionalTemplateProperty
        ))
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
     * @param enumWithSpace Description for enum with space
     * @param enumSnakeCase description_for_enum_snake_case
     * @param enumCamelCase descriptionForEnumCamelCase
     * @param enumPascalCase DescirptionForEnumPascalCase
     * @param propertyWithSpace Description for case with space
     * @param propertyWithSnakeCase Description_for_snake_case
     * @param propertyWithCamelCase descriptionForCamelCase
     * @param propertyWithPascalCase DescriptionForPascalCase
     */
    fun eventWithDifferentCasingTypes(
        enumWithSpace: EventWithDifferentCasingTypes.EnumWithSpace,
        enumSnakeCase: EventWithDifferentCasingTypes.EnumSnakeCase,
        enumCamelCase: EventWithDifferentCasingTypes.EnumCamelCase,
        enumPascalCase: EventWithDifferentCasingTypes.EnumPascalCase,
        propertyWithSpace: String,
        propertyWithSnakeCase: String,
        propertyWithCamelCase: String,
        propertyWithPascalCase: String
    ) {
        this.track(EventWithDifferentCasingTypes(
            enumWithSpace = enumWithSpace,
            enumSnakeCase = enumSnakeCase,
            enumCamelCase = enumCamelCase,
            enumPascalCase = enumPascalCase,
            propertyWithSpace = propertyWithSpace,
            propertyWithSnakeCase = propertyWithSnakeCase,
            propertyWithCamelCase = propertyWithCamelCase,
            propertyWithPascalCase = propertyWithPascalCase
        ))
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
     * @param intMax10 property to test schema validation
     */
    fun eventMaxIntForTest(
        intMax10: Int
    ) {
        this.track(EventMaxIntForTest(
            intMax10 = intMax10
        ))
    }

    private fun handleEventOptions(options: EventOptions?, overrideOptions: EventOptions?, overrideUserId: String? = null) {
        val userId = overrideUserId ?: overrideOptions?.userId ?: options?.userId
        if (userId != null) {
            this._client?.userId = userId
        }

        val deviceId = overrideOptions?.deviceId ?: options?.deviceId
        if (deviceId != null) {
            this._client?.deviceId = deviceId
        }
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
