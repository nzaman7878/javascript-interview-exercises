// Create a function that displays the current date and time in a specific format

function getCurrentDateAndTime(){
    let currentDate = new Date();
    return currentDate.toDateString();

}

console.log(getCurrentDateAndTime());