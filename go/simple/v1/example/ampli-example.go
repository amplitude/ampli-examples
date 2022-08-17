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
		Environment: ampli.DEVELOPMENT,
		Disabled:    false,
		Client: ampli.LoadClientOptions{
			APIKey:        "",
			Instance:      nil,
			Configuration: amplitude.NewConfig(apiKey),
		},
	})
	defer ampli.Client.Shutdown()

	// Track event with strongly typed method
	ampli.Client.EventNoProperties("user_id", amplitude.EventOptions{})
}
