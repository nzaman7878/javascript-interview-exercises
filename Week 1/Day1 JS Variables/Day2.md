# 📘 Day 2: Operators & Expressions

This document covers the fundamentals of **operators and expressions** in JavaScript, including concepts, practical exercises, code explanations, and common interview questions.

---

## 🧠 Learn

### 🔹 Concepts
- **Arithmetic Operators**: Perform mathematical calculations.  
- **Comparison Operators**: Compare two values.  
- **Logical Operators**: Combine or invert boolean values.  

### 🔹 Docs for Reference
- Arithmetic: `+`, `-`, `*`, `/`, `%`  
- Comparison: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`  
- Logical: `&&` (AND), `||` (OR), `!` (NOT)  

📖 For a deeper dive, check the [MDN Documentation on Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators).

---

## 🚀 Apply

### 🧮 Exercise: Calculate BMI
Write a simple JavaScript program to calculate the **Body Mass Index (BMI)**.

```js
let weightInKg = 70;        // Replace with your weight
let heightInMeters = 1.75;  // Replace with your height

let bmi = weightInKg / (heightInMeters * heightInMeters);

console.log("Your BMI is: " + bmi.toFixed(2));

## 🛠️ Build
⚡ Mini-Project: Simple Calculator

Create a calculator that can perform addition, subtraction, multiplication, and division for two numbers

let num1 = 10;
let num2 = 5;
let operator = '+';   // Try '+', '-', '*', '/'

let result;
if (operator === '+') {
  result = num1 + num2;
} else if (operator === '-') {
  result = num1 - num2;
} else if (operator === '*') {
  result = num1 * num2;
} else if (operator === '/') {
  result = num1 / num2;
} else {
  result = "Invalid operator";
}

console.log("Result: " + result);


🔬 Code Explanations
📌 BMI Calculator
let weightInKg = 70;


What: Declares a variable with value 70.

Why: Stores the person’s weight in kilograms.

How: let allows reassignment later if needed.

let heightInMeters = 1.75;


Holds the height in meters for the BMI formula.

let bmi = weightInKg / (heightInMeters * heightInMeters);


What: Calculates BMI = weight ÷ (height²).

Why: Standard BMI formula.

How: Uses / (division) and * (multiplication).

console.log("Your BMI is: " + bmi.toFixed(2));


What: Prints BMI with 2 decimal places.

Why: To show clean output to the user.

How: .toFixed(2) formats numbers neatly.

📌 Simple Calculator
let num1 = 10;
let num2 = 5;


Store two numbers for calculation.

let operator = '+';


Stores the desired operation (+, -, *, /).

let result;


A placeholder variable for storing the output.

if (operator === '+') { ... }


What: Checks which operator is chosen.

Why: To decide the calculation dynamically.

How: Uses === for strict comparison and if-else for flow control.

console.log("Result: " + result);


Displays the final calculated value.

💬 Most Asked Interview Questions on Operators & Expressions

1.What are the different types of operators in JavaScript?
🔹 Arithmetic, Assignment, Comparison, Logical, Bitwise, etc.

2.What is the difference between == and ===?
🔹 == compares values with type coercion (5 == "5" → true).
🔹 === compares both value and type strictly (5 === "5" → false).

3.How do you perform arithmetic operations in JavaScript?
🔹 Using +, -, *, /, %.

4.Explain operator precedence in JavaScript.
🔹 Some operators run before others. Example: 2 + 3 * 4 = 14 (not 20).
🔹 Use parentheses () to control order.

5.How do logical operators work?
🔹 && (AND), || (OR), ! (NOT).

6.What’s the difference between postfix and prefix increment operators?
🔹 i++ (postfix): returns old value, then increments.
🔹 ++i (prefix): increments first, then returns new value.

7.How does short-circuit evaluation work with logical operators?
🔹 Stops evaluating when the result is already determined.
Example: true || anything → second part not checked.