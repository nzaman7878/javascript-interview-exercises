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

class Magazine extends Book {
    constructor(title, author, year, issue) {
        super(title, author, year); // Call the parent class constructor
        this.issue = issue;
    }

    // Method to get the magazine's issue number
    getIssueNumber() {
        return this.issue;
    }
}

// Example usage
const magazine1 = new Magazine('National Geographic', 'Various', 2023, 'July');

console.log(`Title: ${magazine1.title}`);          // Output: Title: National Geographic
console.log(`Author: ${magazine1.author}`);        // Output: Author: Various
console.log(`Year: ${magazine1.year}`);            // Output: Year: 2023
console.log(`Issue: ${magazine1.getIssueNumber()}`); // Output: Issue: July
console.log(`Age: ${magazine1.getBookAge()} years old`); // Output: Age: 1 years old (assuming the current year is 2024)
