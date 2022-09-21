package com.amplitude.ampli

class IngestionMetadata (var sourceName: String, var sourceVersion: String) {

    fun toMap(): Map<String, String> {
        return mapOf("source_name" to sourceName, "source_version" to sourceVersion)
    }
}