package com.example.ampliapp

import android.app.Application
import com.amplitude.ampli.*

class App : Application() {
    override fun onCreate() {
        super.onCreate()

        val amplitudeApiKey: String? = null // Set your Amplitude API key
        ampli.load(
            LoadOptions(
                androidContext = this,
                environment = Ampli.Environment.DEVELOPMENT,
                client = LoadClientOptions(apiKey = amplitudeApiKey)
            )
        )
    }
}
