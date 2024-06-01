// Create a program that checks if a given year is a leap year or Not.

// Function to determine if a year is a leap year
let isLeapYear = (year) => {
    // Check if the year is divisible by 4 and not divisible by 100, or if it is divisible by 400
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // If the condition is true, return true (it's a leap year)
        return true;
    } else {
        // If the condition is false, return false (it's not a leap year)
        return false;
    }
}

// Test the function with a specific year (e.g., 2024)
let year = 2024;
console.log(isLeapYear(year)); // Prints whether the year is a leap year (true or false)
