import com.amplitude.MiddlewareExtra
import com.amplitude.ampli.*
import io.github.cdimascio.dotenv.dotenv

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

    ampli.flush()
}