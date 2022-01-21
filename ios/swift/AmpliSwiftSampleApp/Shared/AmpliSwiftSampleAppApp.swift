//
//  AmpliSwiftSampleAppApp.swift
//  Shared
//
//  Created by Qingzhuo Zhen on 11/12/21.
//

import SwiftUI
import Amplitude

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
        //    ampli.load(LoadOptions(environment: AmpliEnvironment.development)
        //
        //    OR Provide a specific Amplitude API key
        //    ampli.load(LoadOptions(client: LoadClientOptions(apiKey: "Custom api key"))
        //
        //    OR Use an existing Amplitude instance
        //    requires "import Amplitude"
        //    let instance = Amplitude.instance("instanceName");
        //    instance.initializeApiKey("Custom api key");
        //    ampli.load(LoadOptions(client: LoadClientOptions(instance: instance)))
        //
        //    For testing you can disable ampli
        //    ampli.load(LoadOptions(disabled: ENV.IS_TESTING ? true: false))
        //
        //    Make as many Ampli instances as you want
        //    let ampli2 = new Ampli();
        //    ampli2.load(LoadOptions(client: LoadClientOptions(apiKey: "api-key-2")))

        let apiKey = ProcessInfo.processInfo.environment["AMPLITUDE_API_KEY"];
        let ampli = Ampli.instance
        let extraDict = ["test" : "extra test"];

        // Load
        ampli.load(LoadOptions(client: LoadClientOptions(apiKey: apiKey)))
        
        // Add Middleware
        ampli.amplitude?.addEventMiddleware(AMPBlockMiddleware { (payload, next) in
            print(String(format:"[ampli] event=\(payload.event) payload=\(payload.extra)"))
        })
        
        // Identify
        ampli.identify("ampli-swift-user", Identify(requiredNumber: 22.0, optionalArray: ["optional string"]))

        // Set group
        ampli.setGroup("ampli group type", "ampli swift group")

        // Track events with dedicated event methods
        ampli.eventNoProperties()
        ampli.eventMaxIntForTest(intMax10: 20)
        ampli.eventWithConstTypes()

        // Track using event instances and ampli.track(event, options, extra)
        let eventWithAllProperties = EventWithAllProperties(
            requiredArray: ["array element 1", "array element 2"],
            requiredBoolean: true,
            requiredEnum: EventWithAllProperties.RequiredEnum.enum1,
            requiredInteger: 10,
            requiredNumber: 2.0,
            requiredString: "required string",
            optionalString: nil
        )
        ampli.track(eventWithAllProperties, extra: extraDict)

        return WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
            TextView()
        }
    }
}
