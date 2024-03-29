//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull kotlin-ampli-v2'
//
// Required dependencies: com.amplitude:analytics-android:[1.0.0,2.0)
// Tracking Plan Version: 1
// Build: 1.0.0
// Runtime: android:kotlin-ampli-v2
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/kotlin-ampli-v2)
//

package com.amplitude.ampli

import com.amplitude.android.Amplitude
import com.amplitude.android.Configuration
import com.amplitude.android.events.BaseEvent
import com.amplitude.android.events.EventOptions
import com.amplitude.android.events.Plan
import com.amplitude.core.Constants
import com.amplitude.core.platform.Plugin

enum class EventType(val value: String) {
    Identify(Constants.IDENTIFY_EVENT),
    GroupIdentify(Constants.GROUP_IDENTIFY_EVENT),
}

class LoadOptions(
    val environment: Ampli.Environment? = null,
    val disabled: Boolean? = null,
    val client: LoadClientOptions? = null
)

class LoadClientOptions(
    val apiKey: String? = null,
    val instance: Amplitude? = null,
    val configuration: Configuration? = null
)

class SetAmpliExtrasPlugin : Plugin {
    override val type: Plugin.Type = Plugin.Type.Before
    override lateinit var amplitude: com.amplitude.core.Amplitude

    override fun execute(event: com.amplitude.core.events.BaseEvent): com.amplitude.core.events.BaseEvent {
        val ampliExtra = mapOf(
            "ampli" to mapOf(
                "ingestionMetadata" to mapOf(
                    "sourceName" to "android-kotlin-ampli",
                    "sourceVersion" to "2.0.0"
                )
            )
        )
        event.extra = (event.extra ?: mapOf()).plus(ampliExtra)
        return event
    }
}

val defaultObservePlan = Plan("main", "kotlin-ampli-v2", "1", "a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c")

class DefaultConfiguration(apiKey: String, context : android.content.Context) {
    val config : Configuration
    init {
        config = Configuration(
            apiKey = apiKey,
            context = context.applicationContext,
            plan = defaultObservePlan
        )
    }
}

class Identify private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = EventType.Identify.value
        this.eventProperties =
            mutableMapOf(
                *(if (optionalArray != null) arrayOf("optionalArray" to optionalArray) else arrayOf()),
                "requiredNumber" to requiredNumber
            )
    }
}

class EventNoProperties : BaseEvent() {
    /**
     * Event No Properties
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)
     *
     * Event w no properties description
     *
     * Owner: Test codegen
     */
    init {
        this.eventType = "Event No Properties"
    }
}

class EventObjectTypes private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event Object Types"
        this.eventProperties =
            mutableMapOf(
                "requiredObject" to requiredObject,
                "requiredObjectArray" to requiredObjectArray
            )
    }
}

class EventWithAllProperties private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With All Properties"
        this.eventProperties =
            mutableMapOf(
                *(if (optionalString != null) arrayOf("optionalString" to optionalString) else arrayOf()),
                "requiredArray" to requiredArray,
                "requiredBoolean" to requiredBoolean,
                "requiredConst" to "some-const-value",
                "requiredEnum" to requiredEnum.value,
                "requiredInteger" to requiredInteger,
                "requiredNumber" to requiredNumber,
                "requiredString" to requiredString
            )
    }

    enum class RequiredEnum(val value: String) {
        ENUM_1("Enum1"),
        ENUM_2("Enum2")
    }
}

class EventWithArrayTypes private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With Array Types"
        this.eventProperties =
            mutableMapOf(
                "requiredBooleanArray" to requiredBooleanArray,
                "requiredEnumArray" to requiredEnumArray,
                "requiredNumberArray" to requiredNumberArray,
                "requiredObjectArray" to requiredObjectArray,
                "requiredStringArray" to requiredStringArray
            )
    }
}

class EventWithConstTypes : BaseEvent() {
    /**
     * Event With Const Types
     *
     * [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)
     *
     * Description for event with const types
     *
     * Owner: Test codegen
     */
    init {
        this.eventType = "Event With Const Types"
        this.eventProperties =
            mutableMapOf(
                "Boolean Const" to true,
                "Integer Const" to 10,
                "Number Const" to 2.2,
                "String Const" to "String-Constant",
                "String Const WIth Quotes" to "\"String \"Const With\" Quotes\"",
                "String Int Const" to 0
            )
    }
}

class EventWithEnumTypes private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With Enum Types"
        this.eventProperties =
            mutableMapOf(
                *(if (optionalEnum != null) arrayOf("optional enum" to optionalEnum.value) else arrayOf()),
                "required enum" to requiredEnum.value
            )
    }

    enum class OptionalEnum(val value: String) {
        OPTIONAL_ENUM_1("optional enum 1"),
        OPTIONAL_ENUM_2("optional enum 2")
    }

    enum class RequiredEnum(val value: String) {
        REQUIRED_ENUM_1("required enum 1"),
        REQUIRED_ENUM_2("required enum 2")
    }
}

class EventWithOptionalArrayTypes private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With Optional Array Types"
        this.eventProperties =
            mutableMapOf(
                *(if (optionalBooleanArray != null) arrayOf("optionalBooleanArray" to optionalBooleanArray) else arrayOf()),
                *(if (optionalEnumArray != null) arrayOf("optionalEnumArray" to optionalEnumArray) else arrayOf()),
                *(if (optionalJsonArray != null) arrayOf("optionalJSONArray" to optionalJsonArray) else arrayOf()),
                *(if (optionalNumberArray != null) arrayOf("optionalNumberArray" to optionalNumberArray) else arrayOf()),
                *(if (optionalStringArray != null) arrayOf("optionalStringArray" to optionalStringArray) else arrayOf())
            )
    }
}

class EventWithOptionalProperties private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With Optional Properties"
        this.eventProperties =
            mutableMapOf(
                *(if (optionalArrayNumber != null) arrayOf("optionalArrayNumber" to optionalArrayNumber) else arrayOf()),
                *(if (optionalArrayString != null) arrayOf("optionalArrayString" to optionalArrayString) else arrayOf()),
                *(if (optionalBoolean != null) arrayOf("optionalBoolean" to optionalBoolean) else arrayOf()),
                *(if (optionalNumber != null) arrayOf("optionalNumber" to optionalNumber) else arrayOf()),
                *(if (optionalString != null) arrayOf("optionalString" to optionalString) else arrayOf())
            )
    }
}

class EventWithTemplateProperties private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "Event With Template Properties"
        this.eventProperties =
            mutableMapOf(
                *(if (optionalEventProperty != null) arrayOf("optional_event_property" to optionalEventProperty) else arrayOf()),
                *(if (optionalTemplateProperty != null) arrayOf("optional_template_property" to optionalTemplateProperty) else arrayOf()),
                "required_event_property" to requiredEventProperty,
                "required_template_property" to requiredTemplateProperty
            )
    }
}

class EventWithDifferentCasingTypes private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "event withDifferent_CasingTypes"
        this.eventProperties =
            mutableMapOf(
                "enum with space" to enumWithSpace.value,
                "enum_snake_case" to enumSnakeCase.value,
                "enumCamelCase" to enumCamelCase.value,
                "EnumPascalCase" to enumPascalCase.value,
                "property with space" to propertyWithSpace,
                "property_with_snake_case" to propertyWithSnakeCase,
                "propertyWithCamelCase" to propertyWithCamelCase,
                "PropertyWithPascalCase" to propertyWithPascalCase
            )
    }

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

class EventMaxIntForTest private constructor() : BaseEvent() {
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
    ) : this() {
        this.eventType = "EventMaxIntForTest"
        this.eventProperties =
            mutableMapOf(
                "intMax10" to intMax10
            )
    }
}

open class Ampli {
    companion object {
        val API_KEY: Map<Environment, String> = mapOf(
            Environment.PROD to "",
            Environment.DEV to ""
        )
    }

    enum class Environment {
        PROD,
        DEV
    }

    private var disabled: Boolean = false

    @android.annotation.SuppressLint("StaticFieldLeak")
    var client: Amplitude? = null // Initializer required, not a nullable type
        private set // the setter is private and has the default implementation

    /**
     * Load the amplitude core SDK
     * Options should have 'environment', 'client.api_key' or 'client.instance'
     */
    open fun load(appContext: android.content.Context, options: LoadOptions) {
        this.disabled = options.disabled ?: false
        if (this.client != null) {
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
                this.client = options.client.instance
            }
            apiKey != "" -> {
                this.client = Amplitude(options.client?.configuration ?: DefaultConfiguration(apiKey, appContext).config)
            }
            else -> {
                System.err.println("ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'")
                return
            }
        }

        if (this.client?.configuration?.plan == null) {
            this.client?.configuration?.plan = defaultObservePlan
        }

        this.client?.add(SetAmpliExtrasPlugin())
    }

    /**
     * Track an event.
     *
     * @param event the event
     * @param options optional event options
     */
    open fun track(event: BaseEvent, options: EventOptions? = null) {
        if (!isInitializedAndEnabled()) {
            return
        }

        this.client?.track(event, options)
    }

    /**
     * Identify lets you set the user properties.
     * You can modify user properties by calling this api.
     *
     * @param userId the user id
     * @param event the identify event which contains user properties
     * @param options optional event options
     */
    open fun identify(userId: String?, event: Identify, options: EventOptions? = null) {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        val overriddenOptions = options ?: EventOptions()
        (userId ?: event.userId ?: options?.userId) ?. let {
            overriddenOptions.userId = it
        }
        this.client?.identify(event.eventProperties, overriddenOptions)
    }

    /**
     * Flush the event.
     */
    open fun flush() {
        if (!this.isInitializedAndEnabled()) {
            return
        }
        this.client?.flush()
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
        this.track(
            EventNoProperties()
        )
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
        this.track(
            EventObjectTypes(
                requiredObject = requiredObject,
                requiredObjectArray = requiredObjectArray
            )
        )
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
        this.track(
            EventWithAllProperties(
                requiredArray = requiredArray,
                requiredBoolean = requiredBoolean,
                requiredEnum = requiredEnum,
                requiredInteger = requiredInteger,
                requiredNumber = requiredNumber,
                requiredString = requiredString,
                optionalString = optionalString
            )
        )
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
        this.track(
            EventWithArrayTypes(
                requiredBooleanArray = requiredBooleanArray,
                requiredEnumArray = requiredEnumArray,
                requiredNumberArray = requiredNumberArray,
                requiredObjectArray = requiredObjectArray,
                requiredStringArray = requiredStringArray
            )
        )
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
        this.track(
            EventWithConstTypes()
        )
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
        this.track(
            EventWithEnumTypes(
                requiredEnum = requiredEnum,
                optionalEnum = optionalEnum
            )
        )
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
        this.track(
            EventWithOptionalArrayTypes(
                optionalBooleanArray = optionalBooleanArray,
                optionalEnumArray = optionalEnumArray,
                optionalJsonArray = optionalJsonArray,
                optionalNumberArray = optionalNumberArray,
                optionalStringArray = optionalStringArray
            )
        )
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
        this.track(
            EventWithOptionalProperties(
                optionalArrayNumber = optionalArrayNumber,
                optionalArrayString = optionalArrayString,
                optionalBoolean = optionalBoolean,
                optionalNumber = optionalNumber,
                optionalString = optionalString
            )
        )
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
        this.track(
            EventWithTemplateProperties(
                requiredEventProperty = requiredEventProperty,
                requiredTemplateProperty = requiredTemplateProperty,
                optionalEventProperty = optionalEventProperty,
                optionalTemplateProperty = optionalTemplateProperty
            )
        )
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
        this.track(
            EventWithDifferentCasingTypes(
                enumWithSpace = enumWithSpace,
                enumSnakeCase = enumSnakeCase,
                enumCamelCase = enumCamelCase,
                enumPascalCase = enumPascalCase,
                propertyWithSpace = propertyWithSpace,
                propertyWithSnakeCase = propertyWithSnakeCase,
                propertyWithCamelCase = propertyWithCamelCase,
                propertyWithPascalCase = propertyWithPascalCase
            )
        )
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
        this.track(
            EventMaxIntForTest(
                intMax10 = intMax10
            )
        )
    }

    private fun isInitializedAndEnabled(): Boolean {
        if (this.client == null) {
            System.err.println("Ampli is not yet initialized. Have you called `ampli.load()` on app start?")
            return false
        }
        return !this.disabled
    }
}

val ampli = Ampli()
