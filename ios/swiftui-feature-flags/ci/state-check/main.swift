var checks = 0
func check(_ condition: @autoclosure () -> Bool, _ label: String) {
    precondition(condition(), label)
    checks += 1
}
var state = FlagState()
check(state.layout == .compact, "Initial fallback")
check(!state.canExpose(displayedRevision: 0), "Fallback isn't exposure")
for value in ["control", "expanded"] {
    state.request()
    let token = state.begin()!
    check(!state.canExpose(displayedRevision: token), "Loading isn't exposure")
    check(state.complete(token, value: value, succeeded: true), "Accept current response")
    check(state.layout.rawValue == value, "Render selected variant")
    check(state.canExpose(displayedRevision: token), "Current displayed assignment")
}
for value in ["", "unrecognized"] {
    state.request()
    let token = state.begin()!
    _ = state.complete(token, value: value, succeeded: true)
    check(state.layout == .compact && !state.assigned, "Unknown variant fallback")
}
state.request()
let missing = state.begin()!
_ = state.complete(missing, value: nil, succeeded: true)
check(!state.assigned, "Absent flag")
state.request()
let failed = state.begin()!
_ = state.complete(failed, value: "expanded", succeeded: false)
check(!state.assigned, "Failed response cannot expose cached assignment")
state.request()
let old = state.begin()!
state.request() // e.g. confirmed logout
state.request() // e.g. another refresh before the old request finishes
check(state.begin() == nil, "Serialize requests")
check(!state.complete(old, value: "expanded", succeeded: true), "Clear stale SDK result")
check(!state.canExpose(displayedRevision: old), "Reject old view appearance")
let current = state.begin()!
check(current == state.revision, "Fetch latest identity revision")
check(state.complete(current, value: "control", succeeded: true), "Accept fresh response")
check(state.canExpose(displayedRevision: current), "Expose fresh displayed assignment")
check(!state.canExpose(displayedRevision: old), "Old view stays invalid")
check(state.begin() == nil, "Queue drained")
print("PASS: \(checks) application-state assertions; no SDK or service claims")
