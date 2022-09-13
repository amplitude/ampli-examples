package com.amplitude.ampli

import com.amplitude.core.events.BaseEvent
import com.amplitude.core.events.IngestionMetadata
import com.amplitude.core.platform.Plugin
import java.util.regex.Pattern

var minIngestionMetadataSupportedVersion = "1.2.0";
class IngestionMetadataErichmentPlugin : Plugin{
    override val type: Plugin.Type = Plugin.Type.Enrichment
    override lateinit var amplitude: com.amplitude.core.Amplitude

    private fun compare(v1: String, v2: String) : Int {
        val s1 = normalisedVersion(v1)
        val s2 = normalisedVersion(v2)
        val cmp = s1.compareTo(s2)
        return cmp
    }

    fun normalisedVersion(version: String?): String {
        return normalisedVersion(version, ".", 4)
    }

    fun normalisedVersion(version: String?, sep: String?, maxWidth: Int): String {
        val split: Array<String> = Pattern.compile(sep, Pattern.LITERAL).split(version)
        val sb = StringBuilder()
        for (s in split) {
            sb.append(String.format("%" + maxWidth + 's', s))
        }
        return sb.toString()
    }

    override fun execute(event: BaseEvent): BaseEvent? {

        var libraryArr = event.library?.split("/")
        var libraryVersion = libraryArr?.get(1)
        println(libraryVersion)
        println("####################")
        if (!libraryVersion.isNullOrEmpty() && compare(libraryVersion, minIngestionMetadataSupportedVersion) >= 0) {
            println("should set the ingestionMetadata")
            println(libraryVersion)
            event.ingestionMetadata
            event.ingestionMetadata = IngestionMetadata("android-kotlin-ampli", "2.0.0")
        }
        println(event.ingestionMetadata?.sourceName)
        println(event.ingestionMetadata?.sourceVersion)
        return event
    }
}