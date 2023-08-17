import Foundation
import AmplitudeSwift

class LoggingPlugin: BeforePlugin {
    let jsonEncoder: JSONEncoder

    override init() {
        self.jsonEncoder = JSONEncoder()
        self.jsonEncoder.outputFormatting = [.prettyPrinted]
    }

    public override func execute(event: BaseEvent) -> BaseEvent? {
        let jsonData = try? jsonEncoder.encode(event)
        let json = jsonData != nil ? String(data: jsonData!, encoding: String.Encoding.utf8) : ""
        print(String(format:"[ampli] event=\(json ?? "")"))
        return event
    }
}
