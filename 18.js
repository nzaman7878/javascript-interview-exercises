// Remove all occurances of a specific elment from an array.

function removeElementFromArray(arr, target) {
    return arr.filter(item => item !== target);
}

let arr = [10,10,49,49,88,989,43]

let target = 10;

let removed = removeElementFromArray(arr,target);
 console.log(removed)