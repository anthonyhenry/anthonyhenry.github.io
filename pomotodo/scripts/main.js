// Get and format today's date
let todaysDate = new Date();
let day = todaysDate.getDate();
let month = todaysDate.getMonth() + 1; // January is 0!
let year = todaysDate.getFullYear();

if(day < 10)
{
    day = "0" + day;
}
if(month < 10)
{
    month = "0" + month;
}

todaysDate = month + "/" + day + "/" + year;

// Display the date in the date div
document.querySelector("#date").innerText = todaysDate;