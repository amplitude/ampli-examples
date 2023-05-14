import com.amplitude.MiddlewareExtra
import com.amplitude.ampli.*
import io.github.cdimascio.dotenv.dotenv
import org.json.JSONException
import org.json.JSONObject

fun main() {
    initAmpli()
    sendEvents()
}

fun initAmpli() {
    val dotenv = dotenv()
    val AMPLITUDE_API_KEY = dotenv["AMPLITUDE_API_KEY"]

    /**
     * Start by calling ampli.load()
     *
     * 'ampli' is the default instance of Ampli()
     */

    /**
     * When you pull your tracking plan you can use the defaults and call load()
     *
     * This requires connecting your account via `ampli pull`
     * which will set you API key in the generated Ampli SDK
     */
//    ampli.load()

    /**
     * OR Specify a Ampli.Environment
     *
     * This also requires running `ampli pull` to set ApiKeys in the Ampli SDK
     */
//    ampli.load(LoadOptions(
//        environment = Ampli.Environment.DEVELOPMENT
//     ))

    /**
     * OR Provide a specific Amplitude API key
     */
    ampli.load(LoadOptions(
        client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
    ))

    /**
     * OR Use an existing Amplitude instance
     * requires "import com.amplitude.Amplitude"
     */
//     val instance = Amplitude.getInstance()
//     instance.init(AMPLITUDE_API_KEY)
//     ampli.load(LoadOptions(
//         client = LoadClientOptions(instance = instance)
//     ))

    /**
     * For testing you can disable ampli
     */
//     ampli.load(LoadOptions(
//         disabled = true
//     ))

    /**
     * Make as many Ampli instances as you want
     */
//     val ampli2 = Ampli()
//     ampli2.load(LoadOptions(
//         client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
//     ))

    /**
     * Middleware can be used for many things including
     * logging, filtering, event modification and more.
     */
    ampli.client.addEventMiddleware(LoggingMiddleware())

    /**
     * The Amplitude client can be additionally configured
     */
    ampli.client.setEventUploadPeriodMillis(1000)
}

fun sendEvents() {
    val userId = "ampli-kotlin-jre-user-id"

    ampli.identify(userId, Identify(
        requiredNumber = 42.0,
    ))

    val groupProperties = JSONObject()
    try {
        groupProperties.put("test-group", "a-group-value")
    } catch (e: JSONException) {
        System.err.println("Error converting properties to JSONObject: ${e.message}")
    }
    val amplitudeEvent = com.amplitude.Event("\$identify", userId)
    amplitudeEvent.groupProperties = groupProperties
    ampli.client.logEvent(amplitudeEvent, null as MiddlewareExtra?)

    ampli.eventNoProperties(userId)

    val extra = MiddlewareExtra(mapOf("extra-key" to "extra-value"))
    ampli.track(userId, EventWithOptionalProperties(
        optionalBoolean = true,
    ), extra = extra)

    ampli.eventWithAllProperties(userId, EventWithAllProperties(
        requiredNumber = 1.23,
        requiredArray = arrayOf("I'm", "required"),
        requiredBoolean = false,
        requiredEnum = EventWithAllProperties.RequiredEnum.ENUM_1,
        requiredInteger = 42,
        requiredString = "Hi!"
    ))

    ampli.track(null, EventWithConstTypes(), EventOptions(userId = userId))

    ampli.eventWithArrayTypes(userId, EventWithArrayTypes(
        requiredBooleanArray = arrayOf(true, false, true),
        requiredEnumArray = arrayOf("enum1"),
        requiredNumberArray = arrayOf(1.1, 2.2, 3.3),
        requiredStringArray = arrayOf("a", "bc", "def"),
        requiredObjectArray = arrayOf(1, "a", true)
    ))

    ampli.eventMaxIntForTest(userId, EventMaxIntForTest(
        intMax10 = 9
    ))

    ampli.eventObjectTypes(userId, EventObjectTypes(
        requiredObject = 3,
        requiredObjectArray = arrayOf(1, "a", true)
    ))

    ampli.eventWithEnumTypes(userId, EventWithEnumTypes(
        requiredEnum = EventWithEnumTypes.RequiredEnum.REQUIRED_ENUM_2
    ))

    ampli.eventWithOptionalArrayTypes(userId, EventWithOptionalArrayTypes(
        optionalBooleanArray = arrayOf(false, true)
    ))

    ampli.eventWithDifferentCasingTypes(userId, EventWithDifferentCasingTypes(
        enumCamelCase = EventWithDifferentCasingTypes.EnumCamelCase.ENUM_CAMEL_CASE,
        enumPascalCase = EventWithDifferentCasingTypes.EnumPascalCase.ENUM_PASCAL_CASE,
        enumSnakeCase = EventWithDifferentCasingTypes.EnumSnakeCase.ENUM_SNAKE_CASE,
        enumWithSpace = EventWithDifferentCasingTypes.EnumWithSpace.ENUM_WITH_SPACE,
        propertyWithCamelCase = "property with camel case",
        propertyWithPascalCase = "property with pascal case",
        propertyWithSnakeCase = "property with snake case",
        propertyWithSpace = "property with space"
    ))

    ampli.eventWithTemplateProperties(userId, EventWithTemplateProperties(
        requiredEventProperty = "event property",
        requiredTemplateProperty = "template property",
        optionalEventProperty = 1.23
    ))

    ampli.flush()
}