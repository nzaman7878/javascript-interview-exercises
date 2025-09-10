Next is Week 2 Day 4 focusing on **error handling** and defensive coding: try/catch/finally, throw, custom Error classes, and practical patterns for robust apps[^41_1][^41_2]. The goal is writing code that fails safely, reports clearly, and cleans up reliably across sync and async flows[^41_1][^41_3].

## What to learn

- try/catch/finally semantics: run code in try, handle exceptions in catch, and execute cleanup in finally regardless of success or failure[^41_2][^41_1].
- Throwing errors: use `throw` to signal exceptional conditions and prefer throwing `Error` (or subclasses) so callers get `name`, `message`, and stack info[^41_4][^41_5].
- Custom errors: extend `Error` to create domain-specific error types that carry extra context and can be detected with `instanceof`[^41_6][^41_7].
- Async errors: handle Promise rejections with `.catch()` or wrap `await` in try/catch; log meaningfully and decide when to retry vs fail fast[^41_1][^41_3].
- Rethrow strategy: catch known errors to add context, but rethrow unknown ones so upstream handlers can act, avoiding silent failures[^41_1].


## Core patterns with code

### 1) Guarded JSON parsing with user-friendly fallback

Use try/catch when parsing untrusted data and provide clear recovery or messaging instead of letting the script die[^41_8][^41_1].

```js
function safeParse(jsonStr, fallback = null) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Bad JSON:", err.message);
    return fallback;
  }
}
```


### 2) Throw early, catch late (and rethrow unknown)

Throw for invalid inputs near the source, and only catch where the program can decide recovery; rethrow unknown errors after logging context[^41_4][^41_1].

```js
function getRectArea(w, h) {
  if (Number.isNaN(Number(w)) || Number.isNaN(Number(h))) {
    throw new Error("Parameter is not a number"); // early signal
  }
  return w * h;
}

function controller(w, h) {
  try {
    return getRectArea(w, h);
  } catch (err) {
    if (err instanceof Error && /not a number/.test(err.message)) {
      return 0; // graceful default for known validation error
    }
    console.error("Unexpected:", err); // add context
    throw err; // rethrow unknowns
  }
}
```

This mirrors MDN guidance to use `Error` (or subclasses) and to let unhandled exceptions propagate when not actionable locally[^41_4][^41_5].

### 3) Custom domain errors (ValidationError) with stack and name

Extend Error for richer domain semantics and easier discrimination in catch blocks[^41_6][^41_7].

```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    // Node: Error.captureStackTrace?.(this, ValidationError);
  }
}

function validateUser(user) {
  if (!user.email) throw new ValidationError("Email required", "email");
  return true;
}

try {
  validateUser({ name: "Amit" });
} catch (err) {
  if (err instanceof ValidationError) {
    console.warn(`Bad input in ${err.field}: ${err.message}`);
  } else {
    throw err;
  }
}
```

Custom errors keep error handling explicit and allow `instanceof` checks and structured logging[^41_6][^41_7].

### 4) finally for cleanup

Use finally to ensure resources are released even if an error occurs[^41_2][^41_1].

```js
function withLock(lock, fn) {
  lock.acquire();
  try {
    return fn();
  } finally {
    lock.release(); // always runs
  }
}
```

This pattern prevents resource leaks by guaranteeing cleanup regardless of success or failure[^41_2][^41_1].

### 5) Async/await with retry and logging

Wrap awaited work in try/catch; decide when to retry vs surface the error to callers[^41_1][^41_3].

```js
async function fetchJsonWithRetry(url, tries = 2) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      console.warn(`Attempt ${i + 1} failed:`, err.message);
    }
  }
  throw lastErr;
}
```

This reflects the practice of catching, logging, optionally retrying, and then rethrowing when recovery is not possible[^41_1][^41_3].

## Developer mindset

- Prefer throwing `Error` or subclasses to preserve stack and structured details, avoiding raw strings or numbers that lose context[^41_4][^41_5].
- Catch close to the boundary where recovery or messaging is possible, and otherwise let errors propagate so centralized handlers or observability tools can do their job[^41_1][^41_3].
- Add context on catch (operation, inputs, correlation ids), then rethrow unknowns to avoid swallowing actionable failures silently[^41_1].
- Treat finally as mandatory for releasing resources (locks, streams, spinners, temp files) to keep systems stable under failure[^41_2][^41_1].


## Practice problems

- Validate and throw: Write `requireNonEmpty(str, field)` that throws `ValidationError` if empty or whitespace; unit test that `instanceof ValidationError` holds in the catch block[^41_6][^41_7].
- Safe JSON: Implement `safeParseOrThrow(str)` that throws `SyntaxError` with a clear message when parsing fails and include the first 40 chars of input for debugging[^41_8][^41_1].
- Retry policy: Build `retry(fn, { times:3, delayMs:200 })` that retries a promise-returning function and rethrows the last error after exhausting attempts, logging each failure[^41_1][^41_3].
- Cleanup invariant: Wrap a function with `withTimer(fn)` that starts a timer before calling `fn` and clears it in finally so it never leaks timers on error paths[^41_2][^41_1].

If desired, the next step can cover error object anatomy (name/message/cause), error chaining with `new Error(message, { cause })`, and tracing practices for production debugging in Node and browsers[^41_5][^41_1].
<span style="display:none">[^41_10][^41_11][^41_12][^41_13][^41_14][^41_15][^41_16][^41_17][^41_18][^41_19][^41_20][^41_9]</span>

<div style="text-align: center">⁂</div>

[^41_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^41_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^41_3]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Debugging_JavaScript

[^41_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw

[^41_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error

[^41_6]: https://javascript.info/custom-errors

[^41_7]: https://www.greatfrontend.com/questions/quiz/how-can-you-create-custom-error-objects

[^41_8]: https://javascript.info/try-catch

[^41_9]: https://www.w3schools.com/js/js_errors.asp

[^41_10]: https://www.w3schools.com/jsref/jsref_try_catch.asp

[^41_11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/throw

[^41_12]: https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

[^41_13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/try

[^41_14]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw

[^41_15]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[^41_16]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/throw

[^41_17]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...html

[^41_18]: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/throw

[^41_19]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/captureStackTrace

[^41_20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide


---

# What are common mistakes to avoid in try...catch usage

Common try...catch mistakes include over-catching, swallowing errors, using try/catch as control flow, missing cleanup in finally, and async misuse; avoiding these keeps failures observable, recoverable, and the system stable. Below are the pitfalls, how to spot them, and production-safe patterns to fix them.

## Over-catching

- Catching every error (or using a broad catch everywhere) hides real failures and makes debugging hard; only catch where recovery or messaging is possible, otherwise let it propagate.
- Better: catch the specific, expected error types and rethrow unknown ones.

```js
// Anti-pattern: hides all failures
try {
  risky();
} catch (e) {
  console.warn("Something went wrong"); // loses detail, no rethrow
}

// Better: handle known, rethrow unknown
try {
  risky();
} catch (e) {
  if (e.name === "SyntaxError") {
    return fallback();
  }
  throw e; // preserve signal
}
```


## Swallowing errors

- Logging without rethrow or return value leads to silent failure and inconsistent state; downstream code believes things succeeded.
- Better: either transform to a safe default explicitly or rethrow to callers.

```js
// Anti-pattern: swallow
try {
  updateDB();
} catch (e) {
  console.error(e); // nothing else
}

// Better: transform or rethrow
try {
  updateDB();
} catch (e) {
  audit(e);
  return { ok: false, reason: e.message }; // or throw e;
}
```


## Control flow misuse

- Using try/catch for routine validation (e.g., type checks) is slower and obscures intent.
- Better: guard clauses and predicates; reserve exceptions for exceptional, unexpected failures.

```js
// Anti-pattern: exceptions for validation
try {
  const n = parseInt(input, 10);
  // ...
} catch {
  // invalid
}

// Better: validate first
if (!/^-?\d+$/.test(input)) return "Invalid input";
const n = Number(input);
```


## Missing finally cleanup

- Forgetting to release locks, timers, streams, or UI state (spinners) on error causes leaks and stuck states.
- Better: always perform cleanup in finally so it runs on both success and error.

```js
startSpinner();
try {
  await doWork();
} finally {
  stopSpinner(); // guaranteed
}
```


## Async misuse

- try/catch doesn’t catch errors thrown in later microtasks or callbacks (e.g., setTimeout) unless the try/catch is inside that callback.
- Mixing .then chains and try/catch leads to gaps; unhandled rejections can crash processes.
- Better: keep await inside try/catch; put try/catch inside the async boundary (timeout/handler) when needed.

```js
// Wrong: try/catch around scheduler won't catch later error
try {
  setTimeout(() => { throw new Error("boom"); }, 0);
} catch { /* never here */ }

// Correct: handle where it executes
setTimeout(() => {
  try { risky(); } catch (e) { log(e); }
}, 0);

// Promises
try {
  const data = await fetchJSON(url); // throws in await path
} catch (e) {
  handle(e);
}
```


## Losing error context

- Throwing strings or new Error without context loses key debugging data; replacing errors without linking the original hides root causes.
- Better: throw Error (or subclasses) and include context; when wrapping, keep the original as a cause.

```js
// Anti-pattern
throw "failed";

// Better with context
throw new Error(`Failed to load user ${userId}`);

// Wrap while preserving original
throw new Error("Payment failed", { cause: e });
```


## Too-wide try blocks

- Wrapping large code regions makes it unclear which statement failed and risks handling unrelated errors with the same branch.
- Better: keep try blocks tight around the minimal risky operations.

```js
// Anti-pattern: huge try
try {
  step1(); step2(); step3(); step4();
} catch (e) { /* which step? */ }

// Better: localize
step1();
try { step2(); } catch (e) { recoverStep2(e); }
step3();
```


## Over-retrying or retry loops without backoff

- Blind retries on non-retriable errors (e.g., 4xx) or tight retry loops can amplify outages.
- Better: retry only retriable cases with capped attempts and exponential backoff; stop on non-retriable.

```js
async function retry(fn, times = 3) {
  let delay = 200;
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) {
      if (!isRetriable(e) || i === times - 1) throw e;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
}
```


## Inconsistent logging and PII

- Logging without context (operation, inputs, correlation id) or logging sensitive data (tokens, passwords) hinders debugging or violates compliance.
- Better: structured logs with minimal necessary context and redacted secrets.

```js
console.error("payment.fail", { orderId, provider: "stripe", err: e.message });
```


## Replacing bugs with try/catch

- Catching programmer errors (TypeError, ReferenceError) instead of fixing the code hides defects and accumulates tech debt.
- Better: fix the root cause; use try/catch only where recovery is meaningful.

```js
// Anti-pattern
try { obj.missing.call(); } catch { /* ignore */ }

// Better: null-guard or ensure defined invariants
if (obj?.missing) obj.missing.call();
```


## Not testing error paths

- Happy paths are covered but error branches rot; catch blocks become dead code or throw new errors.
- Better: unit tests for thrown errors, rethrow logic, finally cleanup, and retriable-vs-terminal behavior.

```js
await expect(fetchJsonWithRetry("bad://")).rejects.toThrow(/HTTP|fetch/i);
```


## Developer mindset

- Keep try blocks minimal; catch only what can be handled; rethrow unknowns.
- Always clean up with finally; prefer guard clauses over exception-driven flow.
- Preserve and enrich error context; use typed/custom errors for domain clarity.
- Treat async separately: place try/catch where the code actually runs and handle promise rejections.

Note: External source lookup and citations are not available in this turn; the guidance above reflects standard, production-proven practices for robust JavaScript error handling.
<span style="display:none">[^42_1][^42_2][^42_3][^42_4][^42_5][^42_6][^42_7][^42_8]</span>

<div style="text-align: center">⁂</div>

[^42_1]: https://stackoverflow.com/questions/2737328/why-should-i-not-wrap-every-block-in-try-catch

[^42_2]: https://dev.to/luckey/avoiding-errors-with-try-catch-in-javascript-5acf

[^42_3]: https://stackify.com/common-mistakes-handling-java-exception/

[^42_4]: https://www.reddit.com/r/learnprogramming/comments/139n5sb/is_it_considered_to_be_bad_practice_to_use/

[^42_5]: https://javascript.info/try-catch

[^42_6]: https://zerotomastery.io/blog/try-catch-java/

[^42_7]: https://www.w3schools.com/java/java_try_catch.asp

[^42_8]: https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions


---

# What are common mistakes to avoid in try...catch usage

The most common mistakes in try…catch are over-catching, swallowing errors, using it for normal control flow, misplacing async boundaries, and skipping cleanup—these hide real bugs, cause unhandled rejections, and leak resources. To avoid them, keep try blocks tight, handle only what can be recovered, rethrow unknowns, place try/catch where the code actually runs (especially with async), and always clean up in finally using a consistent pattern.

## Over-catching

- Catching “everything” prevents legitimate failures from surfacing and makes debugging hard. Handle only known, recoverable cases; let the rest propagate.
- Prefer a “known-or-rethrow” pattern with specific checks and clear defaults.

```js
try {
  risky();
} catch (e) {
  if (e instanceof SyntaxError) return fallback();
  throw e; // rethrow unknowns
}
```


## Swallowing errors

- Logging without returning a safe value or rethrowing leaves downstream code thinking work succeeded.
- Decide explicitly: transform to a safe default or rethrow; don’t silently continue.

```js
try {
  updateDB();
} catch (e) {
  audit(e);
  return { ok: false, reason: e.message }; // or: throw e;
}
```


## Control-flow misuse

- Using try/catch for predictable validations (like input checks) is slower and obscures intent.
- Prefer guard clauses and conditionals; reserve exceptions for exceptional cases.

```js
if (!/^-?\d+$/.test(input)) return "Invalid input";
const n = Number(input);
```


## Async boundaries

- try/catch won’t catch errors thrown later in setTimeout, event handlers, or in Promise chains not awaited.
- Place try/catch inside the async boundary, or use await inside try, or attach .catch on the promise.

```js
// Correct: place inside the callback
setTimeout(() => {
  try { risky(); } catch (e) { log(e); }
}, 0);

// Correct: await inside try/catch
try {
  const data = await fetchJSON(url);
} catch (e) {
  handle(e);
}
```


## Missing finally cleanup

- Forgetting to release locks, timers, streams, or UI spinners on error causes leaks and stuck states.
- Always clean up in finally to guarantee release on both success and failure.

```js
startSpinner();
try {
  await doWork();
} finally {
  stopSpinner(); // guaranteed
}
```


## Too-wide try blocks

- Huge try regions make it unclear which statement failed and accidentally lump unrelated errors together.
- Keep try minimal and localize catch behavior per risky operation.

```js
step1();
try { step2(); } catch (e) { recoverStep2(e); }
step3();
```


## Lost context and non-Error throws

- Throwing strings or replacing errors without context loses stack and root cause.
- Always throw Error (or subclasses) and, when wrapping, preserve the original via cause.

```js
throw new Error(`Failed to load user ${userId}`);
// or wrap with cause
throw new Error("Payment failed", { cause: e });
```


## Weak or missing error typing

- Treating all errors the same makes targeted recovery impossible.
- Use custom error classes (e.g., ValidationError, TimeoutError) and check with instanceof to branch logic.

```js
class ValidationError extends Error { constructor(msg, field){ super(msg); this.name="ValidationError"; this.field=field; } }
```


## Retry misuse

- Blindly retrying on non-retriable errors or without backoff amplifies outages.
- Retry only retriable cases, cap attempts, and use exponential backoff; stop on 4xx or logic errors.

```js
async function retry(fn, times=3) {
  let delay = 200;
  for (let i=0; i<times; i++) {
    try { return await fn(); }
    catch (e) { if (!isRetriable(e) || i===times-1) throw e; await new Promise(r=>setTimeout(r, delay)); delay*=2; }
  }
}
```


## Inconsistent logging (or leaking PII)

- No context = poor debuggability; too much context risks leaking secrets.
- Log minimally with structure (operation, ids, classification), and redact sensitive fields.

```js
console.error("payment.fail", { orderId, provider: "stripe", message: e.message });
```


## Catching programmer bugs instead of fixing

- Catching TypeError/ReferenceError to “stabilize” a broken path hides defects and creates tech debt.
- Fix the invariant or guard inputs; don’t mask coding errors with try/catch.

```js
// Instead of try/catch on null:
if (obj?.method) obj.method();
```


## Unhandled rejections

- Mixing await and .then without consistent catching leads to unhandled promise rejections.
- Standardize: prefer await inside try/catch or ensure every chain ends with .catch.


## Not testing error paths

- Happy-path tests alone leave catch/finally unverified and brittle.
- Write unit tests asserting throws, rethrow behavior, finally cleanup, and retry cutoff.


## Developer approach

- Keep try small; handle only what can be recovered; rethrow unknowns.
- Use finally for cleanup; prefer guard clauses over exception-driven flow.
- Preserve error context and type; place try/catch where the work executes (especially async).
- Measure and test error scenarios, not just success paths, to ensure resilience.
<span style="display:none">[^43_1][^43_2][^43_3][^43_4][^43_5][^43_6][^43_7][^43_8]</span>

<div style="text-align: center">⁂</div>

[^43_1]: https://stackoverflow.com/questions/2737328/why-should-i-not-wrap-every-block-in-try-catch

[^43_2]: https://dev.to/luckey/avoiding-errors-with-try-catch-in-javascript-5acf

[^43_3]: https://stackify.com/common-mistakes-handling-java-exception/

[^43_4]: https://www.reddit.com/r/learnprogramming/comments/139n5sb/is_it_considered_to_be_bad_practice_to_use/

[^43_5]: https://javascript.info/try-catch

[^43_6]: https://zerotomastery.io/blog/try-catch-java/

[^43_7]: https://www.w3schools.com/java/java_try_catch.asp

[^43_8]: https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions


---

# How can I implement custom error handling with try...catch

Custom error handling in JavaScript means defining domain-specific error types and pairing them with targeted try/catch logic that adds context, rethrows unknown failures, and guarantees cleanup via finally. The core approach is: create custom Error classes, throw with meaningful context (and cause), catch only where recovery is possible, centralize error-to-response mapping at boundaries, and test error paths thoroughly.

## Define custom errors

- Create a small hierarchy (e.g., AppError → ValidationError, NotFoundError, AuthError) so catch blocks can branch by type and produce predictable responses.
- Always extend Error, set name, and optionally include machine-readable fields (code, status) and the original cause.

```js
class AppError extends Error {
  constructor(message, { code, status = 500, cause } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.status = status;
    this.cause = cause;
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, { code: "VALIDATION_ERROR", status: 400 });
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} ${id} not found`, { code: "NOT_FOUND", status: 404 });
    this.resource = resource;
    this.id = id;
  }
}
```


## Throw with context (and cause)

- Throw early with enough context (ids, field names) to make logs actionable.
- Preserve the original error using the cause option to retain stack chains without losing detail.

```js
async function getUser(id, db) {
  try {
    const user = await db.users.findById(id);
    if (!user) throw new NotFoundError("User", id);
    return user;
  } catch (err) {
    // Wrap low-level error with domain context
    throw new AppError(`Failed to get user ${id}`, { code: "DB_READ_FAIL", cause: err });
  }
}
```


## Catch narrowly, rethrow unknowns

- Handle only errors that the current layer can recover from (or translate), and rethrow everything else.
- This preserves legitimate failures for upstream handlers and avoids silent data corruption.

```js
async function getUserController(req, res, next) {
  try {
    const user = await getUser(req.params.id, req.db);
    res.json({ ok: true, user });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof NotFoundError || err instanceof AppError) {
      // Translate to HTTP here
      res.status(err.status ?? 400).json({ ok: false, code: err.code, message: err.message });
      return;
    }
    next(err); // Unknown: let centralized handler/logging see it
  }
}
```


## Centralize error handling at boundaries

- In Node/Express, use a single error-handling middleware to log, redact, and map errors to responses.
- In React, wrap routes/components with an error boundary for render-time exceptions and a request/response interceptor for network errors.

```js
// Express error middleware (place after routes)
function errorMiddleware(err, req, res, next) {
  const status = err.status ?? 500;
  const code = err.code ?? "INTERNAL_ERROR";
  // Minimal structured log with redaction/correlation id
  console.error("http.error", { code, status, message: err.message, path: req.path });
  res.status(status).json({ ok: false, code, message: status === 500 ? "Internal server error" : err.message });
}
```


## Use finally for cleanup

- Always release resources (locks, streams, timers, UI spinners) in finally so failures don’t leak handles or leave the UI stuck.

```js
async function processPayment(req, res, next) {
  startSpinner();
  try {
    const result = await pay(req.body);
    res.json({ ok: true, result });
  } catch (err) {
    next(new AppError("Payment failed", { code: "PAYMENT_FAIL", status: 502, cause: err }));
  } finally {
    stopSpinner();
  }
}
```


## Async/await patterns done right

- Place await inside try/catch to catch rejections; for scheduled callbacks (setTimeout, event handlers), put try/catch inside the callback.

```js
// Await with try/catch
try {
  const data = await fetchJson(url);
  // ...
} catch (err) {
  throw new AppError("Upstream fetch failed", { code: "UPSTREAM_FAIL", status: 502, cause: err });
}

// Scheduled callback: handle inside
setTimeout(() => {
  try { doRiskyWork(); } catch (err) { console.error("timer.error", err); }
}, 0);
```


## Map errors to user-friendly messages

- Keep a small map from error codes/types to UI messages; prefer deterministic errors for predictable UX.

```js
function toUserMessage(err) {
  if (err instanceof ValidationError) return `Invalid ${err.field}: ${err.message}`;
  if (err instanceof NotFoundError) return "The requested item was not found.";
  if (err.code === "UPSTREAM_FAIL") return "Service is temporarily unavailable. Try again later.";
  return "Something went wrong. Please try again.";
}
```


## Reusable helpers (wrappers)

- Standardize error handling with small utilities: safe JSON parse, retry with backoff, and an async route wrapper.

```js
// Safe parse: throws SyntaxError with context
function parseJsonOrThrow(text) {
  try {
    return JSON.parse(text);
  } catch (cause) {
    throw new AppError("Invalid JSON payload", { code: "BAD_JSON", status: 400, cause });
  }
}

// Retry wrapper with exponential backoff on retriable errors
async function retry(fn, { times = 3, baseMs = 200, isRetriable = () => true } = {}) {
  let last;
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (i === times - 1 || !isRetriable(e)) break;
      await new Promise(r => setTimeout(r, baseMs * 2 ** i));
    }
  }
  throw last;
}

// Express async wrapper to avoid unhandled rejections
const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
```


## Frontend example (fetch + mapping)

- On the client, catch and translate errors to UI state without leaking internal details.

```js
async function loadProfile(userId) {
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) {
      if (res.status === 404) throw new NotFoundError("User", userId);
      throw new AppError(`HTTP ${res.status}`, { code: "HTTP_ERROR", status: res.status });
    }
    return await res.json();
  } catch (err) {
    showToast(toUserMessage(err));
    throw err; // keep propagating for callers if needed
  }
}
```


## Testing error paths

- Unit-test thrown types and messages, rethrow behavior for unknown errors, and finally cleanup.

```js
test("validateUser throws ValidationError when email missing", () => {
  expect(() => validateUser({})).toThrow(ValidationError);
});

test("controller rethrows unknown errors", async () => {
  const req = { params: { id: "x" }, db: { users: { findById: () => { throw new Error("boom"); } } } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  const next = jest.fn();
  await getUserController(req, res, next);
  expect(next).toHaveBeenCalled(); // unknown bubbled to central handler
});
```


## Developer mindset

- Define a small, consistent error taxonomy and use it everywhere to make handling deterministic.
- Keep try blocks tight; only catch where recovery or translation is possible; rethrow unknowns to centralized handlers.
- Always throw Error (or subclasses) with clear, structured context and preserve the original cause.
- Guarantee cleanup with finally and cover error paths in tests, not just happy paths.

If a specific stack is in use (e.g., Express/React, Next.js, NestJS), this structure can be adapted to framework conventions (global filters/guards, ErrorBoundary, API route handlers) with the same principles: custom errors, targeted catches, centralized mapping, and reliable cleanup.
<span style="display:none">[^44_1][^44_2][^44_3][^44_4][^44_5][^44_6][^44_7][^44_8][^44_9]</span>

<div style="text-align: center">⁂</div>

[^44_1]: https://www.w3schools.com/js/js_errors.asp

[^44_2]: https://stackoverflow.com/questions/5727299/throwing-a-custom-exception-inside-try-catch

[^44_3]: https://www.w3schools.com/java/java_try_catch.asp

[^44_4]: https://stackoverflow.com/questions/14973642/how-using-try-catch-for-exception-handling-is-best-practice

[^44_5]: https://stackify.com/php-try-catch-php-exception-tutorial/

[^44_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^44_7]: https://discuss.python.org/t/how-to-catch-a-custom-exception-in-a-try-except-block/11539

[^44_8]: https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions

[^44_9]: https://community.automationanywhere.com/developers-forum-36/error-handler-throw-configuring-custom-error-types-86064


---

# Most asked interview questions with Proper answer with explanations of each line of code and dev mindset and approaches

Below are the most-asked JavaScript interview questions focused on error handling (try/catch, throw, custom errors, async), each with a precise answer, line-by-line code explanations, and developer mindset to demonstrate robust, production-grade reasoning[^45_1][^45_2].

## 1) How does try…catch…finally work?

- Answer: try runs the guarded code; if an exception is thrown, control transfers to catch; finally always runs after try/catch for cleanup, whether or not an error occurred[^45_2][^45_1].

```js
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return null;
  } finally {
    // cleanup/log if needed
  }
}
```

- Line 1: Declares a function that isolates parsing concerns for untrusted JSON inputs, a common error boundary in apps[^45_1].
- Line 2: Enters try to execute a risky operation (parsing), ensuring the error won’t bubble and crash the caller unexpectedly[^45_2].
- Line 3: Attempts JSON.parse, which throws SyntaxError on malformed input in the same call stack[^45_1].
- Line 4: catch receives the thrown error and selects a safe fallback (null) to keep the program flow stable and explicit[^45_2].
- Lines 6–8: finally runs regardless of success/failure, guaranteeing cleanup (e.g., timers, spinners, metrics) is executed deterministically[^45_2].
- Dev mindset: Keep try blocks small, handle only recoverable cases, and use finally to guarantee resource release on all paths[^45_1][^45_2].


## 2) When should throw be used instead of returning error values?

- Answer: Use throw for exceptional conditions that violate assumptions or require the caller to decide recovery; return values for expected states (e.g., validation feedback) and keep error flow separate from normal control paths[^45_1][^45_3].

```js
function getRectArea(w, h) {
  if (!Number.isFinite(w) || !Number.isFinite(h)) {
    throw new Error("Width/height must be numbers");
  }
  return w * h;
}
```

- Line 1: Declares a function with defined invariants—width and height must be numeric and finite[^45_1].
- Lines 2–4: Guards invalid inputs and throws an Error so callers can catch and decide whether to default, retry, or fail the request[^45_3].
- Line 5: Returns the valid result on the happy path, keeping normal flow distinct from exceptional flow[^45_1].
- Dev mindset: Throw early near the source with clear messages; catch at boundaries where recovery or translation is meaningful and rethrow unknowns[^45_1][^45_3].


## 3) How do you create and use custom error classes?

- Answer: Extend Error, set a meaningful name/code/status, and use instanceof checks in catch blocks to implement targeted recovery and user-friendly responses[^45_4][^45_5].

```js
class AppError extends Error {
  constructor(message, { code, status = 500, cause } = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.cause = cause;
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, { code: "VALIDATION_ERROR", status: 400 });
    this.field = field;
  }
}
```

- Line 1: Defines an application base error to standardize error shape and handling in one place[^45_4].
- Lines 2–7: Calls super(message) to populate stack/message and attaches code/status/cause for structured handling and error chaining[^45_4].
- Line 9: Extends AppError for a specific domain (validation), enabling precise instanceof checks and response mapping[^45_5].
- Lines 10–13: Provides defaults (code/status) and captures the offending field for better UX and logs[^45_5].
- Dev mindset: A small error taxonomy improves observability and deterministic handling; always preserve stack and include minimal, actionable context[^45_4][^45_5].


## 4) How do you catch errors with async/await?

- Answer: Wrap awaited operations in try/catch; rejections from awaited promises are caught as exceptions; use finally for cleanup after async work[^45_6][^45_2].

```js
async function loadProfile(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new AppError("Profile load failed", { code: "HTTP_ERROR", status: 502, cause: err });
  } finally {
    // metrics/cleanup if needed
  }
}
```

- Line 1: Declares an async function; awaited operations inside can be caught like synchronous throws via try/catch[^45_6].
- Lines 2–3: await fetch returns a promise; rejection or thrown errors inside are caught by catch, making network errors explicit[^45_6].
- Line 4: Maps non-2xx responses to thrown errors so upstream logic doesn’t proceed on bad responses[^45_1].
- Line 5: Parses JSON with await, another failure point that will be caught properly[^45_6].
- Lines 6–8: Wraps low-level errors with AppError, preserving cause and providing consistent code/status for handlers[^45_4].
- Line 9: finally remains useful for telemetry or release steps after asynchronous flows complete or fail[^45_2].
- Dev mindset: Put await inside try/catch, wrap with domain context, and keep cleanup predictable with finally[^45_6][^45_2].


## 5) Why doesn’t try/catch catch setTimeout or promise errors unless awaited?

- Answer: try/catch is synchronous; it only catches errors thrown within its call stack; asynchronous callbacks (setTimeout, then) run later, so place try/catch inside the callback or await the promise to catch in surrounding try/catch[^45_7][^45_8].

```js
// Not caught (async callback runs later)
try {
  setTimeout(() => { throw new Error("boom"); }, 0);
} catch (e) {
  // never reached
}

// Correct: handle where it executes
setTimeout(() => {
  try { risky(); } catch (e) { console.error(e); }
}, 0);

// Or await the promise in try/catch
try {
  await someAsyncWork();
} catch (e) {
  handle(e);
}
```

- Lines 1–5: Demonstrates that try/catch around scheduler doesn’t catch later asynchronous throws, a common interview pitfall[^45_7].
- Lines 7–10: Places try/catch inside the callback so the throw is in the same call stack and gets caught correctly[^45_8].
- Lines 12–16: Uses await inside try/catch so a rejected promise is caught as an exception in the surrounding block[^45_6].
- Dev mindset: Always put try/catch where the code executes (inside callbacks) or await promises to bridge async errors to exceptions[^45_7][^45_6].


## 6) How and why to use finally?

- Answer: finally always runs after try/catch and is essential for releasing resources (locks, streams, timers, spinners) to avoid leaks or stuck UI when exceptions occur[^45_2][^45_1].

```js
function withLock(lock, fn) {
  lock.acquire();
  try {
    return fn();
  } finally {
    lock.release();
  }
}
```

- Line 1: A utility that guarantees a lock is released whether the work succeeds or fails, centralizing safety[^45_1].
- Line 2: Acquires the lock before work begins, intentionally making release the final step[^45_1].
- Lines 3–5: Returns the function result but ensures finally still runs to release the lock even on exceptions[^45_2].
- Lines 6–8: finally is the perfect place to restore invariants; it runs on both success and error to prevent leaks[^45_2].
- Dev mindset: Treat finally as non-optional for side-effect cleanup in all error-prone sections[^45_2][^45_1].


## 7) How do you wrap and rethrow errors while preserving context?

- Answer: Create a new Error (or AppError) that adds message/code/status and pass the original as cause; callers can inspect err.cause or logs show chained traces[^45_4][^45_1].

```js
try {
  doLowLevel();
} catch (e) {
  throw new AppError("High-level operation failed", { code: "OP_FAIL", status: 500, cause: e });
}
```

- Lines 1–3: Catches low-level failures at a boundary where contextual labeling improves debuggability[^45_1].
- Line 4: Rethrows a domain error with a code and cause so upstream logic can branch on type/code and logs retain root-cause detail[^45_4].
- Dev mindset: Add context where it matters and let centralized handlers decide the final mapping (HTTP/UI/reporting)[^45_1][^45_4].


## 8) How do you map domain errors to HTTP responses (controller layer)?

- Answer: Catch your custom errors and respond with status/message/code; pass unknown errors to the centralized error middleware to avoid swallowing serious failures[^45_1][^45_4].

```js
async function getUserController(req, res, next) {
  try {
    const user = await getUser(req.params.id);
    res.json({ ok: true, user });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof AppError) {
      res.status(err.status ?? 400).json({ ok: false, code: err.code, message: err.message });
    } else {
      next(err);
    }
  }
}
```

- Line 1: A boundary function responsible for translating domain errors into HTTP responses, not fixing low-level bugs[^45_1].
- Lines 2–4: Implements the happy path; if it fails, catch handles translation below[^45_1].
- Lines 5–7: Checks for known error types, returning consistent JSON with code/status for the client and logs[^45_4].
- Lines 7–9: Unknown errors propagate to central middleware for logging/500 handling, preserving signal and avoiding silent failure[^45_1].
- Dev mindset: Keep error mapping centralized and deterministic; avoid “catch-all swallow” patterns that obscure issues[^45_1][^45_4].


## 9) How do you design a safe retry wrapper with backoff?

- Answer: Retry only retriable errors, cap attempts, and back off exponentially; rethrow the last error when exhausted[^45_1][^45_6].

```js
async function retry(fn, { times = 3, baseMs = 200, isRetriable = () => true } = {}) {
  let last;
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (!isRetriable(e) || i === times - 1) break;
      await new Promise(r => setTimeout(r, baseMs * 2 ** i));
    }
  }
  throw last;
}
```

- Line 1: Accepts a promise-returning fn and configurable policy to avoid hard-coding behavior into callers[^45_6].
- Line 2: Tracks the latest error to report accurately if all attempts fail, maintaining context[^45_1].
- Lines 3–5: Tries up to N times and returns immediately on success, preserving latency[^45_6].
- Lines 6–10: On failure, stop for non-retriable errors or after last attempt; otherwise back off exponentially to avoid thundering herds[^45_1].
- Lines 11–13: Throws the final error to upstream handlers when exhaustion occurs, keeping error flow explicit[^45_1].
- Dev mindset: Don’t blindly retry; decide retriable conditions and ensure failures remain observable via rethrowing and logging[^45_1][^45_6].


## 10) How do you structure try/catch for clarity and performance?

- Answer: Keep try blocks tight around risky lines, validate inputs with guards instead of exceptions, and avoid catching just to log—log with context and rethrow or return a safe value explicitly[^45_1][^45_2].

```js
function process(input) {
  if (!/^-?\d+$/.test(input)) return { ok: false, message: "Invalid integer string" };
  const n = Number(input);
  try {
    return { ok: true, square: n * n };
  } catch (e) {
    // rarely needed here; try block is tight and pure
    throw e;
  }
}
```

- Line 1: Introduces a clear contract: process returns structured results and signals validation failures without exceptions[^45_1].
- Line 2: Uses a guard (no try/catch) for expected invalid cases—faster and clearer than exception-based validation[^45_1].
- Line 3: Converts to a number once, reducing duplicated parsing and preserving a single source of truth[^45_1].
- Lines 4–6: try protects only the risky computation; in this case it’s pure, so try may be unnecessary—example shows keeping try minimal[^45_2].
- Lines 7–9: Avoids swallowing—if something does go wrong unexpectedly, rethrow to the caller or centralized handler[^45_1].
- Dev mindset: Prefer guard clauses and small try blocks; handle only what you can recover from; rethrow unknowns to retain signal[^45_1][^45_2].


## Developer approach

- Catch narrowly, add domain context, and rethrow unknowns so serious issues remain visible to upstream handlers and observability tools[^45_1][^45_4].
- Place try/catch where execution happens in async code (inside callbacks) or await promises to convert rejections into catchable exceptions[^45_6][^45_7].
- Use custom errors to make handling deterministic (instanceof/code/status) and map to HTTP/UI responses consistently at boundaries[^45_4][^45_5].
- Always perform cleanup in finally to prevent leaks and stuck UI in both success and error paths[^45_2][^45_1].

References: MDN try/catch, control-flow and error handling, Error API, async functions/await; JavaScript.info on custom errors; and interview-focused guidance on custom errors and async error handling[^45_2][^45_1][^45_4][^45_6][^45_9][^45_5][^45_10][^45_7][^45_8].
<span style="display:none">[^45_11][^45_12][^45_13][^45_14][^45_15][^45_16][^45_17][^45_18][^45_19][^45_20][^45_21]</span>

<div style="text-align: center">⁂</div>

[^45_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^45_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^45_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw

[^45_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[^45_5]: https://javascript.info/custom-errors

[^45_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^45_7]: https://blog.stackademic.com/because-of-a-question-about-try-catch-i-failed-my-interview-2cea0225820c

[^45_8]: https://stackoverflow.com/questions/68102365/why-is-try-catch-not-working-with-async-await-function

[^45_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

[^45_10]: https://www.greatfrontend.com/questions/quiz/how-can-you-create-custom-error-objects

[^45_11]: https://www.w3schools.com/js/js_errors.asp

[^45_12]: https://interviewprep.org/try-catch-interview-questions/

[^45_13]: https://www.finalroundai.com/blog/exception-handling-interview-questions

[^45_14]: https://roadmap.sh/questions/javascript

[^45_15]: https://www.tutorialspoint.com/javascript/javascript_extending_errors.htm

[^45_16]: https://www.greatfrontend.com/questions/quiz/how-do-you-handle-errors-in-asynchronous-operations

[^45_17]: https://www.greatfrontend.com/questions/quiz/how-do-you-handle-errors-using-trycatch-blocks

[^45_18]: https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

[^45_19]: https://www.interviewbit.com/exception-handling-interview-questions/

[^45_20]: https://www.youtube.com/watch?v=iJVNtQ7y8_U

[^45_21]: https://esdiscuss.org/topic/creating-your-own-errors


---

# What are common mistakes to avoid in JavaScript try-catch blocks

The biggest mistakes with try…catch in JavaScript are over-catching, swallowing errors, misplacing try/catch in async code, skipping cleanup, and throwing the wrong things; avoiding these keeps failures observable, recoverable, and systems stable. The right approach is to keep try blocks small, handle only actionable errors, rethrow unknowns, place try/catch where the code actually executes (especially with async), and always clean up in finally.

## Over-catching

- Catching “everything” hides real bugs and makes debugging difficult; handle only expected, recoverable cases and let the rest bubble to a higher-level handler.

```js
// Anti-pattern: hides real failures
try {
  risky();
} catch (e) {
  console.warn("Something went wrong"); // no rethrow or structured return
}

// Better: handle only known; rethrow unknown
try {
  risky();
} catch (e) {
  if (e.name === "SyntaxError") return fallback();
  throw e; // keep the signal
}
```


## Swallowing errors

- Logging without rethrowing or returning a safe value leaves callers thinking work succeeded; always transform or rethrow explicitly.

```js
// Anti-pattern
try { updateDB(); } catch (e) { console.error(e); }

// Better
try {
  updateDB();
} catch (e) {
  audit(e);
  return { ok: false, reason: e.message }; // or: throw e;
}
```


## Control-flow misuse

- Using exceptions for routine validation is slow and obscures intent; prefer guards for expected states and use exceptions for truly exceptional cases.

```js
// Anti-pattern
try { const n = JSON.parse(txt); } catch { return "Invalid JSON"; }

// Better
if (!looksLikeJson(txt)) return "Invalid JSON";
const n = JSON.parse(txt);
```


## Async placement errors

- try/catch around a scheduler won’t catch errors thrown later in setTimeout, event listeners, or un-awaited promises; place try/catch inside the callback or await the promise.

```js
// Wrong: never catches
try {
  setTimeout(() => { throw new Error("boom"); }, 0);
} catch { /* never hit */ }

// Correct: inside the callback
setTimeout(() => {
  try { risky(); } catch (e) { log(e); }
}, 0);

// Correct: await to bridge promise rejection into catch
try {
  const data = await fetchJSON(url);
} catch (e) {
  handle(e);
}
```


## Missing finally cleanup

- Forgetting to release locks, streams, timers, or UI spinners on error causes leaks and stuck states; finally ensures cleanup always runs.

```js
startSpinner();
try {
  await doWork();
} finally {
  stopSpinner(); // always executes
}
```


## Too-wide try blocks

- Huge try regions make it unclear what failed and can mishandle unrelated errors; keep try minimal and localize catch behavior.

```js
// Anti-pattern
try { step1(); step2(); step3(); } catch (e) { recover(e); }

// Better
step1();
try { step2(); } catch (e) { recoverStep2(e); }
step3();
```


## Throwing the wrong thing

- Throwing strings/numbers loses stack and type; always throw Error (or a subclass) and add context so handlers can act.

```js
// Anti-pattern
throw "failed";

// Better
throw new Error(`Failed to load user ${userId}`);
```


## Losing context when rethrowing

- Replacing an error without the original cause hides the root problem; wrap and preserve the cause (if supported) or at least attach it.

```js
try {
  await lowLevel();
} catch (e) {
  throw new Error("High-level operation failed", { cause: e });
}
```


## Generic catch without rethrow

- Treating all errors the same prevents targeted recovery; use custom error classes and instanceof checks, and rethrow unknowns.

```js
class ValidationError extends Error { constructor(msg, field){ super(msg); this.name="ValidationError"; this.field=field; } }

try {
  validate(input);
} catch (e) {
  if (e instanceof ValidationError) return showFieldError(e.field, e.message);
  throw e; // unknown -> central handler
}
```


## Bad retry patterns

- Blindly retrying everything or without backoff amplifies outages; retry only retriable cases, cap attempts, and back off.

```js
async function retry(fn, times=3, baseMs=200) {
  let last;
  for (let i=0; i<times; i++) {
    try { return await fn(); }
    catch (e) {
      last = e;
      if (!isRetriable(e) || i === times-1) break;
      await new Promise(r => setTimeout(r, baseMs * 2 ** i));
    }
  }
  throw last;
}
```


## Logging pitfalls

- No context = poor debuggability; too much context risks leaking PII; log minimally with structure, redacting secrets.

```js
console.error("payment.fail", { orderId, provider: "stripe", message: e.message });
```


## Catching programmer bugs

- Catching TypeError/ReferenceError to “stabilize” execution hides defects; fix invariants or guard inputs instead.

```js
// Anti-pattern
try { obj.missing.call(); } catch { /* ignore */ }

// Better
if (obj?.missing) obj.missing.call();
```


## Not testing error paths

- Unexercised catch/finally code rots; write unit tests for throws, rethrow logic, and cleanup.

```js
await expect(fetchJson("bad://")).rejects.toThrow();
```


## Dev mindset

- Keep **try blocks small**, handle only **actionable** errors, and **rethrow unknowns**.
- Place try/catch where code actually runs (callbacks) or **await** promises so rejections are catchable.
- Use **custom errors** for deterministic handling and map them at boundaries (HTTP/UI).
- Always **cleanup in finally** and test error scenarios, not just happy paths.
<span style="display:none">[^46_1][^46_2][^46_3][^46_4][^46_5][^46_6][^46_7]</span>

<div style="text-align: center">⁂</div>

[^46_1]: https://stackoverflow.com/questions/2737328/why-should-i-not-wrap-every-block-in-try-catch

[^46_2]: https://dev.to/luckey/avoiding-errors-with-try-catch-in-javascript-5acf

[^46_3]: https://www.w3schools.com/js/js_errors.asp

[^46_4]: https://www.reddit.com/r/javascript/comments/6nsur3/is_it_ok_to_use_try_catch_blocks_as_a_way_of/

[^46_5]: https://stackoverflow.com/questions/73533145/is-it-good-practice-to-use-try-inside-try-block-to-catch-different-errors-jav

[^46_6]: https://www.reddit.com/r/learnjavascript/comments/110qmmp/how_often_do_you_use_trycatch_blocks_in_your_js/

[^46_7]: https://www.zipy.ai/blog/everyday-javascript-errors


---

# How should you structure error handling for asynchronous JavaScript code

Use a layered approach: wrap awaited work in try/catch close to where it runs, add domain context or map to responses at boundaries, and backstop the app with global unhandled rejection handlers and cancellation for long-running tasks using **AbortController**[^47_1][^47_2][^47_3]. Prefer small try blocks, rethrow unknown errors, pick the right Promise combinator (all vs allSettled), and always clean up in finally for robust, observable async flows using **await** and **try/catch**[^47_4][^47_5][^47_1].

## Core principles

- Put awaited operations inside try/catch so promise rejections become exceptions that can be handled locally, and keep try blocks tight around the exact risky calls for clarity and correctness[^47_2][^47_1].
- Add context when catching (message/code/status) and preserve the original error via the Error API or cause so upstream handlers and logs retain stack and root cause detail[^47_6][^47_4].
- Handle only errors the layer can recover from; rethrow unknowns so centralized handlers or outer layers can take appropriate action rather than silently continuing in a bad state[^47_4][^47_1].


## Async pattern (await inside try/catch)

```js
async function loadJson(url) {
  try {
    const res = await fetch(url);                  // await inside try
    if (!res.ok) throw new Error(`HTTP ${res.status}`); // map non-2xx to errors
    return await res.json();                       // parse may throw
  } catch (err) {
    throw new Error("Fetch failed", { cause: err });    // add domain context
  } finally {
    // telemetry/cleanup here (always runs)
  }
}
```

- await bridges rejections into catch, so network failures and JSON parse errors are handled consistently as exceptions in the same block[^47_7][^47_1].
- Mapping non-2xx to thrown errors prevents downstream logic from treating bad responses as success, keeping control flow explicit and safe[^47_4][^47_2].
- The finally clause is the right place for cleanup/metrics because it runs whether the awaited work succeeds or fails, preventing leaks and stuck UI states[^47_1][^47_4].


## Global safety nets

- Register a global unhandled rejection handler so truly unhandled promise errors are logged and can be reported or correlated in production diagnostics[^47_3][^47_8].
- In Node, also attach a process-level 'unhandledRejection' listener for server-side visibility and to fail fast or degrade gracefully as policy dictates[^47_9][^47_8].

```js
window.addEventListener("unhandledrejection", (event) => {
  console.warn("UNHANDLED:", event.reason);  // central backstop
}); 
```

- The unhandledrejection event fires when a promise is rejected without a rejection handler, allowing last-resort logging and optional preventDefault depending on environment policy[^47_3].


## Batch operations (all vs allSettled)

- Use Promise.all when tasks are interdependent or a single failure should abort the whole batch for fail-fast semantics and simpler downstream logic[^47_5].
- Use Promise.allSettled when every result must be observed regardless of failures, then inspect per-item status/value/reason to proceed selectively[^47_10].

```js
const results = await Promise.allSettled([a(), b(), c()]);
const ok = results.filter(r => r.status === "fulfilled").map(r => r.value); // proceed with successes
```

- allSettled resolves with an array of outcome objects, enabling robust partial success handling without throwing on the first failure, which is ideal for fan-out calls[^47_10].


## Cancellation with AbortController

- Wire fetch and other cancellable APIs to an AbortController so slow or obsolete work can be aborted, preventing wasted resources and making timeouts explicit[^47_11][^47_12].
- Pass controller.signal to fetch and call controller.abort() to reject the promise with an AbortError when cancellation is requested[^47_13][^47_12].

```js
const controller = new AbortController();
const { signal } = controller;
const p = fetch(url, { signal }); // associates signal
// later
controller.abort(); // rejects with AbortError
```

- Integrating cancellation into async flows avoids dangling operations and simplifies error handling because aborts become deterministic errors that can be caught or mapped separately[^47_12][^47_11].


## Custom errors and mapping

- Define small custom error types (e.g., ValidationError, NotFoundError) extending Error to support deterministic branching with instanceof and to attach code/status for boundary mapping[^47_14][^47_6].
- Translate domain errors at the boundary (e.g., controller or API layer) into user/HTTP responses while letting unknown errors bubble to centralized handlers for logging and 500s[^47_4][^47_6].

```js
class AppError extends Error { constructor(msg, { code, status=500, cause }={}) { super(msg); this.code=code; this.status=status; this.cause=cause; } }
class NotFoundError extends AppError { constructor(res, id) { super(`${res} ${id} not found`, { code:"NOT_FOUND", status:404 }); } }
```

- Preserving cause and adding machine-readable fields enable consistent mapping, observability, and recovery decisions across the stack[^47_6][^47_4].


## Cleanup with finally

- Always release resources (locks, timers, streams, spinners) in finally to guarantee cleanup runs on both success and error in asynchronous flows[^47_1][^47_4].
- This pattern prevents leaks and keeps UI/connection state correct even when exceptions or rejections occur midway through an operation[^47_1][^47_4].

```js
startSpinner();
try {
  await doWork();
} finally {
  stopSpinner(); // guaranteed
}
```

- finally executes after either the try or catch path, making it the canonical place for teardown logic in async code[^47_1].


## Practical checklist

- Put awaited operations inside try/catch, add domain context, and rethrow unknowns to keep legitimate failures observable and recoverable[^47_2][^47_4].
- Backstop with unhandledrejection (and Node’s unhandledRejection) to surface neglected promise errors for telemetry and policy decisions[^47_3][^47_9].
- Choose Promise.all for fail-fast dependencies and Promise.allSettled for partial success handling where all outcomes must be collected[^47_5][^47_10].
- Integrate AbortController for cancellation and timeouts to avoid hanging requests and to produce explicit, catchable abort errors[^47_11][^47_12].
- Always clean up in finally and keep try blocks small, handling only what this layer can act on while mapping errors at boundaries using custom types[^47_1][^47_14].

If helpful, this structure can be adapted to specific stacks (e.g., Express middleware or React with error boundaries and fetch wrappers) while keeping the same principles: local try/catch with await, centralized mapping, global safety nets, cancellation, and deterministic cleanup[^47_4][^47_2].
<span style="display:none">[^47_15][^47_16][^47_17][^47_18][^47_19][^47_20][^47_21][^47_22][^47_23][^47_24][^47_25][^47_26]</span>

<div style="text-align: center">⁂</div>

[^47_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

[^47_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[^47_3]: https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event

[^47_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^47_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

[^47_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[^47_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

[^47_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

[^47_9]: https://nodejs.org/api/process.html

[^47_10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^47_11]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

[^47_12]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort

[^47_13]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal

[^47_14]: https://javascript.info/custom-errors

[^47_15]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/unhandledrejection_event

[^47_16]: https://developer.mozilla.org/en-US/docs/Web/API/Window/rejectionhandled_event

[^47_17]: https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/rejectionhandled_event

[^47_18]: https://udn.realityripple.com/docs/Web/API/Window/unhandledrejection_event

[^47_19]: https://www.freecodecamp.org/news/how-to-use-promise-allsettled-in-javascript/

[^47_20]: https://frost.cs.uchicago.edu/ref/JavaScript/developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event.html

[^47_21]: https://udn.realityripple.com/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

[^47_22]: https://caniuse.com

[^47_23]: https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal

[^47_24]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

[^47_25]: https://www.greatfrontend.com/questions/quiz/how-do-you-abort-a-web-request-using-abortcontrollers

[^47_26]: https://caniuse.com/mdn-api_window_unhandledrejection_event


---
