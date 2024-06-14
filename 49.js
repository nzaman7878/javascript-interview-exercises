/* Create a function that takes the month and year 
(as integers) and returns the number of days in that month */

function getDaysInMonth(month, year) {
    // Adjust month to be 0-indexed for the Date object (January is 0, December is 11)
    month -= 1;

    // Create a new date object for the first day of the next month
    const nextMonth = new Date(year, month + 1, 1);

    // Subtract one day from the next month to get the last day of the given month
    nextMonth.setDate(0);

    // Return the last date of the given month, which is the number of days in that month
    return nextMonth.getDate();
}

// Example usage
console.log(getDaysInMonth(1, 2024)); // Output: 31 (January)
console.log(getDaysInMonth(2, 2024)); // Output: 29 (February, leap year)
console.log(getDaysInMonth(2, 2023)); // Output: 28 (February, non-leap year)
console.log(getDaysInMonth(4, 2023)); // Output: 30 (April)
console.log(getDaysInMonth(12, 2023)); // Output: 31 (December)
