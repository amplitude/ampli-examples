package ampli_test

import (
	"log"
	"testing"

	"ampli-example/ampli"
	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

func TestIdentifyWithOptionalProperties(t *testing.T) {
	identify := ampli.NewIdentify(6.4)

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{"requiredNumber": 6.4}
	assert.Equal(t, userProperties, identify.ToEvent().UserProperties)

	identify.SetOptionalArray([]string{"a", "b"})
	userProperties[amplitude.IdentityOpSet]["optionalArray"] = []string{"a", "b"}
	assert.Equal(t, userProperties, identify.ToEvent().UserProperties)
}

func TestIdentifyWithOptionalPropertiesChained(t *testing.T) {
	identify := ampli.NewIdentify(6.4).SetOptionalArray([]string{"a", "b"})

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{
		"requiredNumber": 6.4,
		"optionalArray":  []string{"a", "b"},
	}

	assert.Equal(t, userProperties, identify.ToEvent().UserProperties)
}

func TestEventWithAllProperties(t *testing.T) {
	event := ampli.NewEventWithAllProperties([]string{"abc", "test"}, true, ampli.EventWithAllPropertiesRequiredEnumEnum1, 3, 16.4, "str")

	eventProperties := map[string]interface{}{
		"requiredArray":   []string{"abc", "test"},
		"requiredBool":    true,
		"requiredEnum":    ampli.EventWithAllPropertiesRequiredEnumEnum1,
		"requiredInteger": 3,
		"requiredNumber":  16.4,
		"requiredString":  "str",
	}
	// Should not have either optionalString or optionalBool in EventProperties
	assert.Equal(t, eventProperties, event.ToEvent().EventProperties)

	event.SetOptionalString("optional-string")
	eventProperties["optionalString"] = "optional-string"
	// Should not have optionalBool in EventProperties
	assert.Equal(t, eventProperties, event.ToEvent().EventProperties)
	log.Print(event.ToEvent().EventProperties)

	event.SetOptionalBool(false)
	eventProperties["optionalBool"] = false
	assert.Equal(t, eventProperties, event.ToEvent().EventProperties)
	log.Print(event.ToEvent().EventProperties)
}
