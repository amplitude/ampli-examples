package main

import (
	"log"
	"os"
	"time"

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

	for i := 0; i < 10; i++ {
		// Track an event in another goroutine
		go func() {
			for {
				event := ampli.EventNoProperties.Builder().Build()
				ampli.Instance.Track("user-id", event)
				time.Sleep(time.Millisecond * 10)
			}
		}()
	}

	time.Sleep(time.Second)
}
