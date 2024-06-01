// Write a function that takes a string and returns the reversed versions of the string.

let  str = "Hello World";

function reverseString(str){
    return str.split("").reverse().join("");
}

console.log(reverseString(str));