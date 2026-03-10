# Async Effects and Request-Response Matching

## Motivation

LIDL's runtime is a synchronous step function: `trans(data) -> data`. Each step takes `{memo, state, args, inter}` and produces a new `{memo, state, args, inter}`. There is no built-in mechanism for asynchronous I/O — no HTTP requests, no timers, no WebSocket streams.

This design document proposes an async effect system that preserves LIDL's pure synchronous transition model while enabling real-world I/O.

## Core Principle

**LIDL's transition function stays pure and synchronous.** The runtime (outside the transition) handles async I/O, injecting responses back as interface inputs in **future** steps. A response never arrives in the same step as its request. There is always at least one step boundary between a request going out and a response coming in.

This mirrors how the Canvas runtime already works:
- Mouse events come in at `inter.mouse`
- Graphics go out at `inter.graphics`
- The runtime handles the actual DOM/Canvas I/O between steps
- The interaction never sees the result of its output in the same step

Async effects extend this pattern: requests go out via `inter`, the runtime executes them, and responses come back via `inter` in a future step.

## Fundamental Timing Model

Every effect follows this timeline:

```
Step N:   interaction emits requests via inter.X.requests (out)
          runtime picks up the requests AFTER step N completes
          runtime fires the async operations

Step N+1: inter.X.responses is [] (async not done yet)
          interaction may emit more requests, or do nothing

...       (zero or more steps pass, other events may trigger steps)

Step N+K: some async operations complete
          runtime injects all completed responses into inter.X.responses
          runtime triggers a new step
          interaction sees inter.X.responses as a non-empty list
```

The interaction must be written to tolerate an arbitrary number of steps between request and response. It must handle `responses` being an empty list `[]` gracefully during those intermediate steps.

## Effect Interface: Lists of Requests and Responses

The fundamental effect interface uses **lists** for both directions. Each step can emit zero or more requests, and receive zero or more responses.

### Basic Shape

```
interaction (httpChannel): {
  requests:  [{ id: Text, payload: HttpRequest }] out,
  responses: [{ id: Text, payload: HttpResponse }] in
} is ...
```

- **`requests`**: a list of outgoing requests emitted this step. Each carries an `id` chosen by the interaction. An empty list `[]` means "no new requests this step."
- **`responses`**: a list of incoming responses delivered this step. Each carries the `id` of the request it answers. An empty list `[]` means "no responses arrived since the last step."

### Why Lists

A single `request`/`response` slot can only hold one value per step. Real systems need:
- **Multiple requests per step**: fan-out, batch fetching, sending a request while another is in-flight.
- **Multiple responses per step**: several async operations may complete between two steps (or simultaneously). Delivering them all at once gives the interaction the full picture rather than artificially serializing responses across steps.

Lists make both natural. Empty list = nothing happening. Non-empty list = work to do.

### Correlation via `id`

Every request carries an `id` (chosen by the interaction). Every response carries the `id` of the request it answers. The runtime matches responses to requests by `id`, and the interaction uses `id` to route responses to the right logic.

This is a single, uniform mechanism — no separate "static" vs "dynamic" vs "sequenced" strategies. The `id` field handles all cases:

- **Single request**: interaction uses a constant `id` like `"fetch"`.
- **Cancel-on-new-request**: interaction reuses the same `id`. The runtime replaces the pending request with the new one, discarding the old response when it arrives.
- **Multiple in-flight**: interaction generates unique `id`s (counter, UUID, or derived from request parameters). Each request/response pair is tracked independently.

### Worked Example: Dashboard

```
interaction (dashboard): {
  requests:  [{ id: Text, url: Text, method: Text }] out,
  responses: [{ id: Text, status: Number, body: Text }] in
} is ...
```

```
Step 0: requests = [
          { id: "users",  url: "/api/users",  method: "GET" },
          { id: "posts",  url: "/api/posts",  method: "GET" }
        ]
        responses = []

        Runtime fires both requests.

Step 1: (triggered by mouse event)
        requests = []
        responses = []    ← both still pending

Step 2: /api/posts completes
        requests = []
        responses = [{ id: "posts", status: 200, body: "[...]" }]

        Interaction processes the posts response.
        /api/users still pending.

Step 3: /api/users completes
        requests = []
        responses = [{ id: "users", status: 200, body: "[...]" }]

        Interaction processes the users response.
```

If both responses happen to complete between step 1 and the next event:

```
Step 2: both complete simultaneously
        requests = []
        responses = [
          { id: "posts", status: 200, body: "[...]" },
          { id: "users", status: 200, body: "[...]" }
        ]

        Interaction processes both in one step.
```

### Worked Example: Search-as-you-type (Cancel-on-new-request)

The interaction reuses the same `id` for every search query. The runtime treats a new request with an existing `id` as a replacement — the old pending request is cancelled.

```
Step 0: user types "re"
        requests = [{ id: "search", query: "re" }]
        responses = []

        Runtime fires request for "re".

Step 1: user types "rea" (before "re" response arrives)
        requests = [{ id: "search", query: "rea" }]
        responses = []

        Runtime sees id="search" already pending.
        Cancels (or marks stale) the "re" request. Fires "rea".

Step 2: stale response for "re" arrives → runtime discards it (id replaced).
        response for "rea" arrives.
        requests = []
        responses = [{ id: "search", results: [...] }]
```

### Worked Example: Paginated Fetch (Multiple in-flight)

```
Step 0: requests = [
          { id: "page-1", url: "/api/items?page=1" },
          { id: "page-2", url: "/api/items?page=2" },
          { id: "page-3", url: "/api/items?page=3" }
        ]

Step 3: page 2 and page 3 complete (page 1 still slow)
        responses = [
          { id: "page-3", body: "[...]" },
          { id: "page-2", body: "[...]" }
        ]

Step 5: page 1 completes
        responses = [{ id: "page-1", body: "[...]" }]
```

The interaction accumulates results in `state` and can render partial results as pages arrive out of order.

## Effect Type Convention

A standard generic type formalizes the pattern:

```
data Effect(Request, Response) is {
  requests:  [{ id: Text, payload: Request }] out,
  responses: [{ id: Text, payload: Response }] in
}
```

For simple single-request channels where `id` management is boilerplate, a convenience wrapper could auto-assign `id`:

```
data SimpleEffect(Request, Response) is {
  request:  Request out,
  response: Response in
}
```

The runtime would treat `SimpleEffect` as sugar for an `Effect` with an auto-managed constant `id`. If a new request is emitted while one is pending, cancel-on-new-request applies.

## Activation Integration

LIDL's existing activation model integrates naturally with the list-based approach:

| State | Value | Meaning |
|-------|-------|---------|
| No requests this step | `requests` is `[]` | No new work |
| Requests emitted | `requests` is `[...]` (non-empty) | Runtime fires them |
| No responses yet | `responses` is `[]` | Nothing completed |
| Responses arrived | `responses` is `[...]` (non-empty) | Interaction processes them |

The `inactive`/`active` concept maps naturally: an empty list is semantically `inactive` (nothing to do), a non-empty list is `active` (data to process). The interaction checks `if (responses) is active` or tests list length.

A response is always `[]` in the same step that the corresponding request was sent. Responses only appear in future steps.

## Pending State in `memo`

The `memo` field (currently an unused placeholder `{}` in every step) stores pending request metadata managed by the runtime:

```javascript
memo: {
  pendingRequests: {
    "users": { url: "/api/users", sentAt: 1234567890 },
    "posts": { url: "/api/posts", sentAt: 1234567891 },
    "page-1": { url: "/api/items?page=1", sentAt: 1234567892 }
  }
}
```

The runtime adds entries when requests go out, removes them when responses are delivered, and replaces entries when a new request reuses an existing `id` (cancel-on-new-request).

## Runtime Loop

The runtime event loop generalizes the current Canvas runtime:

```
1. Build lidlIn from previous state + new inputs:
   a. Collect all responses that completed since last step into a list
   b. Set inter.X.responses = [completed responses]
   c. External events (mouse, keyboard, timer) update their respective inter fields
2. result = trans(lidlIn)
3. Inspect result.inter for outgoing effect requests:
   a. For each non-empty requests list at a known effect path:
      - For each request in the list:
        - If id matches an existing pending request: cancel the old one (replace)
        - Add to pending table keyed by id
        - Fire the async operation
4. When async operations complete:
   a. Store completed responses in a ready queue
   b. If no step is currently running, trigger a new step (go to 1)
```

Key properties:
- All responses that are ready at the time of a step are delivered together in one list.
- If more responses arrive while a step is running, they are queued for the next step.
- The runtime never delivers a response in the same step that its request was emitted.

## Effect Types Beyond HTTP

The same list-based pattern applies to other async effects:

### Timers

```
interaction (timers): {
  starts: [{ id: Text, delay: Number }] out,
  fires:  [{ id: Text }] in
} is ...
```

The interaction can start multiple timers per step, each with a unique `id`. When a timer fires, it appears in `fires`. Starting a new timer with the same `id` cancels the old one.

### WebSocket

```
interaction (liveData): {
  commands: [{ type: Text, url: Text, message: Text }] out,
  events:   [{ type: Text, message: Text }] in
} is ...
```

Commands: `{type: "connect", url: "..."}`, `{type: "send", message: "..."}`, `{type: "close"}`.
Events: `{type: "open"}`, `{type: "message", message: "..."}`, `{type: "close"}`, `{type: "error", message: "..."}`.

Multiple messages can arrive between steps and are delivered together in one list.

### Storage

```
interaction (persistence): {
  commands:  [{ id: Text, op: Text, key: Text, value: Any }] out,
  results:   [{ id: Text, key: Text, value: Any }] in
}
```

Multiple reads/writes per step, results matched by `id`.

## Implementation Phases

### Phase 1: Runtime Effect Loop

Extend the Canvas runtime (`canvas-panel.tsx`) and the CLI runner to support list-based effect interfaces. Implement HTTP request/response handling with `id`-based correlation and cancel-on-reuse semantics.

### Phase 2: Effect Type Conventions

Define standard data types for `HttpRequest`, `HttpResponse`, `Timer`, `WebSocket`, etc. in a LIDL standard library. Formalize `Effect` and `SimpleEffect` generic types.

### Phase 3: Static Analysis

Extend the compiler to detect effect interfaces and validate that request/response pairs are correctly typed (matching directions, compatible data types).

### Phase 4: Convenience Sugar

Implement `SimpleEffect` as sugar for the common single-request pattern with auto-managed `id` and cancel-on-new-request semantics.
