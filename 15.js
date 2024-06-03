// Write a function that takes an array of numbers 
// and returns a new array with only the even numbers

let arr = [1,5,4,7,8,32,5,43,74,9];

function filterEvenNumber(arr) {

    return arr.filter( num => num %2 === 0);
}

console.log(filterEvenNumber(arr));