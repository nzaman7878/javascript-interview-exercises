// Implement an async function to fetch data from an API and handle errors using try / catch.

// Async function to fetch data from an API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Main function to call fetchData
async function main() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    await fetchData(apiUrl);
}

main();
