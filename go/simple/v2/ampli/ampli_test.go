package ampli

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

func TestIdentify(t *testing.T) {
	identify := Identify.Builder().
		SetRequiredNumber(6.4).
		SetOptionalArray([]string{"a", "b"}).Build()

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{
		"requiredNumber": 6.4,
		"optionalArray":  []string{"a", "b"},
	}
	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)
}

func TestGroup(t *testing.T) {
	group := Group.Builder().SetRequiredBoolean(true).Build()

	expectEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		GroupProperties: map[amplitude.IdentityOp]map[string]interface{}{
			amplitude.IdentityOpSet: {"requiredBoolean": true},
		},
	}

	assert.Equal(t, expectEvent, group.toAmplitudeEvent())
}

func TestEventWithAllProperties(t *testing.T) {
	event := EventWithAllProperties.Builder().
		SetRequiredArray([]string{"abc", "test"}).
		SetRequiredBool(true).
		SetRequiredEnum(EventWithAllProperties.RequiredEnum.Enum1).
		SetRequiredInteger(3).
		SetRequiredNumber(16.4).
		SetRequiredString("str").
		SetOptionalString("optional-string").
		Build()

	eventProperties := map[string]interface{}{
		"requiredArray":   []string{"abc", "test"},
		"requiredBool":    true,
		"requiredEnum":    EventWithAllProperties.RequiredEnum.Enum1,
		"requiredInteger": 3,
		"requiredNumber":  16.4,
		"requiredString":  "str",
		"optionalString":  "optional-string",
	}
	assert.Equal(t, eventProperties, event.toAmplitudeEvent().EventProperties)
}

func TestAmpli_LoadWithEnvironment(t *testing.T) {
	instance := Ampli{}
	APIKey[EnvironmentDevelopment] = "test-development-api-key"
	instance.Load(LoadOptions{
		Environment: EnvironmentDevelopment,
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, amplitude.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithClient(t *testing.T) {
	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			APIKey: "test-development-api-key",
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, amplitude.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithInstance(t *testing.T) {
	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			Instance: NewClient(NewClientConfig("test-development-api-key")),
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, amplitude.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithConfig(t *testing.T) {
	instance := Ampli{}
	instance.Load(LoadOptions{
		Client: LoadClientOptions{
			Configuration: NewClientConfig("test-development-api-key"),
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, amplitude.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}
