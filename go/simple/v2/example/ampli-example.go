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

	//Identify using IdentifyProperties in tracking plan
	ampli.Instance.Identify("user_id", ampli.Identify{
		RequiredNumber: 16.6,
		OptionalArray:  []string{"abc", "test"},
	}, amplitude.EventOptions{})

	// Group Identify using GroupProperties in tracking plan
	ampli.Instance.GroupIdentify("Org", "Engineer", ampli.Group{
		RequiredBoolean: true,
		OptionalString:  "",
	}, amplitude.EventOptions{})

	//Set groups for user
	ampli.Instance.SetGroup("user_id", "Org", []string{"Engineer", "DevOp"}, amplitude.EventOptions{})

	//Track strongly typed event class with ampli.track
	ampli.Instance.Track("", &ampli.EventMaxIntForTest{}, amplitude.EventOptions{UserID: "user_id", DeviceID: "device_id"})

	// Track event with strongly typed method
	ampli.Instance.EventNoProperties("user_id", amplitude.EventOptions{})
}
