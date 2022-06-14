package com.example.ampliapp

import android.os.Bundle
import com.amplitude.api.Constants
import com.amplitude.api.Middleware
import com.amplitude.api.MiddlewareNext
import com.amplitude.api.MiddlewarePayload
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.ktx.analytics
import com.google.firebase.ktx.Firebase
import org.json.JSONException
import org.json.JSONObject

class FirebaseMiddleware : Middleware {
    private val analytics: FirebaseAnalytics = Firebase.analytics
    private val notAllowedNameCharacters = "[^a-zA-Z0-9_]".toRegex()

    override fun run(payload: MiddlewarePayload?, next: MiddlewareNext?) {
        val event = payload!!.event
        when (val eventType = event.getString("event_type")) {
            Constants.IDENTIFY_EVENT -> {
                if (event.has("user_properties")) {
                    try {
                        val userProperties = event.getJSONObject("user_properties").getJSONObject("\$set")
                        val keys = userProperties.keys()
                        while (keys.hasNext()) {
                            val key = keys.next()
                            val value = userProperties.get(key)
                            println("[firebase] setUserProperty key=${key} value=${value}")
                            if (value is String) {
                                analytics.setUserProperty(key, value)
                            } else {
                                analytics.setUserProperty(key, value.toString())
                            }
                        }
                    } catch (e: JSONException) {
                        System.err.println("Can't get user_properties: ${e.message}")
                    }
                }
            }
            Constants.GROUP_IDENTIFY_EVENT -> {
                // skip - not supported
            }
            else -> {
                if (event.has("event_properties")) {
                    try {
                        val eventProperties = event.getJSONObject("event_properties")
                        val bundle = convertJsonPropertiesToBundle(eventProperties)

                        println("[firebase] logEvent eventType=${eventType} bundle=${bundle}")
                        analytics.logEvent(getFirebaseEventName(eventType), bundle)
                    } catch (e: JSONException) {
                        System.err.println("Can't get event_properties: ${e.message}")
                    }
                }
            }
        }
    }

    private fun getFirebaseEventName(eventType: String): String {
        // https://firebase.google.com/docs/reference/kotlin/com/google/firebase/analytics/FirebaseAnalytics#logevent
        // Should contain alphanumeric characters or underscores.
        return eventType.replace(notAllowedNameCharacters, "_")
    }

    private fun convertJsonPropertiesToBundle(jsonProperties: JSONObject): Bundle {
        val bundle = Bundle()
        try {
            val iterator = jsonProperties.keys()
            while (iterator.hasNext()) {
                val key = iterator.next()

                // https://firebase.google.com/docs/reference/kotlin/com/google/firebase/analytics/FirebaseAnalytics#logevent
                // String, long and double param types are supported.
                when (val value = jsonProperties.get(key)) {
                    is String -> bundle.putString(key, value)
                    is Int -> bundle.putInt(key, value)
                    is Long -> bundle.putLong(key, value)
                    is Float -> bundle.putFloat(key, value)
                    is Double -> bundle.putDouble(key, value)
                    else -> {
                        bundle.putString(key, value.toString())
                    }
                }
            }
        } catch (e: JSONException) {
            System.err.println("Can't convert json-encoded properties to Bundle: ${e.message}")
        }
        return bundle
    }
}
