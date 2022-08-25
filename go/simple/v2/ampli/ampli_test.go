package ampli

import (
	"log"
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

func TestIdentifyWithOptionalProperties(t *testing.T) {
	identify := NewIdentify(6.4)

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{"requiredNumber": 6.4}
	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)

	identify.SetOptionalArray([]string{"a", "b"})
	userProperties[amplitude.IdentityOpSet]["optionalArray"] = []string{"a", "b"}
	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)
}

func TestIdentifyWithOptionalPropertiesChained(t *testing.T) {
	identify := NewIdentify(6.4).SetOptionalArray([]string{"a", "b"})

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{
		"requiredNumber": 6.4,
		"optionalArray":  []string{"a", "b"},
	}

	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)
}

func TestGroup_NewGroup(t *testing.T) {
	group := NewGroup(true)

	expectEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		GroupProperties: map[amplitude.IdentityOp]map[string]interface{}{
			amplitude.IdentityOpSet: {"requiredBoolean": true},
		},
	}

	assert.Equal(t, expectEvent, group.toAmplitudeEvent())

}

func TestGroup_SetOptionalString(t *testing.T) {
	group := NewGroup(true)
	group.SetOptionalString("optional-string")

	expectEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		GroupProperties: map[amplitude.IdentityOp]map[string]interface{}{
			amplitude.IdentityOpSet: {"requiredBoolean": true, "optionalString": "optional-string"},
		},
	}

	assert.Equal(t, expectEvent, group.toAmplitudeEvent())
}

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
	log.Printf("TestEventWithAllProperties: \n\t Should NOT have optionalBool in EventProperties: \n\t %+v", event.toAmplitudeEvent().EventProperties)

	event.SetOptionalBool(false)
	eventProperties["optionalBool"] = false
	assert.Equal(t, eventProperties, event.toAmplitudeEvent().EventProperties)
	log.Printf("TestEventWithAllProperties: \n\t Should have optionalBool in EventProperties: \n\t %+v", event.toAmplitudeEvent().EventProperties)
}
