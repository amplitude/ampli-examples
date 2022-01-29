import com.amplitude.*

class LoggingMiddleware : Middleware {
    override fun run(payload: MiddlewarePayload?, next: MiddlewareNext?) {
        val event = payload?.event
        println("[ampli] event=${event?.eventType}, properties=${event?.eventProperties?.toString(2)}, extra=${payload?.extra}")

        next?.run(payload)
    }
}