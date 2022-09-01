package main

import (
	"ampli-example/ampli"
	"github.com/joho/godotenv"
	"log"
	"os"
	"time"
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

	for i := 0; i < 10; i++ {
		// Track an event in another goroutine
		go func() {
			for {
				eventMaxIntForTest := ampli.NewEventMaxIntForTest(6)
				ampli.Instance.Track("user-id", eventMaxIntForTest)
				time.Sleep(time.Millisecond * 10)
			}
		}()
	}

	time.Sleep(time.Second)
}
