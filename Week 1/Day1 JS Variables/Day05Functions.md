Moving to **Day 5: Functions** in the roadmap!

## Learn

- **Concepts:** Declaring and using functions in JavaScript:
    - **Function Declaration:**

```js
function greet(name) {
  return `Hello, ${name}!`;
}
```

    - **Function Expression:**

```js
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

    - **Arrow Function:**

```js
const greet = (name) => `Hello, ${name}!`;
```

- **Reference:** [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)


## Apply

- **Exercise:** Write a function that returns the square of a number

```js
function square(num) {
  return num * num;
}

console.log(square(5)); // 25
```

- Try with different numbers!


## Build

- **Mini-Project:** Tip Calculator

```js
function calculateTip(bill, tipPercent) {
  const tipAmount = bill * (tipPercent / 100);
  return tipAmount;
}

let bill = 500;
let tipPercent = 10;
console.log(`Tip for ₹${bill} at ${tipPercent}%: ₹${calculateTip(bill, tipPercent)}`);
```

- Expand: Ask for user input and display the total bill (bill + tip).

***

Try the exercise and mini-project, and share any questions or your code. Next, I’ll break down each line, discuss important interview questions about functions, and explain best practices and developer mindset for robust JS function design!

---

# most asked interview questions and answers with dev thinking, mindset and approaches on this topics

Here are the **most asked JavaScript function interview questions** with detailed answers, developer mindset, and approaches that demonstrate deep practical understanding[^21_1][^21_2][^21_3][^21_4]:

***

## 1. What are the different ways to declare a function in JavaScript?

**Answer:**
There are three main ways:

- **Function Declaration:**

```js
function greet(name) {
  return `Hello, ${name}!`;
}
```

- **Function Expression:**

```js
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

- **Arrow Function (ES6):**

```js
const greet = (name) => `Hello, ${name}!`;
```


**Dev Mindset:**
Choose the style based on readability, scope/hoisting needs, and `this` binding. Prefer `const` + arrow function for short, pure callbacks; function declaration for named, hoisted functions[^21_1][^21_2][^21_4].

***

## 2. How does `this` behave differently in arrow functions vs regular functions?

**Answer:**

- Regular functions: `this` refers to the caller (object/context).
- Arrow functions: `this` is lexically scoped—no own binding—so it inherits from the parent scope.

**Example:**

```js
const person = {
  name: "Amit",
  getName: function() { return this.name; },
  getNameArrow: () => this.name
};
console.log(person.getName());      // "Amit"
console.log(person.getNameArrow()); // undefined or window.name
```

**Dev Mindset:**
Think about context: Use regular functions if you need dynamic binding (`this` changes), and arrow functions for static lexical scope, especially in callbacks[^21_1][^21_2][^21_4].

***

## 3. What are higher-order functions? Can you give an example?

**Answer:**
A higher-order function:

- Takes one or more functions as arguments, or returns a function.

**Example:**

```js
function double(x) { return x * 2; }
function process(arr, fn) {
  return arr.map(fn);
}
console.log(process([1,2,3], double)); // [2, 4, 6]
```

**Dev Mindset:**
Use higher-order functions for composability and reusability. They make code more modular, readable, and easier to test[^21_2][^21_3].

***

## 4. What is closure? How does it work in JavaScript?

**Answer:**
A closure is a function that has access to its outer scope, even after the outer function has returned.

**Example:**

```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

**Dev Mindset:**
Closures enable private state and encapsulation. They’re powerful for creating factory functions, custom iterators, and data privacy[^21_2][^21_3][^21_4].

***

## 5. What is a callback function?

**Answer:**
A callback is a function passed as an argument to another function, called upon completion.

**Example:**

```js
function fetchData(callback) {
  setTimeout(() => {
    callback("data loaded");
  }, 1000);
}
fetchData(data => console.log(data));
```

**Dev Mindset:**
Use callbacks for asynchronous code and decoupling logic. For complex flows, prefer Promises or async/await for better readability and error handling[^21_2].

***

## 6. How do you handle errors in a JavaScript function?

**Answer:**
Use `try...catch` for synchronous code, and `.catch` for Promises.

**Example:**

```js
function safeDivide(a, b) {
  try {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  } catch (err) {
    return err.message;
  }
}
console.log(safeDivide(10, 2)); // 5
console.log(safeDivide(10, 0)); // "Division by zero"
```

**Dev Mindset:**
Always protect code from unexpected errors that could crash logic. Communicate what could go wrong and how your solution deals with it[^21_1][^21_3].

***

## 7. What is function hoisting?

**Answer:**
Function declarations are hoisted—available before their definition. Function expressions and arrow functions are not hoisted.

**Example:**

```js
console.log(greet()); // Works
function greet() { return "Hello"; }

console.log(sayHi()); // Error
var sayHi = function() { return "Hi"; }
```

**Dev Mindset:**
Understand hoisting to prevent bugs and clarify code execution order. Prefer declarations for functions used throughout the file[^21_1][^21_3][^21_4].

***

## Interview Approach Tips

- Always clarify if you need pure functions (no side effects), async vs sync, scope handling.
- Communicate modular design: “I use higher-order and arrow functions for code clarity and reusability.”
- Explain tradeoffs (“Using closure for state, but watch for memory leaks in long-living callbacks.”).

***

Mastering these questions and demonstrating **clarity, modularity, error handling, and real-world code usage** shows strong developer thinking and interview readiness[^21_1][^21_4][^21_2][^21_3].
<span style="display:none">[^21_10][^21_11][^21_12][^21_13][^21_14][^21_15][^21_5][^21_6][^21_7][^21_8][^21_9]</span>

<div style="text-align: center">⁂</div>

[^21_1]: https://www.interviewbit.com/javascript-interview-questions/

[^21_2]: https://www.greatfrontend.com/questions/javascript-functions-interview-questions

[^21_3]: https://www.toptal.com/javascript/interview-questions

[^21_4]: https://www.hellojavascript.info/docs/general-javascript-questions/javascript-fundamentals/functions

[^21_5]: https://www.geeksforgeeks.org/javascript/javascript-interview-questions/

[^21_6]: https://roadmap.sh/questions/javascript

[^21_7]: https://dev.to/usman_awan/crack-your-javascript-interview-key-concepts-and-practice-questions-2p62

[^21_8]: https://www.youtube.com/watch?v=MX48mv73jf8

[^21_9]: https://www.greatfrontend.com/front-end-interview-playbook/javascript

[^21_10]: https://builtin.com/software-engineering-perspectives/javascript-interview-questions

[^21_11]: https://dev.to/tomeraitz/tricky-javascript-questions-7nk

[^21_12]: https://github.com/greatfrontend/top-javascript-interview-questions

[^21_13]: https://www.youtube.com/watch?v=btwFJT_xzdg

[^21_14]: https://github.com/sudheerj/javascript-interview-questions

[^21_15]: https://www.frontendinterviewhandbook.com/javascript-questions


---

# more 20

Here are **20 advanced and frequently asked JavaScript function interview questions** with clear answers, developer thinking, and approaches that will impress any interviewer[^22_1][^22_2][^22_3][^22_4]:

***

### 1. What is the difference between `function` declarations and `function` expressions?

**Answer:**
Function declarations are hoisted, usable before definition. Expressions aren’t hoisted, available only after assignment.
**Dev Mindset:** Use declarations for functions needed anywhere; expressions for local, scoped logic.

### 2. What are arrow functions?

**Answer:**
ES6 concise syntax, inherit `this` from the parent scope, not suitable as methods or constructors.
**Dev Mindset:** For callbacks, use arrow functions for cleaner, more predictable code.

### 3. Explain `this` binding in arrow functions vs regular functions.

**Answer:**
Arrow functions inherit `this`. Regular functions have dynamic `this`, determined by how they’re called.
**Approach:** Choose arrow for lexical scoping, regular for dynamic context.

### 4. What is a closure?

**Answer:**
A function retaining access to its parent scope even after the parent has returned.
**Approach:** Use closures for private state, factory functions, custom iterators.

### 5. What are higher-order functions?

**Answer:**
Functions that receive or return other functions.
**Approach:** Enables modular, testable, reusable code—use for transforming data or custom workflows.

### 6. What is a callback?

**Answer:**
Function passed as argument, executed later (often for async).
**Approach:** Use for event handlers, async APIs; prefer promises for complex flows.

### 7. What is function hoisting?

**Answer:**
Function declarations are loaded before any code runs; expressions/arrow functions aren’t.
**Approach:** Understand hoisting to manage code order and avoid ReferenceErrors.

### 8. What is strict mode and why use it?

**Answer:**
Enables safer, stricter parsing of code, preventing silent errors or unsafe behavior.
**Approach:** Always use `"use strict";` at file/function top for better error-catching[^22_1].

### 9. Describe the bind method.

**Answer:**
Returns a new function with `this` set to a provided value.
**Approach:** Use bind for event handlers, callbacks needing the original context.

### 10. How does currying work in JS?

**Answer:**
Transforms a function with multiple arguments into a sequence of functions, each with a single argument.
**Approach:** Useful for partial application and code reuse.

### 11. What is the Event Loop?

**Answer:**
Mechanism for handling asynchronous operations by processing tasks and microtasks.
**Approach:** Understand async execution, callback queue, and how JS remains non-blocking[^22_1].

### 12. What is the microtask queue vs task queue?

**Answer:**
Microtasks (promise callbacks, mutation observers) run after the current script, before rendering. Tasks (setTimeout, setInterval) run next.
**Dev Mindset:** Plan async code for race conditions and correct execution order[^22_4].

### 13. What is debouncing?

**Answer:**
Limits how often a function can run, executing only after wait interval passes since last call.
**Approach:** Use for resize/search events to reduce unnecessary work.

### 14. What is throttling?

**Answer:**
Allows a function to execute at most once per time interval.
**Approach:** Apply to high-frequency events like scroll for improved performance.

### 15. What is a polyfill?

**Answer:**
A code snippet providing new JS features to older browsers.
**Dev Mindset:** Write polyfills for compatibility; understand underlying implementation.

### 16. What is the difference between `require` and `import`?

**Answer:**
`require` is CommonJS (Node.js), runs synchronously. `import` is ES6, supports async loading and tree-shaking.
**Approach:** Use `import` for modularity and future-proofing.

### 17. Describe Object.freeze vs const.

**Answer:**
`const` makes variable binding immutable. `Object.freeze` makes object properties immutable.
**Approach:** Use both for protecting state in critical parts of apps.

### 18. How do anonymous functions help?

**Answer:**
Encapsulate logic for immediate use (like IIFE or callbacks), avoid polluting global scope.
**Dev Mindset:** Use for scoping or single-use logic.

### 19. What are Set and WeakSet?

**Answer:**
`Set` stores unique values; `WeakSet` stores objects weakly, not prevent GC.
**Approach:** Use for fast lookups and memory-sensitive object tracking.

### 20. How are object properties added/removed dynamically?

**Answer:**
Assign with `obj.prop = value`; remove with `delete obj.prop`.
**Dev Mindset:** Leverage JS object flexibility, but avoid excessive dynamic changes for maintainability.

***

**Interview Approaches:**

- Always clarify async needs, performance considerations, and intended use-case.
- Communicate why a pattern is chosen (scope, safety, performance).
- Explain edge cases, e.g., closure memory leaks, context confusion with `this`, or compatibility needs.

Showing not just answers, but sound reasoning, problem-solving, and architectural awareness will impress senior interviewers[^22_4][^22_1][^22_5]. If you want even deeper or algorithmic function questions, let me know!
<span style="display:none">[^22_6][^22_7][^22_8][^22_9]</span>

<div style="text-align: center">⁂</div>

[^22_1]: https://www.linkedin.com/pulse/50-vital-advanced-javascript-interview-questions-answers-h30ce

[^22_2]: https://www.interviewbit.com/javascript-interview-questions/

[^22_3]: https://www.greatfrontend.com/questions/javascript-functions-interview-questions

[^22_4]: https://www.greatfrontend.com/blog/advanced-javascript-interviews-questions-for-10-years-experience

[^22_5]: https://codesignal.com/blog/interview-prep/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/

[^22_6]: https://www.geeksforgeeks.org/javascript/javascript-interview-questions-and-answers-set-3/

[^22_7]: https://in.indeed.com/career-advice/interviewing/advanced-javascript-interview-questions

[^22_8]: https://roadmap.sh/questions/javascript

[^22_9]: https://github.com/sudheerj/javascript-interview-questions


---

# Show 20 more advanced JavaScript interview questions

Here are **20 more advanced JavaScript interview questions** that cover functions, objects, async patterns, ES6 features, and core language concepts often asked for developer and senior roles[^23_1][^23_2][^23_3]:

***

1. What’s the difference between shallow and deep copy in JavaScript?
2. How does garbage collection work in JavaScript?
3. Explain the prototype chain and inheritance.
4. What are Promises and how do you use them?
5. What is async/await and how does it improve async programming?
6. Explain the difference between `.call()`, `.apply()`, and `.bind()`.
7. What are template literals and when should you use them?
8. How does destructuring work for objects and arrays?
9. What is the difference between `null` and `undefined`?
10. How do you implement memoization in JS?
11. How do modules work in JavaScript (ES6 vs CommonJS)?
12. What are WeakMap and WeakSet and when would you use them?
13. Explain Symbol data type and its use-cases.
14. What is the spread operator and give examples of advanced usage.
15. Explain event delegation in DOM.
16. What is the difference between synchronous and asynchronous code execution?
17. How does the `Array.prototype.reduce()` method work? Give examples.
18. What are generators in JavaScript and practical uses?
19. How does the `Object.assign()` method work? Give caveats.
20. What are the limitations of floating-point arithmetic in JS? How do you mitigate errors?

***

These questions test **deep knowledge**, practical experience, and architectural understanding of JavaScript. They probe design decisions, error handling, memory management, advanced ES6+ syntax, and real-world application features. If you want solutions or explanations to any from this list, just ask and I’ll break them down in practical detail[^23_2][^23_1][^23_3].

<div style="text-align: center">⁂</div>

[^23_1]: https://www.greatfrontend.com/blog/advanced-javascript-interviews-questions-for-10-years-experience

[^23_2]: https://www.linkedin.com/pulse/50-vital-advanced-javascript-interview-questions-answers-h30ce

[^23_3]: https://codesignal.com/blog/interview-prep/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/


---


1. Difference between shallow and deep copy

Shallow Copy: Copies only references for nested objects/arrays (not actual values).

Deep Copy: Copies entire structure including nested objects.

// Shallow copy
let obj = { name: "Nurul", address: { city: "Guwahati" } };
let shallow = { ...obj };
shallow.address.city = "Delhi";

console.log(obj.address.city); // "Delhi" → both changed (shared reference)

// Deep copy
let deep = JSON.parse(JSON.stringify(obj));
deep.address.city = "Mumbai";

console.log(obj.address.city); // "Delhi" (unchanged)

2. Garbage collection in JavaScript

JS uses automatic garbage collection (mark-and-sweep algorithm).

Objects are removed when no references to them remain.

let user = { name: "Nurul" };
user = null; // No references left → GC will reclaim memory

3. Prototype chain and inheritance

Every object has a hidden property [[Prototype]] → points to another object.

JS inheritance works via prototype chain.

function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log(`Hello, I am ${this.name}`);
};

let nurul = new Person("Nurul");
nurul.sayHello(); // "Hello, I am Nurul"
// nurul → Person.prototype → Object.prototype

4. Promises

A Promise represents an async operation result (success/failure).

States: pending → fulfilled/rejected.

let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data loaded"), 1000);
});

promise.then(data => console.log(data)).catch(err => console.error(err));

5. async/await

Syntactic sugar over Promises.

Makes async code look like sync.

async function fetchData() {
  try {
    let result = await Promise.resolve("Data fetched");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
fetchData();

6. .call(), .apply(), .bind()

.call(thisArg, ...args) → calls function with given context & arguments.

.apply(thisArg, [args]) → same as call but args as array.

.bind(thisArg) → returns a new function with bound this.

function greet(msg) {
  console.log(`${msg}, ${this.name}`);
}
const user = { name: "Nurul" };

greet.call(user, "Hello");   // Hello, Nurul
greet.apply(user, ["Hi"]);   // Hi, Nurul
let bound = greet.bind(user);
bound("Welcome");            // Welcome, Nurul

7. Template literals

ES6 feature using backticks `

Supports interpolation & multiline.

let name = "Nurul";
console.log(`Hello, ${name}! 
Welcome to JS.`); // multiline string

8. Destructuring
// Array
let [a, b] = [10, 20];
console.log(a, b); // 10, 20

// Object
let { name, age } = { name: "Nurul", age: 23 };
console.log(name, age); // Nurul 23

9. null vs undefined

null → intentional empty value.

undefined → variable declared but not assigned.

let x;
console.log(x); // undefined
let y = null;
console.log(y); // null

10. Memoization

Caching results of expensive function calls.

function memoize(fn) {
  let cache = {};
  return function(n) {
    if (n in cache) return cache[n];
    return (cache[n] = fn(n));
  };
}

const square = memoize(n => n * n);
console.log(square(5)); // 25 (calculated)
console.log(square(5)); // 25 (cached)

11. Modules (ES6 vs CommonJS)

CommonJS (require, Node.js)

ES6 Modules (import/export, browser & Node)

// CommonJS
const fs = require("fs");

// ES6
import fs from "fs";

12. WeakMap & WeakSet

Keys must be objects, not primitives.

Garbage-collected automatically → prevents memory leaks.

let wm = new WeakMap();
let obj = {};
wm.set(obj, "data");
obj = null; // entry removed automatically

13. Symbol

Unique, immutable primitive → avoids property name conflicts.

let id = Symbol("id");
let user = { [id]: 123, name: "Nurul" };
console.log(user[id]); // 123

14. Spread operator
// Copy
let arr = [1,2];
let copy = [...arr];

// Merge
let obj1 = {a:1}, obj2 = {b:2};
let merged = {...obj1, ...obj2};

// Advanced: Rest
function sum(...nums) { return nums.reduce((a,b)=>a+b); }
console.log(sum(1,2,3)); // 6

15. Event delegation

Attach event listener to parent, handle child events.

document.getElementById("list").addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.innerText);
  }
});

16. Sync vs Async
// Sync
console.log("A");
console.log("B");

// Async
setTimeout(() => console.log("Async"), 0);
console.log("C");

// Output: A, B, C, Async

17. reduce()

Accumulates values into a single result.

let arr = [1, 2, 3, 4];
let sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum); // 10

18. Generators

Functions that can pause & resume with yield.

function* gen() {
  yield 1;
  yield 2;
}
let g = gen();
console.log(g.next().value); // 1
console.log(g.next().value); // 2

19. Object.assign()

Copies properties from source objects to target.

let target = { a: 1 };
let source = { b: 2 };
Object.assign(target, source);
console.log(target); // { a:1, b:2 }


⚠️ Caveat: Shallow copy (nested objects are still references).

20. Floating-point issues

JS numbers are IEEE-754 → precision issues.

console.log(0.1 + 0.2); // 0.30000000000000004


✅ Fix:

console.log((0.1 + 0.2).toFixed(2)); // "0.30"
console.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3
