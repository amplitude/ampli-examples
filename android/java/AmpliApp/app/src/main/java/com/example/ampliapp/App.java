package com.example.ampliapp;

import android.app.Application;

import com.amplitude.ampli.Ampli;
import com.amplitude.ampli.LoadClientOptions;
import com.amplitude.ampli.LoadOptions;

public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        String amplitudeApiKey = null; // Set your Amplitude API key
        Ampli.getInstance().load(
                new LoadOptions(this)
                    .setEnvironment(Ampli.Environment.DEVELOPMENT)
                    .setClient(new LoadClientOptions().setApiKey(amplitudeApiKey))
        );
    }
}
