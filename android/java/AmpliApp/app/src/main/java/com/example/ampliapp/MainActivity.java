package com.example.ampliapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;

import com.amplitude.ampli.*;

public class MainActivity extends AppCompatActivity {
    private final String userId = "ampli-java-user-id";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnIdentify = this.findViewById(R.id.btn_identify);
        btnIdentify.setOnClickListener(v -> {
            IdentifyProperties properties = new IdentifyProperties();
            properties.setRequiredNumber(42);

            Ampli.getInstance().identify(userId, properties);
        });

        Button btnEventWithOptionalProperties = this.findViewById(R.id.btn_optional_properties);
        btnEventWithOptionalProperties.setOnClickListener(v -> {
            EventWithOptionalPropertiesProperties properties = new EventWithOptionalPropertiesProperties();
            properties.setOptionalBoolean(true);

            Ampli.getInstance().track(new EventWithOptionalProperties(properties));
        });

        Button btnEventWithAllProperties = this.findViewById(R.id.btn_all_properties);
        btnEventWithAllProperties.setOnClickListener(v -> {
            EventWithAllPropertiesProperties properties = new EventWithAllPropertiesProperties();
            properties.setRequiredNumber(1.23);
            properties.setRequiredArray(new String[]{"I'm", "required"});
            properties.setRequiredBoolean(false);
            properties.setRequiredEnum(EventWithAllPropertiesRequiredEnum.ENUM1);
            properties.setRequiredInteger(42);
            properties.setRequiredString("Hi!");

            Ampli.getInstance().eventWithAllProperties(properties);
        });
    }
}