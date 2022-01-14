package com.example.ampliapp

import com.amplitude.api.*

class LoggingMiddleware : Middleware {
    override fun run(payload: MiddlewarePayload?, next: MiddlewareNext?) {
        println("[ampli] event=${payload?.event?.toString(2)}, extra=${payload?.extra}")

        next?.run(payload)
    }
}