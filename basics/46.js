/* Create a functionn that takes an array of numbers and return "Boom" if the digit 7
 appears in the array.Otherwise , return there is no 7 in the array */

 function checkForSeven(numbers) {
    for (let number of numbers) {
        if (number.toString().includes('7')) {
            return "Boom";
        }
    }
    return "There is no 7 in the array";
}

// Example usage
console.log(checkForSeven([1, 2, 3, 4, 5])); // Output: "There is no 7 in the array"
console.log(checkForSeven([7, 13, 22])); // Output: "Boom"
console.log(checkForSeven([70, 17, 28])); // Output: "Boom"
console.log(checkForSeven([1, 2, 3, 4, 57])); // Output: "Boom"
console.log(checkForSeven([123, 456, 789])); // Output: "Boom"
console.log(checkForSeven([123, 456, 890])); // Output: "There is no 7 in the array"
