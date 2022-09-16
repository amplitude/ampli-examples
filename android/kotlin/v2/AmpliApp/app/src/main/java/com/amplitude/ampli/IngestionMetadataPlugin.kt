package com.amplitude.ampli

import com.amplitude.core.events.BaseEvent
import com.amplitude.core.platform.Plugin

class IngestionMetadataPlugin(ingestionMetadata: IngestionMetadata) : Plugin {
    override val type: Plugin.Type = Plugin.Type.Enrichment
    override lateinit var amplitude: com.amplitude.core.Amplitude
    val ingestionMetadata = ingestionMetadata

    override fun execute(event: BaseEvent): BaseEvent? {
        val amplitudeExtra = (event.extra?.get("amplitude") ?: mapOf<String, Any>()) as Map<String, Any>
        val ingestionMetadataMap = mapOf(
            "ingestionMetadata" to  ingestionMetadata.toJsonObject()
        )
        amplitudeExtra.plus(ingestionMetadataMap)
        event.extra = event.extra?.plus(mapOf("amplitude" to amplitudeExtra))
        return event
    }
}