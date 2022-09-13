package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"

	"ampli-example/ampli"
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
			Configuration: ampli.NewClientConfig(apiKey),
		},
	})
	defer ampli.Instance.Shutdown()

	// Identify using IdentifyProperties in tracking plan
	ampli.Instance.Identify("user_id", ampli.Identify.Builder().
		SetRequiredNumber(16.6).
		SetOptionalArray([]string{"abc", "test"}).
		Build())

	// Group Identify using GroupProperties in tracking plan
	ampli.Instance.GroupIdentify("Org", "Engineer", ampli.Group.Builder().
		SetRequiredBoolean(true).
		SetOptionalString("optional-string").
		Build())

	// Set groups for user
	ampli.Instance.SetGroup("user-id", "Org", []string{"Engineer", "DevOp"})

	ampli.Instance.EventNoProperties("user-id")

	ampli.Instance.Track("user-id", ampli.EventWithAllProperties.Builder().
		SetRequiredArray([]string{"abc", "test"}).
		SetRequiredBoolean(true).
		SetRequiredEnum(ampli.EventWithAllProperties.RequiredEnum.Enum1).
		SetRequiredInteger(3).
		SetRequiredNumber(16.4).
		SetRequiredString("str").
		SetOptionalString("optional-string").
		Build())

	ampli.Instance.EventWithOptionalProperties("user-id", ampli.EventWithOptionalProperties.Builder().
		SetOptionalBoolean(false).
		Build(),
		ampli.EventOptions{DeviceID: "device-id"})
}
