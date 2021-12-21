package com.example.ampliapp

import android.app.Application
import com.amplitude.ampli.*

class App : Application() {
    override fun onCreate() {
        super.onCreate()

        val AMPLITUDE_API_KEY = this.resources.getString(R.string.AMPLITUDE_API_KEY)

        /**
         * Start by calling ampli.load(this)
         *
         * 'ampli' is the default instance of Ampli()
         */

        /**
         * When you pull your tracking plan you can use the defaults and call load(this)
         *
         * This requires connecting your account via `ampli pull`
         * which will set you API key in the generated Ampli SDK
         */
//        ampli.load(this)

        /**
         * OR Specify a Ampli.Environment
         *
         * This also requires running `ampli pull` to set ApiKeys in the Ampli SDK
         */
        // ampli.load(this, LoadOptions(
        //    environment = Ampli.Environment.DEVELOPMENT
        // ))

        /**
         * OR Provide a specific Amplitude API key
         */
         ampli.load(this, LoadOptions(
             client = LoadClientOptions(apiKey = AMPLITUDE_API_KEY)
         ))

        /**
         * OR Use an existing Amplitude instance
         * requires "import com.amplitude.api.Amplitude"
         */
        // val instance = Amplitude.getInstance()
        // instance.initialize(this, AMPLITUDE_API_KEY)
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
