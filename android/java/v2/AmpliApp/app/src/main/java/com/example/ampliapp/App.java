package com.example.ampliapp;

import android.app.Application;

import com.amplitude.ampli.Ampli;
import com.amplitude.ampli.LoadClientOptions;
import com.amplitude.ampli.LoadOptions;

public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        String AMPLITUDE_API_KEY = this.getResources().getString(R.string.AMPLITUDE_API_KEY);

        /*
         * Start by calling Ampli.getInstance().load(this)
         *
         * 'Ampli.getInstance()' is the default instance of Ampli()
         */

        /*
         * When you pull your tracking plan you can use the defaults and call load(this)
         *
         * This requires connecting your account via `ampli pull`
         * which will set you API key in the generated Ampli SDK
         */
        // Ampli.getInstance().load(this);

        /*
         * OR Specify a Ampli.Environment
         *
         * This also requires running `ampli pull` to set ApiKeys in the Ampli SDK
         */
        // Ampli.getInstance().load(this, new LoadOptions()
        //     .setEnvironment(Ampli.Environment.DEVELOPMENT)
        // );

        /*
         * OR Provide a specific Amplitude API key
         */
        Ampli.getInstance().load(this, new LoadOptions()
            .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
        );

        /*
         * Add Segement as a destination
         */
        // String SEGMENT_API_KEY = this.getResources().getString(R.string.SEGMENT_API_KEY);
        // Ampli.getInstance().getClient().add(new SegmentDestinationPlugin(this, SEGMENT_API_KEY));

        /*
         * OR Use an existing Amplitude instance
         * requires "import com.amplitude.api.*;"
         */
        // AmplitudeClient instance = Amplitude.getInstance();
        // instance.initialize(this, AMPLITUDE_API_KEY);
        // Ampli.getInstance().load(this, new LoadOptions()
        //     .setClient(new LoadClientOptions().setInstance(instance))
        // );

        /*
         * For testing you can disable ampli
         */
        // Ampli.getInstance().load(this, new LoadOptions()
        //     .setDisabled(true)
        // );

        /*
         * Make as many Ampli instances as you want
         */
        // Ampli ampli2 = new Ampli();
        // ampli2.load(this, new LoadOptions()
        //     .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
        // );
    }
}
