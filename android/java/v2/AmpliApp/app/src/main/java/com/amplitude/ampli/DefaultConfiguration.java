package com.amplitude.ampli;

import com.amplitude.android.Configuration;
import com.amplitude.android.events.Plan;

public class DefaultConfiguration extends Configuration {
    public DefaultConfiguration(String apiKey, android.content.Context appContext) {
        super(apiKey, appContext.getApplicationContext());
        Plan plan = new Plan("main","java-ampli-v2","0", "79154a50-f057-4db5-9755-775e4e9f05e6");
        this.setPlan(plan);
    }

}
