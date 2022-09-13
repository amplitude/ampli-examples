package tests

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/amplitude/analytics-go/amplitude/constants"
	"github.com/amplitude/analytics-go/amplitude/types"
	"github.com/stretchr/testify/assert"

	"ampli-example/ampli"
)

func TestIdentify(t *testing.T) {
	identify := ampli.Identify.Builder().
		SetRequiredNumber(6.4).
		SetOptionalArray([]string{"a", "b"}).Build()

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[types.IdentityOpSet] = map[string]interface{}{
		"requiredNumber": 6.4,
		"optionalArray":  []string{"a", "b"},
	}
	assert.Equal(t, userProperties, identify.ToAmplitudeEvent().UserProperties)
}

func TestGroup(t *testing.T) {
	group := ampli.Group.Builder().SetRequiredBoolean(true).Build()

	expectEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		GroupProperties: map[amplitude.IdentityOp]map[string]interface{}{
			types.IdentityOpSet: {"requiredBoolean": true},
		},
	}

	assert.Equal(t, expectEvent, group.ToAmplitudeEvent())
}

func TestEventWithAllProperties(t *testing.T) {
	event := ampli.EventWithAllProperties.Builder().
		SetRequiredArray([]string{"abc", "test"}).
		SetRequiredBoolean(true).
		SetRequiredEnum(ampli.EventWithAllProperties.RequiredEnum.Enum1).
		SetRequiredInteger(3).
		SetRequiredNumber(16.4).
		SetRequiredString("str").
		SetOptionalString("optional-string").
		Build()

	eventProperties := map[string]interface{}{
		"requiredArray":   []string{"abc", "test"},
		"requiredBool":    true,
		"requiredEnum":    ampli.EventWithAllProperties.RequiredEnum.Enum1,
		"requiredInteger": 3,
		"requiredNumber":  16.4,
		"requiredString":  "str",
		"optionalString":  "optional-string",
	}
	assert.Equal(t, eventProperties, event.ToAmplitudeEvent().EventProperties)
}

func TestAmpli_LoadWithEnvironment(t *testing.T) {
	instance := ampli.Ampli{}
	ampli.APIKey[ampli.EnvironmentDevelopment] = "test-development-api-key"
	instance.Load(ampli.LoadOptions{
		Environment: ampli.EnvironmentDevelopment,
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithClient(t *testing.T) {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			APIKey: "test-development-api-key",
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithInstance(t *testing.T) {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Instance: ampli.NewClient(ampli.NewClientConfig("test-development-api-key")),
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func TestAmpli_LoadWithConfig(t *testing.T) {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Configuration: ampli.NewClientConfig("test-development-api-key"),
		},
	})

	assert.Equal(t, "test-development-api-key", instance.Client.Config().APIKey)
	assert.Equal(t, constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}
