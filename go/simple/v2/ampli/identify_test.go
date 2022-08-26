package ampli

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/stretchr/testify/assert"
)

func TestIdentify_WithOptionalProperties(t *testing.T) {
	identify := NewIdentify(6.4)

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{"requiredNumber": 6.4}
	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)

	identify.SetOptionalArray([]string{"a", "b"})
	userProperties[amplitude.IdentityOpSet]["optionalArray"] = []string{"a", "b"}
	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)
}

func TestIdentify_WithOptionalPropertiesChained(t *testing.T) {
	identify := NewIdentify(6.4).SetOptionalArray([]string{"a", "b"})

	userProperties := map[amplitude.IdentityOp]map[string]interface{}{}
	userProperties[amplitude.IdentityOpSet] = map[string]interface{}{
		"requiredNumber": 6.4,
		"optionalArray":  []string{"a", "b"},
	}

	assert.Equal(t, userProperties, identify.toAmplitudeEvent().UserProperties)
}
