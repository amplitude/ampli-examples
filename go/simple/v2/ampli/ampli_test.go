package ampli

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

func TestEventWithAllProperties(t *testing.T) {
	event := NewEventWithAllProperties([]string{"abc", "test"}, true, EventWithAllPropertiesRequiredEnumEnum1, 3, 16.4, "str")

	eventProperties := map[string]interface{}{
		"requiredArray":   []string{"abc", "test"},
		"requiredBool":    true,
		"requiredEnum":    EventWithAllPropertiesRequiredEnumEnum1,
		"requiredInteger": 3,
		"requiredNumber":  16.4,
		"requiredString":  "str",
	}
	// Should not have either optionalString or optionalBool in EventProperties
	assert.Equal(t, eventProperties, event.toAmplitudeEvent().EventProperties)

	event.SetOptionalString("optional-string")
	eventProperties["optionalString"] = "optional-string"
	// Should not have optionalBool in EventProperties
	assert.Equal(t, eventProperties, event.toAmplitudeEvent().EventProperties)
	// log.Printf("TestEventWithAllProperties: \n\t Should NOT have optionalBool in EventProperties: \n\t %+v", event.toAmplitudeEvent().EventProperties)

	event.SetOptionalBool(false)
	eventProperties["optionalBool"] = false
	assert.Equal(t, eventProperties, event.toAmplitudeEvent().EventProperties)
	// log.Printf("TestEventWithAllProperties: \n\t Should have optionalBool in EventProperties: \n\t %+v", event.toAmplitudeEvent().EventProperties)
}

func TestAmpli_LoadWithEnvironment(t *testing.T) {
	expectConfig := amplitude.NewConfig("test-development-api-key")

	instance := Ampli{}
	APIKey[EnvironmentDevelopment] = "test-development-api-key"
	instance.Load(LoadOptions{
		Environment: EnvironmentDevelopment,
	})

	// Amplitude.Client.Logger is an interface of which equality is determined based on memory address
	// So here only check one of the default configurations, FlushQueueSize
	assert.Equal(t, expectConfig.APIKey, instance.Client.GetConfig().APIKey)
	assert.Equal(t, expectConfig.FlushQueueSize, instance.Client.GetConfig().FlushQueueSize)
}

func TestAmpli_LoadWithClient(t *testing.T) {
	expectConfig := amplitude.NewConfig("test-development-api-key")

	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			APIKey: "test-development-api-key",
		},
	})

	// Amplitude.Client.Logger is an interface of which equality is determined based on memory address
	// So here only check one of the default configurations, FlushQueueSize
	assert.Equal(t, expectConfig.APIKey, instance.Client.GetConfig().APIKey)
	assert.Equal(t, expectConfig.FlushQueueSize, instance.Client.GetConfig().FlushQueueSize)
}

func TestAmpli_LoadWithInstance(t *testing.T) {
	expectConfig := amplitude.NewConfig("test-development-api-key")

	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			Instance: amplitude.NewClient(amplitude.NewConfig("test-development-api-key")),
		},
	})

	// Amplitude.Client.Logger is an interface of which equality is determined based on memory address
	// So here only check one of the default configurations, FlushQueueSize
	assert.Equal(t, expectConfig.APIKey, instance.Client.GetConfig().APIKey)
	assert.Equal(t, expectConfig.FlushQueueSize, instance.Client.GetConfig().FlushQueueSize)
}

func TestAmpli_LoadWithConfig(t *testing.T) {
	expectConfig := amplitude.NewConfig("test-development-api-key")

	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			Configuration: amplitude.NewConfig("test-development-api-key"),
		},
	})

	// Amplitude.Client.Logger is an interface of which equality is determined based on memory address
	// So here only check one of the default configurations, FlushQueueSize
	assert.Equal(t, expectConfig.APIKey, instance.Client.GetConfig().APIKey)
	assert.Equal(t, expectConfig.FlushQueueSize, instance.Client.GetConfig().FlushQueueSize)
}
