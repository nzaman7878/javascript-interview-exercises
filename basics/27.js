// Rewrite the previous excercise using Promises.

function makeAPIcall(url, callback) {
    return fetch(url)
    .then(response => response.json())
       
}

function handleData(data) {
    console.log('Processed Data', data);
}

function main() {
    const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts/1';
    const apiUrl2 = 'https://jsonplaceholder.typicode.com/posts/2';

    makeAPIcall(apiUrl1).then(handleData).catch(err=>console.log("err"));
    makeAPIcall(apiUrl1).then(handleData).catch(err=>console.log("err"));
    
}

main();
