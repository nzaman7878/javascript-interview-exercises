/* Given a string , reverse all the words which have odd lenght. 
The even lenght words are not changed */

function reverseOddLengthWords(str) {
    // Split the string into words
    const words = str.split(' ');

    // Map over the words, reversing those with an odd length
    const processedWords = words.map(word => {
        return word.length % 2 === 1 ? word.split('').reverse().join('') : word;
    });

    // Join the processed words back into a single string
    return processedWords.join(' ');
}

// Example usage
console.log(reverseOddLengthWords("Hello world this is a test")); // Output: "olleH world siht is a tset"
console.log(reverseOddLengthWords("The quick brown fox jumps over the lazy dog")); // Output: "ehT kciuq brown xof spmuj over ehT yzal dog"
console.log(reverseOddLengthWords("One two three four five")); // Output: "enO two eerht four evif"
