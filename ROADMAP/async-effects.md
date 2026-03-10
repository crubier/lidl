# Async Effects and Request-Response Matching

## Motivation

LIDL's runtime is a synchronous step function: `trans(data) -> data`. Each step takes `{memo, state, args, inter}` and produces a new `{memo, state, args, inter}`. There is no built-in mechanism for asynchronous I/O — no HTTP requests, no timers, no WebSocket streams.

This design document proposes an async effect system that preserves LIDL's pure synchronous transition model while enabling real-world I/O.

## Core Principle

**LIDL's transition function stays pure and synchronous.** The runtime (outside the transition) handles async I/O, injecting responses back as interface inputs in future steps.

This mirrors how the Canvas runtime already works:
- Mouse events come in at `inter.mouse`
- Graphics go out at `inter.graphics`
- The runtime handles the actual DOM/Canvas I/O between steps

Async effects extend this pattern: requests go out via `inter`, the runtime executes them, and responses come back via `inter` in a future step.

## Static Effects — Interface Path as Correlation Key

For request-response pairs known at compile time, the **interface path itself** is the correlation key. No explicit IDs are needed.

### Single Effect

```
interaction (fetchUserData): {
  request: HttpRequest out,
  response: HttpResponse in
} is ...
```

Runtime behavior:
1. After a step, the runtime inspects `inter.request`. If it is `active`, fire the HTTP request.
2. While the request is pending, `inter.response` remains `inactive` (null).
3. When the response arrives, the runtime sets `inter.response` to the response data and triggers a new step.
4. The interaction can use `if (response) is active` to react.

The correlation is implicit: `request` and `response` are structurally paired by being in the same interface composite. The runtime knows that a request emitted at path `X.request` expects a response at path `X.response`.

### Multiple Independent Effects

```
interaction (dashboard): {
  fetchUser:  { request: HttpRequest out, response: HttpResponse in },
  fetchPosts: { request: HttpRequest out, response: HttpResponse in }
} is ...
```

Out-of-order responses are not a problem: `fetchUser.response` and `fetchPosts.response` are independent paths. If `fetchPosts` resolves before `fetchUser`, the runtime injects `fetchPosts.response` first and triggers a step. `fetchUser.response` remains `inactive` until its response arrives.

### Effect Type Convention

A standard `Effect` data type could formalize this pattern:

```
data Effect is { request: HttpRequest, response: HttpResponse }

interaction (fetchUserData): Effect is ...
```

Or generically (once LIDL supports type parameters):

```
data Effect(Request, Response) is {
  request: Request out,
  response: Response in
}
```

## Dynamic Effects — Explicit Correlation IDs

For an unknown or dynamic number of concurrent requests (e.g., fetching pages of results, parallel API calls based on runtime data), static interface paths are insufficient.

### Design

Use an explicit correlation ID in the interface:

```
{
  request:  { id: Text, payload: HttpRequest } out,
  response: { id: Text, payload: HttpResponse } in
}
```

- The interaction generates a unique `id` per request (e.g., a counter stored in `state`).
- The runtime maintains a pending request table keyed by `id`.
- When a response arrives, the runtime matches it by `id`, injects it at `inter.response`, and triggers a step.
- The interaction routes responses by checking `(response.id) is equal to (expectedId)`.

### Pending State in `memo`

The `memo` field (currently an unused placeholder `{}` in every step) stores pending request metadata:

```javascript
memo: {
  pendingRequests: {
    "req-1": { url: "https://api.example.com/users", sentAt: 1234567890 },
    "req-2": { url: "https://api.example.com/posts", sentAt: 1234567891 }
  }
}
```

The runtime manages `memo.pendingRequests` — adding entries when requests go out, removing them when responses arrive.

## Activation Integration

LIDL's existing activation model integrates naturally:

| State | Value | Meaning |
|-------|-------|---------|
| Request not yet sent | `request` is `inactive` | No action |
| Request sent | `request` is `active` with request data | Runtime fires the request |
| Response pending | `response` is `inactive` | Not yet received |
| Response received | `response` is `active` with response data | Interaction can process it |
| Error | `response` is `active` with error data | Interaction handles the error |

This reuses LIDL's existing activation semantics (`active` = `"lidl_active_value"` or data, `inactive` = `null`) with zero new concepts.

## Runtime Loop

The runtime event loop generalizes the current Canvas runtime:

```
1. Build lidlIn from previous state + new inputs (events, responses)
2. result = trans(lidlIn)
3. Inspect result.inter for outgoing effect requests:
   a. For each active request field at a known effect path:
      - Record in pending table (keyed by interface path or explicit ID)
      - Fire the async operation
4. When a response arrives:
   a. Match to pending request (by interface path or correlation ID)
   b. Remove from pending table
   c. Inject response data into interfaceState at the matching path
   d. Trigger a new step (go to 1)
5. External events (mouse, keyboard, timer, WebSocket message):
   a. Update interfaceState with new input data
   b. Trigger a new step (go to 1)
```

## Effect Types Beyond HTTP

The same pattern applies to other async effects:

### Timers

```
interaction (delayedAction): {
  start: { delay: Number, payload: Any } out,
  fired: Any in
} is ...
```

The runtime sets a timer when `start` is active, and injects `fired` when it triggers.

### WebSocket

```
interaction (liveData): {
  connect: { url: Text } out,
  send: Text out,
  receive: Text in,
  status: ConnectionStatus in
} is ...
```

The runtime manages the WebSocket lifecycle. Messages arrive as `receive` activations.

### Storage

```
interaction (persistence): {
  write: { key: Text, value: Any } out,
  read: { key: Text } out,
  result: { key: Text, value: Any } in
} is ...
```

## Implementation Phases

### Phase 1: Runtime Effect Loop

Extend the Canvas runtime (`canvas-panel.tsx`) and the CLI runner to inspect outgoing interface values for effect markers. Implement HTTP request/response handling.

### Phase 2: Effect Type Conventions

Define standard data types for `HttpRequest`, `HttpResponse`, `Timer`, `WebSocket`, etc. in a LIDL standard library.

### Phase 3: Static Analysis

Extend the compiler to detect effect interfaces and validate that request/response pairs are correctly typed (matching directions, compatible data types).

### Phase 4: Dynamic Correlation

Implement `memo`-based pending request tracking and correlation ID matching for dynamic effect patterns.
