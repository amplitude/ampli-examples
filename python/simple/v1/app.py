from ampli import *
from plugins import MyEventIDPlugin, SegmentPlugin
from dotenv import dotenv_values

envs = dotenv_values(".env")
print(envs['AMPLITUDE_API_KEY'])
api_key = envs['AMPLITUDE_API_KEY']
write_key = envs['SEGMENT_WRITE_KEY']

# Initialize the Ampli instance with LoadOptions and LoadClientOptions
ampli.load(LoadOptions(Environment.DEVELOPMENT, False,
                       client=LoadClientOptions(api_key=api_key, configuration=Config(server_zone='EU'))))

# Identify using IdentifyProperties in tracking plan
ampli.identify("user_id", Identify(required_number=16.6, optional_array=['abc', 'test']))

# Group Identify using GroupProperties in tracking plan
ampli.group_identify("Org", "Engineer", Group(required_boolean=True, optional_string=None))

# Set groups for user
ampli.set_group("user_id", "Org", ["Engineer", "DevOp"])

# track strongly typed event class with ampli.track
ampli.track(None, EventNoProperties(), event_options=EventOptions(user_id="user_id", device_id="device_id"))

# track event with strongly typed method
ampli.event_no_properties("user_id", event_options=EventOptions(device_id="device_id"))

# track EventWithAllProperties
ampli.event_with_all_properties(user_id="user_id",
                                required_array=["a", "b"],
                                required_boolean=False,
                                required_enum=EventWithAllProperties.RequiredEnum.ENUM_1,
                                required_number=16.4,
                                required_integer=3,
                                required_string="str")
ampli.track("user_id", EventWithAllProperties(required_array=["a", "b"],
                                              required_boolean=False,
                                              required_enum=EventWithAllProperties.RequiredEnum.ENUM_1,
                                              required_number=16.4,
                                              required_integer=3,
                                              required_string="str"))

# track event with const properties
ampli.event_with_const_types(user_id="user_id")
ampli.track("user_id", EventWithConstTypes())

# track event with strongly typed method
ampli.event_max_int_for_test(user_id="user_id", int_max_10=6)
ampli.event_object_types(user_id="user_id", required_object={"key": "value"}, required_object_array=[{"k": 15}])
ampli.event_with_array_types("user_id", required_boolean_array=[True, False],
                             required_object_array=[{"k": "v"}],
                             required_number_array=[1, 4, 6.6],
                             required_string_array=["a", "b"])
ampli.event_with_enum_types("user_id", required_enum=EventWithEnumTypes.RequiredEnum.REQUIRED_ENUM_1,
                            optional_enum=EventWithEnumTypes.OptionalEnum.OPTIONAL_ENUM_2)
ampli.event_with_optional_array_types("user_id",
                                      optional_boolean_array=[False, True],
                                      optional_number_array=[1, 2, 15.0],
                                      optional_string_array=['test'])
ampli.event_with_optional_properties("user_id", optional_boolean=False)
ampli.event_with_different_casing_types(user_id="user_id",
                                        enum_camel_case=EventWithDifferentCasingTypes.EnumCamelCase.ENUM_CAMEL_CASE,
                                        enum_pascal_case=EventWithDifferentCasingTypes.EnumPascalCase.ENUM_PASCAL_CASE,
                                        enum_with_space=EventWithDifferentCasingTypes.EnumWithSpace.ENUM_WITH_SPACE,
                                        enum_snake_case=EventWithDifferentCasingTypes.EnumSnakeCase.ENUM_SNAKE_CASE,
                                        property_with_space="property with space",
                                        property_with_camel_case="propertyWithCamelCase",
                                        property_with_snake_case="property_with_snake_case",
                                        property_with_pascal_case="PropertyWithPascalCase")

# add plugin
my_plugin = MyEventIDPlugin()
# segment_plugin = SegmentPlugin(write_key)
ampli.client.add(my_plugin)
#ampli.client.add(segment_plugin)

# remove plugin
ampli.client.remove(my_plugin)
#ampli.client.remove(segment_plugin)

# flush events
ampli.flush()

# shutdown ampli instance
ampli.shutdown()
