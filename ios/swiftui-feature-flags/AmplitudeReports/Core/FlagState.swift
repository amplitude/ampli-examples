enum ReportLayout: String {
    case compact = "control"
    case expanded
    var displayName: String { self == .compact ? "compact" : "expanded" }
}

// Application policy: serialize fetches and reject results from an older identity.
struct FlagState {
    private(set) var revision = 0
    private(set) var layout: ReportLayout = .compact
    private(set) var assigned = false
    private(set) var pending = false
    private(set) var activeRequest: Int?
    var loading: Bool { pending || activeRequest != nil }

    mutating func request() {
        revision += 1
        layout = .compact
        assigned = false
        pending = true
    }

    mutating func begin() -> Int? {
        guard pending, activeRequest == nil else { return nil }
        pending = false
        activeRequest = revision
        return revision
    }

    // False tells the adapter to clear an old response from the SDK cache.
    mutating func complete(_ token: Int, value: String?, succeeded: Bool) -> Bool {
        guard activeRequest == token else { return false }
        activeRequest = nil
        guard token == revision else { return false }
        if succeeded, let value, let accepted = ReportLayout(rawValue: value) {
            layout = accepted
            assigned = true
        }
        return true
    }

    func canExpose(displayedRevision: Int) -> Bool {
        assigned && !loading && displayedRevision == revision
    }
}
