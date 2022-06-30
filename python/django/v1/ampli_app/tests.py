from collections import defaultdict
from unittest.mock import MagicMock

from django.test import TestCase
from .ampli import *
from amplitude import http_client


class AmpliDjangoTestCase(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.post = http_client.HttpClient.post

    def setUp(self) -> None:
        self.mock_post = MagicMock()
        http_client.HttpClient.post = self.mock_post
        res = http_client.Response(http_client.HttpStatus.SUCCESS)
        self.mock_post.return_value = res
        self.events = defaultdict(list)

    @classmethod
    def tearDownClass(cls) -> None:
        http_client.HttpClient.post = cls.post

    def callback_function(self, event, code, message=None):
        self.events[code].append(event)

    def test_ampli_default_instance_load_default_config_success(self):
        ampli.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        self.assertTrue(ampli.initialized_and_enabled())
        with self.assertLogs(None, 'WARN') as cm:
            ampli.load()
            self.assertEqual([
                'WARNING:ampli_app.ampli.ampli:Warning: Ampli is already initialized. ampli.load() should be called once at application start up.'],
                cm.output)

    def test_ampli_track_identify_event_success(self):
        amplitude_client = Amplitude('TEST_API_KEY')
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(instance=amplitude_client)))
        self.assertEqual(amplitude_client, ampli_client.client)
        ampli_client.client.configuration.callback = self.callback_function
        self.assertIsNotNone(amplitude_client.configuration.plan)
        event = Identify(required_number=42.0, optional_array=['a', 'b'])
        self.assertTrue(isinstance(event, IdentifyEvent))
        ampli_client.identify('test_user', event)
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        self.assertEqual('$identify', self.events[200][0].event_type)
        self.assertEqual('test_user', self.events[200][0].user_id)
        self.assertEqual({'optionalArray': ['a', 'b'], 'requiredNumber': 42.0},
                         self.events[200][0].user_properties)
        self.assertTrue('plan' in self.events[200][0])

    def test_ampli_track_group_identify_event_success(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        event = Group(required_boolean=False)
        self.assertTrue(isinstance(event, GroupIdentifyEvent))
        ampli_client.group_identify('sport', 'football', event)
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        self.assertEqual('$groupidentify', self.events[200][0].event_type)
        self.assertEqual({'sport': 'football'}, self.events[200][0].groups)
        self.assertEqual({'optionalString': None, 'requiredBoolean': False},
                         self.events[200][0].group_properties)

    def test_ampli_set_group_success(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        ampli_client.set_group('test_user', 'sport', 'football')
        ampli_client.set_group('test_user_2', 'team', ['10', '11'])
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        self.assertEqual('$identify', self.events[200][0].event_type)
        self.assertEqual('$identify', self.events[200][1].event_type)
        self.assertEqual({'sport': 'football'}, self.events[200][0].groups)
        self.assertEqual({'team': ['10', '11']}, self.events[200][1].groups)

    def test_ampli_track_event_max_int_for_test_with_event_class(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        ampli_client.track('test_user', EventMaxIntForTest(int_max_10=9))
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        event = self.events[200][0]
        self.assertTrue(isinstance(event, EventMaxIntForTest))
        self.assertEqual(event.event_properties['intMax10'], 9)

    def test_ampli_track_event_max_int_for_test_with_track_method(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        ampli_client.event_max_int_for_test('test_user', EventMaxIntForTest(9))
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        event = self.events[200][0]
        self.assertTrue(isinstance(event, EventMaxIntForTest))
        self.assertEqual(event.event_properties['intMax10'], 9)

    def test_ampli_track_event_no_properties_success(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        ampli_client.track('test_user', EventNoProperties())
        ampli_client.event_no_properties('test_user', EventNoProperties())
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        event, event_2 = self.events[200]
        self.assertTrue(isinstance(event, EventNoProperties))
        self.assertTrue(isinstance(event_2, EventNoProperties))
        self.assertEqual(event.user_id, event_2.user_id)

    def test_ampli_track_event_with_all_properties_success(self):
        ampli_client = Ampli()
        ampli_client.load(LoadOptions(client=LoadClientOptions(api_key="TEST_API_KEY")))
        ampli_client.client.configuration.callback = self.callback_function
        ampli_client.track(
            'test_user',
            EventWithAllProperties(
                required_array=['test'],
                required_boolean=True,
                required_enum=EventWithAllProperties.RequiredEnum.ENUM_2,
                required_integer=20,
                required_number=9.5,
                required_string='test'))
        ampli_client.event_with_all_properties(
            'test_user',
            EventWithAllProperties(
                required_array=['test'],
                required_boolean=True,
                required_enum=EventWithAllProperties.RequiredEnum.ENUM_2,
                required_integer=20,
                required_number=9.5,
                required_string='test'))
        [future.result() for future in ampli_client.flush()]
        self.mock_post.assert_called_once()
        event, event_2 = self.events[200]
        self.assertTrue(isinstance(event, EventWithAllProperties))
        self.assertTrue(isinstance(event_2, EventWithAllProperties))
        self.assertEqual(event.event_properties, event_2.event_properties)
        self.assertEqual(event.user_id, event_2.user_id)
