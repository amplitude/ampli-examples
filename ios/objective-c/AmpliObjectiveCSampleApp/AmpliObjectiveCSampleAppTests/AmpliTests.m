//
//  AmpliTests.m
//  AmpliObjectiveCSampleAppTests
//
//  Created by Qingzhuo Zhen on 12/2/21.
//

#import <XCTest/XCTest.h>
#import "Ampli.h"
#import "AMPMiddleware.h"

@interface AmpliTests : XCTestCase
@property (nonatomic, strong) Ampli *ampli;
@end

@implementation AmpliTests

- (void)setUp {
    _ampli = [Ampli instance];
    [_ampli load:[LoadOptions builderBlock:^(LoadOptionsBuilder *builder) {
        builder.apiKey = @"test-api-key";
    }]];
}

- (void)testTrackWithNoProperies {
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Event No Properties");
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli eventNoProperties];
}

- (void)testTrackEventWithAllTypes {
    NSArray *requiredArray = [NSArray arrayWithObjects:@"array element 1", @"array element 2", nil];
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Event With All Properties");
        NSMutableDictionary *eventProperties = payload.event[@"event_properties"];
        XCTAssertEqualObjects(eventProperties[@"requiredArray"], requiredArray);
        XCTAssertEqualObjects(eventProperties[@"requiredBoolean"], @YES);
        XCTAssertEqualObjects(eventProperties[@"requiredEnum"], @"Enum1");
        XCTAssertEqualObjects(eventProperties[@"requiredInteger"], @10);
        XCTAssertEqualObjects(eventProperties[@"requiredNumber"], @2.0);
        XCTAssertEqualObjects(eventProperties[@"requiredString"], @"required string");
        XCTAssertNil(eventProperties[@"optionalString"]);
        XCTAssertEqualObjects(payload.extra[@"test"], @"extra test");
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    NSMutableDictionary *extraDict = [NSMutableDictionary new];
    [extraDict setObject:@"extra test" forKey:@"test"];
    EventWithAllPropertiesProperties *eventWithAllPropertiesProperties = [EventWithAllPropertiesProperties new];
    eventWithAllPropertiesProperties.requiredArray = requiredArray;
    eventWithAllPropertiesProperties.requiredBoolean = @YES;
    eventWithAllPropertiesProperties.requiredEnum = [RequiredEnum enum1];
    eventWithAllPropertiesProperties.requiredInteger = @10;
    eventWithAllPropertiesProperties.requiredNumber = @2.0;
    eventWithAllPropertiesProperties.requiredString = @"required string";
    EventWithAllProperties *eventWithAllProperties = [EventWithAllProperties initWithEventProperties:eventWithAllPropertiesProperties];
    [_ampli track:eventWithAllProperties extra:extraDict];
}

- (void)testIdentify {
    NSString *userId = @"test-user-id";
    NSString *deviceId = @"test-device-id";
    EventOptions *eventOptions = [EventOptions builderBlock:^(EventOptionsBuilder *builder) {
        builder.deviceId = deviceId;
        builder.userId = userId;
    }];
    IdentifyProperties *identifyProperties = [IdentifyProperties new];
    identifyProperties.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
    identifyProperties.requiredNumber = @22;
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Identify");
        XCTAssertEqualObjects(payload.event[@"user_id"], userId);
        XCTAssertEqualObjects(payload.event[@"device_id"], deviceId);
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:userId properties:identifyProperties options:eventOptions];
}

- (void)testSetGroup {
    NSString *groupType = @"test group type";
    NSString *groupName = @"test group name";
    
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Identify");
        XCTAssertNil(payload.event[@"event_properties"]);
        NSMutableDictionary *userPropertiesSet = payload.event[@"user_properties"][@"$set"];
        XCTAssertEqualObjects(userPropertiesSet[groupType], groupName);
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli setGroup:groupType value:groupName];
}


@end
