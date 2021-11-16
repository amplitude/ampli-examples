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
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
