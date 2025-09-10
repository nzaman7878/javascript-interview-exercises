Week 2 Day 5 focuses on mastering **Promises** and modern async patterns (async/await, combinators, microtasks) so asynchronous code is predictable, readable, and robust in real projects and interviews[^48_1][^48_2]. The goal is to write clear flows with proper error handling, choose the right combinator for concurrency, and understand when callbacks run via the microtask queue for correctness under load[^48_3][^48_4].

## Learn

- A Promise represents a value that may be available now, later, or never, and it has a lifecycle: pending → fulfilled or rejected, with handlers attached via then/catch/finally[^48_1].
- async/await wraps Promises in a synchronous-looking syntax, where await pauses within an async function until the Promise settles, or throws on rejection for catch to handle[^48_2][^48_5].
- Promise combinators let multiple async tasks be coordinated: all (fail fast on any rejection), allSettled (collect all outcomes), race (first settle wins), and finally (settles cleanup regardless of outcome)[^48_6][^48_7][^48_8][^48_9].
- Microtasks (e.g., Promise reactions) run after the current script and before macrotasks (like setTimeout), which explains why Promise callbacks fire before timers of the same tick[^48_4][^48_10].


## Key APIs

- Promise basics: new Promise(executor), .then(onFulfilled), .catch(onRejected), .finally(cleanup), and error propagation through chains for clean composition and recovery[^48_1][^48_9].
- async function and await: async functions return Promises; await unwraps fulfillment values or throws on rejection, enabling try/catch/finally to manage async code just like synchronous code[^48_2][^48_5].
- Concurrency helpers: Promise.all for fail-fast batching, Promise.allSettled for partial success processing, and Promise.race for timeouts or “first result wins” behavior[^48_6][^48_7][^48_8].
- Microtask control: queueMicrotask defers lightweight work to run after the current task but before rendering or timers, useful for ordered post-processing and state stabilization[^48_11][^48_4].


## Apply

- Fetch with async/await and robust errors: map non-2xx HTTP to thrown errors, catch and wrap with context, and use finally for telemetry or UI cleanup[^48_2][^48_5].

```js
async function loadJson(url) {
  try {
    const res = await fetch(url); // may reject on network failure [^48_2]
    if (!res.ok) throw new Error(`HTTP ${res.status}`); // normalize non-2xx as errors [^48_1]
    return await res.json(); // may throw on invalid JSON [^48_2]
  } catch (err) {
    throw new Error("Fetch failed", { cause: err }); // add context for upstream handlers [^48_22]
  } finally {
    // cleanup/metrics here [^48_23]
  }
}
```

- Batch with Promise.all when any failure should abort the whole batch; keep order stable regardless of settle timing for predictable downstream use[^48_6].

```js
const results = await Promise.all([a(), b(), c()]); // resolves to [va, vb, vc] or rejects on first failure [^48_13]
```

- Use Promise.allSettled to proceed with successes while inspecting failures without aborting the batch, ideal for fan-out UIs or background jobs[^48_7].

```js
const settled = await Promise.allSettled([a(), b(), c()]); // [{status,value}|{status,reason}] per item [^48_21]
```

- Timeout with Promise.race: run work vs a delay Promise, and if the delay wins, cancel or surface a timeout error for consistent user feedback[^48_8].

```js
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)); // race partner [^48_16]
```

- Microtask sequencing: use queueMicrotask to flush a small post-step after state changes so effects run before the browser proceeds, keeping ordering deterministic[^48_11].

```js
queueMicrotask(() => finalizeRender()); // runs before timers and next event loop macrotask [^48_6]
```


## Build

- Concurrent product loader with partial results and stable UX fallback: fetch multiple endpoints, surface successful cards immediately, and show error badges for failed ones without blocking the page[^48_7][^48_3].

```js
async function loadProducts(urls) {
  const settled = await Promise.allSettled(urls.map(u => fetch(u).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))); // normalize [^48_21]
  const products = settled.filter(s => s.status === "fulfilled").map(s => s.value); // use successes [^48_21]
  const errors = settled.filter(s => s.status === "rejected").map(s => s.reason.message); // show badges [^48_21]
  return { products, errors }; // render both states [^48_21]
}
```

- Race-based timeout wrapper: wrap any Promise-returning function with a timeout that rejects if not settled in time, and integrate in data-fetching layers for consistent handling[^48_8].

```js
async function withTimeout(promise, ms) {
  const t = new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)); // race loser/winner [^48_16]
  return Promise.race([promise, t]); // first settle wins [^48_16]
}
```


## Dev mindset

- Keep async try blocks tight, add domain context on catch, rethrow unknowns, and always clean up in finally to prevent leaks and stuck UI states during failures[^48_12][^48_13].
- Choose combinators based on desired policy: all for fail-fast pipelines, allSettled for “show what we can,” and race for timeouts or “first response wins” patterns[^48_6][^48_7][^48_8].
- Understand the microtask queue so code relying on Promise callbacks doesn’t race unexpectedly with timers or rendering, and use queueMicrotask deliberately for ordered follow-ups[^48_4][^48_11].
- Prefer async/await for readability, but still reason in Promises: know how rejections propagate, how finally schedules, and how to compose concurrent tasks safely[^48_2][^48_9].


## Interview Q\&A

- Why async/await over then/catch chains: linear control flow with try/catch/finally, fewer nesting traps, and easier composition with combinators when needed[^48_2][^48_13].
- Difference between Promise.all and Promise.allSettled: all rejects on first failure and short-circuits, while allSettled always resolves with per-item status/value/reason for partial handling[^48_6][^48_7].
- When to use Promise.race: implement timeouts or pick the first of competing sources (e.g., cached vs network) while handling the possibility of a rejected “winner”[^48_8].
- Why microtasks matter: Promise callbacks run as microtasks, which execute before macrotasks like setTimeout, impacting ordering and potential UI race conditions[^48_4][^48_10].

If helpful, the next step can add cancellation with AbortController, unhandledrejection backstops, and a small utility layer (retry with backoff + timeouts) to harden async infrastructure further[^48_14][^48_15].
<span style="display:none">[^48_17][^48_18][^48_19][^48_20][^48_24][^48_25][^48_26]</span>

<div style="text-align: center">⁂</div>

[^48_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^48_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^48_3]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises

[^48_4]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^48_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

[^48_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^48_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^48_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^48_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

[^48_10]: https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-a-microtask-queue

[^48_11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask

[^48_12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^48_13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^48_14]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

[^48_15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event

[^48_16]: https://developer.mozilla.org/en-US/docs/Glossary/Promise

[^48_17]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Implementing_a_promise-based_API

[^48_18]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS

[^48_19]: https://www.raymondcamden.com/2024/02/12/looking-at-the-javascript-promise-collection-methods

[^48_20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[^48_21]: https://stackoverflow.com/questions/59784175/differences-between-promise-all-and-promise-allsettled-in-js

[^48_22]: https://javascript.info/promise-basics

[^48_23]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth

[^48_24]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/queueMicrotask

[^48_25]: https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent/promise

[^48_26]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error


---

# How do promises improve asynchronous JavaScript workflows

Promises improve asynchronous JavaScript by turning async results into composable values, enabling clear sequencing, parallelism, and unified error handling, and pairing naturally with async/await for readable, robust workflows.

## Core benefits

- Replace nested callbacks with chainable operations, reducing “callback hell” and making control flow linear and maintainable.
- Provide a single model for success/failure via resolve/reject, so pipelines remain predictable across libraries and layers.


## Cleaner sequencing

- Chaining with .then returns a new promise, so steps run in order and pass transformed results forward.

```js
getUser()
  .then(u => getPosts(u.id))
  .then(posts => posts[^49_0])
  .then(p => getComments(p.id))
  .then(comments => render(comments))
  .catch(err => showError(err));
```


## Unified errors

- A single .catch at the end handles any rejection in the chain, avoiding scattered try/catch and inconsistent error propagation.

```js
fetch(url)
  .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
  .then(data => use(data))
  .catch(err => logAndRecover(err));
```


## Concurrency patterns

- Promise.all runs tasks in parallel and fails fast when any rejects, ideal for interdependent inputs or “all-or-nothing” pages.

```js
const [a, b, c] = await Promise.all([fa(), fb(), fc()]);
```

- Promise.allSettled collects every outcome, supporting partial success UX and resilient fan-out processing.

```js
const settled = await Promise.allSettled([fa(), fb(), fc()]);
const ok = settled.filter(s => s.status === "fulfilled").map(s => s.value);
const errs = settled.filter(s => s.status === "rejected").map(s => s.reason);
```

- Promise.race supports timeouts and “first response wins” strategies for snappy experiences.

```js
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
const data = await Promise.race([fetchJSON(url), timeout(3000)]);
```


## Async/await bridge

- async/await gives synchronous-looking code with try/catch/finally, while still using promises under the hood.

```js
async function load() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error("Load failed", { cause: err });
  } finally {
    stopSpinner();
  }
}
```


## Microtask semantics

- Promise callbacks run as microtasks, which execute after the current run-to-completion segment and before timers, yielding deterministic ordering and fewer UI race conditions.

```js
queueMicrotask(() => flushState()); // runs before setTimeout(fn, 0)
```


## Cancellation and timeouts

- Pair with AbortController to cancel long-running requests and convert cancellation into a standard rejection path that can be handled consistently.

```js
const c = new AbortController();
const p = fetch(url, { signal: c.signal });
c.abort(); // later, triggers an AbortError rejection
```


## Resource cleanup

- Promise.prototype.finally and try/finally (with await) guarantee teardown, preventing leaks and stuck UI even on failures.

```js
startSpinner();
fetchJSON(url).finally(stopSpinner);
```


## Interop and testing

- Promises unify old and new APIs; “promisify” callback-style functions to integrate cleanly with async pipelines and tests.

```js
const fsRead = (path) => new Promise((res, rej) =>
  fs.readFile(path, "utf8", (e, d) => e ? rej(e) : res(d))
);
```


## Practical patterns

- Retry with backoff for transient failures; rethrow non-retriables to keep failures observable.

```js
async function retry(fn, times=3, base=200, isRetriable=()=>true) {
  let last;
  for (let i=0; i<times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (!isRetriable(e) || i === times-1) break;
      await new Promise(r => setTimeout(r, base * 2**i));
    }
  }
  throw last;
}
```

- Timeout wrapper using race for consistent UX on slow networks.

```js
const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))]);
```

- Partial success UI with allSettled for resilient dashboards and search pages.

```js
const endpoints = [u1, u2, u3];
const settled = await Promise.allSettled(endpoints.map(fetchJSON));
render({
  items: settled.filter(s => s.status === "fulfilled").map(s => s.value),
  errors: settled.filter(s => s.status === "rejected").map(s => s.reason)
});
```


## Dev mindset

- Prefer **promises** for composability, centralized error handling, and predictable timing; adopt async/await for readability without losing the benefits.
- Choose the right combinator for policy (all for fail-fast, allSettled for resilience, race for timeouts), and always layer cleanup and cancellation for reliability.
- Keep promise chains linear and explicit, attach a single .catch or try/catch per logical unit, and propagate unknown errors to avoid silent failure.
<span style="display:none">[^49_1][^49_2][^49_3][^49_4][^49_5][^49_6][^49_7]</span>

<div style="text-align: center">⁂</div>

[^49_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^49_2]: https://www.technoscriber.com/asynchronous-javascript-a-deep-dive-into-promises-and-async-await/

[^49_3]: https://www.crsinfosolutions.com/asynchronous-javascript-mastering-promises-for-smooth-operations/

[^49_4]: https://jeffbruchado.com.br/en/blog/promises-in-javascript-master-the-asynchronous

[^49_5]: https://astconsulting.in/java-script/mastering-asynchronous-javascript

[^49_6]: https://clouddevs.com/javascript/asynchronous-functionality/

[^49_7]: https://www.twilio.com/en-us/blog/developers/community/asynchronous-javascript-introduction-promises


---

# What are common patterns for handling promise rejections

The most reliable patterns are to attach a final **.catch**, use **try/catch with await**, and **rethrow** to keep failures observable while centralizing mapping and cleanup at boundaries. These ensure every rejection is handled consistently, with clear propagation and no silent failures.

## Chain-end .catch

- Pattern: Always terminate chains with a single .catch to handle any rejection up the chain.

```js
getUser()
  .then(u => getOrders(u.id))
  .then(os => render(os))
  .catch(err => showError(err));  // single sink
```

- Why: Keeps control flow linear, avoids “callback hell”, and guarantees no lost rejections.


## Try/catch with await

- Pattern: Put awaited work inside try/catch; use finally for teardown.

```js
async function load() {
  startSpinner();
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error("Load failed", { cause: err });
  } finally {
    stopSpinner();
  }
}
```

- Why: Reads like sync code while catching promise rejections as exceptions; finally prevents leaks/stuck UI.


## Rethrow to propagate

- Pattern: Handle known errors locally; rethrow unknown to keep the chain rejected.

```js
.then(x => step(x))
.catch(err => {
  if (err.name === "ValidationError") return defaultValue;
  throw err; // keep rejection state
});
```

- Why: Preserves failure signal so upper layers can log, retry, or fail fast.


## Normalize early failures

- Pattern: Convert non-2xx HTTP to rejections immediately.

```js
const readJson = (res) => res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
fetch(url).then(readJson).then(use).catch(handle);
```

- Why: Prevents “false success” flows; all consumers see a standard error path.


## Boundary translation

- Pattern: Map domain errors to responses at edges (controllers/UI), not deep inside.

```js
async function controller(req, res, next) {
  try {
    const user = await getUser(req.params.id);
    res.json({ ok: true, user });
  } catch (err) {
    if (err.code === "NOT_FOUND") return res.status(404).json({ ok:false, message: err.message });
    next(err); // central handler
  }
}
```

- Why: One place to decide UX/HTTP mapping while keeping lower layers pure.


## Global backstops

- Pattern: Add a last-resort unhandled rejection listener.

```js
window.addEventListener("unhandledrejection", (e) => {
  console.error("UNHANDLED:", e.reason);
});
```

- Why: Surfaces missed rejections for telemetry and crash prevention policies.


## all vs allSettled

- Pattern: Choose combinator by policy.

```js
// Fail-fast batch
const [a, b, c] = await Promise.all([fa(), fb(), fc()]);

// Partial success
const settled = await Promise.allSettled([fa(), fb(), fc()]);
const ok = settled.filter(s => s.status === "fulfilled").map(s => s.value);
const errs = settled.filter(s => s.status === "rejected").map(s => s.reason);
```

- Why: all for interdependent “all-or-nothing”; allSettled for resilient fan-out.


## Timeouts and cancel

- Pattern: Use race for timeouts and AbortController for cancellation.

```js
const timeout = (ms) => new Promise((_, r) => setTimeout(() => r(new Error("Timeout")), ms));
const data = await Promise.race([fetchJSON(url), timeout(3000)]);

// Cancel
const ctrl = new AbortController();
fetch(url, { signal: ctrl.signal });
ctrl.abort();
```

- Why: Prevents hangs; converts slow/aborted work into standard rejections.


## Safe wrappers

- Pattern: Wrap async handlers to auto-catch and forward errors.

```js
const asyncRoute = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
```

- Why: Eliminates unhandled rejections in routing and reduces boilerplate.


## Return promises

- Pattern: Always return the promise from functions that start async work.

```js
function fetchData() {
  return fetch(url).then(r => r.json());  // return!
}
```

- Why: Callers can attach .catch/await; missing return hides errors and breaks flow control.


## Cleanup with finally

- Pattern: Put release logic in finally on promise or try/finally.

```js
doAsync().finally(cleanup);
```

- Why: Guarantees teardown regardless of success/failure.


## Retry with backoff

- Pattern: Retry only retriable errors; cap attempts; exponential backoff.

```js
async function retry(fn, times=3, base=200, isRetriable=()=>true) {
  let last;
  for (let i=0; i<times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (!isRetriable(e) || i === times-1) break;
      await new Promise(r => setTimeout(r, base * 2 ** i));
    }
  }
  throw last;
}
```

- Why: Improves resilience without amplifying outages.


## Typed/custom errors

- Pattern: Use custom error classes; branch with instanceof and attach codes.

```js
class AppError extends Error { constructor(msg, { code, cause, status=500 }={}) { super(msg); this.code=code; this.cause=cause; this.status=status; } }
class NotFoundError extends AppError { constructor(res, id){ super(`${res} ${id} not found`, { code:"NOT_FOUND", status:404 }); } }
```

- Why: Deterministic handling and clean mapping to UI/HTTP.


## UI fallbacks

- Pattern: Provide graceful defaults when safe, log and rethrow otherwise.

```js
async function loadProfile() {
  try {
    return await fetchJSON("/api/profile");
  } catch {
    return { name: "Guest", preferences: {} }; // UX fallback
  }
}
```

- Why: Keeps the app usable while still surfacing serious failures elsewhere.


## Anti-pattern checklist

- No terminal .catch (lost rejections)
- Mixing await with bare .then (gaps in handling)
- Catching all errors and continuing silently
- Throwing strings/non-Error (lost stack/type)
- Not returning promises from functions
- Huge try blocks; cleanup not in finally
- Blind retries without backoff or stop conditions

Applying these patterns yields predictable propagation, consistent logging and recovery, and resilient UIs/services with no unhandled rejections or resource leaks.
<span style="display:none">[^50_1][^50_2][^50_3][^50_4][^50_5][^50_6][^50_7][^50_8][^50_9]</span>

<div style="text-align: center">⁂</div>

[^50_1]: https://stackoverflow.com/questions/40500490/what-is-an-unhandled-promise-rejection

[^50_2]: https://hygraph.com/blog/unhandled-promise-rejection

[^50_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^50_4]: https://dev.to/meijin/understanding-advanced-promise-patterns-in-javascript-296n

[^50_5]: https://blog.pixelfreestudio.com/unhandled-promise-rejections-how-to-catch-and-fix-them/

[^50_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^50_7]: https://yousaf.hashnode.dev/common-promise-anti-patterns

[^50_8]: https://www.zipy.ai/blog/debug-svelte-promise-rejection-errors

[^50_9]: https://remysharp.com/2014/11/19/my-five-promise-patterns


---

# How to implement promise chaining for sequential operations

The simplest way to implement sequential async work is to chain Promises with .then by always returning the next Promise, or to use async/await which expresses the same sequence with try/catch for errors. Both approaches ensure each step starts only after the previous one resolves.

## Basic chaining pattern

- Idea: Each .then receives a result and returns either a plain value (wrapped in a resolved Promise) or a Promise for the next step.
- Single .catch at the end centralizes error handling for the whole pipeline.

```js
// Step functions (each returns a Promise)
const fetchUser = (id) => fetch(`/api/users/${id}`).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));
const fetchOrders = (userId) => fetch(`/api/orders?userId=${userId}`).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));
const pickLatest = (orders) => orders.sort((a,b) => b.createdAt.localeCompare(a.createdAt))[^51_0]; // returns a plain value
const fetchOrderItems = (orderId) => fetch(`/api/orders/${orderId}/items`).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));

// Sequential chain
fetchUser("u_123")
  .then(user => fetchOrders(user.id))                 // return the next Promise
  .then(orders => pickLatest(orders))                 // return a value (auto-wrapped)
  .then(order => fetchOrderItems(order.id))           // return the next Promise
  .then(items => renderOrder(items))                  // final action
  .catch(err => showToast(`Failed: ${err.message}`)); // one terminal catch
```

Line-by-line:

- fetchUser: returns a Promise that either resolves with parsed JSON or rejects on non-2xx; this normalizes HTTP into a standard rejection path.
- fetchOrders: same normalization for the next step; this keeps the chain’s error semantics consistent.
- pickLatest: returns a plain value; .then will wrap it, so the chain can continue without extra Promise boilerplate.
- fetchOrderItems: another Promise-returning step that depends on the previous step’s result.
- Final .then: perform the terminal action (e.g., render); keep side effects here or return data if more steps follow.
- .catch: a single, final error sink that handles any rejection from any earlier step.

Developer mindset:

- Always return the next step (value or Promise) from .then so the chain waits correctly.
- Normalize early (e.g., non-2xx → reject) to avoid “false success” flows later.
- Keep transformations pure in the middle; do side effects at edges (first and last steps).


## Async/await equivalent

- Same sequence, but more readable with try/catch/finally.

```js
async function loadLatestOrderItems(userId) {
  try {
    const userRes = await fetch(`/api/users/${userId}`);
    if (!userRes.ok) throw new Error(`HTTP ${userRes.status}`);
    const user = await userRes.json();

    const ordersRes = await fetch(`/api/orders?userId=${user.id}`);
    if (!ordersRes.ok) throw new Error(`HTTP ${ordersRes.status}`);
    const orders = await ordersRes.json();

    const latest = orders.sort((a,b) => b.createdAt.localeCompare(a.createdAt))[^51_0];

    const itemsRes = await fetch(`/api/orders/${latest.id}/items`);
    if (!itemsRes.ok) throw new Error(`HTTP ${itemsRes.status}`);
    const items = await itemsRes.json();

    renderOrder(items);
    return items; // allows caller composition
  } catch (err) {
    showToast(`Failed: ${err.message}`);
    throw err; // keep failure observable for callers if needed
  } finally {
    stopSpinner(); // guaranteed cleanup
  }
}
```

Developer mindset:

- Keep awaits inside try/catch; map non-2xx to throws; rethrow unknowns so upstream can log or retry.
- Use finally for cleanup to avoid leaks or stuck UI states.


## Dynamic sequences (N steps)

- When the number of steps is dynamic, reduce over tasks to chain sequentially.

```js
// tasks: array of functions that return a Promise and accept previous result
function chainSequential(tasks, initial) {
  return tasks.reduce((p, task) => p.then(task), Promise.resolve(initial));
}

// Example
const tasks = [
  (id) => fetch(`/api/users/${id}`).then(r => r.json()),
  (user) => fetch(`/api/orders?userId=${user.id}`).then(r => r.json()),
  (orders) => orders[^51_0] // pick first for demo
];
chainSequential(tasks, "u_123")
  .then(result => console.log("Done:", result))
  .catch(err => console.error("Failed:", err));
```

Developer mindset:

- Reduce-based chaining keeps sequential control flow even with variable-length pipelines.
- Each task must return a value or a Promise; never forget the return.


## Mixing parallel and sequential

- Run independent steps in parallel, then continue sequentially with aggregated results.

```js
// Step 1: fetch user and preferences in parallel
const [user, prefs] = await Promise.all([
  fetch(`/api/users/${id}`).then(r => r.json()),
  fetch(`/api/prefs/${id}`).then(r => r.json())
]);

// Step 2: then fetch dependent recommendations sequentially
const recs = await fetch(`/api/recs?u=${user.id}&t=${prefs.theme}`).then(r => r.json());
```

Developer mindset:

- Use Promise.all for fail‑fast parallelism; only chain sequentially where there are true dependencies.


## Error handling patterns in chains

- Terminal .catch to centralize; selective catch in the middle only when you can recover, then rethrow to keep the chain rejected if necessary.

```js
doStep1()
  .then(res => doStep2(res))
  .catch(e => {
    if (e.name === "ValidationError") return useDefault(); // recoverable case
    throw e; // keep failure state
  })
  .then(res => doStep3(res))
  .catch(finalHandler);
```

Developer mindset:

- Handle known, recoverable errors locally; rethrow unknowns so they’re not silently swallowed.


## Timeouts and cancellation in a chain

- Add a timeout via race for any slow step; use AbortController to cancel downstream fetches when a timeout occurs.

```js
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));

function withTimeout(promise, ms) {
  return Promise.race([promise, timeout(ms)]);
}

const ctrl = new AbortController();
withTimeout(fetch(url, { signal: ctrl.signal }), 3000)
  .then(r => r.json())
  .catch(e => {
    if (e.message === "Timeout") ctrl.abort(); // cancel in-flight request
    throw e;
  });
```

Developer mindset:

- Treat timeouts as first‑class errors; cancel obsolete work to conserve resources and keep UX responsive.


## Common mistakes to avoid

- Not returning from .then (breaks sequencing).
- Attaching multiple .then to the same Promise expecting chaining (siblings run independently).
- Mixing await and bare .then chains inconsistently (gaps in error handling).
- Using exceptions for routine control flow instead of guards; skipping finally cleanup.


## Quick checklist

- Always return a value or Promise from every .then.
- Keep try/.catch/.finally tight and near risky awaits.
- Normalize early (non-2xx → throw/reject).
- Use Promise.all for independent work, chain when dependent.
- Add one terminal .catch; rethrow unknowns in intermediate catches.
- Integrate timeouts (race) and cancellation (AbortController) where appropriate.

These patterns give readable, predictable sequencing, robust error handling, and efficient concurrency without callback nesting or hidden failure paths.
<span style="display:none">[^51_1][^51_2][^51_3][^51_4][^51_5][^51_6][^51_7][^51_8]</span>

<div style="text-align: center">⁂</div>

[^51_1]: https://www.geeksforgeeks.org/javascript/javascript-promise-chaining/

[^51_2]: https://stackoverflow.com/questions/24586110/resolve-promises-one-after-another-i-e-in-sequence

[^51_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^51_4]: https://javascript.info/promise-chaining

[^51_5]: https://dev.to/bhagatparwinder/promises-chaining-error-handling-operators-3ccb

[^51_6]: https://javascript.plainenglish.io/mastering-sequential-asynchronous-operations-in-javascript-with-promise-chaining-ae6746791017

[^51_7]: https://blog.greenroots.info/javascript-promise-chain-the-art-of-handling-promises

[^51_8]: https://www.ceos3c.com/typescript/typescript-promise-chaining/


---

# most asked interview questions with detailed explanation answer with line by line code explanations and developers thinking, mindset and problem solving approaches

Here are the most asked async JavaScript interview questions on Promises, async/await, the event loop, and error handling, with detailed answers, line‑by‑line code explanations, and developer mindset for strong problem‑solving in interviews and real projects[^52_1][^52_2].

## 1) What is a Promise and how does it work?

A Promise is an object representing the eventual result of an asynchronous operation, transitioning from pending to either fulfilled or rejected and notifying attached handlers via then/catch/finally[^52_1]. Promises standardize async flows with a single success/failure model, avoiding nested callbacks and enabling composition across APIs[^52_2]. A Promise executor receives resolve and reject functions to settle the promise exactly once, after which its state is immutable[^52_1].

Code

```js
const delay = (ms, value) =>
  new Promise((resolve, reject) => {
    if (ms < 0) return reject(new Error("Negative delay"));
    setTimeout(() => resolve(value), ms);
  });

delay(200, "OK").then(console.log).catch(console.error).finally(() => console.log("done"));
```

Line‑by‑line

- delay returns a new Promise and captures resolve/reject to control fulfillment or rejection asynchronously[^52_1].
- The executor validates inputs; a negative delay rejects immediately with an Error for a unified error path in consumers[^52_1].
- setTimeout simulates async work and calls resolve when finished; the promise transitions to fulfilled and queues then handlers in the microtask queue after the current task completes[^52_1][^52_3].
- then handles success, catch handles any rejection, and finally runs regardless of outcome for cleanup or telemetry[^52_1][^52_4].

Dev mindset

- Settle a promise once and surface non‑2xx or invalid states as rejections early to avoid “false success” paths later[^52_1].
- Prefer returning promises from utility functions to keep composition easy and testing straightforward[^52_2].


## 2) How does promise chaining run steps sequentially?

Chaining attaches then handlers where each handler returns either a value or another promise; the next step waits for that return to settle, ensuring strict sequencing[^52_2]. A single catch at the end handles rejections from any link in the chain, centralizing error handling while keeping code linear[^52_2].

Code

```js
const getUser = (id) => fetch(`/api/users/${id}`)
  .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));

const getOrders = (userId) => fetch(`/api/orders?userId=${userId}`)
  .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));

getUser("u1")
  .then(u => getOrders(u.id))        // return the next promise
  .then(orders => orders)         // return a value (wrapped)
  .then(order => render(order))
  .catch(err => showError(err));
```

Line‑by‑line

- getUser normalizes non‑2xx responses to rejections so subsequent steps don’t proceed on error, which keeps flows correct[^52_2][^52_1].
- getOrders applies the same normalization, giving consistent success/failure semantics for the chain[^52_2].
- Returning getOrders(u.id) delays the next then until that promise settles, enforcing sequential dependency[^52_2].
- Returning orders passes a value down the chain (auto‑wrapped as a resolved promise), keeping chaining simple[^52_2].
- A terminal catch handles any rejection from upstream, preventing unhandled rejections and centralizing recovery or messaging[^52_2].

Dev mindset

- Always return from then; otherwise, the chain breaks and later steps may run prematurely or miss failures[^52_2].
- Normalize HTTP and invalid states into rejections early to keep the chain’s control flow explicit and safe[^52_2].


## 3) Why use async/await and how to handle errors?

async/await makes promise code read like synchronous code while still being non‑blocking, and await pauses inside the async function until the promise settles or throws on rejection[^52_5][^52_6]. Use try/catch/finally around awaited operations to mirror robust synchronous error handling and guarantee cleanup[^52_7][^52_5].

Code

```js
async function loadLatestOrder(userId) {
  try {
    const uRes = await fetch(`/api/users/${userId}`);
    if (!uRes.ok) throw new Error(`HTTP ${uRes.status}`);
    const user = await uRes.json();

    const oRes = await fetch(`/api/orders?userId=${user.id}`);
    if (!oRes.ok) throw new Error(`HTTP ${oRes.status}`);
    const orders = await oRes.json();

    return orders.at(-1);
  } catch (err) {
    throw new Error("Load failed", { cause: err });
  } finally {
    // cleanup/telemetry
  }
}
```

Line‑by‑line

- Declaring async means the function returns a promise, so callers can await or chain as usual while enjoying linear control flow inside[^52_5].
- await fetch pauses until the network promise settles; non‑2xx is mapped to a thrown Error to maintain an explicit failure path[^52_6][^52_5].
- await uRes.json() may also throw; the catch block wraps the error with domain context while preserving the original via cause for better diagnosis[^52_8][^52_5].
- finally runs for both success and failure to ensure resources are released or metrics are recorded deterministically[^52_7].

Dev mindset

- Keep try blocks tight and add context when catching; rethrow unknowns so outer layers (e.g., controllers) can map errors appropriately[^52_7][^52_9].
- async/await simplifies logic, but the underlying semantics are still promises; reason about propagation and cleanup the same way[^52_5][^52_2].


## 4) How do microtasks affect promise timing?

Promise reactions (then/catch/finally) run as microtasks, which execute after the current script but before timers and other tasks, affecting ordering relative to setTimeout or rendering[^52_3][^52_1]. Understanding that microtasks drain completely before the next task helps explain why promise callbacks often run before timeout callbacks in the same tick[^52_3][^52_10].

Code

```js
console.log("A");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");
```

Explanation

- “A” and “B” print first as synchronous code in the current task, completing the run‑to‑completion segment[^52_3].
- The microtask from Promise.resolve then runs and prints “microtask” before any timer because the event loop drains the microtask queue next[^52_3].
- Finally, the setTimeout callback prints “timeout” as a macrotask in the next turn after microtasks complete, demonstrating the priority difference[^52_3].

Dev mindset

- Rely on microtask semantics to avoid race conditions with timers and to schedule post‑state updates using queueMicrotask if needed[^52_11][^52_3].
- Be cautious: adding microtasks recursively can starve the event loop if not bounded or designed carefully[^52_3].


## 5) When to use Promise.all, allSettled, or race?

Use Promise.all for fail‑fast batching when all results are required; it resolves to an array of values or rejects on the first failure[^52_12]. Use Promise.allSettled to always gather per‑item outcomes and proceed with partial success when tasks are independent or UI should show everything available[^52_13]. Use Promise.race when “first result wins” or for timeouts, handling whichever settles first regardless of fulfillment or rejection[^52_14].

Code

```js
// all: all-or-nothing
const [a, b] = await Promise.all([fa(), fb()]);

// allSettled: partial success
const settled = await Promise.allSettled([fa(), fb()]);
const ok = settled.filter(s => s.status === "fulfilled").map(s => s.value);
const errs = settled.filter(s => s.status === "rejected").map(s => s.reason);

// race: timeouts or first-wins
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
const data = await Promise.race([fetchJSON(url), timeout(3000)]);
```

Dev mindset

- Pick the combinator that matches policy: fail‑fast for dependencies, partial success for resilience, or race for responsiveness/timeouts[^52_12][^52_13][^52_14].
- Always interpret race results carefully since the “winner” may be a rejection; handle both outcomes cleanly[^52_14].


## 6) How to prevent unhandled rejections?

Always attach a terminal catch to chains or use try/catch around awaited operations to consume rejections and take action; otherwise they surface as unhandled rejections at runtime[^52_2]. Add a global unhandledrejection listener as a last‑resort backstop for logging and observability in browsers (and process 'unhandledRejection' in Node) for safety[^52_15].

Code

```js
// Chain sink
fetchJSON(url).then(use).catch(report);

// Global backstop
window.addEventListener("unhandledrejection", (e) => {
  console.error("UNHANDLED:", e.reason);
});
```

Dev mindset

- Treat a final catch as non‑optional; use global handlers for telemetry and to detect missed cases during development and testing[^52_2][^52_15].
- Keep error mapping at boundaries (UI/HTTP) and rethrow unknowns inside libraries to avoid silent corruption of state[^52_9].


## 7) How to add timeouts and cancellation?

Implement timeouts using Promise.race and reject after a deadline so callers can display consistent UX instead of waiting indefinitely[^52_14]. Use AbortController to cancel fetch or other cancellable APIs and convert abandoned work into a standard rejection path for cleanup and user feedback[^52_16][^52_17].

Code

```js
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));

async function fetchWithTimeout(url, ms = 3000) {
  const ctrl = new AbortController();
  try {
    return await Promise.race([
      fetch(url, { signal: ctrl.signal }),
      timeout(ms).catch(err => { ctrl.abort(); throw err; })
    ]);
  } finally {
    // metrics/cleanup
  }
}
```

Line‑by‑line

- timeout creates a rejection after ms and is raced against fetch to enforce a hard cap on waiting time[^52_14].
- AbortController’s signal lets fetch be aborted; on timeout, calling abort ensures the request and its resources are released promptly[^52_16][^52_17].
- finally allows consistent teardown (e.g., spinners/metrics), regardless of whether fetch or timeout wins the race[^52_7].

Dev mindset

- Always convert “slow” into a predictable error and cancel obsolete work to reduce resource waste and improve responsiveness[^52_16][^52_14].
- Design APIs so timeouts and cancellation are opt‑in but easy to adopt in latency‑sensitive paths[^52_16].


## 8) How to convert callback APIs to promises (promisify)?

Wrap a node‑style callback (err, data) in a new Promise and call resolve or reject from the callback, enabling it to compose cleanly with modern async flows[^52_2]. This allows unified error handling and use with async/await and combinators without callback nesting or inversion of control[^52_2].

Code

```js
const readFileP = (fs, path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) => (err ? reject(err) : resolve(data)))
  );

// usage
readFileP(fs, "config.json").then(JSON.parse).then(use).catch(handle);
```

Line‑by‑line

- readFileP constructs a promise around fs.readFile and forwards success/failure via resolve/reject, preserving error semantics faithfully[^52_2].
- Consumers can then chain JSON.parse and attach a single catch as a terminal sink, matching modern async patterns end‑to‑end[^52_2].

Dev mindset

- Promisify at the edge so downstream code stays consistent whether the source is a legacy callback or a native promise API[^52_2].
- Keep the callback contract identical when wrapping to avoid surprising differences in error or data handling for callers[^52_2].


## Interview approach

- Start with a precise definition and the correct API, then show a minimal working pattern and its error handling, emphasizing how to keep flows linear and safe[^52_1][^52_2].
- Explain microtask ordering and why then/catch/finally run before timers to justify observed behavior and prevent race conditions in UI logic[^52_3].
- Show policy‑driven combinators (all/allSettled/race) and how they map to UX and reliability requirements, not just mechanics[^52_12][^52_13][^52_14].

If needed, follow up with concurrency limits (p‑map style), memoization of in‑flight promises, and streaming with async iterators to round out real‑world async toolkit design[^52_18][^52_1].
<span style="display:none">[^52_19][^52_20][^52_21][^52_22][^52_23][^52_24][^52_25][^52_26][^52_27][^52_28][^52_29][^52_30][^52_31][^52_32][^52_33][^52_34][^52_35][^52_36]</span>

<div style="text-align: center">⁂</div>

[^52_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^52_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^52_3]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^52_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

[^52_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^52_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

[^52_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^52_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[^52_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^52_10]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth

[^52_11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask

[^52_12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^52_13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^52_14]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^52_15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event

[^52_16]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

[^52_17]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort

[^52_18]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Implementing_a_promise-based_API

[^52_19]: https://in.indeed.com/career-advice/interviewing/javascript-promise-interview-questions

[^52_20]: https://www.geeksforgeeks.org/javascript/javascript-promise/

[^52_21]: https://github.com/atapas/promise-interview-ready

[^52_22]: https://www.greatfrontend.com/questions/javascript/promise-all

[^52_23]: https://www.youtube.com/watch?v=1OINZhOIh0c

[^52_24]: https://interviewprep.org/async-await-interview-questions/

[^52_25]: https://blog.softbinator.com/javascript-microtask-and-macrotask/

[^52_26]: https://www.interviewbit.com/javascript-interview-questions/

[^52_27]: https://www.geeksforgeeks.org/javascript/async-await-function-in-javascript/

[^52_28]: https://dev.to/jeetvora331/difference-between-microtask-and-macrotask-queue-in-the-event-loop-4i4i

[^52_29]: https://dev.to/giulianaolmos/technical-interview-questions-part-7-promises-methods-311n

[^52_30]: https://www.greatfrontend.com/questions/quiz/what-is-asyncawait-and-how-does-it-simplify-asynchronous-code

[^52_31]: https://www.reddit.com/r/javascript/comments/1ah4fng/askjs_can_you_do_this_async_javascript_interview/

[^52_32]: https://www.bytehide.com/blog/csharp-async-await-interview-questions

[^52_33]: https://stackoverflow.com/questions/25915634/difference-between-microtask-and-macrotask-within-an-event-loop-context

[^52_34]: https://www.vinsys.com/blog/javascript-interview-questions

[^52_35]: https://javascript.info/event-loop

[^52_36]: https://www.greatfrontend.com/questions/quiz/explain-the-concept-of-a-microtask-queue


---

# What are common JavaScript Promise interview questions and answers

Here are the most common JavaScript Promise interview questions with precise answers, code, line-by-line explanations, and developer mindset to solve problems in real projects and interviews.

## Direct answer

The most asked Promise questions cover definitions, states, chaining, error handling, combinators (all, allSettled, race), async/await, microtasks, cancellation, unhandled rejections, and patterns like promisify and concurrency control; the key is writing clear sequencing, predictable error propagation, and robust cleanup using **Promise** semantics.

## 1) What is a Promise?

- A **Promise** represents a future value from an asynchronous operation with a single success or failure result.
- States: pending → fulfilled or rejected; once settled, the state is immutable.

Code

```js
const delay = (ms, value) =>
  new Promise((resolve, reject) => {
    if (ms < 0) return reject(new Error("Negative delay"));
    setTimeout(() => resolve(value), ms);
  });

delay(200, "OK").then(console.log).catch(console.error).finally(() => console.log("done"));
```

Line-by-line

- `new Promise((resolve, reject) => { ... })`: constructs a promise and captures settlement functions.
- Guard: if `ms` invalid, reject early to normalize error flow.
- `setTimeout(...resolve(value))`: fulfill after `ms`.
- Chain: `.then` for success, `.catch` for failure, `.finally` for cleanup.

Mindset

- Settle a promise exactly once and normalize invalid states as rejections early.


## 2) How to create and resolve/reject Promises?

- Create with `new Promise(executor)`.
- Synthetics: `Promise.resolve(value)`, `Promise.reject(error)`.

Code

```js
const ok = Promise.resolve(42);
const fail = Promise.reject(new Error("boom"));
ok.then(v => v + 1).then(console.log);       // 43
fail.catch(e => console.error(e.message));   // boom
```

Explanation

- `resolve/reject` helpers are concise for tests and composition.

Mindset

- Prefer `Promise.resolve`/`reject` in tests or when adapting sync values into async pipelines.


## 3) How does promise chaining ensure sequence?

- Return either a value or another promise from `.then`; the next step waits for it.

Code

```js
fetchUser("u1")
  .then(u => fetchOrders(u.id))       // returns a promise
  .then(orders => orders.at(-1))      // returns a value (auto-wrapped)
  .then(order => fetchOrderItems(order.id))
  .then(items => render(items))
  .catch(err => notify(err));
```

Line-by-line

- Step 1 → Step 2 waits; Step 2 → Step 3 transforms; Step 3 → Step 4 waits; terminal `.catch` handles any upstream rejection.

Mindset

- Always return from `.then`; normalize non-2xx to rejections early to avoid false success.


## 4) How to handle errors in chains?

- Place a terminal `.catch` to capture any rejection. Handle specific errors locally, rethrow unknowns.

Code

```js
doStep1()
  .then(x => doStep2(x))
  .catch(err => {
    if (err.name === "ValidationError") return defaultValue;
    throw err; // keep chain rejected
  })
  .then(y => doStep3(y))
  .catch(finalHandler);
```

Explanation

- Local recovery only for known cases, otherwise rethrow to preserve failure signal.

Mindset

- Don’t swallow errors; let legitimate failures propagate to an appropriate boundary.


## 5) How to implement async/await correctly?

- Await inside `try/catch`; map non-2xx to throws; use `finally` for cleanup.

Code

```js
async function loadJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error("Load failed", { cause: err });
  } finally {
    // cleanup/metrics
  }
}
```

Explanation

- Await bridges rejection into `catch`. Throw on non-2xx to keep control flow explicit.

Mindset

- Keep `try` blocks tight; add context when catching; rethrow unknowns.


## 6) What’s the difference: then/catch vs async/await?

- Both use Promises; async/await reads like sync code with `try/catch/finally`.
- `.then/.catch` is great for functional composition; async/await improves readability for complex flows.

Code

```js
// then/catch
fetch(url).then(check).then(toJson).then(use).catch(handle);

// async/await
try { const data = await toJson(await check(await fetch(url))); use(data); }
catch (e) { handle(e); }
```

Mindset

- Choose the style that communicates intent best; mix carefully to avoid handling gaps.


## 7) What do Promise combinators do?

- **Promise.all**: fail-fast batch; resolves to array or rejects on first failure.
- **Promise.allSettled**: never rejects; returns [{status, value|reason}] for every input.
- **Promise.race**: settles as soon as the first input settles (fulfill or reject).
- **Promise.any**: fulfills on first fulfillment; rejects if all reject.

Code

```js
// All-or-nothing
const [a, b] = await Promise.all([fa(), fb()]);

// Partial success
const settled = await Promise.allSettled([fa(), fb()]);
const ok = settled.filter(s => s.status === "fulfilled").map(s => s.value);

// Race (timeouts)
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
const data = await Promise.race([fetchJSON(url), timeout(3000)]);
```

Mindset

- Pick by policy: fail-fast vs resilience vs responsiveness.


## 8) How do microtasks affect Promise timing?

- Promise reactions (`then/catch/finally`) run as microtasks: after the current script, before timers.

Code

```js
console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");
// Output: A, B, microtask, timer
```

Mindset

- Rely on microtask priority to order follow-ups; use `queueMicrotask` for precise post-state steps.


## 9) How to prevent unhandled rejections?

- Always attach a terminal `.catch` or use `try/catch` around `await`.
- Add a global backstop for visibility.

Code

```js
doAsync().then(use).catch(report);

window.addEventListener("unhandledrejection", (e) => {
  console.error("UNHANDLED:", e.reason);
});
```

Mindset

- Treat missing catch as a production bug; monitor and test error paths, not only happy paths.


## 10) How to implement timeouts and cancellation?

- Timeouts: `Promise.race` with a timer promise; cancellation: `AbortController`.

Code

```js
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
async function fetchWithTimeout(url, ms=3000) {
  const ctrl = new AbortController();
  try {
    const p = fetch(url, { signal: ctrl.signal });
    return await Promise.race([p, timeout(ms).catch(e => { ctrl.abort(); throw e; })]);
  } finally {
    // metrics
  }
}
```

Mindset

- Convert “slow” into explicit failure; abort obsolete work to free resources.


## 11) How to promisify a callback API?

- Wrap node-style `(err, data)` callbacks into a Promise.

Code

```js
const readFileP = (fs, path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) => err ? reject(err) : resolve(data))
  );
```

Mindset

- Promisify at edges to unify composition across old and new APIs.


## 12) How to run a dynamic sequence (N steps) sequentially?

- Reduce over tasks, returning the next promise each time.

Code

```js
function chainSequential(tasks, initial) {
  return tasks.reduce((p, task) => p.then(task), Promise.resolve(initial));
}
```

Mindset

- Declarative chaining avoids nested code and scales with variable-length pipelines.


## 13) How to combine parallel and sequential work?

- Run independent tasks with `Promise.all`, then continue sequentially.

Code

```js
const [user, prefs] = await Promise.all([getUser(id), getPrefs(id)]);
const recs = await getRecs(user.id, prefs.theme);
```

Mindset

- Parallelize what’s independent; chain what’s dependent.


## 14) What does Promise.prototype.finally guarantee?

- `finally` runs after fulfillment or rejection; it does not modify the value/reason unless an error is thrown inside it.

Code

```js
doAsync()
  .then(use)
  .catch(handle)
  .finally(cleanup);
```

Mindset

- Put teardown in `finally`; don’t mutate results there unless intentionally throwing.


## 15) Common Promise anti-patterns (and fixes)

- Not returning from `.then` → breaks sequence. Fix: always return a value/promise.
- Multiple `.then` on same promise expecting sequence → siblings run independently. Fix: chain off previous `.then`.
- Mixing `await` with bare `.then` → handling gaps. Fix: stick to one style per flow or catch both.
- Throwing strings/non-Error → lost stack/type. Fix: `throw new Error("message")`.
- Huge `try` blocks and missing `finally` → unclear faults and leaks. Fix: tight `try`, mandatory `finally`.


## 16) How to implement a simple retry with backoff?

- Retry retriable errors only; cap attempts; exponential backoff.

Code

```js
async function retry(fn, times=3, base=200, isRetriable=() => true) {
  let last;
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (!isRetriable(e) || i === times - 1) break;
      await new Promise(r => setTimeout(r, base * 2 ** i));
    }
  }
  throw last;
}
```

Mindset

- Improve resilience without amplifying outages; keep failures observable by rethrowing after exhaustion.


## 17) How to memoize in-flight Promises?

- Cache ongoing promises to dedupe concurrent identical requests.

Code

```js
const inflight = new Map();
async function fetchOnce(key, fn) {
  if (inflight.has(key)) return inflight.get(key);
  const p = fn().finally(() => inflight.delete(key));
  inflight.set(key, p);
  return p;
}
```

Mindset

- Prevent duplicate network calls and collapse bursts into one fetch; clean cache on settle.


## 18) What is Promise.any used for?

- Fulfill on first fulfillment; reject with AggregateError if all reject.

Code

```js
const result = await Promise.any([probeA(), probeB(), probeC()]);
```

Mindset

- Useful for “fastest successful source wins” across replicas/providers.


## 19) How to enforce per-step timeouts in a chain?

- Wrap each step with `withTimeout`.

Code

```js
const withTimeout = (p, ms) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))]);
```

Mindset

- Make latency budgets explicit; fail predictably and surface actionable errors.


## 20) What’s the difference between fulfillment value and settled promise?

- `.then` handlers may return either a value (wrapped) or a promise; the next step waits only if a promise is returned.

Code

```js
Promise.resolve(1)
  .then(v => v + 1)              // value → wrapped
  .then(v => Promise.resolve(v))  // promise → awaited
  .then(console.log);             // 2
```

Mindset

- Understand implicit wrapping to reason about when the chain waits.

If needed, this set can be expanded with concurrency limits (p‑map), streaming with async iterators, and error taxonomy design to align Promise flows with production-grade observability and recovery.
<span style="display:none">[^53_1][^53_2][^53_3][^53_4][^53_5][^53_6][^53_7][^53_8]</span>

<div style="text-align: center">⁂</div>

[^53_1]: https://testbook.com/interview/javascript-promise-interview-questions

[^53_2]: https://in.indeed.com/career-advice/interviewing/javascript-promise-interview-questions

[^53_3]: https://www.interviewbit.com/javascript-interview-questions/

[^53_4]: https://www.geeksforgeeks.org/javascript/javascript-promise/

[^53_5]: https://builtin.com/software-engineering-perspectives/javascript-interview-questions

[^53_6]: https://www.greatfrontend.com/questions/javascript/promise-all

[^53_7]: https://www.youtube.com/watch?v=1OINZhOIh0c

[^53_8]: https://arunangshudas.com/blog/can-you-answer-this-senior-level-javascript-promise-interview-question/


---

# What are common JavaScript Promise interview questions and answers

Common JavaScript Promise interview questions revolve around definitions, state transitions, chaining, centralized error handling, combinators (all, allSettled, race, any), async/await, microtasks, cancellation/timeouts, and adapting callback APIs—mastering these yields readable, predictable, and robust async flows. The key is to compose steps cleanly, propagate errors intentionally, and use finally/cancellation to keep resources and UI consistent.

## Promise basics

- A Promise is an object representing an async result with three states: pending → fulfilled or rejected; once settled, it’s immutable and notifies then/catch/finally handlers.
- Construct with new Promise((resolve, reject) => {...}); resolve to fulfill, reject to fail; use Promise.resolve/Promise.reject to create settled promises quickly.

```js
const delay = (ms, val) => new Promise((res, rej) => {
  if (ms < 0) return rej(new Error("Negative delay"));
  setTimeout(() => res(val), ms);
});
delay(200, "OK").then(console.log).catch(console.error).finally(() => console.log("done"));
```

- How it works: resolve moves to fulfilled and schedules .then; reject moves to rejected and schedules .catch; .finally always runs for cleanup.


## Chaining and sequencing

- Returning a value or promise from .then ensures the next .then waits for that return, creating strict sequence without nesting.
- Always return from .then; forgetting breaks sequencing and can hide rejections.

```js
fetchUser("u1")
  .then(u => fetchOrders(u.id))      // returns a promise → waits
  .then(orders => orders.at(-1))     // returns a value → auto-wrapped
  .then(order => render(order))
  .catch(err => notify(err));
```

- Keep transformations pure mid-chain and do side effects at the boundaries for clarity and testability.


## Error handling in chains

- A single terminal .catch handles any rejection in the chain; catch in the middle only if recovery is possible, then rethrow unknowns.
- Normalize non-2xx HTTP as rejections early to avoid “false success” later.

```js
doA()
  .then(x => doB(x))
  .catch(e => { if (e.name === "ValidationError") return defaultValue; throw e; })
  .then(y => doC(y))
  .catch(finalHandler);
```

- This pattern preserves failure signal while allowing targeted, local recovery where appropriate.


## Async/await with try/catch/finally

- async/await uses promises under the hood and allows synchronous-looking control flow with try/catch/finally around awaited steps.
- Map non-2xx to throws, add domain context on catch, and use finally for deterministic cleanup.

```js
async function loadJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error("Load failed", { cause: err });
  } finally {
    // cleanup/metrics
  }
}
```

- Keep try blocks tight and rethrow unknowns so outer layers can log, retry, or fail fast as policy.


## Combinators: all, allSettled, race, any

- Promise.all is fail-fast “all-or-nothing” and preserves order of results; reject on first failure for dependency batches.
- Promise.allSettled always resolves with per-item status/value/reason, enabling partial success flows; Promise.race is “first settled wins”; Promise.any fulfills on first success.

```js
const [a,b] = await Promise.all([fa(), fb()]);
const settled = await Promise.allSettled([fa(), fb()]);
const ok = settled.filter(s => s.status === "fulfilled").map(s => s.value);
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
const fastest = await Promise.race([fetchJSON(u), timeout(3000)]);
```

- Choose by policy: dependencies (all), resilient fan-out (allSettled), responsiveness/timeouts (race), or “first success wins” (any).


## Microtasks and ordering

- Promise reactions (then/catch/finally) run as microtasks after the current script and before timers, affecting ordering with setTimeout.
- Use queueMicrotask for deterministic “after state change” work that must run before the next macrotask.

```js
console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("microtask"));
console.log("B");
// Output: A, B, microtask, timer
```

- Understanding microtask priority helps prevent UI race conditions and explains observed execution order.


## Unhandled rejections

- Always attach a terminal .catch or surround await with try/catch; missing handlers create unhandled rejections.
- Add a global backstop (e.g., unhandledrejection listener in browsers) for telemetry and detection in development.

```js
doAsync().then(use).catch(report);
window.addEventListener("unhandledrejection", e => console.error("UNHANDLED:", e.reason));
```

- Treat missing catch as a defect and test error paths, not just happy paths.


## Timeouts and cancellation

- Convert “slow” to explicit failure via Promise.race; cancel fetch with AbortController to free resources and keep UX responsive.
- Aborted operations reject with an AbortError, allowing consistent treatment in catch.

```js
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
async function fetchWithTimeout(url, ms=3000) {
  const ctrl = new AbortController();
  try {
    return await Promise.race([
      fetch(url, { signal: ctrl.signal }),
      timeout(ms).catch(e => { ctrl.abort(); throw e; })
    ]);
  } finally {
    // cleanup
  }
}
```

- Make latency budgets explicit and abort obsolete work to avoid leaks and wasted compute.


## Promisify callback APIs

- Wrap node-style callbacks (err, data) in a Promise to unify composition and error semantics.
- This enables chaining, async/await, and combinators without callback nesting.

```js
const readFileP = (fs, path) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) => err ? reject(err) : resolve(data))
  );
```

- Promisify at integration edges so downstream code stays consistent and test-friendly.


## Sequential dynamic pipelines

- When the number of steps is dynamic, reduce over tasks so each step waits for the previous result.
- Each task must return a value or a promise; never forget the return.

```js
function chainSequential(tasks, initial) {
  return tasks.reduce((p, task) => p.then(task), Promise.resolve(initial));
}
```

- This declarative approach scales without nesting and retains centralized error handling with a final .catch.


## Concurrency limit (bonus)

- For bounded parallelism, use a small pool to run at most N promises concurrently, improving throughput without overload.

```js
async function pMap(items, fn, limit=5) {
  const res = new Array(items.length);
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const idx = i++;
      res[idx] = await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
  return res;
}
```

- Bounded concurrency stabilizes latency and resource usage while still leveraging parallelism.


## Developer mindset

- Compose steps with clear return semantics, centralize error handling, and always clean up in finally to prevent leaks or stuck UI.
- Pick combinators by policy (fail-fast vs resilience vs responsiveness), understand microtask timing, and make timeouts/cancellation first-class for production-grade reliability.
<span style="display:none">[^54_1][^54_2][^54_3][^54_4][^54_5][^54_6][^54_7][^54_8]</span>

<div style="text-align: center">⁂</div>

[^54_1]: https://testbook.com/interview/javascript-promise-interview-questions

[^54_2]: https://in.indeed.com/career-advice/interviewing/javascript-promise-interview-questions

[^54_3]: https://www.interviewbit.com/javascript-interview-questions/

[^54_4]: https://www.geeksforgeeks.org/javascript/javascript-promise/

[^54_5]: https://builtin.com/software-engineering-perspectives/javascript-interview-questions

[^54_6]: https://www.greatfrontend.com/questions/javascript/promise-all

[^54_7]: https://www.youtube.com/watch?v=1OINZhOIh0c

[^54_8]: https://arunangshudas.com/blog/can-you-answer-this-senior-level-javascript-promise-interview-question/


---

# How to prepare for JavaScript Promise interview questions effectively

Effective preparation focuses on mastering core concepts, hands-on patterns, and explaining trade-offs with clear code and reasoning, using authoritative docs to align answers with how Promises actually behave in JavaScript[^55_1][^55_2]. The plan below targets definitions, chaining, errors, combinators, microtasks, async/await, and practical utilities like timeouts, cancellation, and promisification with examples and drills[^55_3][^55_4].

## What to master

- Promise fundamentals: states, settlement, and how then/catch/finally schedule microtasks for handlers to run predictably after the current task[^55_1][^55_5].
- Chaining and sequencing: always return a value or promise from then so the next step waits; keep terminal catch to centralize failures[^55_2][^55_5].
- Combinators by policy: use all for fail‑fast dependencies, allSettled for partial results, race for timeouts/first‑wins, and any for first success semantics[^55_3][^55_4][^55_6][^55_7].


## Core code patterns

- Normalize HTTP early and chain cleanly: map non‑2xx to rejections so later steps don’t run on invalid data[^55_2][^55_1].

```js
const getJSON = (url) =>
  fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))); // normalize early [^55_1][^55_2]
```

- Sequential steps via chaining: return the next promise or a plain value for strict sequencing without nesting[^55_2][^55_5].

```js
getJSON("/user")
  .then(u => getJSON(`/orders?uid=${u.id}`)) // waits for orders [^55_1]
  .then(os => os.at(-1))                     // pass value (auto‑wrapped) [^55_14]
  .then(o => getJSON(`/orders/${o.id}/items`))
  .catch(err => notify(err));                // terminal catch [^55_1]
```

- Async/await with try/catch/finally: same semantics with clearer flow and guaranteed cleanup[^55_8][^55_9].

```js
async function load(url) {
  try {
    const r = await fetch(url); if (!r.ok) throw new Error(`HTTP ${r.status}`); // map non‑2xx [^55_21]
    return await r.json();                                                     // may throw [^55_21]
  } finally {
    // telemetry/cleanup [^55_22]
  }
}
```


## Concurrency and policy

- Batch with all when every result is required; the returned promise fulfills with an array or rejects on the first failure[^55_3].
- Use allSettled to always collect [{status, value|reason}] and proceed with successes while inspecting failures for resilient UI or background tasks[^55_4].

```js
const settled = await Promise.allSettled([a(), b(), c()]); // per-item outcomes [^55_5]
```

- Race for timeouts or first result wins; remember the winner might be a rejection and handle both outcomes[^55_6].

```js
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)); // partner [^55_20]
```


## Microtasks and ordering

- Promise reactions run as microtasks, which drain after the current script and before timers; understanding this explains why then/catch run before setTimeout in the same tick[^55_10][^55_11].

```js
queueMicrotask(() => flushState()); // schedule post‑state work before timers/render [^55_7]
```


## Utilities to practice

- Promisify callback APIs with the Promise constructor to unify composition and error handling[^55_12][^55_2].

```js
const readFileP = (fs, path) => new Promise((res, rej) => fs.readFile(path, "utf8", (e, d) => e ? rej(e) : res(d))); // wrap [^55_17]
```

- Build a timeout wrapper using race, and integrate it with fetch to standardize latency budgets and failure modes[^55_6][^55_3].
- Implement cancellation with AbortController so slow/obsolete requests reject with AbortError and free resources deterministically[^55_13][^55_14].


## Practice drills

- Write a 3‑step sequential chain that fetches user → orders → items, with one terminal catch and early HTTP normalization to rejections[^55_2][^55_1].
- Convert a Node‑style callback function to a Promise and use it in async/await code with proper try/catch and finally for cleanup[^55_12][^55_8].
- Compare all vs allSettled on a set of mixed success/failure tasks and print only fulfilled values while logging rejection reasons[^55_3][^55_4].
- Schedule a microtask to run after a state change and show why it executes before a zero‑delay timer in the same tick to demonstrate ordering guarantees[^55_11][^55_10].


## Common pitfalls to avoid

- Not returning from then, which breaks sequencing or hides rejections; always return the next value/promise explicitly[^55_2][^55_5].
- Missing terminal catch or try/catch around await, which leads to unhandled rejections; add a final catch and global backstops as last resort[^55_2][^55_1].
- Picking the wrong combinator (e.g., all when partial success is desired) or forgetting that race may reject first; choose by policy and handle both outcomes[^55_3][^55_4][^55_6].


## Study plan (7–10 hours)

- Read and code along: Promise reference and Using promises to internalize states, chaining, and error propagation in small examples[^55_1][^55_2].
- Deep dive: all, allSettled, race, any; implement tiny examples and explain when to use each with pros/cons[^55_3][^55_4][^55_6][^55_7].
- Timing: microtask guide and queueMicrotask exercises to cement ordering relative to timers and UI rendering[^55_10][^55_11].
- Build utilities: promisify a callback API, add timeout via race, and integrate AbortController cancellation to simulate realistic network handling[^55_12][^55_6].


## Interview delivery tips

- Start with a precise definition, then a minimal, correct pattern, and conclude with when/why to choose it over alternatives to show judgment[^55_1][^55_2].
- Narrate error flow and cleanup: where errors are normalized, where they’re caught/mapped, and what finally guarantees for resources and UX[^55_9][^55_2].

With these concepts, patterns, and drills grounded in MDN semantics, answers will be accurate, concise, and demonstrably practical for real-world async JavaScript[^55_1][^55_2].
<span style="display:none">[^55_15][^55_16][^55_18][^55_19][^55_23][^55_24]</span>

<div style="text-align: center">⁂</div>

[^55_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^55_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^55_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^55_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^55_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[^55_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^55_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

[^55_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^55_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

[^55_10]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^55_11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask

[^55_12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

[^55_13]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

[^55_14]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort

[^55_15]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises

[^55_16]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

[^55_17]: https://news.ycombinator.com/item?id=23223881

[^55_18]: https://www.w3schools.com/js/js_promise.asp

[^55_19]: https://stackoverflow.com/questions/59784175/differences-between-promise-all-and-promise-allsettled-in-js

[^55_20]: https://udn.realityripple.com/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask

[^55_21]: https://caniuse.com/mdn-javascript_builtins_promise_allsettled

[^55_22]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/queueMicrotask

[^55_23]: https://www.reddit.com/r/javascript/comments/ia5jcm/an_in_depth_explanation_of_promiseall_and/

[^55_24]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth


---

# How to prepare for JavaScript Promise interview questions effectively

The fastest way to prepare effectively is to master core Promise semantics from MDN, drill the most-used patterns with code, and explain trade‑offs for sequencing, errors, and concurrency using concise, policy‑driven reasoning in interviews[^56_1][^56_2]. Focus on chaining, centralized error handling, combinators (all, allSettled, race, any), microtasks ordering, async/await with try/catch/finally, and utilities like promisify, timeouts, and cancellation[^56_1][^56_3].

## What to master

- Promise lifecycle and handlers: pending → fulfilled/rejected, .then/.catch/.finally behavior, and how handler return values or nested promises drive sequencing and propagation[^56_2][^56_4].
- Chaining and sequencing: always return from .then, keep a terminal .catch, and normalize non‑2xx HTTP to rejections early to avoid “false success”[^56_1][^56_4].
- Combinators by policy: Promise.all for fail‑fast dependencies, Promise.allSettled for partial success processing, Promise.race for timeouts/first‑wins, and Promise.any for first success semantics[^56_3][^56_5][^56_6][^56_7].
- Microtasks and ordering: understand that promise reactions run as microtasks, which execute after the current script and before timers; use queueMicrotask for precise post‑state steps[^56_8][^56_9].


## Essential code patterns

- Normalize HTTP and chain cleanly: map non‑2xx to thrown/rejected errors up front[^56_1][^56_2].

```js
const getJSON = (url) =>
  fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))); // normalize early [^56_1][^56_2]
```

- Sequential chain with a terminal catch: return values or promises from every then to enforce order and centralize failure handling[^56_1][^56_4].

```js
getJSON("/user")
  .then(u => getJSON(`/orders?uid=${u.id}`))     // waits for next promise [^56_1]
  .then(orders => orders.at(-1))                 // value auto‑wrapped [^56_14]
  .then(order => getJSON(`/orders/${order.id}/items`))
  .catch(err => toast(err.message));             // terminal sink [^56_1]
```

- Async/await with try/catch/finally: same semantics with clearer flow and deterministic cleanup[^56_10][^56_11].

```js
async function load(url) {
  try {
    const r = await fetch(url); if (!r.ok) throw new Error(`HTTP ${r.status}`); // map non‑2xx [^56_21]
    return await r.json();                                                      // may throw [^56_21]
  } finally {
    // telemetry/cleanup [^56_22]
  }
}
```

- Promisify a callback API: use the Promise constructor for legacy interop and testing[^56_12][^56_1].

```js
const readFileP = (fs, path) =>
  new Promise((res, rej) => fs.readFile(path, "utf8", (e, d) => e ? rej(e) : res(d))); // wrap [^56_17]
```

- Concurrency by policy: all for all‑or‑nothing, allSettled for resilient UIs, race for timeouts[^56_3][^56_5][^56_6].

```js
const settled = await Promise.allSettled([a(), b(), c()]); // [{status,value|reason}] [^56_5]
```

- Microtask sequencing: schedule “after state” tasks deterministically[^56_9][^56_8].

```js
queueMicrotask(() => flushState()); // runs before timers of same tick [^56_7]
```


## Practice plan (5 focused sessions)

- Session 1: Read MDN “Using promises” and the Promise reference; build small examples for .then/.catch/.finally and handler return semantics[^56_1][^56_2].
- Session 2: Implement sequential chains and async/await equivalents; write tests that force both success and failure paths to see propagation[^56_1][^56_10].
- Session 3: Drill combinators with mixed success/failure tasks; explain when and why to choose all vs allSettled vs race vs any with concrete UX policies[^56_3][^56_5][^56_6][^56_7].
- Session 4: Do timing drills with microtasks vs setTimeout and practice queueMicrotask for ordered follow‑ups, then explain observed logs and why ordering occurs[^56_8][^56_9].
- Session 5: Utilities: promisify a callback, build withTimeout using race, and integrate AbortController cancellation; explain error mapping and cleanup in finally[^56_12][^56_6].


## Mock interview prompts to rehearse

- “Show promise chaining for user → orders → items and then refactor to async/await, explaining error mapping and finally cleanup.”[^56_1][^56_10]
- “Compare Promise.all vs allSettled with code and describe when each is correct for product requirements.”[^56_3][^56_5]
- “Demonstrate a deterministic log order between microtasks and a zero‑delay timer and explain why.”[^56_8][^56_9]
- “Promisify a callback API and add a timeout wrapper using race; justify the error story and edge cases.”[^56_12][^56_6]


## Frequent pitfalls to avoid

- Not returning from then, which breaks sequencing and hides rejections; always return a value or promise explicitly[^56_1][^56_4].
- Missing a terminal catch or try/catch around await, leading to unhandled rejections; ensure a chain sink and rehearse a global backstop for visibility in apps[^56_1][^56_2].
- Choosing the wrong combinator for policy (e.g., all when partial results are acceptable) or forgetting that race may reject first; handle both outcomes carefully[^56_3][^56_5][^56_6].


## Quick reference drill list

- Promise.resolve vs new Promise and where each is idiomatic in tests and adapters[^56_13][^56_12].
- allSettled structure and reading status/value/reason maps for resilient fan‑out UIs[^56_5][^56_14].
- Microtask guiding principles and queueMicrotask usage in render‑adjacent workflows[^56_8][^56_15].

By anchoring preparation to MDN semantics, drilling the core patterns above, and practicing policy explanations for sequencing, errors, and concurrency, interview responses will be accurate, concise, and grounded in production‑grade reasoning[^56_1][^56_2].
<span style="display:none">[^56_16][^56_18][^56_19][^56_20]</span>

<div style="text-align: center">⁂</div>

[^56_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^56_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^56_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^56_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[^56_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^56_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^56_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

[^56_8]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^56_9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask

[^56_10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^56_11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally

[^56_12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

[^56_13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

[^56_14]: https://caniuse.com/mdn-javascript_builtins_promise_allsettled

[^56_15]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/queueMicrotask

[^56_16]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises

[^56_17]: https://news.ycombinator.com/item?id=23223881

[^56_18]: https://www.w3schools.com/js/js_promise.asp

[^56_19]: https://stackoverflow.com/questions/59784175/differences-between-promise-all-and-promise-allsettled-in-js

[^56_20]: https://udn.realityripple.com/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask

[^56_21]: https://www.reddit.com/r/javascript/comments/ia5jcm/an_in_depth_explanation_of_promiseall_and/

[^56_22]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth


---

# What are the best practices for solving asynchronous problems in interviews

The best way to solve asynchronous interview problems is to model the flow with Promises (or async/await), choose the right combinator for concurrency, and keep error handling centralized and explicit with a terminal catch or try/catch/finally, while understanding microtask ordering so behavior is predictable under the event loop [^57_1][^57_2]. Strong answers pair minimal, correct code with a clear explanation of sequencing, propagation, and policy (fail-fast vs partial success vs timeouts) grounded in Promise semantics [^57_1][^57_3].

## Mindset

- Translate the prompt into an async pipeline: identify dependencies between steps, what can run in parallel, and what to do on success, failure, and timeout before writing code [^57_1].
- Decide the policy up front: “all-or-nothing” (fail fast), “collect everything” (partial success), or “first result wins”, and choose the Promise tool that encodes that policy directly in code [^57_3][^57_4][^57_5][^57_6].


## Use the right primitives

- Prefer Promises (or async/await) over callbacks so sequencing, error propagation, and cleanup are explicit and composable across steps and libraries [^57_1][^57_2].
- With async/await, keep awaits inside try/catch and use finally for teardown; with .then chains, always end with a terminal .catch (and optionally .finally) to keep failures observable and cleanup deterministic [^57_1].


## Sequencing (one-after-another)

- Chain with .then by always returning the next value or Promise so the next step waits; a single terminal .catch handles any upstream rejection cleanly [^57_1][^57_7].

```js
getJSON("/user")
  .then(u => getJSON(`/orders?uid=${u.id}`))        // return next Promise [^57_1]
  .then(orders => orders.at(-1))                    // return value (auto-wrapped) [^57_11]
  .then(order => getJSON(`/orders/${order.id}/items`))
  .catch(err => notify(err));                       // terminal sink [^57_1]
```


## Concurrency (run together)

- Use Promise.all for fail‑fast batches when all results are required; it fulfills with an ordered array or rejects on the first failure, matching “all-or-nothing” requirements [^57_3].
- Use Promise.allSettled when each outcome must be observed regardless of failures; it always resolves with [{status, value|reason}] so partial successes can proceed [^57_4].
- Use Promise.race for timeouts or “first result wins”; be ready to handle a rejection winning the race (e.g., timeout) [^57_5].
- Use Promise.any to fulfill on the first success and aggregate errors only if all fail, ideal when “any available source” is acceptable [^57_6].


## Normalize errors early

- Convert non‑2xx HTTP responses into rejections up front so downstream steps don’t proceed on invalid data; this keeps the pipeline’s control flow correct and simplifies .catch or try/catch logic [^57_1][^57_2].

```js
const getJSON = url =>
  fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))); // normalize [^57_1][^57_2]
```


## Microtask ordering

- Promise reactions (.then/.catch/.finally) run as microtasks, which execute after the current script but before timers; knowing this explains why Promise callbacks run before setTimeout in the same tick and prevents ordering bugs in UI logic [^57_8].
- Use queueMicrotask to schedule “after state change” work that must run before the next macrotask for deterministic follow-ups in solutions and explanations [^57_9].


## Timeouts (and responsiveness)

- Build timeouts by racing the work against a timer Promise; if the timer wins, reject with a clear error so callers can show deterministic UX rather than hanging indefinitely [^57_5].

```js
const timeout = ms => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms)); // partner [^57_17]
```


## Error handling patterns

- Keep try blocks tight; add context when catching; handle only cases this layer can recover from and rethrow unknowns so failures stay visible to outer handlers or tests [^57_1].
- Always include a terminal .catch or a surrounding try/catch in async/await so there are no unhandled rejections and interviewers see a complete failure story [^57_1].


## Explain trade-offs while coding

- Justify choice of combinator with the problem’s policy: all (fail-fast) for dependent inputs, allSettled for partial success UIs, race for timeouts/first‑wins, any for first success across replicas/providers [^57_3][^57_4][^57_5][^57_6].
- Call out microtask ordering when relevant (why .then handlers run before timers) and how that influences logging and UI updates in tests or whiteboard traces [^57_8].


## Rapid templates to reuse

- Sequential: return from every .then and end with .catch; or use async/await with try/catch/finally for clarity and guaranteed cleanup [^57_1].
- Batch: Promise.all for all‑or‑nothing; Promise.allSettled to collect and filter results; Promise.race for time caps; Promise.any for first usable winner, all backed by concise code snippets [^57_3][^57_4][^57_5][^57_6].


## Practice plan

- Drill MDN’s Using promises and the Promise reference to internalize handler semantics, return rules, and propagation behavior with small examples and outputs to discuss in interviews [^57_1][^57_2].
- Implement and rehearse: sequential chain, async/await equivalent with try/catch/finally, all vs allSettled comparison, and a timeout wrapper with race, each with a one‑sentence policy justification [^57_1][^57_3][^57_4][^57_5].

By coding with these patterns and narrating the policy and event loop reasoning, answers stay concise, correct, and production‑grade—exactly what interviewers look for in asynchronous JavaScript solutions [^57_1][^57_2].
<span style="display:none">[^57_10][^57_12][^57_13][^57_14][^57_15][^57_16][^57_18][^57_19][^57_20]</span>

<div style="text-align: center">⁂</div>

[^57_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^57_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^57_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^57_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^57_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^57_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

[^57_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[^57_8]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^57_9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask

[^57_10]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises

[^57_11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

[^57_12]: https://www.w3schools.com/js/js_promise.asp

[^57_13]: https://www.w3schools.com/jsref/jsref_promise_all.asp

[^57_14]: https://javascript.info/event-loop

[^57_15]: https://stackoverflow.com/questions/59784175/differences-between-promise-all-and-promise-allsettled-in-js

[^57_16]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^57_17]: https://stackoverflow.com/questions/78500590/can-someone-explain-the-mdn-example-of-using-microtasks-to-ensure-consistent-ord

[^57_18]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

[^57_19]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^57_20]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth


---

# How does Promise.all help manage multiple asynchronous operations

**Promise.all** lets multiple asynchronous operations run together and produces one aggregated result, so code can wait for “all or nothing” with a single success/failure path that’s easy to reason about. It improves performance by starting independent tasks concurrently and returns results in a stable order, while failing fast if any task rejects.

## Why it helps

- Aggregates many async tasks into one promise, simplifying flow control to a single await or .then/.catch.
- Starts independent operations concurrently, reducing total latency versus running them one-by-one.
- Preserves input order in the output array, making downstream logic predictable even if tasks finish at different times.


## Key properties

- Fail-fast: if any input promise rejects, the combined promise rejects immediately.
- Stable ordering: output array positions correspond to input positions, not completion order.
- Non-promises are treated as already-fulfilled values, so arrays can mix values and promises safely.


## Common patterns

- Parallel fetches: load multiple resources at once, then render when all are ready.
- Fan-out processing: map a list to async tasks, then await everything before the next stage.
- All-or-nothing transactions: proceed only when every prerequisite action succeeds.


## Practical examples

- With .then/.catch:

```js
const usersP = fetch("/api/users").then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));
const prefsP = fetch("/api/prefs").then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)));

Promise.all([usersP, prefsP])
  .then(([users, prefs]) => renderDashboard(users, prefs))
  .catch(err => showToast(`Failed: ${err.message}`));
```

Line-by-line

- Create two promises that normalize non-2xx HTTP to rejections (prevents false success).
- Promise.all waits for both; success path receives results in the same order; .catch handles any failure.
- With async/await:

```js
async function loadDashboard() {
  const [users, prefs] = await Promise.all([
    fetch("/api/users").then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))),
    fetch("/api/prefs").then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
  ]);
  return renderDashboard(users, prefs);
}
```

Line-by-line

- Both requests start together; await pauses until both settle; destructuring preserves input order; downstream receives a coherent pair.


## Pitfalls and gotchas

- No partial success: one rejection aborts the whole result; use allSettled when every outcome must be observed.
- Side effects still run: other tasks won’t be “canceled” if one fails; if needed, add AbortController or explicit cancellation logic.
- Large fan-out: firing hundreds of requests at once can hit limits; consider batching or a concurrency pool.


## When to choose something else

- Partial results needed: pick allSettled to get per-item {status, value|reason} and continue with successes.
- First winner wins: use race to pick the earliest result (often for timeouts or multi-source reads).
- First success wins: use any to accept the first fulfillment and ignore others unless all reject.


## Developer mindset

- Decide the policy first: “all-or-nothing” is a perfect fit for Promise.all; otherwise prefer allSettled/race/any.
- Normalize errors “early” (e.g., non‑2xx → reject) so failure paths are consistent and easy to handle.
- Keep error handling centralized with a single catch (or try/catch) and add context; pair with finally for cleanup.
- For performance and reliability, parallelize only independent work and limit concurrency for very large batches.
<span style="display:none">[^58_1][^58_2][^58_3][^58_4][^58_5][^58_6][^58_7][^58_8]</span>

<div style="text-align: center">⁂</div>

[^58_1]: https://www.linkedin.com/pulse/understanding-promiseall-javascript-guide-examples-laurence-svekis--gscwf

[^58_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^58_3]: https://dev.to/vaatiesther/how-to-manage-multiple-promises-concurrently-with-promiseall-1i8

[^58_4]: https://www.geeksforgeeks.org/javascript/explain-promise-all-with-async-await-in-javascript/

[^58_5]: https://stackoverflow.com/questions/67696657/does-promise-all-run-the-promises-in-parallel

[^58_6]: https://javascript.plainenglish.io/promise-all-from-multiple-fetches-with-async-await-d7266ff98ee7

[^58_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^58_8]: https://www.c-sharpcorner.com/article/handling-multiple-asynchronous-operations-using-promise/


---

# What are common pitfalls when handling promises in interviews

The most common pitfalls are missing a terminal handler leading to **unhandled rejections**, breaking or mis‑wiring chains by not **returning** from .then, misusing combinators (e.g., using **all** when partial results are required), and writing sequential awaits that cause hidden errors or poor performance instead of properly wiring concurrency in one go [^59_1][^59_2][^59_3][^59_4][^59_5]. Avoid them by normalizing errors early, returning values/promises from every step, choosing combinators by policy, and wiring rejection handling immediately in the same chain or try/catch scope [^59_1][^59_6][^59_4][^59_5].

## Unhandled rejections

- Omitting a final .catch or surrounding try/catch leaves rejected promises unobserved, surfacing as the global unhandledrejection event in browsers and worker contexts [^59_1][^59_2][^59_7].
- Attach a terminal .catch (or try/catch around await) and optionally use the global events as a backstop for telemetry, not as primary control flow [^59_1][^59_2][^59_8].


## Breaking the chain

- Forgetting to return from .then causes the next step to run before the previous step’s result is available, or to miss failures propagated through the chain [^59_1][^59_6].
- Remember .then returns a new promise: return either a value (auto‑wrapped) or a promise so the next link is correctly sequenced and wired for propagation [^59_6][^59_9].


## Swallowing errors in then

- Using the two‑argument form of .then and returning a value in onRejected converts a rejection into a fulfillment, accidentally swallowing failures for the rest of the chain [^59_6].
- Prefer a terminal .catch for shared handling so rejections remain rejections unless intentionally transformed, keeping failure semantics clear [^59_1][^59_6].


## Wrong combinator choice

- Using Promise.all when partial results are acceptable forces fail‑fast aborts and hides useful successes; use allSettled to always get per‑item status/value/reason [^59_4][^59_5].
- Conversely, using allSettled when operations are interdependent complicates error paths; prefer all for all‑or‑nothing dependency batches with a single failure sink [^59_4][^59_5].


## Mis‑wiring concurrency with await

- Writing awaited calls one after another for independent tasks can create timing windows where early rejections become unhandled before later awaits wire error handling; wire the chain in one go with Promise.all [^59_3].
- MDN notes sequentialWait can raise an unhandled rejection if the “fast” promise rejects before the “slow” one is awaited, whereas Promise.all wires rejection handling up‑front and fails inside the configured chain [^59_3].


## Promises in loops

- Using forEach with async callbacks doesn’t await or return a promise chain, so errors get lost and completion timing is wrong; use map to build an array of promises and await Promise.all, or use for…of with await [^59_10].
- This avoids “fire‑and‑forget” behavior and keeps a single success/failure path for the batched work in interviews and production code [^59_10][^59_4].


## Over‑wrapping with new Promise

- Wrapping an existing promise or .then chain inside new Promise is an anti‑pattern that adds complexity and risks double settlement or missed rejections; .then already returns a promise to compose with [^59_11].
- Create promises with the constructor only when adapting callback APIs or producing a new asynchronous source, not to repackage existing promises [^59_11][^59_1].


## Promise.all error handling

- Expecting to “handle individual errors” inside Promise.all without changing the inputs doesn’t work: all rejects on the first rejection, so handle per‑item errors before aggregation or use allSettled for per‑item outcomes [^59_4][^59_12].
- If needed, wrap individual tasks so each always fulfills with a tagged result, then aggregate deterministically from the resolved array [^59_5][^59_12].


## Microtask ordering confusion

- Misreading output order when mixing promises and timers stems from microtasks running before macrotasks; .then/.catch/.finally callbacks run after the current script but before setTimeout [^59_13].
- Use this knowledge to explain logs and to schedule post‑state work deterministically with queueMicrotask when appropriate in solutions [^59_13].


## Best‑practice wiring

- Normalize non‑2xx HTTP to rejections as early as possible so downstream steps don’t proceed on invalid data and a single catch can handle all failures [^59_1][^59_14].

```js
const getJSON = (url) =>
  fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))); // normalize early [^59_6][^59_10]
```

- For independent tasks: wire once with Promise.all so both execution and error propagation are in the same configured chain [^59_4][^59_3].

```js
const [a, b] = await Promise.all([fa(), fb()]); // fail-fast with ordered results [^59_21][^59_27]
```


## Interview framing

- State policy first (fail‑fast vs partial success vs first‑wins), then pick all, allSettled, or race/any accordingly, and show the correct error sink (catch or try/catch) in the same snippet to prove wiring is complete [^59_4][^59_5][^59_15][^59_1].
- Call out microtask timing and MDN’s concurrent wiring guidance when discussing ordering, unhandled rejections, and performance trade‑offs to demonstrate deep understanding [^59_13][^59_3][^59_1].
<span style="display:none">[^59_16][^59_17][^59_18][^59_19][^59_20][^59_22][^59_23][^59_24][^59_25][^59_26][^59_28][^59_29][^59_30][^59_31][^59_32][^59_33][^59_34][^59_35][^59_36][^59_37][^59_38][^59_39]</span>

<div style="text-align: center">⁂</div>

[^59_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^59_2]: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event

[^59_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^59_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^59_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^59_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then

[^59_7]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/unhandledrejection_event

[^59_8]: https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent

[^59_9]: https://javascript.info/promise-chaining

[^59_10]: https://blog.greenroots.info/common-mistakes-in-using-javascript-promises

[^59_11]: https://dev.to/mpodlasin/3-most-common-mistakes-when-using-promises-in-javascript-oab

[^59_12]: https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all

[^59_13]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

[^59_14]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^59_15]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

[^59_16]: https://in.indeed.com/career-advice/interviewing/javascript-promise-interview-questions

[^59_17]: https://www.linkedin.com/pulse/most-common-javascript-interview-mistakes-how-avoid-them-patniya-ddwuf

[^59_18]: https://www.youtube.com/watch?v=c_zcXUz1neo

[^59_19]: https://www.interviewbit.com/javascript-interview-questions/

[^59_20]: https://stackoverflow.com/questions/75717626/how-to-understand-this-unhandled-promise-rejection-error

[^59_21]: https://github.com/greatfrontend/top-javascript-interview-questions

[^59_22]: https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent/promise

[^59_23]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Promises

[^59_24]: https://forum.freecodecamp.org/t/promises-breaking-the-then-chain/85341

[^59_25]: https://developer.mozilla.org/en-US/docs/Web/API/Window/rejectionhandled_event

[^59_26]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^59_27]: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^59_28]: https://www.w3schools.com/jsref/jsref_promise_all.asp

[^59_29]: https://news.ycombinator.com/item?id=23223881

[^59_30]: https://stackoverflow.com/questions/59784175/differences-between-promise-all-and-promise-allsettled-in-js

[^59_31]: https://www.w3schools.com/js/js_async.asp

[^59_32]: https://www.reddit.com/r/javascript/comments/ia5jcm/an_in_depth_explanation_of_promiseall_and/

[^59_33]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction

[^59_34]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

[^59_35]: https://caniuse.com/mdn-javascript_builtins_promise_allsettled

[^59_36]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS

[^59_37]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^59_38]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing

[^59_39]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all


---
