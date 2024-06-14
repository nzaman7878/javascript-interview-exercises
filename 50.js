/* Given two integers representing the numerator and denominator
 of a fraction, return the fraction in string format */

 function fractionToString(numerator, denominator) {
    // Handle case where denominator is 0
    if (denominator === 0) {
        throw new Error("Denominator cannot be 0");
    }

    // Determine the sign of the fraction
    const sign = (numerator * denominator < 0) ? '-' : '';

    // Work with absolute values to handle negative numbers
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);

    // Calculate the greatest common divisor (GCD) using Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    // Simplify the fraction
    const gcdValue = gcd(numerator, denominator);
    numerator /= gcdValue;
    denominator /= gcdValue;

    // Handle case where the numerator is 0
    if (numerator === 0) {
        return '0';
    }

    // Handle improper fractions
    const wholeNumber = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;

    if (wholeNumber !== 0) {
        if (remainder === 0) {
            return `${sign}${wholeNumber}`;
        } else {
            return `${sign}${wholeNumber} ${remainder}/${denominator}`;
        }
    } else {
        return `${sign}${numerator}/${denominator}`;
    }
}

// Example usage
console.log(fractionToString(3, 4)); // Output: "3/4"
console.log(fractionToString(6, 8)); // Output: "3/4"
console.log(fractionToString(10, 2)); // Output: "5"
console.log(fractionToString(7, 3)); // Output: "2 1/3"
console.log(fractionToString(-7, 3)); // Output: "-2 1/3"
console.log(fractionToString(0, 3)); // Output: "0"
console.log(fractionToString(3, 0)); // Throws error: "Denominator cannot be 0"
