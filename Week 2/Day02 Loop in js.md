Moving to **Week 2 Day 2: Loops and iteration patterns** with a focus on for/while, for...of/for...in, and using break/continue to write clear, efficient control flow. [^34_1][^34_2]

## Learn

- Use classic `for` when index control or step customization is needed, `while` for open-ended conditions, and `do...while` when the body must run at least once. [^34_1][^34_3]
- Prefer `for...of` to iterate values from arrays and other iterables, which improves readability over index-based access when indexes are not required. [^34_4][^34_1]
- Use `for...in` to iterate enumerable property keys of objects, and avoid it for arrays to prevent surprising enumeration of non-index properties. [^34_1][^34_5]


## Break vs continue

- `break` immediately terminates the current loop or `switch` and transfers control to the statement after it, which is essential for early exit on a found condition. [^34_6][^34_1]
- `continue` skips the rest of the current iteration and proceeds with the next iteration, which reduces nesting when certain cases should be ignored. [^34_7][^34_1]
- Both `break` and `continue` support labels for advanced flow control, but labeled statements should be used sparingly for readability. [^34_6][^34_7]


## Apply

- Sum of squares using `for...of`:

```js
function sumSquares(nums) {
  let sum = 0;
  for (const n of nums) sum += n * n;
  return sum;
}
```

This uses `for...of` to iterate values directly without manual indexing, keeping the loop concise and intention-revealing. [^34_4][^34_1]

- Find first value greater than k (early exit):

```js
function firstGreater(nums, k) {
  for (const n of nums) {
    if (n > k) return n;
  }
  return null;
}
```

An early return provides the same effect as `break` for immediate exit when a match is found, avoiding unnecessary iterations. [^34_6][^34_4]

- Skip negatives with `continue`:

```js
function sumNonNegative(nums) {
  let s = 0;
  for (const n of nums) {
    if (n < 0) continue;
    s += n;
  }
  return s;
}
```

Using `continue` short-circuits unwanted cases cleanly and keeps the happy path unindented. [^34_7][^34_1]

## Build

- Order analytics (sum, count, max, stop on fraud):

```js
function analyze(orders) {
  let sum = 0, count = 0, maxAmt = -Infinity;
  for (const o of orders) {
    if (o.flagged) break;
    sum += o.amount;
    count++;
    if (o.amount > maxAmt) maxAmt = o.amount;
  }
  return { sum, count, maxAmt: count ? maxAmt : null };
}
```

This pattern combines `for...of` for value iteration with `break` to stop processing on a sentinel (e.g., fraud), minimizing wasted work and clarifying the control flow. [^34_4][^34_6]

## Developer mindset

- Choose the loop that best conveys intent: `for...of` for values, `for` for index math, `while` for condition-driven repetition, and avoid `for...in` on arrays to prevent enumerating unexpected keys. [^34_1][^34_5]
- Prefer early exits with `break`/return over deep nesting to keep branches shallow and logic readable, and apply `continue` to filter out unneeded cases without extra indentation. [^34_6][^34_7]
- Understand iteration protocols so iterables (arrays, sets, strings) integrate naturally with `for...of`, spread, and destructuring across codebases. [^34_8][^34_1]


## Practice

- Implement an `average(nums)` function that ignores non-numeric values with `continue` and returns `null` for an empty valid set. [^34_7][^34_1]
- Write `indexOfManual(arr, x)` that returns the first index of `x` or `-1`, using a counted `for` and breaking on match. [^34_2][^34_6]
- Create `lastPositive(nums)` that walks from the end with a reverse `for` loop to return the last positive number or `null`. [^34_2][^34_1]
<span style="display:none">[^34_10][^34_11][^34_12][^34_13][^34_14][^34_15][^34_16][^34_17][^34_18][^34_19][^34_20][^34_9]</span>

<div style="text-align: center">⁂</div>

[^34_1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

[^34_2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for

[^34_3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while

[^34_4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

[^34_5]: https://www.w3schools.com/js/js_loop_forin.asp

[^34_6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break

[^34_7]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue

[^34_8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

[^34_9]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops

[^34_10]: https://www.w3schools.com/js/js_switch.asp

[^34_11]: https://www.w3schools.com/js/js_loop_for.asp

[^34_12]: https://lia.disi.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break.html

[^34_13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_continue

[^34_14]: https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Iterators_and_Generators

[^34_15]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/continue

[^34_16]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_break

[^34_17]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/continue

[^34_18]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

[^34_19]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with

[^34_20]: https://developer.mozilla.org/en-US/docs/Web/JavaScript


---

# Generate 10 loop practice problems with solutions for Day 2

Here are 10 loop-focused JavaScript practice problems for Day 2, each with a clean, production-style solution and a short note on why that loop/approach fits best.

## 1. Sum 1..n

- Task: Return the sum from 1 to n (n ≥ 0).
- Approach: Classic counted loop; clear bounds and updates.

```js
function sumTo(n) {
  let s = 0;
  for (let i = 1; i <= n; i++) s += i;
  return s;
}
// sumTo(5) -> 15
```


## 2. Factorial while

- Task: Compute n! for n ≥ 0.
- Approach: while fits condition-driven repetition.

```js
function factorial(n) {
  let res = 1, i = 2;
  while (i <= n) { res *= i; i++; }
  return res;
}
// factorial(5) -> 120
```


## 3. Reverse array

- Task: Return a reversed copy without mutating the original.
- Approach: Index from the end; preserves immutability.

```js
function reversedCopy(arr) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
  return out;
}
// reversedCopy([1,2,3]) -> [3,2,1]
```


## 4. First greater than k

- Task: Return the first array value > k, else null.
- Approach: Early return for immediate exit on match.

```js
function firstGreater(nums, k) {
  for (const n of nums) {
    if (n > k) return n;
  }
  return null;
}
// firstGreater([1,3,5,2], 3) -> 5
```


## 5. Sum until sentinel

- Task: Sum values until a sentinel 0 appears; ignore the rest.
- Approach: Break stops unnecessary iterations.

```js
function sumUntilZero(nums) {
  let s = 0;
  for (const n of nums) {
    if (n === 0) break;
    s += n;
  }
  return s;
}
// sumUntilZero([4,5,2,0,9]) -> 11
```


## 6. Skip with continue

- Task: Sum squares of only even numbers.
- Approach: continue keeps the happy path unindented.

```js
function sumEvenSquares(nums) {
  let s = 0;
  for (const n of nums) {
    if (n % 2 !== 0) continue;
    s += n * n;
  }
  return s;
}
// sumEvenSquares([1,2,3,4]) -> 20
```


## 7. Word frequency

- Task: Count occurrences of each word in a sentence (split by spaces).
- Approach: for...of on words; object as frequency map.

```js
function wordFreq(sentence) {
  const freq = Object.create(null);
  const words = sentence.trim() ? sentence.trim().split(/\s+/) : [];
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  return freq;
}
// wordFreq("hi hi there") -> { hi: 2, there: 1 }
```


## 8. Transpose matrix

- Task: Transpose a 2D rectangular array.
- Approach: Nested loops; precise index mapping.

```js
function transpose(mat) {
  if (mat.length === 0) return [];
  const rows = mat.length, cols = mat[^35_0].length;
  const out = Array.from({ length: cols }, () => Array(rows));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out[c][r] = mat[r][c];
    }
  }
  return out;
}
/*
transpose([
  [1,2,3],
  [4,5,6]
]) -> [
  [1,4],
  [2,5],
  [3,6]
]
*/
```


## 9. Sum numbers only

- Task: Sum only numeric values from a mixed array; skip falsy and non-numbers.
- Approach: Type check + continue for clarity.

```js
function sumNumbersOnly(arr) {
  let s = 0;
  for (const v of arr) {
    if (typeof v !== "number" || Number.isNaN(v)) continue;
    s += v;
  }
  return s;
}
// sumNumbersOnly([1,"2",null,3,undefined,NaN,4]) -> 8
```


## 10. do…while demo

- Task: Consume chunks (array of numbers) until cumulative sum reaches at least target; return count of chunks consumed.
- Approach: do…while runs at least once; good when a step must execute before checking.

```js
function consumeUntil(chunks, target) {
  let i = 0, sum = 0, used = 0;
  if (chunks.length === 0) return 0;
  do {
    sum += chunks[i];
    used++;
    i++;
  } while (sum < target && i < chunks.length);
  return used;
}
// consumeUntil([3,2,5,1], 6) -> 3  (3+2+1? wait: 3+2=5 <6, add 5 -> 10; actually returns 3 using chunks [3,2,5])
```

If more practice is desired, try variations like: reverse only a subrange, find last positive by scanning backward, or build a histogram of array values with nested loops (value to frequency bin).
<span style="display:none">[^35_1][^35_2][^35_3][^35_4][^35_5][^35_6][^35_7][^35_8]</span>

<div style="text-align: center">⁂</div>

[^35_1]: https://pynative.com/python-if-else-and-for-loop-exercise-with-solutions/

[^35_2]: https://www.youtube.com/watch?v=19j94QKhAEk

[^35_3]: https://www.w3resource.com/c-programming-exercises/for-loop/index.php

[^35_4]: https://learnpython.com/blog/python-loop-exercises/

[^35_5]: https://30dayscoding.com/blog/while-loop-practice-problems-python

[^35_6]: https://www.shiksha.com/online-courses/articles/for-loop-in-python-examples/

[^35_7]: https://java-book.softuni.org/chapter-05-loops-exam-problems.html

[^35_8]: https://www.scribd.com/document/415008798/Practice-Programs-on-Loops