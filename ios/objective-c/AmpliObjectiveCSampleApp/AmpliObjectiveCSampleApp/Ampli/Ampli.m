/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull obj-c-ampli'
 *
 * Required dependencies: Amplitude ~> 8.10
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: ios:obj-c-ampli
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/obj-c-ampli)
 */

#import <Foundation/Foundation.h>
#import "Ampli.h"
#import "Amplitude.h"
#import "AMPPlan.h"
#import "AMPConstants.h"

@implementation Event: NSObject

- (instancetype)initWithEventType: (NSString *) eventType withEventProperties: (NSDictionary *) eventProperties {
    _eventType = eventType;
    _eventProperties = [self removeNullValues:eventProperties];
    return self;
}

- (NSDictionary *)removeNullValues:(NSDictionary *)dict {
    if (dict == nil) {
        return nil;
    }
    NSMutableDictionary *copy = [dict mutableCopy];
    NSArray *keysForNullValues = [copy allKeysForObject:[NSNull null]];
    [copy removeObjectsForKeys:keysForNullValues];
    return copy;
}

@end

#pragma mark - IdentifyBuilder

@implementation IdentifyBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {
        self.optionalArray = nil;
    }
    return self;
}
@end

#pragma mark - Identify

@implementation Identify: Event

+ (instancetype)requiredNumber:(Float64)requiredNumber {
    return [self requiredNumber: requiredNumber
                builderBlock:^(IdentifyBuilder * b) {}];
}
+ (instancetype)requiredNumber:(Float64)requiredNumber builderBlock:(void (^)(IdentifyBuilder *b))builderBlock {
    IdentifyBuilder *options = [IdentifyBuilder new];
    builderBlock(options);
    return [[self alloc] initWithRequiredNumber_Identify: requiredNumber
                optionalArray: options.optionalArray];
}

- (instancetype)initWithRequiredNumber_Identify:(Float64)requiredNumber
optionalArray:(NSArray<NSString *> * _Nullable)optionalArray {
    self = [super initWithEventType:IDENTIFY_EVENT
                    withEventProperties:@{
                        @"optionalArray": optionalArray ?: NSNull.null,
                        @"requiredNumber": @(requiredNumber)
                    }];
    return self;
}
@end

#pragma mark - EventNoProperties

@implementation EventNoProperties: Event
- (instancetype)init {
    self = [super initWithEventType:@"Event No Properties"
                    withEventProperties:@{}];
    return self;
}
@end

#pragma mark - EventObjectTypes

@implementation EventObjectTypes: Event

+ (instancetype)requiredObject:(NSDictionary<NSString *, NSObject *> *)requiredObject requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray {
    return [[self alloc] initWithRequiredObject_EventObjectTypes: requiredObject
                        requiredObjectArray: requiredObjectArray];
}

- (instancetype)initWithRequiredObject_EventObjectTypes:(NSDictionary<NSString *, NSObject *> *)requiredObject
requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray {
    self = [super initWithEventType:@"Event Object Types"
                    withEventProperties:@{
                        @"requiredObject": requiredObject,
                        @"requiredObjectArray": requiredObjectArray
                    }];
    return self;
}
@end

#pragma mark - EventWithAllPropertiesBuilder

@implementation EventWithAllPropertiesBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {
        self.optionalString = nil;
    }
    return self;
}
@end

#pragma mark - EventWithAllProperties

@implementation EventWithAllProperties: Event

+ (instancetype)requiredArray:(NSArray<NSString *> *)requiredArray requiredBoolean:(Boolean)requiredBoolean requiredEnum:(EventWithAllPropertiesRequiredEnum)requiredEnum requiredInteger:(NSInteger)requiredInteger requiredNumber:(Float64)requiredNumber requiredString:(NSString*)requiredString {
    return [self requiredArray: requiredArray
                requiredBoolean: requiredBoolean
                requiredEnum: requiredEnum
                requiredInteger: requiredInteger
                requiredNumber: requiredNumber
                requiredString: requiredString
                builderBlock:^(EventWithAllPropertiesBuilder * b) {}];
}
+ (instancetype)requiredArray:(NSArray<NSString *> *)requiredArray requiredBoolean:(Boolean)requiredBoolean requiredEnum:(EventWithAllPropertiesRequiredEnum)requiredEnum requiredInteger:(NSInteger)requiredInteger requiredNumber:(Float64)requiredNumber requiredString:(NSString*)requiredString builderBlock:(void (^)(EventWithAllPropertiesBuilder *b))builderBlock {
    EventWithAllPropertiesBuilder *options = [EventWithAllPropertiesBuilder new];
    builderBlock(options);
    return [[self alloc] initWithRequiredArray_EventWithAllProperties: requiredArray
                requiredBoolean: requiredBoolean
                requiredEnum: requiredEnum
                requiredInteger: requiredInteger
                requiredNumber: requiredNumber
                requiredString: requiredString
                optionalString: options.optionalString];
}

- (instancetype)initWithRequiredArray_EventWithAllProperties:(NSArray<NSString *> *)requiredArray
requiredBoolean:(Boolean)requiredBoolean
requiredEnum:(EventWithAllPropertiesRequiredEnum)requiredEnum
requiredInteger:(NSInteger)requiredInteger
requiredNumber:(Float64)requiredNumber
requiredString:(NSString*)requiredString
optionalString:(NSString* _Nullable)optionalString {
    self = [super initWithEventType:@"Event With All Properties"
                    withEventProperties:@{
                        @"optionalString": optionalString ?: NSNull.null,
                        @"requiredArray": requiredArray,
                        @"requiredBoolean": [NSNumber numberWithBool:requiredBoolean],
                        @"requiredConst": @"some-const-value",
                        @"requiredEnum": [EventWithAllProperties stringFromRequiredEnum: requiredEnum],
                        @"requiredInteger": @(requiredInteger),
                        @"requiredNumber": @(requiredNumber),
                        @"requiredString": requiredString
                    }];
    return self;
}

+ (NSString * _Nullable)stringFromRequiredEnum:(EventWithAllPropertiesRequiredEnum)enumValue {
    switch (enumValue) {
        case EventWithAllPropertiesRequiredEnumEnum1:
            return @"Enum1";
        case EventWithAllPropertiesRequiredEnumEnum2:
            return @"Enum2";
    }
}
@end

#pragma mark - EventWithArrayTypes

@implementation EventWithArrayTypes: Event

+ (instancetype)requiredBooleanArray:(NSArray<NSNumber *> *)requiredBooleanArray requiredEnumArray:(NSArray<NSString *> *)requiredEnumArray requiredNumberArray:(NSArray<NSNumber *> *)requiredNumberArray requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray requiredStringArray:(NSArray<NSString *> *)requiredStringArray {
    return [[self alloc] initWithRequiredBooleanArray_EventWithArrayTypes: requiredBooleanArray
                        requiredEnumArray: requiredEnumArray
                        requiredNumberArray: requiredNumberArray
                        requiredObjectArray: requiredObjectArray
                        requiredStringArray: requiredStringArray];
}

- (instancetype)initWithRequiredBooleanArray_EventWithArrayTypes:(NSArray<NSNumber *> *)requiredBooleanArray
requiredEnumArray:(NSArray<NSString *> *)requiredEnumArray
requiredNumberArray:(NSArray<NSNumber *> *)requiredNumberArray
requiredObjectArray:(NSArray<NSDictionary<NSString *, NSObject *> *> *)requiredObjectArray
requiredStringArray:(NSArray<NSString *> *)requiredStringArray {
    self = [super initWithEventType:@"Event With Array Types"
                    withEventProperties:@{
                        @"requiredBooleanArray": requiredBooleanArray,
                        @"requiredEnumArray": requiredEnumArray,
                        @"requiredNumberArray": requiredNumberArray,
                        @"requiredObjectArray": requiredObjectArray,
                        @"requiredStringArray": requiredStringArray
                    }];
    return self;
}
@end

#pragma mark - EventWithConstTypes

@implementation EventWithConstTypes: Event
- (instancetype)init {
    self = [super initWithEventType:@"Event With Const Types"
                    withEventProperties:@{
                        @"Boolean Const": @YES,
                        @"Integer Const": @10,
                        @"Number Const": @2.2,
                        @"String Const": @"String-Constant",
                        @"String Const WIth Quotes": @"\"String \"Const With\" Quotes\"",
                        @"String Int Const": @0
                    }];
    return self;
}
@end

#pragma mark - EventWithEnumTypesBuilder

@implementation EventWithEnumTypesBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {
        self.optionalEnum = EventWithEnumTypesOptionalEnumUndefined;
    }
    return self;
}
@end

#pragma mark - EventWithEnumTypes

@implementation EventWithEnumTypes: Event

+ (instancetype)requiredEnum:(EventWithEnumTypesRequiredEnum)requiredEnum {
    return [self requiredEnum: requiredEnum
                builderBlock:^(EventWithEnumTypesBuilder * b) {}];
}
+ (instancetype)requiredEnum:(EventWithEnumTypesRequiredEnum)requiredEnum builderBlock:(void (^)(EventWithEnumTypesBuilder *b))builderBlock {
    EventWithEnumTypesBuilder *options = [EventWithEnumTypesBuilder new];
    builderBlock(options);
    return [[self alloc] initWithRequiredEnum_EventWithEnumTypes: requiredEnum
                optionalEnum: options.optionalEnum];
}

- (instancetype)initWithRequiredEnum_EventWithEnumTypes:(EventWithEnumTypesRequiredEnum)requiredEnum
optionalEnum:(EventWithEnumTypesOptionalEnum)optionalEnum {
    self = [super initWithEventType:@"Event With Enum Types"
                    withEventProperties:@{
                        @"optional enum": [EventWithEnumTypes stringFromOptionalEnum: optionalEnum] ?: NSNull.null,
                        @"required enum": [EventWithEnumTypes stringFromRequiredEnum: requiredEnum]
                    }];
    return self;
}

+ (NSString * _Nullable)stringFromOptionalEnum:(EventWithEnumTypesOptionalEnum)enumValue {
    switch (enumValue) {
        case EventWithEnumTypesOptionalEnumOptionalEnum1:
            return @"optional enum 1";
        case EventWithEnumTypesOptionalEnumOptionalEnum2:
            return @"optional enum 2";
        case EventWithEnumTypesOptionalEnumUndefined:
            return nil;
    }
}

+ (NSString * _Nullable)stringFromRequiredEnum:(EventWithEnumTypesRequiredEnum)enumValue {
    switch (enumValue) {
        case EventWithEnumTypesRequiredEnumRequiredEnum1:
            return @"required enum 1";
        case EventWithEnumTypesRequiredEnumRequiredEnum2:
            return @"required enum 2";
    }
}
@end

#pragma mark - EventWithOptionalArrayTypesBuilder

@implementation EventWithOptionalArrayTypesBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {
        self.optionalBooleanArray = nil;
        self.optionalEnumArray = nil;
        self.optionalJsonArray = nil;
        self.optionalNumberArray = nil;
        self.optionalStringArray = nil;
    }
    return self;
}
@end

#pragma mark - EventWithOptionalArrayTypes

@implementation EventWithOptionalArrayTypes: Event

+ (instancetype) builderBlock:(void (^)(EventWithOptionalArrayTypesBuilder *b))builderBlock {
    EventWithOptionalArrayTypesBuilder *options = [EventWithOptionalArrayTypesBuilder new];
    builderBlock(options);
    return [[self alloc] initWithOptionalBooleanArray_EventWithOptionalArrayTypes: options.optionalBooleanArray
                optionalEnumArray: options.optionalEnumArray
                optionalJsonArray: options.optionalJsonArray
                optionalNumberArray: options.optionalNumberArray
                optionalStringArray: options.optionalStringArray];
}

- (instancetype)initWithOptionalBooleanArray_EventWithOptionalArrayTypes:(NSArray<NSNumber *> * _Nullable)optionalBooleanArray
optionalEnumArray:(NSArray<NSString *> * _Nullable)optionalEnumArray
optionalJsonArray:(NSArray<NSDictionary<NSString *, NSObject *> *> * _Nullable)optionalJsonArray
optionalNumberArray:(NSArray<NSNumber *> * _Nullable)optionalNumberArray
optionalStringArray:(NSArray<NSString *> * _Nullable)optionalStringArray {
    self = [super initWithEventType:@"Event With Optional Array Types"
                    withEventProperties:@{
                        @"optionalBooleanArray": optionalBooleanArray ?: NSNull.null,
                        @"optionalEnumArray": optionalEnumArray ?: NSNull.null,
                        @"optionalJSONArray": optionalJsonArray ?: NSNull.null,
                        @"optionalNumberArray": optionalNumberArray ?: NSNull.null,
                        @"optionalStringArray": optionalStringArray ?: NSNull.null
                    }];
    return self;
}

- (instancetype)init {
    return [self initWithOptionalBooleanArray_EventWithOptionalArrayTypes:nil
                optionalEnumArray:nil
                optionalJsonArray:nil
                optionalNumberArray:nil
                optionalStringArray:nil];
}
@end

#pragma mark - EventWithOptionalPropertiesBuilder

@implementation EventWithOptionalPropertiesBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {
        self.optionalArrayNumber = nil;
        self.optionalArrayString = nil;
        self.optionalString = nil;
    }
    return self;
}
@end

#pragma mark - EventWithOptionalProperties

@implementation EventWithOptionalProperties: Event

+ (instancetype) builderBlock:(void (^)(EventWithOptionalPropertiesBuilder *b))builderBlock {
    EventWithOptionalPropertiesBuilder *options = [EventWithOptionalPropertiesBuilder new];
    builderBlock(options);
    return [[self alloc] initWithOptionalArrayNumber_EventWithOptionalProperties: options.optionalArrayNumber
                optionalArrayString: options.optionalArrayString
                optionalBoolean: options.optionalBoolean
                optionalNumber: options.optionalNumber
                optionalString: options.optionalString];
}

- (instancetype)initWithOptionalArrayNumber_EventWithOptionalProperties:(NSArray<NSNumber *> * _Nullable)optionalArrayNumber
optionalArrayString:(NSArray<NSString *> * _Nullable)optionalArrayString
optionalBoolean:(NSNumber * _Nullable)optionalBoolean
optionalNumber:(NSNumber * _Nullable)optionalNumber
optionalString:(NSString* _Nullable)optionalString {
    self = [super initWithEventType:@"Event With Optional Properties"
                    withEventProperties:@{
                        @"optionalArrayNumber": optionalArrayNumber ?: NSNull.null,
                        @"optionalArrayString": optionalArrayString ?: NSNull.null,
                        @"optionalBoolean": optionalBoolean ?: NSNull.null,
                        @"optionalNumber": optionalNumber ?: NSNull.null,
                        @"optionalString": optionalString ?: NSNull.null
                    }];
    return self;
}

- (instancetype)init {
    return [self initWithOptionalArrayNumber_EventWithOptionalProperties:nil
                optionalArrayString:nil
                optionalBoolean:nil
                optionalNumber:nil
                optionalString:nil];
}
@end

#pragma mark - EventWithTemplatePropertiesBuilder

@implementation EventWithTemplatePropertiesBuilder: NSObject
-(instancetype)init {
    if (self = [super init]) {

    }
    return self;
}
@end

#pragma mark - EventWithTemplateProperties

@implementation EventWithTemplateProperties: Event

+ (instancetype)requiredEventProperty:(NSString*)requiredEventProperty requiredTemplateProperty:(NSString*)requiredTemplateProperty {
    return [self requiredEventProperty: requiredEventProperty
                requiredTemplateProperty: requiredTemplateProperty
                builderBlock:^(EventWithTemplatePropertiesBuilder * b) {}];
}
+ (instancetype)requiredEventProperty:(NSString*)requiredEventProperty requiredTemplateProperty:(NSString*)requiredTemplateProperty builderBlock:(void (^)(EventWithTemplatePropertiesBuilder *b))builderBlock {
    EventWithTemplatePropertiesBuilder *options = [EventWithTemplatePropertiesBuilder new];
    builderBlock(options);
    return [[self alloc] initWithRequiredEventProperty_EventWithTemplateProperties: requiredEventProperty
                requiredTemplateProperty: requiredTemplateProperty
                optionalEventProperty: options.optionalEventProperty
                optionalTemplateProperty: options.optionalTemplateProperty];
}

- (instancetype)initWithRequiredEventProperty_EventWithTemplateProperties:(NSString*)requiredEventProperty
requiredTemplateProperty:(NSString*)requiredTemplateProperty
optionalEventProperty:(NSNumber * _Nullable)optionalEventProperty
optionalTemplateProperty:(NSNumber * _Nullable)optionalTemplateProperty {
    self = [super initWithEventType:@"Event With Template Properties"
                    withEventProperties:@{
                        @"optional_event_property": optionalEventProperty ?: NSNull.null,
                        @"optional_template_property": optionalTemplateProperty ?: NSNull.null,
                        @"required_event_property": requiredEventProperty,
                        @"required_template_property": requiredTemplateProperty
                    }];
    return self;
}
@end

#pragma mark - EventWithDifferentCasingTypes

@implementation EventWithDifferentCasingTypes: Event

+ (instancetype)enumWithSpace:(EventWithDifferentCasingTypesEnumWithSpace)enumWithSpace enumSnakeCase:(EventWithDifferentCasingTypesEnumSnakeCase)enumSnakeCase enumCamelCase:(EventWithDifferentCasingTypesEnumCamelCase)enumCamelCase enumPascalCase:(EventWithDifferentCasingTypesEnumPascalCase)enumPascalCase propertyWithSpace:(NSString*)propertyWithSpace propertyWithSnakeCase:(NSString*)propertyWithSnakeCase propertyWithCamelCase:(NSString*)propertyWithCamelCase propertyWithPascalCase:(NSString*)propertyWithPascalCase {
    return [[self alloc] initWithEnumWithSpace_EventWithDifferentCasingTypes: enumWithSpace
                        enumSnakeCase: enumSnakeCase
                        enumCamelCase: enumCamelCase
                        enumPascalCase: enumPascalCase
                        propertyWithSpace: propertyWithSpace
                        propertyWithSnakeCase: propertyWithSnakeCase
                        propertyWithCamelCase: propertyWithCamelCase
                        propertyWithPascalCase: propertyWithPascalCase];
}

- (instancetype)initWithEnumWithSpace_EventWithDifferentCasingTypes:(EventWithDifferentCasingTypesEnumWithSpace)enumWithSpace
enumSnakeCase:(EventWithDifferentCasingTypesEnumSnakeCase)enumSnakeCase
enumCamelCase:(EventWithDifferentCasingTypesEnumCamelCase)enumCamelCase
enumPascalCase:(EventWithDifferentCasingTypesEnumPascalCase)enumPascalCase
propertyWithSpace:(NSString*)propertyWithSpace
propertyWithSnakeCase:(NSString*)propertyWithSnakeCase
propertyWithCamelCase:(NSString*)propertyWithCamelCase
propertyWithPascalCase:(NSString*)propertyWithPascalCase {
    self = [super initWithEventType:@"event withDifferent_CasingTypes"
                    withEventProperties:@{
                        @"enum with space": [EventWithDifferentCasingTypes stringFromEnumWithSpace: enumWithSpace],
                        @"enum_snake_case": [EventWithDifferentCasingTypes stringFromEnumSnakeCase: enumSnakeCase],
                        @"enumCamelCase": [EventWithDifferentCasingTypes stringFromEnumCamelCase: enumCamelCase],
                        @"EnumPascalCase": [EventWithDifferentCasingTypes stringFromEnumPascalCase: enumPascalCase],
                        @"property with space": propertyWithSpace,
                        @"property_with_snake_case": propertyWithSnakeCase,
                        @"propertyWithCamelCase": propertyWithCamelCase,
                        @"PropertyWithPascalCase": propertyWithPascalCase
                    }];
    return self;
}

+ (NSString * _Nullable)stringFromEnumWithSpace:(EventWithDifferentCasingTypesEnumWithSpace)enumValue {
    switch (enumValue) {
        case EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace:
            return @"enum with space";
    }
}

+ (NSString * _Nullable)stringFromEnumSnakeCase:(EventWithDifferentCasingTypesEnumSnakeCase)enumValue {
    switch (enumValue) {
        case EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase:
            return @"enum_snake_case";
    }
}

+ (NSString * _Nullable)stringFromEnumCamelCase:(EventWithDifferentCasingTypesEnumCamelCase)enumValue {
    switch (enumValue) {
        case EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase:
            return @"enumCamelCase";
    }
}

+ (NSString * _Nullable)stringFromEnumPascalCase:(EventWithDifferentCasingTypesEnumPascalCase)enumValue {
    switch (enumValue) {
        case EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase:
            return @"EnumPascalCase";
    }
}
@end

#pragma mark - EventMaxIntForTest

@implementation EventMaxIntForTest: Event

+ (instancetype)intMax10:(NSInteger)intMax10 {
    return [[self alloc] initWithIntMax10_EventMaxIntForTest: intMax10];
}

- (instancetype)initWithIntMax10_EventMaxIntForTest:(NSInteger)intMax10 {
    self = [super initWithEventType:@"EventMaxIntForTest"
                    withEventProperties:@{
                        @"intMax10": @(intMax10)
                    }];
    return self;
}
@end

@implementation LoadClientOptions

- (instancetype)initLoadClientOptions:(NSString *_Nullable)apiKey instance:(Amplitude *_Nullable)instance {
    _apiKey = apiKey;
    _instance = instance;
    return self;
}

@end

@implementation LoadOptions

- (instancetype) initLoadOptions:(AmpliEnvironment)environment disabled:(BOOL) disabled client:(LoadClientOptions *_Nullable)client{
    _environment = environment;
    _disabled = disabled;
    _client = client;
    return self;
}

+ (instancetype) builderBlock:(void (^)(LoadOptionsBuilder*))buildBlock {
    LoadOptionsBuilder *builder = [[LoadOptionsBuilder alloc] initWithOptions:nil];
    buildBlock(builder);
    return [builder build];
}

- (instancetype) withOverrides:(void (^)(LoadOptionsBuilder*))buildBlock {
    LoadOptionsBuilder *builder = [[LoadOptionsBuilder alloc] initWithOptions:self];
    buildBlock(builder);
    return [builder build];
}

@end

@implementation LoadOptionsBuilder

- (instancetype)initWithOptions:(LoadOptions *)options {
    _environment = options.environment;
    _disabled = options.environment;
    _instance = options.client != nil ? options.client.instance : nil;
    _apiKey = options.client != nil ? options.client.apiKey : nil;
    return self;
}

- (LoadOptions *)build {
    LoadClientOptions *client = [[LoadClientOptions alloc] initLoadClientOptions:_apiKey instance:_instance];
    return [[LoadOptions alloc] initLoadOptions:_environment disabled:_disabled client:client];
}

@end

@implementation EventOptions
- (instancetype)initWithUserId:(NSString *_Nullable)userId deviceId:(NSString *_Nullable)deviceId {
    _deviceId = deviceId;
    _userId = userId;
    return self;
}

+ (instancetype) builderBlock:(void (^)(EventOptionsBuilder*))buildBlock {
    EventOptionsBuilder *builder = [[EventOptionsBuilder alloc] initWithOptions:nil];
    buildBlock(builder);
    return [builder build];
}

- (instancetype) withOverrides:(void (^)(EventOptionsBuilder*))buildBlock {
    EventOptionsBuilder *builder = [[EventOptionsBuilder alloc] initWithOptions:self];
    buildBlock(builder);
    return [builder build];
}

@end

@implementation EventOptionsBuilder

- (instancetype)initWithOptions:(EventOptions *)options {
    _userId = options != nil ? options.userId : nil;
    _deviceId = options != nil ? options.deviceId : nil;
    return self;
}

- (EventOptions *)build {
    return [[EventOptions alloc] initWithUserId:_userId deviceId:_deviceId];
}

@end

@implementation Ampli

+ (instancetype)instance {
    static Ampli *ampli = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        ampli = [[self alloc] init];
    });
    return ampli;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _disabled = NO;
    }
    return self;
}

- (void)load {
    [self load:nil];
}

/**
 * options should have 'environment', 'client.api_key' or 'client.instance'
 */
- (void)load:(LoadOptions *)options {
    NSDictionary *ApiKey = @{
        @(prod): @"",
        @(dev): @""
    };
    self.disabled = options.disabled;
    if (self.isLoaded) {
        NSLog(@"Warning: Ampli is already initialized. Ampli.instance.load() should be called once at application start up.");
        return;
    }

    AmpliEnvironment env = options.environment;
    NSString *apiKey = options.client != nil && options.client.apiKey != nil ? options.client.apiKey : ApiKey[@(env)];

    if (options.client != nil && options.client.instance != nil) {
        _client = options.client.instance;
    } else if (apiKey != nil) {
        _client = [Amplitude instance];
        [_client initializeApiKey:apiKey];
    } else {
        NSLog(@"ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
        return;
    }
    if (_client != nil) {
        _isLoaded = YES;
        AMPPlan *AmpliObservePlan = [[[[[AMPPlan plan] setBranch:@"main"] setSource:@"obj-c-ampli"] setVersion:@"1"] setVersionId:@"a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c"];
        [_client setPlan:AmpliObservePlan];

        // set ingestionMetadata information
        AMPBlockMiddleware *AmpliExtrasMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload *payload, AMPMiddlewareNext _Nonnull next) {
            NSMutableDictionary *ingestionMetadata = [[NSMutableDictionary alloc] init];
            ingestionMetadata[@"source_name"] = @"ios-obj-c-ampli";
            ingestionMetadata[@"source_version"] = @"1.0.0";
            payload.event[@"ingestion_metadata"] = ingestionMetadata;
            // Continue to next middleware
            next(payload);
        }];
        [_client addEventMiddleware:AmpliExtrasMiddleware];
    }
}

- (void)track:(Event *)event {
    [self track:event extra:nil];
}

- (void)track:(Event *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event options:nil extra:extra];
}

- (void)track:(Event *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    if (![self isInitializedAndEnabled]) {
        return;
    }
    [self.client logEvent:event.eventType withEventProperties:event.eventProperties withMiddlewareExtra:extra];
}

- (void)identify:(NSString *_Nullable)userId event:(Identify *)event {
    [self identify:userId event:event options:nil extra:nil];
}

- (void)identify:(NSString *_Nullable)userId event:(Identify *)event options:(EventOptions *_Nullable)options {
    [self identify:userId event:event options:options extra:nil];
}

- (void)identify:(NSString *_Nullable)userId event:(Identify *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self identify:userId event:event options:nil extra:extra];
}

- (void)identify:(NSString *_Nullable)userId event:(Identify *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    if (![self isInitializedAndEnabled]) {
        return;
    }

    if (options != nil && options.userId != nil) {
        [self.client setUserId:options.userId];
    } else if (userId != nil) {
        [self.client setUserId:userId];
    }
    if (options != nil && options.deviceId != nil) {
        [self.client setDeviceId:options.deviceId];
    }
    AMPIdentify *identifyArgs = [AMPIdentify identify];
    if (event.eventProperties != nil) {
        [event.eventProperties enumerateKeysAndObjectsUsingBlock:^(id key, id value, BOOL* stop) {
          [identifyArgs set:key value:value];
        }];
    }
    [self.client identify:identifyArgs];
 }

- (void)flush {
    if (![self isInitializedAndEnabled]) {
        return;
    }
    if (self.client != nil) {
        [self.client uploadEvents];
    }
}
- (void)eventNoProperties:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:[EventNoProperties new] options:options extra: extra];
}

- (void)eventNoProperties:(MiddlewareExtra *_Nullable)extra {
    [self track:[EventNoProperties new] extra: extra];
}

- (void)eventNoProperties {
    [self track:[EventNoProperties new] extra: nil];
}

- (void)eventObjectTypes:(EventObjectTypes *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventObjectTypes:(EventObjectTypes *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventObjectTypes:(EventObjectTypes *)event {
    [self track:event extra: nil];
}

- (void)eventWithAllProperties:(EventWithAllProperties *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithAllProperties:(EventWithAllProperties *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithAllProperties:(EventWithAllProperties *)event {
    [self track:event extra: nil];
}

- (void)eventWithArrayTypes:(EventWithArrayTypes *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithArrayTypes:(EventWithArrayTypes *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithArrayTypes:(EventWithArrayTypes *)event {
    [self track:event extra: nil];
}

- (void)eventWithConstTypes:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:[EventWithConstTypes new] options:options extra: extra];
}

- (void)eventWithConstTypes:(MiddlewareExtra *_Nullable)extra {
    [self track:[EventWithConstTypes new] extra: extra];
}

- (void)eventWithConstTypes {
    [self track:[EventWithConstTypes new] extra: nil];
}

- (void)eventWithEnumTypes:(EventWithEnumTypes *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithEnumTypes:(EventWithEnumTypes *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithEnumTypes:(EventWithEnumTypes *)event {
    [self track:event extra: nil];
}

- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypes *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypes *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypes *)event {
    [self track:event extra: nil];
}

- (void)eventWithOptionalProperties:(EventWithOptionalProperties *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithOptionalProperties:(EventWithOptionalProperties *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithOptionalProperties:(EventWithOptionalProperties *)event {
    [self track:event extra: nil];
}

- (void)eventWithTemplateProperties:(EventWithTemplateProperties *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithTemplateProperties:(EventWithTemplateProperties *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithTemplateProperties:(EventWithTemplateProperties *)event {
    [self track:event extra: nil];
}

- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypes *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypes *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypes *)event {
    [self track:event extra: nil];
}

- (void)eventMaxIntForTest:(EventMaxIntForTest *)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra {
    [self handleEventOptions:options];
    [self track:event options:options extra: extra];
}

- (void)eventMaxIntForTest:(EventMaxIntForTest *)event extra:(MiddlewareExtra *_Nullable)extra {
    [self track:event extra: extra];
}

- (void)eventMaxIntForTest:(EventMaxIntForTest *)event {
    [self track:event extra: nil];
}

- (BOOL)isInitializedAndEnabled {
    if (!self.isLoaded) {
        NSLog(@"Ampli is not yet initialized. Have you called `ampli.load()` on app start?");
       return NO;
    }
    return !self.disabled;
}

- (void)handleEventOptions:(EventOptions *)options {
    if (options == nil || ![self isInitializedAndEnabled]) {
        return;
    }
    if (options.userId != nil) {
        [self.client setUserId:options.userId];
    }
    if (options.deviceId != nil) {
        [self.client setDeviceId:options.deviceId];
    }
}

@end
