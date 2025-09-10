# 📘 Day 3: Strings

This document covers the fundamentals of **strings** in JavaScript, including concepts, exercises, mini-projects, code explanations, and common interview questions.

---

## 🧠 Learn

### 🔹 Concepts
- `.length` → returns the number of characters in a string.  
- `.toUpperCase()` → converts the string to uppercase.  
- `.slice(start, end)` → extracts a substring from start index up to but not including end index.  

📖 For more, check the [MDN Documentation on Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

---

## 🚀 Apply

### 🧮 Exercise: Count Vowels in a Word
Write code that counts vowels (a, e, i, o, u, case-insensitive) in a string:

```js
let word = "JavaScript";
let vowels = "aeiouAEIOU";
let count = 0;

for (let char of word) {
  if (vowels.includes(char)) {
    count++;
  }
}

console.log(`Number of vowels in "${word}": ${count}`);

🛠️ Build
⚡ Mini-Project: Password Strength Checker

Create a simple password strength checker that validates:

Minimum length → at least 8 characters.

Contains a symbol → at least one non-alphanumeric character.

let password = "Passw0rd!";

let hasMinLength = password.length >= 8;
let hasSymbol = /[^\w]/.test(password);

if (hasMinLength && hasSymbol) {
  console.log("Strong password");
} else {
  console.log("Weak password");
}

🔬 Code Explanations
📌 Vowel Count
let word = "JavaScript";


What: Declares a variable with the string "JavaScript".

Why: Input word to count vowels in.

How: let allows reassignment if needed.

let vowels = "aeiouAEIOU";


Holds all vowels (both lowercase and uppercase).

let count = 0;


Counter initialized to zero.

for (let char of word) {
  if (vowels.includes(char)) {
    count++;
  }
}


Iterates through each character in the string.

.includes() checks if it’s a vowel.

Increments count if true.

console.log(`Number of vowels in "${word}": ${count}`);


Outputs result with template literals.

📌 Password Strength Checker
let password = "Passw0rd!";


Holds the password to validate.

let hasMinLength = password.length >= 8;


Checks if length ≥ 8.

Returns a boolean (true/false).

let hasSymbol = /[^\w]/.test(password);


Regex /[^\w]/ matches any non-word character.

.test() returns true if symbol exists.

if (hasMinLength && hasSymbol) {
  console.log("Strong password");
} else {
  console.log("Weak password");
}


Uses && (AND) to ensure both conditions hold.



## 💬 Most Asked Interview Questions on Strings

1.What are strings in JavaScript?

A sequence of characters enclosed in quotes (' ', " ", or ` `).

Strings are immutable → characters can’t be changed directly.

2.How do you find the length of a string?

let str = "Hello";
console.log(str.length); // 5


3.How can you extract a substring?

.slice(start, end)

.substring(start, end)

.substr(start, length) (less common)

let word = "JavaScript";
console.log(word.slice(0, 4)); // "Java"


4.Difference between .slice() and .substring()?

.slice() accepts negative indexes (counts from end).

.substring() treats negatives as 0.

5.How to convert string case?

console.log("hello".toUpperCase()); // "HELLO"
console.log("HELLO".toLowerCase()); // "hello"


6.How do you check if a string contains a substring?

.includes(substring) → returns true/false.

Before ES6: .indexOf(substring) !== -1.

7.How do template literals improve string handling?

Use backticks ` for easy interpolation and multiline strings.

let name = "Alice";
console.log(`Hello, ${name}!`); // Hello, Alice!


8.What are regular expressions and how are they used with strings?

Regex are patterns for matching text.

Used with .test(), .match(), .replace().

let pass = "Hello123!";
console.log(/[0-9]/.test(pass)); // true (contains digit)