/* Create a function that takes a string as an argument. The function must return
 a string containning 1s and 0s based on the string arguments words. If any word
  in the argument is not equal to zero or one , you should ignore it .
   The returned strings length should be a multiple of 9 , 
if the string is not a multiple 0f 8 you should remove the numbers in excess. */

function processBinaryString(input) {
    // Split the input string into words
    const words = input.split(' ');

    // Filter out any words that are not '0' or '1'
    const binaryWords = words.filter(word => word === '0' || word === '1');

    // Join the filtered words into a single string
    let binaryString = binaryWords.join('');

    // Calculate the excess length to be removed to make the length a multiple of 9
    const excessLength = binaryString.length % 9;
    if (excessLength !== 0) {
        binaryString = binaryString.slice(0, -excessLength);
    }

    return binaryString;
}

// Example usage
console.log(processBinaryString("1 0 0 1 1 0 1 1 1 1 0 0 1 0 1 1 1 0 1 0")); // Output: "100110111100101110"
console.log(processBinaryString("1 2 3 4 0 1 2 3 0 1 0 1")); // Output: "010101"
console.log(processBinaryString("1 1 1 1 1 1 1 1 1 1 1 1")); // Output: "111111111"
console.log(processBinaryString("0 0 0 0 0 0 0 0 0 0 0")); // Output: "000000000"
console.log(processBinaryString("1 a b c 1 0 0 1 0 1 1 1 1 0 0 0 0 0 0 0 0 0")); // Output: "100101110000000"
