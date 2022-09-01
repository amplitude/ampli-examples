package main

import (
	"ampli-example/ampli"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln("Error loading .env file")
	}
	apiKey := os.Getenv("AMPLITUDE_API_KEY")

	// Initialize the Ampli instance with LoadOptions and LoadClientOptions
	ampli.Instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Configuration: ampli.NewConfig(apiKey),
		},
	})
	defer ampli.Instance.Shutdown()

	// Identify using IdentifyProperties in tracking plan
	identifyObj := ampli.NewIdentify(16.6).SetOptionalArray([]string{"abc", "test"})
	ampli.Instance.Identify("user_id", identifyObj)

	// Group Identify using GroupProperties in tracking plan
	groupIdentifyObj := ampli.NewGroup(true).SetOptionalString("optional-string")
	ampli.Instance.GroupIdentify("Org", "Engineer", groupIdentifyObj)

	// Set groups for user
	ampli.Instance.SetGroup("user-id", "Org", []string{"Engineer", "DevOp"})

	// Create a strongly typed event
	eventMaxIntForTest := ampli.NewEventMaxIntForTest(6)
	// Track the event using strongly typed method and parameters
	ampli.Instance.EventMaxIntForTest("user-id", eventMaxIntForTest)
	// Track the event with generic track method
	ampli.Instance.Track("user-id", eventMaxIntForTest)

	eventNoProperties := ampli.NewEventNoProperties()
	ampli.Instance.EventNoProperties("user-id", eventNoProperties)
	ampli.Instance.Track("user-id", eventNoProperties)

	requiredObjectArray := map[string]int{"k": 15}
	eventObjectTypes := ampli.NewEventObjectTypes(map[string]string{"key": "value"}, []interface{}{requiredObjectArray})
	ampli.Instance.EventObjectTypes("user-id", eventObjectTypes)
	ampli.Instance.Track("user-id", eventObjectTypes)

	eventWithAllProperties := ampli.NewEventWithAllProperties([]string{"abc", "test"}, true, ampli.EventWithAllPropertiesRequiredEnumEnum1, 3, 16.4, "str").SetOptionalString("optional-string")
	ampli.Instance.EventWithAllProperties("user-id", eventWithAllProperties)
	ampli.Instance.Track("user-id", eventWithAllProperties)

	eventWithArrayTypes := ampli.NewEventWithArrayTypes(
		[]bool{true, false},
		[]float64{1.4, 6.6},
		[]interface{}{map[string]string{"key": "value"}},
		[]string{"a", "b"},
	)
	ampli.Instance.EventWithArrayTypes("user-id", eventWithArrayTypes)
	ampli.Instance.Track("user-id", eventWithArrayTypes)

	eventWithConstTypes := ampli.NewEventWithConstTypes()
	ampli.Instance.EventWithConstTypes("user-id", eventWithConstTypes)
	ampli.Instance.Track("user-id", eventWithConstTypes)

	eventWithEnumTypes := ampli.NewEventWithEnumTypes(ampli.EventWithEnumTypesRequiredEnumRequiredEnum1)
	eventWithEnumTypes.SetOptionalEnum(ampli.EventWithEnumTypesOptionalEnumOptionalEnum2)
	ampli.Instance.EventWithEnumTypes("user-id", eventWithEnumTypes)
	ampli.Instance.Track("user-id", eventWithEnumTypes)

	eventWithOptionalArrayTypes := ampli.NewEventWithOptionalArrayTypes()
	eventWithOptionalArrayTypes.SetOptionalBooleanArray([]bool{false, true}).SetOptionalNumberArray([]float64{1, 2, 15.0}).SetOptionalOptionalStringArray([]string{"test"})
	ampli.Instance.EventWithOptionalArrayTypes("user-id", eventWithOptionalArrayTypes)
	ampli.Instance.Track("user-id", eventWithOptionalArrayTypes)

	eventWithOptionalProperties := ampli.NewEventWithOptionalProperties()
	eventWithOptionalProperties.SetOptionalBoolean(false)
	ampli.Instance.EventWithOptionalProperties("user-id", eventWithOptionalProperties)
	ampli.Instance.Track("user-id", eventWithOptionalProperties)

	eventWithDifferentCasingTypes := ampli.NewEventWithDifferentCasingTypes(
		ampli.EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase,
		ampli.EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase,
		ampli.EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase,
		ampli.EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace,
		"propertyWithCamelCase",
		"PropertyWithPascalCase",
		"property_with_snake_case",
		"property with space",
	)
	ampli.Instance.EventWithDifferentCasingTypes("user-id", eventWithDifferentCasingTypes)
	ampli.Instance.Track("user-id", eventWithDifferentCasingTypes)

	eventWithTemplateProperties := ampli.NewEventWithTemplateProperties("event property", "template property")
	eventWithTemplateProperties.SetOptionalTemplateProperty(1.23)
	ampli.Instance.EventWithTemplateProperties("user-id", eventWithTemplateProperties)
	ampli.Instance.Track("user-id", eventWithTemplateProperties)
}
