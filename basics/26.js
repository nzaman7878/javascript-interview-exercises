function makeAPIcall(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log("Error during API call:", err.message));
}

function handleData(data) {
    console.log('Processed Data', data);
}

function main() {
    const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts/1';
    const apiUrl2 = 'https://jsonplaceholder.typicode.com/posts/2';

    makeAPIcall(apiUrl1, handleData);
    makeAPIcall(apiUrl2, handleData);
}

main();
