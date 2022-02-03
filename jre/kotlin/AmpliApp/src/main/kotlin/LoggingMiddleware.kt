import com.amplitude.*

class LoggingMiddleware : Middleware {
    override fun run(payload: MiddlewarePayload?, next: MiddlewareNext?) {
        val event = payload?.event
        println("[ampli] event=${event?.eventType}, eventProperties=${event?.eventProperties?.toString(2)}, userProperties=${event?.userProperties?.toString(2)}, groupProperties=${event?.groupProperties?.toString(2)}, extra=${payload?.extra}")

        next?.run(payload)
    }
}