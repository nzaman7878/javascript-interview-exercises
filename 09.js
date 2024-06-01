// Create an object representing a car with propertise like make , model , and a year .
//  Add a method to the car object to start the engine.

 let car = {
    make : "Toyota",
    model : "Camry",
    year : " 2022"
 }

 car.startEngine =  function () {
    console.log("Engine Started")
 }

 car.startEngine();