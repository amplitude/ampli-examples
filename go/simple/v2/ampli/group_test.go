package ampli

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

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
