package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"ampli-example/ampli"
)

const userID = "ampli-go-user-id"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln("Error loading .env file")
	}
	apiKey := os.Getenv("AMPLITUDE_API_KEY")

	// Initialize the Ampli instance with LoadOptions and LoadClientOptions
	ampli.Instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Configuration: ampli.NewClientConfig(apiKey),
		},
	})
	defer ampli.Instance.Shutdown()

	// Identify using IdentifyProperties in tracking plan
	ampli.Instance.Identify(userID, ampli.Identify.Builder().
		SetRequiredNumber(16.6).
		SetOptionalArray([]string{"abc", "test"}).
		Build())

	// Group Identify using GroupProperties in tracking plan
	ampli.Instance.GroupIdentify("Org", "Engineer", ampli.Group.Builder().
		SetRequiredBoolean(true).
		SetOptionalString("optional-string").
		Build())

	// Set groups for user
	ampli.Instance.SetGroup(userID, "Org", []string{"Engineer", "DevOp"})

	ampli.Instance.EventNoProperties(userID)

	ampli.Instance.Track(userID, ampli.EventWithAllProperties.Builder().
		SetRequiredArray([]string{"I'm", "required"}).
		SetRequiredBoolean(false).
		SetRequiredEnum(ampli.EventWithAllProperties.RequiredEnum.Enum1).
		SetRequiredInteger(42).
		SetRequiredNumber(1.23).
		SetRequiredString("Hi!").
		SetOptionalString("optional-string").
		Build())

	ampli.Instance.Track("", ampli.EventWithOptionalProperties.Builder().
		SetOptionalBoolean(true).
		Build(),
		ampli.EventOptions{DeviceID: "12345"})

	ampli.Instance.EventWithOptionalProperties(userID, ampli.EventWithOptionalProperties.Builder().
		SetOptionalBoolean(true).
		Build())

	ampli.Instance.EventMaxIntForTest(userID, ampli.EventMaxIntForTest.Builder().
		SetIntMax10(5).
		Build())

	ampli.Instance.EventWithConstTypes(userID)

	ampli.Instance.EventObjectTypes(userID, ampli.EventObjectTypes.Builder().
		SetRequiredObject(map[string]interface{}{"key-1": "value-1"}).
		SetRequiredObjectArray([]interface{}{
			map[string]interface{}{"key-1": "value-1"},
			map[string]interface{}{"key-2": "value-2"},
		}).
		Build())

	ampli.Instance.EventWithArrayTypes(userID, ampli.EventWithArrayTypes.Builder().
		SetRequiredBooleanArray([]bool{true, false}).
		SetRequiredNumberArray([]float64{1.2, 3, 4.56}).
		SetRequiredObjectArray([]interface{}{
			map[string]interface{}{"key-1": "value-1"},
			map[string]interface{}{"key-2": "value-2"},
		}).
		SetRequiredStringArray([]string{"string-1", "string-2", "string-3"}).
		Build())

	ampli.Instance.EventWithEnumTypes(userID, ampli.EventWithEnumTypes.Builder().
		SetRequiredEnum(ampli.EventWithEnumTypes.RequiredEnum.RequiredEnum2).
		Build())

	ampli.Instance.EventWithOptionalArrayTypes(userID, ampli.EventWithOptionalArrayTypes.Builder().
		SetOptionalBooleanArray([]bool{true, false}).
		Build())

	ampli.Instance.EventWithTemplateProperties(userID, ampli.EventWithTemplateProperties.Builder().
		SetRequiredEventProperty("event property").
		SetRequiredTemplateProperty("template property").
		SetOptionalTemplateProperty(1.23).
		Build())

	ampli.Instance.Track(userID, ampli.EventWithDifferentCasingTypes.Builder().
		SetEnumCamelCase(ampli.EventWithDifferentCasingTypes.EnumCamelCase.EnumCamelCase).
		SetEnumPascalCase(ampli.EventWithDifferentCasingTypes.EnumPascalCase.EnumPascalCase).
		SetEnumSnakeCase(ampli.EventWithDifferentCasingTypes.EnumSnakeCase.EnumSnakeCase).
		SetEnumWithSpace(ampli.EventWithDifferentCasingTypes.EnumWithSpace.EnumWithSpace).
		SetPropertyWithCamelCase("property with camel case").
		SetPropertyWithPascalCase("property with pascal case").
		SetPropertyWithSnakeCase("property with snake case").
		SetPropertyWithSpace("property with space").
		Build())
}
