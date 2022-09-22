package tests

import (
	"testing"

	"github.com/amplitude/analytics-go/amplitude"
	"github.com/amplitude/analytics-go/amplitude/constants"
	"github.com/amplitude/analytics-go/amplitude/types"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	"ampli-example/ampli"
)

func TestAmpliSuite(t *testing.T) {
	suite.Run(t, new(AmpliSuite))
}

type AmpliSuite struct {
	suite.Suite
}

func (t *AmpliSuite) TestIdentify() {
	testAmpli, client := t.createAmpli()

	expectedEvent := amplitude.Event{
		EventType: amplitude.IdentifyEventType,
		UserProperties: map[types.IdentityOp]map[string]interface{}{
			types.IdentityOpSet: {"requiredNumber": 6.4, "optionalArray": []string{"a", "b"}},
		},
		EventOptions: amplitude.EventOptions{UserID: "user-1"},
	}

	client.On("Track", expectedEvent).Return().Once()

	testAmpli.Identify("user-1", ampli.Identify.Builder().
		RequiredNumber(6.4).
		OptionalArray([]string{"a", "b"}).
		Build(),
	)

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestGroupIdentify() {
	testAmpli, client := t.createAmpli()

	expectedEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		GroupProperties: map[amplitude.IdentityOp]map[string]interface{}{
			types.IdentityOpSet: {"requiredBoolean": true},
		},
		Groups: map[string][]string{
			"group-type": {"group-name"},
		},
	}

	client.On("Track", expectedEvent).Return().Once()

	testAmpli.GroupIdentify("group-type", "group-name", ampli.Group.Builder().
		RequiredBoolean(true).
		Build(),
	)

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestSetGroup() {
	testAmpli, client := t.createAmpli()

	client.On("SetGroup",
		"group-type", []string{"group-name-1", "group-name-2"}, amplitude.EventOptions{UserID: "user-1"},
	).Return().Once()

	testAmpli.SetGroup("user-1", "group-type", []string{"group-name-1", "group-name-2"})

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestEventWithAllProperties() {
	testAmpli, client := t.createAmpli()

	expectedEvent := amplitude.Event{
		EventType: "Event With All Properties",
		EventProperties: map[string]interface{}{
			"requiredArray":   []string{"abc", "test"},
			"requiredBoolean": true,
			"requiredConst":   "some-const-value",
			"requiredEnum":    ampli.EventWithAllPropertiesRequiredEnum("Enum1"),
			"requiredInteger": 3,
			"requiredNumber":  16.4,
			"requiredString":  "str",
			"optionalString":  "optional-string",
		},
		EventOptions: amplitude.EventOptions{
			UserID:   "user-1",
			DeviceID: "device-id",
		},
	}

	client.On("Track", expectedEvent).Return().Once()

	testAmpli.Track("user-1", ampli.EventWithAllProperties.Builder().
		RequiredArray([]string{"abc", "test"}).
		RequiredBoolean(true).
		RequiredEnum(ampli.EventWithAllProperties.RequiredEnum.Enum1).
		RequiredInteger(3).
		RequiredNumber(16.4).
		RequiredString("str").
		OptionalString("optional-string").
		Build(),
		ampli.EventOptions{DeviceID: "device-id"},
	)

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestFlush() {
	testAmpli, client := t.createAmpli()

	client.On("Flush").Return().Once()

	testAmpli.Flush()

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestShutdown() {
	testAmpli, client := t.createAmpli()

	client.On("Shutdown").Return().Once()

	testAmpli.Shutdown()

	client.AssertExpectations(t.T())
}

func (t *AmpliSuite) TestLoadWithEnvironment() {
	instance := ampli.Ampli{}
	ampli.APIKey[ampli.EnvironmentDevelopment] = "test-development-api-key"
	instance.Load(ampli.LoadOptions{
		Environment: ampli.EnvironmentDevelopment,
	})

	t.Assert().Equal("test-development-api-key", instance.Client.Config().APIKey)
	t.Assert().Equal(constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func (t *AmpliSuite) TestLoadWithClient() {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			APIKey: "test-development-api-key",
		},
	})

	t.Assert().Equal("test-development-api-key", instance.Client.Config().APIKey)
	t.Assert().Equal(constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func (t *AmpliSuite) TestLoadWithInstance() {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Instance: ampli.NewClient(ampli.NewClientConfig("test-development-api-key")),
		},
	})

	t.Assert().Equal("test-development-api-key", instance.Client.Config().APIKey)
	t.Assert().Equal(constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func (t *AmpliSuite) TestLoadWithConfig() {
	instance := ampli.Ampli{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{
			Configuration: ampli.NewClientConfig("test-development-api-key"),
		},
	})

	t.Assert().Equal("test-development-api-key", instance.Client.Config().APIKey)
	t.Assert().Equal(constants.DefaultConfig.FlushQueueSize, instance.Client.Config().FlushQueueSize)
}

func (t *AmpliSuite) createAmpli() (*ampli.Ampli, *mockClient) {
	instance := new(ampli.Ampli)
	client := &mockClient{}
	instance.Load(ampli.LoadOptions{
		Client: ampli.LoadClientOptions{Instance: client},
	})
	return instance, client
}

type mockClient struct {
	mock.Mock
}

func (m *mockClient) Track(event amplitude.Event) {
	m.Called(event)
}

func (m *mockClient) Identify(identify amplitude.Identify, eventOptions amplitude.EventOptions) {
	m.Called(identify, eventOptions)
}

func (m *mockClient) GroupIdentify(groupType string, groupName string, identify amplitude.Identify, eventOptions amplitude.EventOptions) {
	m.Called(groupType, groupName, identify, eventOptions)
}

func (m *mockClient) SetGroup(groupType string, groupName []string, eventOptions amplitude.EventOptions) {
	m.Called(groupType, groupName, eventOptions)
}

func (m *mockClient) Revenue(revenue amplitude.Revenue, eventOptions amplitude.EventOptions) {
	m.Called(revenue, eventOptions)
}

func (m *mockClient) Flush() {
	m.Called()
}

func (m *mockClient) Shutdown() {
	m.Called()
}

func (m *mockClient) Add(plugin amplitude.Plugin) {
	m.Called(plugin)
}

func (m *mockClient) Remove(pluginName string) {
	m.Called(pluginName)
}

func (m *mockClient) Config() amplitude.Config {
	args := m.Called()
	return args[0].(amplitude.Config)
}
