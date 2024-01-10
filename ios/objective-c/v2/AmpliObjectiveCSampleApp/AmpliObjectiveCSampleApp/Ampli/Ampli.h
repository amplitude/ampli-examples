/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull obj-c-ampli-v2'
 *
 * Required dependencies: AmplitudeSwift ~> 0.7.1
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: ios:obj-c-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/obj-c-ampli-v2)
 */
#import <Foundation/Foundation.h>
@import AmplitudeSwift;

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, AmpliEnvironment) {
    prod,
    dev
};

@interface LoadClientOptions: NSObject
@property (nonatomic, strong, readonly) Amplitude* _Nullable instance;
@property (nonatomic, strong, readonly) AMPConfiguration* _Nullable configuration;
+ (instancetype) initWithApiKey:(NSString*)apiKey;
+ (instancetype) initWithInstance:(Amplitude*)instance;
+ (instancetype) initWithConfiguration:(AMPConfiguration*)configuration;
@end

@interface LoadOptions: NSObject
@property (nonatomic, readonly) AmpliEnvironment environment;
@property (nonatomic, readwrite) BOOL disabled;
@property (nonatomic, strong, readonly) LoadClientOptions* _Nullable client;
+ (instancetype) initWithApiKey:(NSString*)apiKey;
+ (instancetype) initWithEnvironment:(AmpliEnvironment)environment;
+ (instancetype) initWithClientOptions:(LoadClientOptions*)client;
+ (instancetype) initWithDisabled:(BOOL)disabled;
@end

#pragma mark - IdentifyBuilder

@interface IdentifyBuilder: NSObject
@property (nonatomic) NSArray<NSString *> * _Nullable optionalArray;
@end

#pragma mark - Identify

@interface Identify: NSObject
/**
 Identify properties.

 @param requiredNumber Description for identify requiredNumber
*/
+ (AMPIdentify*) requiredNumber:(Float64)requiredNumber NS_SWIFT_NAME(build(requiredNumber:));
+ (AMPIdentify*) requiredNumber:(Float64)requiredNumber builderBlock:(void (^)(IdentifyBuilder *b))builderBlock NS_SWIFT_NAME(build(requiredNumber:builderBlock:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventNoProperties

@interface EventNoProperties: NSObject
/**
 Event w no properties description

 Owner: Test codegen
*/
+ (AMPBaseEvent*)build NS_SWIFT_NAME(build());

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventObjectTypes

@interface EventObjectTypes: NSObject
/**
 Event with Object and Object Array

 Owner: Test codegen

 @param requiredObject Property Object Type
 @param requiredObjectArray Property Object Array Type
*/
+ (AMPBaseEvent*) requiredObject:(NSDictionary<NSString *, NSObject *> *)requiredObject requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray NS_SWIFT_NAME(build(requiredObject:requiredObjectArray:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithAllProperties Enums

typedef NS_ENUM(NSInteger, EventWithAllPropertiesRequiredEnum) {
    EventWithAllPropertiesRequiredEnumEnum1,
    EventWithAllPropertiesRequiredEnumEnum2
};

#pragma mark - EventWithAllPropertiesBuilder

@interface EventWithAllPropertiesBuilder: NSObject
@property (nonatomic) NSString* _Nullable optionalString;
@end

#pragma mark - EventWithAllProperties

@interface EventWithAllProperties: NSObject
/**
 Event w all properties description

 Owner: Test codegen

 @param requiredArray Event 2 Property - Array
 @param requiredBoolean Event 2 Property - Boolean
 @param requiredEnum Event 2 Property - Enum
 @param requiredInteger Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
 @param requiredNumber Event 2 Property - Number
 @param requiredString Event 2 Property - String
*/
+ (AMPBaseEvent*) requiredArray:(NSArray<NSString *> *)requiredArray requiredBoolean:(Boolean)requiredBoolean requiredEnum:(EventWithAllPropertiesRequiredEnum)requiredEnum requiredInteger:(NSInteger)requiredInteger requiredNumber:(Float64)requiredNumber requiredString:(NSString*)requiredString NS_SWIFT_NAME(build(requiredArray:requiredBoolean:requiredEnum:requiredInteger:requiredNumber:requiredString:));
+ (AMPBaseEvent*) requiredArray:(NSArray<NSString *> *)requiredArray requiredBoolean:(Boolean)requiredBoolean requiredEnum:(EventWithAllPropertiesRequiredEnum)requiredEnum requiredInteger:(NSInteger)requiredInteger requiredNumber:(Float64)requiredNumber requiredString:(NSString*)requiredString builderBlock:(void (^)(EventWithAllPropertiesBuilder *b))builderBlock NS_SWIFT_NAME(build(requiredArray:requiredBoolean:requiredEnum:requiredInteger:requiredNumber:requiredString:builderBlock:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithArrayTypes

@interface EventWithArrayTypes: NSObject
/**
 Description for event with Array Types

 Owner: Test codegen

 @param requiredBooleanArray description for required boolean array
 @param requiredEnumArray Description for enum array property
 @param requiredNumberArray Description for required number array
 @param requiredObjectArray Description for required object array
 @param requiredStringArray description for required string array
*/
+ (AMPBaseEvent*) requiredBooleanArray:(NSArray<NSNumber *> *)requiredBooleanArray requiredEnumArray:(NSArray<NSString *> *)requiredEnumArray requiredNumberArray:(NSArray<NSNumber *> *)requiredNumberArray requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray requiredStringArray:(NSArray<NSString *> *)requiredStringArray NS_SWIFT_NAME(build(requiredBooleanArray:requiredEnumArray:requiredNumberArray:requiredObjectArray:requiredStringArray:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithConstTypes

@interface EventWithConstTypes: NSObject
/**
 Description for event with const types

 Owner: Test codegen
*/
+ (AMPBaseEvent*)build NS_SWIFT_NAME(build());

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithEnumTypes Enums

typedef NS_ENUM(NSInteger, EventWithEnumTypesOptionalEnum) {
    EventWithEnumTypesOptionalEnumOptionalEnum1,
    EventWithEnumTypesOptionalEnumOptionalEnum2,
    EventWithEnumTypesOptionalEnumUndefined
};

typedef NS_ENUM(NSInteger, EventWithEnumTypesRequiredEnum) {
    EventWithEnumTypesRequiredEnumRequiredEnum1,
    EventWithEnumTypesRequiredEnumRequiredEnum2
};

#pragma mark - EventWithEnumTypesBuilder

@interface EventWithEnumTypesBuilder: NSObject
@property (nonatomic) EventWithEnumTypesOptionalEnum optionalEnum;
@end

#pragma mark - EventWithEnumTypes

@interface EventWithEnumTypes: NSObject
/**
 Description for event with enum types

 Owner: Test codegen

 @param requiredEnum Description for optional enum
*/
+ (AMPBaseEvent*) requiredEnum:(EventWithEnumTypesRequiredEnum)requiredEnum NS_SWIFT_NAME(build(requiredEnum:));
+ (AMPBaseEvent*) requiredEnum:(EventWithEnumTypesRequiredEnum)requiredEnum builderBlock:(void (^)(EventWithEnumTypesBuilder *b))builderBlock NS_SWIFT_NAME(build(requiredEnum:builderBlock:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithOptionalArrayTypesBuilder

@interface EventWithOptionalArrayTypesBuilder: NSObject
@property (nonatomic) NSArray<NSNumber *> * _Nullable optionalBooleanArray;
@property (nonatomic) NSArray<NSString *> * _Nullable optionalEnumArray;
@property (nonatomic) NSArray<NSDictionary<NSString *, NSObject *> *> * _Nullable optionalJsonArray;
@property (nonatomic) NSArray<NSNumber *> * _Nullable optionalNumberArray;
@property (nonatomic) NSArray<NSString *> * _Nullable optionalStringArray;
@end

#pragma mark - EventWithOptionalArrayTypes

@interface EventWithOptionalArrayTypes: NSObject
/**
 Description for event with optional array types

 Owner: Test codegen
*/
+ (AMPBaseEvent*)  builderBlock:(void (^)(EventWithOptionalArrayTypesBuilder *b))builderBlock NS_SWIFT_NAME(build(builderBlock:));
+ (AMPBaseEvent*)build NS_SWIFT_NAME(build());

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithOptionalPropertiesBuilder

@interface EventWithOptionalPropertiesBuilder: NSObject
@property (nonatomic) NSArray<NSNumber *> * _Nullable optionalArrayNumber;
@property (nonatomic) NSArray<NSString *> * _Nullable optionalArrayString;
@property (nonatomic) NSNumber* _Nullable optionalBoolean;
@property (nonatomic) NSNumber* _Nullable optionalNumber;
@property (nonatomic) NSString* _Nullable optionalString;
@end

#pragma mark - EventWithOptionalProperties

@interface EventWithOptionalProperties: NSObject
/**
 Event w optional properties description

 Owner: Test codegen
*/
+ (AMPBaseEvent*)  builderBlock:(void (^)(EventWithOptionalPropertiesBuilder *b))builderBlock NS_SWIFT_NAME(build(builderBlock:));
+ (AMPBaseEvent*)build NS_SWIFT_NAME(build());

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithTemplatePropertiesBuilder

@interface EventWithTemplatePropertiesBuilder: NSObject
@property (nonatomic) NSNumber* _Nullable optionalEventProperty;
@property (nonatomic) NSNumber* _Nullable optionalTemplateProperty;
@end

#pragma mark - EventWithTemplateProperties

@interface EventWithTemplateProperties: NSObject
/**
 Event with template properties description

 Owner: Test codegen

 @param requiredEventProperty required_event_property description
 @param requiredTemplateProperty required_template_property description
*/
+ (AMPBaseEvent*) requiredEventProperty:(NSString*)requiredEventProperty requiredTemplateProperty:(NSString*)requiredTemplateProperty NS_SWIFT_NAME(build(requiredEventProperty:requiredTemplateProperty:));
+ (AMPBaseEvent*) requiredEventProperty:(NSString*)requiredEventProperty requiredTemplateProperty:(NSString*)requiredTemplateProperty builderBlock:(void (^)(EventWithTemplatePropertiesBuilder *b))builderBlock NS_SWIFT_NAME(build(requiredEventProperty:requiredTemplateProperty:builderBlock:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventWithDifferentCasingTypes Enums

typedef NS_ENUM(NSInteger, EventWithDifferentCasingTypesEnumWithSpace) {
    EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace
};

typedef NS_ENUM(NSInteger, EventWithDifferentCasingTypesEnumSnakeCase) {
    EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase
};

typedef NS_ENUM(NSInteger, EventWithDifferentCasingTypesEnumCamelCase) {
    EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase
};

typedef NS_ENUM(NSInteger, EventWithDifferentCasingTypesEnumPascalCase) {
    EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase
};

#pragma mark - EventWithDifferentCasingTypes

@interface EventWithDifferentCasingTypes: NSObject
/**
 Description for case with space

 Owner: Test codegen

 @param enumWithSpace Description for enum with space
 @param enumSnakeCase description_for_enum_snake_case
 @param enumCamelCase descriptionForEnumCamelCase
 @param enumPascalCase DescirptionForEnumPascalCase
 @param propertyWithSpace Description for case with space
 @param propertyWithSnakeCase Description_for_snake_case
 @param propertyWithCamelCase descriptionForCamelCase
 @param propertyWithPascalCase DescriptionForPascalCase
*/
+ (AMPBaseEvent*) enumWithSpace:(EventWithDifferentCasingTypesEnumWithSpace)enumWithSpace enumSnakeCase:(EventWithDifferentCasingTypesEnumSnakeCase)enumSnakeCase enumCamelCase:(EventWithDifferentCasingTypesEnumCamelCase)enumCamelCase enumPascalCase:(EventWithDifferentCasingTypesEnumPascalCase)enumPascalCase propertyWithSpace:(NSString*)propertyWithSpace propertyWithSnakeCase:(NSString*)propertyWithSnakeCase propertyWithCamelCase:(NSString*)propertyWithCamelCase propertyWithPascalCase:(NSString*)propertyWithPascalCase NS_SWIFT_NAME(build(enumWithSpace:enumSnakeCase:enumCamelCase:enumPascalCase:propertyWithSpace:propertyWithSnakeCase:propertyWithCamelCase:propertyWithPascalCase:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

#pragma mark - EventMaxIntForTest

@interface EventMaxIntForTest: NSObject
/**
 Event to test schema validation

 Owner: Test codegen

 @param intMax10 property to test schema validation
*/
+ (AMPBaseEvent*) intMax10:(NSInteger)intMax10 NS_SWIFT_NAME(build(intMax10:));

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

@end

@interface Ampli: NSObject
@property (nonatomic, strong, readonly) Amplitude* _Nullable client;
@property (nonatomic, assign, readonly) BOOL isLoaded;
@property (nonatomic, assign, readwrite) BOOL disabled;
+ (instancetype)instance;
- (instancetype)init;
- (void)load;
- (void)load:(LoadOptions* _Nullable)options;
- (void)track:(AMPBaseEvent*)event;
- (void)track:(AMPBaseEvent*)event options:(AMPEventOptions* _Nullable)options;
- (void)identify:(NSString* _Nullable)userId identify:(AMPIdentify*)identify;
- (void)identify:(NSString* _Nullable)userId identify:(AMPIdentify*)identify options:(AMPEventOptions* _Nullable)options;
- (void)flush;
@end

NS_ASSUME_NONNULL_END