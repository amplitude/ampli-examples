package com.amplitude.ampli

import com.amplitude.core.events.BaseEvent
import com.amplitude.core.platform.Plugin

class IngestionMetadataErichmentPlugin : Plugin {
    override val type: Plugin.Type = Plugin.Type.Enrichment
    override lateinit var amplitude: com.amplitude.core.Amplitude

    override fun execute(event: BaseEvent): BaseEvent? {
        if (event.extra == null) event.extra = mapOf()
        val ingestionMetadataObject =
            IngestionMetadata("android-kotlin-ampli", "1.0.0").toJsonObject()
        val extra = mapOf<String, Any>().plus(
            mapOf(
                "amplitude" to
                        mapOf(
                            "ingestionMetadata" to ingestionMetadataObject
                        )
            )
        )
        event.extra = event.extra?.plus(extra)
        return event
    }
}