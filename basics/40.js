class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    // Method to get the age of the book
    getBookAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.year;
    }
}

// Example usage
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);

console.log(`Title: ${book1.title}`);         // Output: Title: The Great Gatsby
console.log(`Author: ${book1.author}`);       // Output: Author: F. Scott Fitzgerald
console.log(`Year: ${book1.year}`);           // Output: Year: 1925
console.log(`Age: ${book1.getBookAge()} years old`);  // Output: Age: 99 years old (assuming the current year is 2024)
