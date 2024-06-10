// Function to generate a 2D array with specified rows and columns
function generate2DArray(rows, cols) {
    const array = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(i + j);
        }
        array.push(row);
    }
    return array;
}

// Function to display the array in its original form
function displayArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].join(' '));
    }
}

// Function to display the array in reverse
function displayArrayInReverse(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        console.log(array[i].slice().reverse().join(' '));
    }
}

// Example usage
const rows = 3;
const cols = 4;
const array = generate2DArray(rows, cols);

console.log('Original Array:');
displayArray(array);

console.log('Reversed Array:');
displayArrayInReverse(array);
