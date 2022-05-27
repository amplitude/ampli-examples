package com.example.ampliapp

import android.app.Application
import com.amplitude.ampli.*

class App : Application() {
    override fun onCreate() {
        super.onCreate()

        val AMPLITUDE_API_KEY = this.resources.getString(R.string.AMPLITUDE_API_KEY)

        ampli.load(
            this,
            LoadOptions(
                client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
            )
        )

        /**
         * OR Use an existing Amplitude instance
         * requires "import com.amplitude.android.Amplitude"
         * requires "import com.amplitude.android.Configuration"
         */
        // val instance = Amplitude(Configuration(apiKey=AMPLITUDE_API_KEY))
        // ampli.load(this, LoadOptions(
        //     client = LoadClientOptions(instance = instance)
        // ))

        /**
         * For testing you can disable ampli
         */
        // ampli.load(this, LoadOptions(
        //     disabled = true
        // ))

        /**
         * Make as many Ampli instances as you want
         */
        // val ampli2 = Ampli()
        // ampli2.load(this, LoadOptions(
        //     client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
        // ))
    }
}
