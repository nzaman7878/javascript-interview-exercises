// Create a prototype for a product object with propertise like name, price, 
// and quantity. Add a method to the Product prototype to
//  calculate the total value.

function Product(name,price,quantity){

    this.name = name;
    this.price = price;
    this.quantity = quantity;

}

Product.prototype.totalValue = function(){
    return this.price * this.quantity;
}

const product1 = Product("widget", 10 , 5);

console.log(Product.prototype);

console.log(product1);