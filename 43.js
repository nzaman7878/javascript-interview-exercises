/* Create a function that determines wheter a number is Oddish or Evenish. 
A number is Oddish if the sum of all of its digits is odd, and a number is Evenish 
if the sum of all of its digits is even.If a number is Oddish ,
return Oddish . Otherwise , return Evenish. */

function oddishOrEvenish(number) {
    // Convert the number to a string, split it into digits, and sum them up
    const sumOfDigits = number
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);

    // Check if the sum of the digits is odd or even
    if (sumOfDigits % 2 === 0) {
        return 'Evenish';
    } else {
        return 'Oddish';
    }
}

// Example usage
console.log(oddishOrEvenish(12345)); // Output: Oddish (1+2+3+4+5 = 15, which is odd)
console.log(oddishOrEvenish(2468));  // Output: Evenish (2+4+6+8 = 20, which is even)
console.log(oddishOrEvenish(4433));  // Output: Evenish (4+4+3+3 = 14, which is even)
console.log(oddishOrEvenish(1111));  // Output: Evenish (1+1+1+1 = 4, which is even)
