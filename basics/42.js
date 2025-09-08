/* Create an object persons with propertise like name and age .
Then, create a new object student that inherits from persons and has 
an additional property studentID .
Add a method to the persons object and demonstrate that student also has access to it. */


// Create the persons object with name and age properties
const persons = {
    name: 'John Doe',
    age: 30,
    
    // Method to introduce the person
    introduce() {
        console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

// Create the student object that inherits from persons and adds studentID property
const student = Object.create(persons);
student.studentID = 'S12345';
student.name = 'Jane Smith';
student.age = 20;

// Demonstrate that student also has access to the introduce method
console.log(student.name); // Output: Jane Smith
console.log(student.age); // Output: 20
console.log(student.studentID); // Output: S12345
student.introduce(); // Output: Hi, my name is Jane Smith and I am 20 years old.
