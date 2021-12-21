//
//  AmpliSwiftSampleAppApp.swift
//  Shared
//
//  Created by Qingzhuo Zhen on 11/12/21.
//

import SwiftUI

@main
struct AmpliSwiftSampleAppApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        //    'Ampli.instance' is the default instance of Ampli()
        //
        //    When you pull your tracking plan you can use the defaults and call load() without arguments
        //    This requires connecting your account via `ampli pull` which will set you API key in the generated Ampli SDK
        //
        //    OR Specify a AmpliEnvironment
        //    ampli.load(options: LoadOptions(environment: AmpliEnvironment.development)
        //
        //    OR Provide a specific Amplitude API key
        //    ampli.load(options: LoadOptions(client: LoadClientOptions(apiKey: "Custom api key"))
        //
        //    OR Use an existing Amplitude instance
        //    requires "import Amplitude"
        //    let instance = Amplitude.instance("instanceName");
        //    instance.initializeApiKey("Custom api key");
        //    ampli.load(options: LoadOptions(client: LoadClientOptions(instance: instance)))
        //
        //    For testing you can disable ampli
        //    ampli.load(options: LoadOptions(disabled: ENV.IS_TESTING ? true: false))
        //
        //    Make as many Ampli instances as you want
        //    let ampli2 = new Ampli();
        //    ampli2.load(options: LoadOptions(client: LoadClientOptions(apiKey: "api-key-2")))
        let apiKey = ProcessInfo.processInfo.environment["AMPLITUDE_API_KEY"];
        let ampli = Ampli.instance
        ampli.load(options: LoadOptions(client: LoadClientOptions(apiKey: apiKey)));
        ampli.identify(userId: "ampli-swift-user", properties: IdentifyProperties(optionalArray: ["optional string"], requiredNumber: 22.0))
        ampli.eventNoProperties()
        let extraDict = ["test" : "extra test"];
        ampli.eventMaxIntForTest(EventMaxIntForTestProperties(intMax10: 20), extra: extraDict);
        ampli.eventWithConstTypes(extra: extraDict)
        ampli.track(EventWithAllProperties(EventWithAllPropertiesProperties(optionalString: nil, requiredArray: ["array element 1", "array element 2"], requiredBoolean: true, requiredEnum: EventWithAllPropertiesRequiredEnum.enum1, requiredInteger: 10, requiredNumber: 2.0, requiredString: "required string")), extra: extraDict)
        return WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
            TextView()
        }
    }
}
