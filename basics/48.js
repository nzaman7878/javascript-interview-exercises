/* create a function that takes in a sentence and return a running lists of consonants 
per word and vowels per word. */

function getConsonantsAndVowels(sentence) {
    // Helper function to check if a character is a vowel
    function isVowel(char) {
        return 'aeiouAEIOU'.includes(char);
    }

    // Split the sentence into words
    const words = sentence.split(' ');

    // Initialize arrays to hold consonants and vowels per word
    const consonantsPerWord = [];
    const vowelsPerWord = [];

    // Iterate over each word
    words.forEach(word => {
        // Initialize arrays to hold consonants and vowels for the current word
        const consonants = [];
        const vowels = [];

        // Iterate over each character in the word
        for (let char of word) {
            if (isVowel(char)) {
                vowels.push(char);
            } else if (char.match(/[a-z]/i)) { // Check if the character is a consonant
                consonants.push(char);
            }
        }

        // Push the lists of consonants and vowels for the current word to their respective arrays
        consonantsPerWord.push(consonants);
        vowelsPerWord.push(vowels);
    });

    // Return the result as an object
    return {
        consonantsPerWord: consonantsPerWord,
        vowelsPerWord: vowelsPerWord
    };
}

// Example usage
const sentence = "This is a simple test sentence";
const result = getConsonantsAndVowels(sentence);
console.log("Consonants per word:", result.consonantsPerWord);
console.log("Vowels per word:", result.vowelsPerWord);

// Output:
// Consonants per word: [ [ 'T', 'h', 's' ], [ 's' ], [], [ 's', 'm', 'p', 'l' ], [ 't', 's', 't' ], [ 's', 'n', 't', 'n', 'c' ] ]
// Vowels per word: [ [ 'i' ], [ 'i' ], [ 'a' ], [ 'i', 'e' ], [ 'e' ], [ 'e', 'e', 'e' ] ]
