const MILLISECONDS_IN_A_DAY = 1000 * 1 * 60 * 60 * 24;

// Get today's date
let todaysDate = new Date();
todaysDate.setHours(0, 0, 0, 0); // Set to start of day

// Show today's date at top right
updateDateDisplay();

function getTodaysDate()
{
    // Update todaysDate if it has passed midnight
    const RIGHT_NOW = new Date();

    if((RIGHT_NOW - todaysDate) > MILLISECONDS_IN_A_DAY)
    {
        RIGHT_NOW.setHours(0, 0, 0, 0)  // These 2 lines have to be seperate
        todaysDate = RIGHT_NOW;         // Otherwise it this won't work

        updateDateDisplay();
    }

    return todaysDate;
}

function updateDateDisplay()
{
    document.querySelector("#date").innerText = todaysDate.toLocaleDateString();
}

//////////////////////////
////////////////////////// Will Probably move stuff below here to tasks.js later
//////////////////////////

getDaysFromNow(new Date(2025, 5-1, 14), todaysDate);
getDaysFromNow(new Date(2025, 5-1, 15), todaysDate);
getDaysFromNow(new Date(2025, 5-1, 17), todaysDate);
getDaysFromNow(new Date(2025, 5-1, 18), todaysDate);

function getDaysFromNow(date)
{
    console.log((date - getTodaysDate()) / MILLISECONDS_IN_A_DAY);
}