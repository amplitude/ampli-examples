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
	ampli.Client.Load(ampli.LoadOptions{
		Disabled: false,
		Client: ampli.LoadClientOptions{
			APIKey:        "",
			Instance:      nil,
			Configuration: amplitude.NewConfig(apiKey),
		},
	})
	defer ampli.Client.Shutdown()

	//Identify using IdentifyProperties in tracking plan
	ampli.Client.Identify("user_id", ampli.Identify{
		RequiredNumber: 16.6,
		OptionalArray:  []string{"abc", "test"},
	}, amplitude.EventOptions{})

	// Group Identify using GroupProperties in tracking plan
	ampli.Client.GroupIdentify("Org", "Engineer", ampli.Group{
		RequiredBoolean: true,
		OptionalString:  "",
	}, amplitude.EventOptions{})

	//Set groups for user
	ampli.Client.SetGroup("user_id", "Org", []string{"Engineer", "DevOp"}, amplitude.EventOptions{})

	//Track strongly typed event class with ampli.track
	ampli.Client.Track("", &ampli.EventMaxIntForTest{}, amplitude.EventOptions{UserID: "user_id", DeviceID: "device_id"})

	// Track event with strongly typed method
	ampli.Client.EventNoProperties("user_id", amplitude.EventOptions{})
}
