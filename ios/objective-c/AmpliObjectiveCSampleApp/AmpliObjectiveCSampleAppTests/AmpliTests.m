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
    [_ampli load:[LoadOptions builderBlock:^(LoadOptionsBuilder *b) {
        b.apiKey = @"test-api-key";
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
    NSMutableDictionary *extraDict = [NSMutableDictionary new];
    [extraDict setObject:@"extra test" forKey:@"test"];

    NSArray *requiredArray = [NSArray arrayWithObjects:@"array element 1", @"array element 2", nil];

    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Event With All Properties");
        NSMutableDictionary *eventProperties = payload.event[@"event_properties"];
        XCTAssertEqualObjects(eventProperties[@"requiredArray"], requiredArray);
        XCTAssertEqualObjects(eventProperties[@"requiredBoolean"], @true);
        XCTAssertEqualObjects(eventProperties[@"requiredEnum"], @"Enum1");
        XCTAssertEqualObjects(eventProperties[@"requiredInteger"], @10);
        XCTAssertEqualObjects(eventProperties[@"requiredNumber"], @2.0F);
        XCTAssertEqualObjects(eventProperties[@"requiredString"], @"required string");
        XCTAssertNil(eventProperties[@"optionalString"]);
        XCTAssertEqualObjects(payload.extra[@"test"], @"extra test");
    }];

    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli track:[EventWithAllProperties requiredArray:requiredArray
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum1
                                         requiredInteger:10
                                         requiredNumber:2.0F
                                         requiredString:@"required string"
    ] extra:extraDict];
}

- (void)testIdentify {
    NSString *userId = @"test-user-id";
    NSString *deviceId = @"test-device-id";
    EventOptions *eventOptions = [EventOptions builderBlock:^(EventOptionsBuilder *builder) {
        builder.deviceId = deviceId;
        builder.userId = userId;
    }];
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Identify");
        XCTAssertEqualObjects(payload.event[@"user_id"], userId);
        XCTAssertEqualObjects(payload.event[@"device_id"], deviceId);
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:userId
           event:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
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
