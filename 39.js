const person = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    address: {
        city: 'New York',
        country: 'USA'
    },
    phone: null
};

// Basic destructuring
const { name, age, email } = person;
console.log(name);  // Output: John Doe
console.log(age);   // Output: 30
console.log(email); // Output: john.doe@example.com

// Nested destructuring
const { address: { city, country } } = person;
console.log(city);    // Output: New York
console.log(country); // Output: USA

// Renaming variables and providing default values
const { name: fullName, age: yearsOld, email: emailAddress, phone: phoneNumber = 'N/A' } = person;
console.log(fullName);      // Output: John Doe
console.log(yearsOld);      // Output: 30
console.log(emailAddress);  // Output: john.doe@example.com
console.log(phoneNumber);   // Output: N/A
