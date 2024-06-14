/* Create a function that takes an array of objects (groceries) which calculates 
the total price and returns it as a number */

function calculateTotalPrice(groceries) {
    return groceries.reduce((total, item) => {
        return total + (item.quantity * item.pricePerUnit);
    }, 0);
}

// Example usage
const groceries = [
    { name: 'Apples', quantity: 3, pricePerUnit: 0.5 },
    { name: 'Bananas', quantity: 2, pricePerUnit: 0.25 },
    { name: 'Milk', quantity: 1, pricePerUnit: 1.5 },
    { name: 'Bread', quantity: 2, pricePerUnit: 2.0 }
];

console.log(calculateTotalPrice(groceries)); // Output: 6.0
