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
@property (nonatomic, weak) XCTestExpectation* middlwareRun;
@end

@implementation AmpliTests

- (void)setUp {
    _ampli = [Ampli new];
}

- (void) initAmpliWithNewInstance:(NSString *) instanceName {
    Amplitude *client = [Amplitude instanceWithName:instanceName];
    [client initializeApiKey:@"test-api-key"];

    [_ampli load:[LoadOptions builderBlock:^(LoadOptionsBuilder *b) {
        b.instance = client;
    }]];

    _middlwareRun = [self expectationWithDescription:@"Wait for middleware run"];
}

- (void)testTrackWithNoProperies {
    [self initAmpliWithNewInstance:@"testTrackWithNoProperties"];

    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Event No Properties");
        [self->_middlwareRun fulfill];
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli eventNoProperties];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:1.0 handler:^(NSError *error) {
        if (error) {
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testTrackEventWithAllTypes {
    [self initAmpliWithNewInstance:@"testTrackEventWithAllTypes"];

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
        // FIXME: Uncomment after optional prop fix in DXOC-661
//        XCTAssertNil(eventProperties[@"optionalString"]);
        XCTAssertEqualObjects(payload.extra[@"test"], @"extra test");
        [self->_middlwareRun fulfill];
    }];

    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli track:[EventWithAllProperties requiredArray:requiredArray
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum1
                                         requiredInteger:10
                                         requiredNumber:2.0F
                                         requiredString:@"required string"
    ] extra:extraDict];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testIdentify {
    [self initAmpliWithNewInstance:@"testIdentify"];

    NSString *userId = @"test-user-id";
    NSString *deviceId = @"test-device-id";
    EventOptions *eventOptions = [EventOptions builderBlock:^(EventOptionsBuilder *builder) {
        builder.deviceId = deviceId;
        builder.userId = userId;
    }];
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"$identify");
        XCTAssertEqualObjects(payload.event[@"user_id"], userId);
        XCTAssertEqualObjects(payload.event[@"device_id"], deviceId);
        [self->_middlwareRun fulfill];
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:userId
           event:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];
    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testIdentifyUserIdOnEvent {
    [self initAmpliWithNewInstance:@"testIdentifyUserIdOnEvent"];

    NSString *eventOptionsUserId = @"test-user-id-options";
    NSString *userId = @"test-user-id";
    NSString *deviceId = @"test-device-id";
    EventOptions *eventOptions = [EventOptions builderBlock:^(EventOptionsBuilder *builder) {
        builder.deviceId = deviceId;
        builder.userId = eventOptionsUserId;
    }];

    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"$identify");
        XCTAssertEqualObjects(payload.event[@"user_id"], eventOptionsUserId);
        XCTAssertEqualObjects(payload.event[@"device_id"], deviceId);
        XCTAssertEqualObjects(self->_ampli.client.userId, eventOptionsUserId);
        [self->_middlwareRun fulfill];
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:nil
           event:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testSetGroup {
    [self initAmpliWithNewInstance:@"testSetGroup"];

    NSString *groupType = @"test group type";
    NSString *groupName = @"test group name";

    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"$identify");
        XCTAssertEqualObjects(payload.event[@"event_properties"], @{});
        NSMutableDictionary *userPropertiesSet = payload.event[@"user_properties"][@"$set"];
        XCTAssertEqualObjects(userPropertiesSet[groupType], groupName);
        [self->_middlwareRun fulfill];
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli.client setGroup:groupType groupName:groupName];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testGroupIdentify {
    [self initAmpliWithNewInstance:@"testGroupIdentify"];

    NSString *userId = @"test-user-id";
    NSString *deviceId = @"test-device-id";
    NSString *groupType = @"test-group-type";
    NSString *groupName = @"test-group";
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"$groupidentify");
        XCTAssertEqualObjects(payload.event[@"event_properties"], @{});
        XCTAssertEqualObjects(payload.event[@"user_properties"], @{});
        NSMutableDictionary *groups = payload.event[@"groups"];
        XCTAssertEqual(groups[groupType], groupName);
        NSMutableDictionary *groupPropertiesSet = payload.event[@"group_properties"][@"$set"];
        XCTAssertEqual(groupPropertiesSet[@"requiredBoolean"], @false);
        XCTAssertEqual(groupPropertiesSet[@"optionalString"], @"optional string");
        [self->_middlwareRun fulfill];
    }];
    [_ampli.client addEventMiddleware:testMiddleware];

    AMPIdentify *identifyArgs = [AMPIdentify identify];
    [identifyArgs set:@"requiredBoolean" value:@false];
    [identifyArgs set:@"optionalString" value:@"optional string"];
    [_ampli.client groupIdentifyWithGroupType:groupType groupName:groupName groupIdentify:identifyArgs];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

@end
