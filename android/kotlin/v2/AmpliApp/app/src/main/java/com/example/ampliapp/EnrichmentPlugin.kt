package com.example.ampliapp

import com.amplitude.core.events.BaseEvent
import com.amplitude.core.platform.Plugin

class EnrichmentPlugin : Plugin {
    override val type: Plugin.Type = Plugin.Type.Enrichment
    override lateinit var amplitude: com.amplitude.core.Amplitude

    override fun execute(event: BaseEvent): BaseEvent? {
        event.eventProperties = event.eventProperties ?: mutableMapOf()
        event.eventProperties?.let {
            it.put("custom android event property", "test")
        }
        return event
    }
}