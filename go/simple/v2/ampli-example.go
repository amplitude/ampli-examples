package main

import (
	"ampli-example/ampli"
	"github.com/amplitude/analytics-go/amplitude"
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
			Configuration: amplitude.NewConfig(apiKey),
		},
	})
	defer ampli.Instance.Shutdown()

	// Identify using IdentifyProperties in tracking plan
	identifyObj := ampli.NewIdentify(16.6)
	identifyObj.OptionalArray = []string{"abc", "test"}
	ampli.Instance.Identify("user_id", identifyObj, amplitude.EventOptions{})

	// Group Identify using GroupProperties in tracking plan
	groupIdentifyObj := ampli.NewGroup(true)
	groupIdentifyObj.OptionalString = ""
	ampli.Instance.GroupIdentify("Org", "Engineer", groupIdentifyObj, amplitude.EventOptions{})

	// Set groups for user
	ampli.Instance.SetGroup("user-id", "Org", []string{"Engineer", "DevOp"}, amplitude.EventOptions{})

	// Create a strongly typed event
	event := ampli.NewEventWithAllProperties([]string{"abc", "test"}, true, ampli.RequiredEnumEnum1, 3, 16.4, "str")
	event.OptionalString = "optional string"
	// Track the events using strongly typed method and parameters
	ampli.Instance.EventWithAllProperties("user-id", event, amplitude.EventOptions{})
	// Track the event with generic track method
	ampli.Instance.Track("user-id", event, amplitude.EventOptions{})

}
