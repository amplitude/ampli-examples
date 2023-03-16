//
//  TextView.swift
//  AmpliSwiftSampleApp
//
//  Created by Qingzhuo Zhen on 12/1/21.
//

import SwiftUI

struct TextView: View {
    var body: some View {
        let ampli = Ampli.instance

        ampli.eventWithArrayTypes(
            requiredBooleanArray: [true],
            requiredEnumArray: ["Enum1"],
            requiredNumberArray: [5.0, 6.0],
            requiredObjectArray: [["key1": "value1"], ["key2": "value2"]],
            requiredStringArray: ["string1", "string2"]
        )
        
        return Text("Welcome to Ampli Swift!")
    }
}

struct TextView_Previews: PreviewProvider {
    static var previews: some View {
        TextView()
    }
}
