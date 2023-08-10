import Foundation
import AmplitudeSwift

class LoggingPlugin: Plugin {
    let type: PluginType
    var amplitude: Amplitude?
    let jsonEncoder: JSONEncoder

    init() {
        self.type = .before
        self.jsonEncoder = JSONEncoder()
        self.jsonEncoder.outputFormatting = [.prettyPrinted]
    }

    func setup(amplitude: Amplitude) {
        self.amplitude = amplitude
    }

    func execute(event: BaseEvent?) -> BaseEvent? {
        let jsonData = try? jsonEncoder.encode(event)
        let json = jsonData != nil ? String(data: jsonData!, encoding: String.Encoding.utf8) : ""
        print(String(format:"[ampli] event=\(json ?? "")"))
        return event
    }
}
