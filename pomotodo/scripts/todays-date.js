// Global Variables
let todaysDate;
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// Show today's date at top right
setTodaysDate();

function getTodaysDate()
{
    maybeUpdateDate();

    return todaysDate;
}

function setTodaysDate()
{
    todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0); // Set to start of day

    document.querySelector("#date").innerText = todaysDate.toLocaleDateString();
}

function maybeUpdateDate()
{
    // Update todaysDate if it has passed midnight
    if((new Date() - todaysDate) >= MILLISECONDS_IN_A_DAY)
    {
        setTodaysDate();
        updatePriorities();
    }
}


//////////////////////////
////////////////////////// Will Probably move stuff below here to tasks.js later
//////////////////////////

// getDaysFromNow(new Date(2025, 5-1, 14), todaysDate);
// getDaysFromNow(new Date(2025, 5-1, 15), todaysDate);
// getDaysFromNow(new Date(2025, 5-1, 17), todaysDate);
// getDaysFromNow(new Date(2025, 5-1, 18), todaysDate);

function getDaysFromNow(date)
{
    console.log((date - getTodaysDate()) / MILLISECONDS_IN_A_DAY);
}