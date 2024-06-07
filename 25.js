// Create a prototype for a product object with propertise like name, price, 
// and quantity. Add a method to the Product prototype to
//  calculate the total value.
function Product(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}

Product.prototype.totalValue = function() {
    return this.price * this.quantity;
}


const product1 = new Product("Widget", 10, 5);


const totalValue1 = product1.totalValue();

console.log(`Total value of product1: ${product1.name}: $${totalValue1}`);

// Checking the prototype
console.log(Product.prototype);

// Example of the instance of product1
console.log(product1);
