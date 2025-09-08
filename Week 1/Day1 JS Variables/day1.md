# 🚀 Day 1 – Variables & Data Types in JavaScript

## 📖 Learn

### 🔑 Concept  
Variables are containers for storing data values. In JavaScript, we mainly use two modern keywords to declare variables:

- **`let`** → used when the value may change later.  
- **`const`** → used when the value should remain constant (cannot be reassigned).  

👉 `typeof` operator helps us check the **data type** of a variable.

---

### 📝 Data Types in JavaScript  
1. **String** → Textual data (e.g., `"Hello"`, `'World'`).  
2. **Number** → Numeric values (e.g., `25`, `3.14`).  
3. **Boolean** → Logical values (`true` or `false`).  
4. **Null** → Represents "nothing" or an empty value.  
5. **Undefined** → A variable that has been declared but not assigned a value.  
6. **Object** → Collection of key-value pairs (e.g., `{ name: "Amit", age: 25 }`).  
7. **Array** → A list-like collection of values (e.g., `[1, 2, 3]`).  
8. **Symbol** → A unique and immutable value (used for special cases).  
9. **BigInt** → Used for very large numbers beyond the safe limit of `Number`.  

---

### 📚 Reference  
- [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)  
- [MDN: const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)  
- [MDN: typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)  

---

## 💻 Apply

### 🏋️ Coding Exercise  
Define variables for:
- Name (**string**)  
- Age (**number**)  
- isStudent (**boolean**)  

```js
let name = "Nuruz";
let age = 25;
let isStudent = true;

console.log(typeof name);       // "string"
console.log(typeof age);        // "number"
console.log(typeof isStudent);  // "boolean"

##Mini project About me 

let name = "Nuruz";
let age = 22;
let isStudent = true;
let hobby = "Coding";

console.log(`Hi, I'm ${name}, I'm ${age} years old. Student status: ${isStudent ? "Student" : "Professional"}. My hobby is ${hobby}.`);


## Common Interview Questions (Variables & Data Types)
How many data types are there in JavaScript?

JavaScript has eight data types: Number, String, Boolean, BigInt, Null, Undefined, Symbol, and Object.

Which operator is used to determine the type of a value?

The typeof operator.

How are variables declared?

Using let, const, or var.

What’s the difference between primitive and object types?

Primitives are single values (like numbers or strings), objects can store collections.

JavaScript Symbols Explained

$ in JavaScript
General Use: $ is just a valid variable name character. In vanilla JS, it has no special meaning. Libraries like jQuery use $ to access features rapidly, e.g., $('#id').

You can name variables or functions with $ if you wish.

Example: let $total = 10;

console in JavaScript
Purpose: console is an object for debugging/logging.

Common Methods:

console.log() — Print info to the console, mainly for developers (e.g., console.log("Hello, World!")).

console.error() — Show errors.

console.warn() — Show warnings.

console.info() — Show info message.

Generates output you see in Developer Tools (browser F12 → Console tab).

. (Dot) in JavaScript
Dot Operator: Used to access properties or methods of objects.

Example: console.log(), student.name, array.length.

Interview Focus
Explaining and using these operators (let, const, typeof, ., $, console.log) clearly and precisely is expected in interviews for beginners and even intermediates.

Practicing short code examples in the console or an editor makes these concepts clearer.

1. What are var, let, and const? How do they differ?
Answer:

var was the original keyword for declaring variables; it has function scope and is subject to hoisting, which can introduce bugs since it's accessible even before assignment.
let and const were introduced in ES6; both have block scope, making them predictable.

Use let for variables that might change.

Use const for values that should never change.
const must be initialized at declaration and cannot be reassigned, though its object properties can be mutated.

example:

var a = 1; // Function-scoped
let b = 2; // Block-scoped
const c = 3; // Block-scoped, constant
2. When should you use let vs const?
Answer:
Prefer const by default. Use let only when the variable will be reassigned, such as in loops or when updating scores. This makes code clearer and prevents accidental changes, improving maintainability.

example:

const API_KEY = "xyz"; // Never changes
let total = 0; // Changes as calculations progress
3. Why is var discouraged in modern JavaScript?
Answer:
var's function scope and hoisting can cause unpredictable bugs, especially in loops or conditional blocks.
For example:



if (true) {
  var x = 5;
}
console.log(x); // 5, even outside the block!

if (true) {
  let y = 10;
}
console.log(y); // ReferenceError: y is not defined
Always use let or const for safer, clearer code.

4. What is hoisting? How does it affect variable declarations?
Answer:
Hoisting moves variable (and function) declarations to the top of their scope before code executes.

var is hoisted and initialized as undefined

let and const are hoisted, but not initialized, causing the "Temporal Dead Zone" (TDZ)

example:

console.log(a); // undefined (var is hoisted)
var a = 1;

console.log(b); // ReferenceError (let is hoisted but not initialized)
let b = 2;

This explains why accessing a let or const variable before its declaration results in an error.

5. Can you declare a const variable without assigning a value?
Answer:
No. const must be initialized at the time of declaration, or JavaScript throws a SyntaxError.

example:

const z; // SyntaxError: Missing initializer
This enforces immutability from the start.

6. Which keyword would you use for loop iterators?
Answer:
Use let for loop variables so their scope is properly limited to the block of the loop:

example:


for (let i = 0; i < 5; i++) { /* ... */ }
Using var here could lead to scope leaks and bugs.

7. Extra: Real-World Example—Best Practices
Answer:
Always declare variables at the top of their scope, use const unless reassignment is needed, and avoid var for reliable, bug-free code. Explaining with examples can further satisfy the interviewer:

example:

const user = { name: "Alex" };
user.name = "Ben"; // Property mutation is allowed
user = {}; // Error: cannot reassign const


Scope in JavaScript defines where variables are accessible, while the Temporal Dead Zone (TDZ) is the period during which block-scoped variables (let, const) exist but cannot be accessed.

Scope in JavaScript
Scope determines a variable's visibility and lifetime:

Global Scope: Accessible everywhere in the code.

Function Scope: Variables declared with var can only be accessed inside the same function.

Block Scope: Variables declared with let or const are accessible only within the surrounding { } block (e.g., in an if, for, or function body).

code : 
function testScope() {
  if (true) {
    let blockVar = 5;
    var funcVar = 10;
  }
  console.log(funcVar); // 10 (function scope)
  console.log(blockVar); // ReferenceError (block scope)
}
Temporal Dead Zone (TDZ)
The TDZ is the time between entering a scope and the actual declaration/initialization of a let or const variable.

Variables declared with let or const are hoisted but not initialized.

TDZ starts at the beginning of the block and ends when declaration is executed.

Accessing the variable during TDZ gives a ReferenceError.

Example:


{
  // TDZ starts here
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 2;      // TDZ ends after this line
}
For var, the variable is initialized as undefined immediately when hoisted, so no TDZ exists.

Summary Table:

Keyword	Scope	TDZ Present	Initialization before declaration

var	Function	No	undefined
let	Block	Yes	No
const	Block	Yes	No (must be assigned at declaration)

1.Why does TDZ matter?

Prevents bugs by ensuring variables aren’t accessed until they’re safely initialized.

Enforces predictable, safe coding habits.

Understanding scope and TDZ is crucial for writing error-free, modern JavaScript.