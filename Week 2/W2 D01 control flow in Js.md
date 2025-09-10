week2 day 1

Week 2 Day 1 focuses on mastering **control flow** (if/else, switch, ternary) and core **loops** (for, while, for...of, for...in) so decisions and iteration in programs are precise, readable, and bug‑free [^31_1][^31_2]. This day uses a learn–apply–build plan with interview-focused patterns and production-minded choices that scale to real apps [^31_3][^31_4].

## What to learn today

- Use if/else for branching by boolean conditions, stack additional branches with else if, and fall back with else for defaults in a readable decision tree [^31_5][^31_3].
- Apply switch to compare one expression against many discrete cases; always include break to avoid fallthrough unless intentionally grouping cases, and add default for safety [^31_6][^31_7].
- Prefer ternary for simple conditional expressions in place of small if/else; treat it as an expression returning a value, not a drop‑in for complex statements [^31_8][^31_1].
- Understand for and while loops for counted or open-ended repetition; reach for for...of to iterate values from arrays/iterables and for...in to iterate enumerable keys (usually objects) [^31_4][^31_2].


## Key APIs and patterns

- if/else and else if compose primary branching and pair naturally with guard clauses to reduce nesting and improve readability in business logic [^31_5][^31_1].
- switch matches a single subject across many cases more clearly than long else if chains when equality on one variable is the primary decision axis [^31_6][^31_3].
- Ternary’s syntax cond ? a : b is ideal when selecting between two short alternatives; nest sparingly and favor readability [^31_8][^31_1].
- Loop selection: classic for for index-based control, for...of for values, for...in for keys, and while for conditions that are not index-driven [^31_2][^31_4].


## Apply: hands-on exercises

- Score to grade (if/else): map a numeric score to A/B/C/D/Fail with range checks and an early return style to minimize nesting [^31_5][^31_1].

```js
function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
```

- Payment method label (switch): convert a payment code to a label and use default for unknown codes, ensuring each case breaks [^31_6][^31_7].

```js
function label(code) {
  switch (code) {
    case "CC": return "Credit Card";
    case "UPI": return "UPI";
    case "COD": return "Cash on Delivery";
    default: return "Unknown";
  }
}
```

- Ternary for quick badge: show “Free Shipping” if cart total ≥ 500 else “Shipping Applies” using a compact expression [^31_8][^31_1].

```js
const badge = total => total >= 500 ? "Free Shipping" : "Shipping Applies";
```

- Iterate cart with for...of: sum item totals cleanly by iterating values, not indices, when indices are not required [^31_2][^31_9].

```js
function cartTotal(items) {
  let sum = 0;
  for (const item of items) sum += item.price * item.qty;
  return sum;
}
```


## Build: rule-based checkout calculator

- Goal: Given items, coupon code, and state code, compute subtotal, apply coupon rules, add state tax, and output a final payable total with control flow that is easy to extend [^31_1][^31_6].

```js
function checkout(items, coupon, state) {
  // 1) subtotal
  let subtotal = 0;
  for (const { price, qty } of items) subtotal += price * qty;

  // 2) coupon rules
  let discount = 0;
  switch (coupon) {
    case "SAVE10": discount = subtotal * 0.10; break;
    case "FLAT200": discount = Math.min(200, subtotal); break;
    case "FREESHIP": discount = 0; break; // shipping handled elsewhere
    default: discount = 0;
  }

  const afterDiscount = Math.max(0, subtotal - discount);

  // 3) tax by state
  let taxRate = 0;
  if (state === "MH") taxRate = 0.18;
  else if (state === "DL") taxRate = 0.12;
  else taxRate = 0.05;

  const tax = afterDiscount * taxRate;
  const total = afterDiscount + tax;

  return { subtotal, discount, tax, total };
}
```

- Why this design: switch cleanly centralizes coupon matching; if/else maps state to rates; guard with Math.max to avoid negative totals; and a single pass over items keeps it efficient and legible for later feature growth [^31_6][^31_5].


## Dev mindset and approaches

- Choose the structure that best communicates intent: switch when comparing the same subject to constants, if/else for range logic, ternary only for simple value selection, and avoid deep nesting via early returns [^31_6][^31_5].
- Prefer for...of to operate on array values directly and reserve for...in for object keys; mixing them on arrays can include non-index properties and surprise maintainers [^31_2][^31_9].
- Always include a default branch (else or default) to handle unexpected inputs gracefully and log or reject invalid states early to reduce downstream bugs [^31_5][^31_6].


## Interview-ready Q\&A

- When to use switch vs else if: use switch when one variable is matched to many discrete constants for clarity; use else if for numeric ranges or complex predicates that aren’t simple equality checks [^31_6][^31_3].
- Difference between for...of and for...in: for...of iterates values from iterables like arrays and sets; for...in iterates enumerable keys mostly for objects and may include non-index keys on arrays [^31_2][^31_9].
- Ternary vs if/else: ternary is an expression for compact value selection, great in JSX/return statements; avoid nesting beyond one level to prevent readability debt [^31_8][^31_1].
- Break and fallthrough in switch: place break in each case to prevent unintentional fallthrough; deliberately stack cases only when multiple labels share the same body [^31_6][^31_7].


## Quick reference snippets

- Guard clause pattern to reduce nesting: returns early when an invalid condition is met for cleaner control flow [^31_1][^31_5].

```js
function applyPromo(subtotal) {
  if (subtotal <= 0) return 0;        // guard
  return subtotal >= 1000 ? subtotal * 0.15 : subtotal * 0.05;
}
```

- for...of with Object.entries to loop object key/value pairs safely with value access built in [^31_2][^31_9].

```js
for (const [k, v] of Object.entries({ a: 1, b: 2 })) {
  // k => "a", v => 1
}
```

Ready to proceed to exercises review or move to Week 2 Day 2 on loops and iteration patterns with break/continue, searching, and aggregations [^31_2][^31_4]?
<span style="display:none">[^31_10][^31_11][^31_12][^31_13][^31_14][^31_15][^31_16][^31_17][^31_18][^31_19][^31_20]</span>

<div style="text-align: center">⁂</div>

[^31_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^31_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

[^31_3]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals

[^31_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for

[^31_5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else

[^31_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

[^31_7]: https://www.w3schools.com/js/js_switch.asp

[^31_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

[^31_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

[^31_10]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...html

[^31_11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements

[^31_12]: https://www.w3schools.com/js/js_if_else.asp

[^31_13]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch.html

[^31_14]: https://www.w3schools.com/js/js_loop_for.asp

[^31_15]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow/if...else

[^31_16]: https://www.youtube.com/watch?v=7T051-eeacQ

[^31_17]: https://stackoverflow.com/questions/4005614/elseif-syntax-in-javascript

[^31_18]: https://x.com/MozDevNet/status/1899807663476932642

[^31_19]: https://www.w3schools.com/js/js_loop_forin.asp

[^31_20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript


---

# Provide practice problems and solutions for Week 2 Day 1

Here are targeted practice problems with clear solutions for Week 2 Day 1, covering if/else, switch, ternary, and core loops, designed to build decision-making and iteration skills for real projects and interviews [^32_1]. Each problem includes a concise solution and picks the control-flow tool that best communicates intent and avoids bugs [^32_2][^32_3][^32_4].

## If/else and ranges

1) Grade from score

- Problem: Return A/B/C/D/F for a 0–100 score with clean range checks. [^32_2][^32_5]
- Solution:

```js
function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
```

This uses early returns to avoid deep nesting and expresses descending thresholds clearly for readability and correctness [^32_2][^32_1].

2) Tax bracket by income

- Problem: Given income, return the bracket label: Low < 3L, Mid 3–10L, High > 10L. [^32_2]
- Solution:

```js
function taxBracket(income) {
  if (income < 300000) return "Low";
  if (income <= 1000000) return "Mid";
  return "High";
}
```

Ordered checks ensure only one branch matches, and a final default returns the remaining category cleanly [^32_2][^32_1].

3) Leap year check

- Problem: Return true if year is leap (divisible by 400, or divisible by 4 and not by 100). [^32_2]
- Solution:

```js
function isLeap(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}
```

Guard clauses make the logic straightforward and avoid nested boolean expressions that reduce readability [^32_2][^32_1].

## Switch for discrete labels

4) Payment code to label

- Problem: CC→Credit Card, UPI→UPI, COD→Cash on Delivery, else Unknown. [^32_3][^32_6]
- Solution:

```js
function paymentLabel(code) {
  switch (code) {
    case "CC": return "Credit Card";
    case "UPI": return "UPI";
    case "COD": return "Cash on Delivery";
    default: return "Unknown";
  }
}
```

switch reads better than long else-if chains when matching one variable to many constants; always include default [^32_3][^32_6].

5) Day number to weekday

- Problem: 0–6 to Sunday–Saturday. [^32_3]
- Solution:

```js
function weekDay(n) {
  switch (n) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "Invalid";
  }
}
```

Mapping constants with switch is explicit and easy to extend later with locales or special cases [^32_3][^32_1].

6) FizzBuzz with switch on true

- Problem: Print “Fizz”, “Buzz”, “FizzBuzz”, or the number. [^32_3]
- Solution:

```js
function fizzBuzz(n) {
  switch (true) {
    case n % 15 === 0: return "FizzBuzz";
    case n % 3 === 0: return "Fizz";
    case n % 5 === 0: return "Buzz";
    default: return String(n);
  }
}
```

switch(true) expresses prioritized predicates while preserving a single decision site; order matters for correctness [^32_3][^32_1].

## Ternary for compact value selection

7) Free shipping badge

- Problem: total ≥ 500 → “Free Shipping” else “Shipping Applies”. [^32_7]
- Solution:

```js
const shippingBadge = total => total >= 500 ? "Free Shipping" : "Shipping Applies";
```

Use ternary for simple two-way selection that returns a value; avoid nesting for readability [^32_7][^32_1].

8) Adult or minor tag

- Problem: age ≥ 18 → “Adult” else “Minor”. [^32_7]
- Solution:

```js
const ageTag = age => (age >= 18 ? "Adult" : "Minor");
```

As an expression, ternary fits neatly into JSX, returns, or object literals for UI state [^32_7][^32_1].

## for and while loops

9) Sum 1..n with for

- Problem: Return the sum from 1 to n. [^32_8][^32_4]
- Solution:

```js
function sumTo(n) {
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
}
```

Classic for with explicit init, test, and update keeps the loop boundary logic local and readable [^32_8][^32_4].

10) Factorial with while

- Problem: Compute n! with a while loop. [^32_4]
- Solution:

```js
function fact(n) {
  let res = 1, i = 2;
  while (i <= n) { res *= i; i++; }
  return res;
}
```

while is suitable when the iteration count is condition-driven rather than index-centric [^32_4][^32_1].

11) Reverse an array using for

- Problem: Build a reversed copy without mutating original. [^32_4]
- Solution:

```js
function reversedCopy(arr) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
  return out;
}
```

Indexing from the end provides O(n) reversal while preserving immutability by writing to a new array [^32_4][^32_1].

12) Find first multiple using break

- Problem: Return the first number divisible by k; else null. [^32_4]
- Solution:

```js
function firstMultiple(nums, k) {
  for (const n of nums) {
    if (n % k === 0) return n;
  }
  return null;
}
```

for...of iterates values directly and an early return serves as a break for immediate exit on match [^32_9][^32_4].

13) Skip negative numbers with continue

- Problem: Sum only non-negative numbers. [^32_4]
- Solution:

```js
function sumNonNeg(nums) {
  let s = 0;
  for (const n of nums) {
    if (n < 0) continue;
    s += n;
  }
  return s;
}
```

continue short-circuits to the next iteration, reducing nesting and increasing clarity in filter-like loops [^32_4][^32_1].

## Iterating collections correctly

14) for...of for cart totals

- Problem: Sum price*qty across line items. [^32_9]
- Solution:

```js
function cartTotal(items) {
  let total = 0;
  for (const { price, qty } of items) total += price * qty;
  return total;
}
```

Use for...of for arrays to iterate values directly and leverage destructuring for concise field access [^32_9][^32_4].

15) for...in over objects

- Problem: Build "key=value" strings for each own property. [^32_4]
- Solution:

```js
function entriesStrings(obj) {
  const out = [];
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      out.push(`${k}=${obj[k]}`);
    }
  }
  return out;
}
```

Guard with hasOwnProperty to exclude inherited keys; prefer Object.entries for modern code when possible [^32_4][^32_1].

16) Object.entries with for...of

- Problem: Count properties where value is truthy. [^32_4]
- Solution:

```js
function countTruthy(obj) {
  let c = 0;
  for (const [k, v] of Object.entries(obj)) if (v) c++;
  return c;
}
```

Combining Object.entries with for...of yields expressive key/value iteration without manual property checks [^32_4][^32_9].

## Combining decisions and loops

17) Filter even numbers without Array.filter

- Problem: Produce a new array with evens only using loops. [^32_4]
- Solution:

```js
function evens(nums) {
  const out = [];
  for (const n of nums) if (n % 2 === 0) out.push(n);
  return out;
}
```

Manual control flows mirror filter’s behavior and make mutation/immutability choices explicit for practice [^32_4][^32_1].

18) Categorize temperatures

- Problem: Given an array of temps, map each to "Cold" < 20, "Warm" 20–29, "Hot" ≥ 30. [^32_2]
- Solution:

```js
function tempTags(temps) {
  const out = [];
  for (const t of temps) {
    if (t < 20) out.push("Cold");
    else if (t < 30) out.push("Warm");
    else out.push("Hot");
  }
  return out;
}
```

else-if chains implement disjoint ranges cleanly and in a way that scales to additional bands [^32_2][^32_5].

19) Coupon application with switch

- Problem: "SAVE10" 10% off, "FLAT200" min(200, subtotal), default 0. [^32_3]
- Solution:

```js
function discount(subtotal, code) {
  switch (code) {
    case "SAVE10": return subtotal * 0.10;
    case "FLAT200": return Math.min(200, subtotal);
    default: return 0;
  }
}
```

switch centralizes discrete rule matching and makes future rule additions straightforward and testable [^32_3][^32_1].

20) Login lockout counter with while

- Problem: Simulate attempts up to 3; if any password matches, success; else lockout. [^32_4]
- Solution:

```js
function canLogin(attempts, real) {
  let i = 0;
  while (i < 3 && i < attempts.length) {
    if (attempts[i] === real) return "Success";
    i++;
  }
  return "Locked";
}
```

while naturally expresses a capped, condition-driven loop with two termination conditions embedded in the header [^32_4][^32_1].

## Stretch tasks (optional)

21) Countdown string (10→0→"Blast off!") with for and if/else to format milestones. [^32_10][^32_2]
22) Range sum with early validation: return 0 if start > end using guard clause. [^32_2][^32_1]
23) Letter grade with plus/minus using nested ranges and a final default branch. [^32_2]
24) Switch fall-through intentionally to group cases (e.g., vowels: a/e/i/o/u). [^32_3]
25) Find min with for...of and an initial sentinel (Infinity), updating by comparison. [^32_4]

If you want, these can be bundled into a single mini-assignment with tests, and the solutions can be refactored to show multiple valid approaches (e.g., switch vs lookup object) depending on the product context and readability goals [^32_1][^32_3].
<span style="display:none">[^32_11][^32_12][^32_13][^32_14][^32_15][^32_16][^32_17][^32_18][^32_19][^32_20]</span>

<div style="text-align: center">⁂</div>

[^32_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

[^32_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else

[^32_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

[^32_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

[^32_5]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals

[^32_6]: https://www.w3schools.com/js/js_switch.asp

[^32_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

[^32_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for

[^32_9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

[^32_10]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops

[^32_11]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...html

[^32_12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements

[^32_13]: https://www.w3schools.com/js/js_if_else.asp

[^32_14]: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators

[^32_15]: https://www.youtube.com/watch?v=7T051-eeacQ

[^32_16]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow/if...else

[^32_17]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch.html

[^32_18]: https://stackoverflow.com/questions/4005614/elseif-syntax-in-javascript

[^32_19]: https://www.thiscodeworks.com/61808013394cdf00159f027e

[^32_20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript


---

# Create 10 practice problems for Week 2 Day 1 focused on conditionals in JavaScript

Here are 10 focused JavaScript conditional practice problems with concise, production-style solutions and brief guidance on when and why to use each pattern.

## Practice set

- These problems target if/else, else if, switch, and ternary usage with real decision logic.
- Each solution favors early returns and clear branches to keep control flow readable and safe.


### 1) Grade from score

Task: Return A/B/C/D/F for a 0–100 score.

Examples:

- 91 → "A"
- 74 → "C"

Solution:

```js
function grade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
```


### 2) Leap year check

Task: Return true if year is leap (divisible by 400, or divisible by 4 and not by 100).

Solution:

```js
function isLeap(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}
```


### 3) Shipping badge (ternary)

Task: total ≥ 500 → "Free Shipping", else "Shipping Applies".

Solution:

```js
const shippingBadge = total => (total >= 500 ? "Free Shipping" : "Shipping Applies");
```


### 4) Payment label (switch)

Task: CC → Credit Card, UPI → UPI, COD → Cash on Delivery, else Unknown.

Solution:

```js
function paymentLabel(code) {
  switch (code) {
    case "CC": return "Credit Card";
    case "UPI": return "UPI";
    case "COD": return "Cash on Delivery";
    default: return "Unknown";
  }
}
```


### 5) Day number to weekday (switch)

Task: 0–6 → Sunday–Saturday; otherwise "Invalid".

Solution:

```js
function weekDay(n) {
  switch (n) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "Invalid";
  }
}
```


### 6) Temperature descriptor

Task: t < 20 → "Cold", 20–29 → "Warm", ≥ 30 → "Hot".

Solution:

```js
function tempTag(t) {
  if (t < 20) return "Cold";
  if (t < 30) return "Warm";
  return "Hot";
}
```


### 7) Discount rules with precedence

Task: For subtotal and coupon:

- "SAVE10" → 10% off
- "FLAT200" → min(200, subtotal)
- "FREESHIP" → 0 (shipping handled elsewhere)
- default → 0

Solution:

```js
function discount(subtotal, code) {
  switch (code) {
    case "SAVE10": return subtotal * 0.10;
    case "FLAT200": return Math.min(200, subtotal);
    case "FREESHIP": return 0;
    default: return 0;
  }
}
```


### 8) Username validation (compound conditions)

Task: Valid if starts with uppercase AND length 5–10; BUT always valid when userType is "admin" or "manager".

Solution:

```js
function isValidUsername(username, userType) {
  if (userType === "admin" || userType === "manager") return true;
  const startsUpper = /^[A-Z]/.test(username);
  const len = username.length;
  return startsUpper && len >= 5 && len <= 10;
}
```


### 9) FizzBuzz with prioritization

Task: n % 15 → "FizzBuzz"; n % 3 → "Fizz"; n % 5 → "Buzz"; else n.

Solution:

```js
function fizzBuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}
```


### 10) Secure login attempt window

Task: Given up to 3 attempts and the real password, return "Success" if any matches, else "Locked".

Solution:

```js
function canLogin(attempts, real) {
  if (!Array.isArray(attempts)) return "Locked";
  if (attempts.length === 0) return "Locked";
  const max = Math.min(3, attempts.length);
  for (let i = 0; i < max; i++) {
    if (attempts[i] === real) return "Success";
  }
  return "Locked";
}
```

If more challenges are needed, these can be extended with input validation guards, logging for defaults, and switching between if/else vs lookup tables to practice choosing the right control structure.
<span style="display:none">[^33_1][^33_2][^33_3][^33_4][^33_5][^33_6][^33_7][^33_8][^33_9]</span>

<div style="text-align: center">⁂</div>

[^33_1]: https://www.w3resource.com/javascript-exercises/javascript-conditional-statements-and-loops-exercises.php

[^33_2]: https://www.w3resource.com/javascript-exercises/

[^33_3]: https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-control-flow/cheatsheet

[^33_4]: https://www.javascript.com/learn/conditionals

[^33_5]: https://dev.to/arjun98k/conditional-statements-and-loops-in-javascript-28p7

[^33_6]: https://codeyourfuture.github.io/syllabus-master/js-core-1/week-2/lesson.html

[^33_7]: https://www.youtube.com/watch?v=yQ5j5R0p4mU

[^33_8]: https://www.w3schools.com/jsref/jsref_if.asp

[^33_9]: https://www.slideshare.net/slideshow/javascript-conditional-statements-51250141/51250141


---
