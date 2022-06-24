package org.example;

import com.amplitude.MiddlewareExtra;
import com.amplitude.ampli.*;
import io.github.cdimascio.dotenv.Dotenv;

public class App {
    public static void main(String[] args) {
        initAmpli();
        sendEvents();
    }

    public static void initAmpli() {
        Dotenv dotenv = Dotenv.load();
        String AMPLITUDE_API_KEY = dotenv.get("AMPLITUDE_API_KEY");

        /*
         * Start by calling Ampli.getInstance().load()
         *
         * 'Ampli.getInstance()' is the default instance of Ampli()
         */

        /*
         * When you pull your tracking plan you can use the defaults and call load()
         *
         * This requires connecting your account via `ampli pull`
         * which will set you API key in the generated Ampli SDK
         */
//        Ampli.getInstance().load();

        /*
         * OR Specify a Ampli.Environment
         *
         * This also requires running `ampli pull` to set ApiKeys in the Ampli SDK
         */
//        Ampli.getInstance().load(new LoadOptions()
//            .setEnvironment(Ampli.Environment.DEVELOPMENT)
//        );

        /*
         * OR Provide a specific Amplitude API key
         */
        Ampli.getInstance().load(new LoadOptions()
            .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
        );

        /*
         * OR Use an existing Amplitude instance
         * requires "import com.amplitude.Amplitude"
         */
//        Amplitude instance = Amplitude.getInstance();
//        instance.init(AMPLITUDE_API_KEY);
//        Ampli.getInstance().load(new LoadOptions()
//            .setClient(new LoadClientOptions().setInstance(instance))
//        );

        /*
         * For testing you can disable ampli
         */
//        Ampli.getInstance().load(new LoadOptions()
//            .setDisabled(true)
//        );

        /*
         * Make as many Ampli instances as you want
         */
//        Ampli ampli2 = new Ampli();
//        ampli2.load(new LoadOptions()
//            .setClient(new LoadClientOptions().setApiKey(AMPLITUDE_API_KEY))
//        );

        /*
         * Middleware can be used for many things including
         * logging, filtering, event modification and more.
         */
        Ampli.getInstance().getClient().addEventMiddleware(new LoggingMiddleware());

        /*
         * The Amplitude client can be additionally configured
         */
        Ampli.getInstance().getClient().setEventUploadPeriodMillis(1000);
    }

    public static void sendEvents() {
        String userId = "ampli-java-jre-user-id";

        Ampli.getInstance().identify(userId,
            Identify.builder()
                .requiredNumber(42.0)
                .build()
        );

        Ampli.getInstance().setGroup(userId, "test-group", "a-group-value");

        Ampli.getInstance().eventNoProperties(userId);

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("extra-key", "extra-value");

        Ampli.getInstance().track(userId,
            EventWithOptionalProperties.builder()
                .optionalBoolean(true)
                .build(),
            extra
        );

        Ampli.getInstance().eventWithAllProperties(userId,
            EventWithAllProperties.builder()
                .requiredArray(new String[]{"I'm", "required"})
                .requiredBoolean(false)
                .requiredEnum(EventWithAllProperties.RequiredEnum.ENUM1)
                .requiredInteger(42)
                .requiredNumber(1.23)
                .requiredString("Hi!")
                .build(),
            extra
        );

        Ampli.getInstance().eventWithConstTypes(null, new EventOptions().setUserId(userId));

        Ampli.getInstance().track(userId,
            EventWithArrayTypes.builder()
                .requiredBooleanArray(new Boolean[]{true, false, true})
                .requiredNumberArray(new Double[]{1.1, 2.2, 3.3})
                .requiredObjectArray(new Object[]{1, "a", true})
                .requiredStringArray(new String[]{"a", "bc", "def"})
                .build()
        );

        Ampli.getInstance().track(userId,
            EventMaxIntForTest.builder()
                .intMax10(9)
                .build()
        );

        Ampli.getInstance().track(userId,
            EventObjectTypes.builder()
                .requiredObjectArray(new Object[]{1, "a", true})
                .build()
        );

        Ampli.getInstance().track(userId,
            EventWithEnumTypes.builder()
                .requiredEnum(EventWithEnumTypes.RequiredEnum.REQUIRED_ENUM_2)
                .build()
        );

        Ampli.getInstance().track(userId,
            EventWithOptionalArrayTypes.builder()
                .optionalBooleanArray(new Boolean[]{false, true})
                .build()
        );

        Ampli.getInstance().track(userId,
            EventWithDifferentCasingTypes.builder()
                .enumCamelCase(EventWithDifferentCasingTypes.EnumCamelCase.ENUMCAMELCASE)
                .enumPascalCase(EventWithDifferentCasingTypes.EnumPascalCase.ENUMPASCALCASE)
                .enumSnakeCase(EventWithDifferentCasingTypes.EnumSnakeCase.ENUM_SNAKE_CASE)
                .enumWithSpace(EventWithDifferentCasingTypes.EnumWithSpace.ENUM_WITH_SPACE)
                .propertyWithCamelCase("property with camel case")
                .propertyWithPascalCase("property with pascal case")
                .propertyWithSnakeCase("property with snake case")
                .propertyWithSpace("property with space")
                .build()
        );

        Ampli.getInstance().eventWithTemplateProperties(userId,
            EventWithTemplateProperties.builder()
                .requiredEventProperty("event property")
                .requiredTemplateProperty("template property")
                .optionalEventProperty(1.23)
                .build()
        );

        Ampli.getInstance().flush();
    }
}
