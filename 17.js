// Find the largest element in an array using the reduce() method

function findLargestElement(arr) {
    return arr.reduce((max,current) => 
        current > max ? current : max)
    
}

let arr = [10,50,90,53,70];

let reduce = findLargestElement(arr);

console.log(reduce);