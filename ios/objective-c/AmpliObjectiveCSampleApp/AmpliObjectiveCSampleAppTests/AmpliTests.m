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
@property (nonatomic) bool hasMiddlewareRun;
@end

@implementation AmpliTests

- (void)setUp {
    _ampli = [Ampli instance];
    [_ampli load:[LoadOptions builderBlock:^(LoadOptionsBuilder *b) {
        b.apiKey = @"test-api-key";
    }]];
    _ampli.client.eventUploadThreshold = 1;
    _hasMiddlewareRun = NO;
    [_ampli flush];
}

- (void) waitForMiddlewareToRun {
    while(self->_hasMiddlewareRun == NO) {
       // wait
//        [NSThread sleepForTimeInterval:]
    }
    XCTAssertTrue(self->_hasMiddlewareRun);
    
    //    [sleep 10]
    //    XCTestExpectation *middlwareRun = [self expectationWithDescription:@"middleware ran"];
    //        [middlwareRun fulfill];
    //    [XCTWaiter waitForExpectations:@[middlwareRun] timeout:0.5];
}

- (void)testTrackWithNoProperies {
    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"Event No Properties");
        self->_hasMiddlewareRun = YES;
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli eventNoProperties];
    [_ampli flush];
    
    [self waitForMiddlewareToRun];
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
        self->_hasMiddlewareRun = YES;
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
    
    [self waitForMiddlewareToRun];
}

- (void)testIdentify {
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
        self->_hasMiddlewareRun = YES;
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:userId
           event:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];
    [self waitForMiddlewareToRun];
}

- (void)testIdentifyUserIdOnEvent {
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
        self->_hasMiddlewareRun = YES;
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli identify:nil
           event:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];
    [self waitForMiddlewareToRun];
}

- (void)testSetGroup {
    NSString *groupType = @"test group type";
    NSString *groupName = @"test group name";

    AMPBlockMiddleware *testMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload * _Nonnull payload, AMPMiddlewareNext _Nonnull next) {
        XCTAssertEqualObjects(payload.event[@"event_type"], @"$identify");
        XCTAssertEqualObjects(payload.event[@"event_properties"], @{});
        NSMutableDictionary *userPropertiesSet = payload.event[@"user_properties"][@"$set"];
        XCTAssertEqualObjects(userPropertiesSet[groupType], groupName);
        self->_hasMiddlewareRun = YES;
    }];
    [_ampli.client addEventMiddleware:testMiddleware];
    [_ampli.client setGroup:groupType groupName:groupName];
    [_ampli flush];
    
    [self waitForMiddlewareToRun];
}

- (void)testGroupIdentify {
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
        self->_hasMiddlewareRun = YES;
    }];
    [_ampli.client addEventMiddleware:testMiddleware];

    AMPIdentify *identifyArgs = [AMPIdentify identify];
    [identifyArgs set:@"requiredBoolean" value:@false];
    [identifyArgs set:@"optionalString" value:@"optional string"];
    [_ampli.client groupIdentifyWithGroupType:groupType groupName:groupName groupIdentify:identifyArgs];
    [_ampli flush];
    
    [self waitForMiddlewareToRun];
}

@end
