function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Test cases
console.log(validateEmail('test@example.com')); // true
console.log(validateEmail('user.name+tag+sorting@example.com')); // true
console.log(validateEmail('user@sub.example.com')); // true
console.log(validateEmail('user@sub-example.com')); // true
console.log(validateEmail('user@123.123.123.123')); // true
console.log(validateEmail('user@[123.123.123.123]')); // false
console.log(validateEmail('plainaddress')); // false
console.log(validateEmail('@missingusername.com')); // false
console.log(validateEmail('username@.com')); // false
console.log(validateEmail('username@com')); // false
console.log(validateEmail('username@.com.')); // false
console.log(validateEmail('username@com..com')); // false
