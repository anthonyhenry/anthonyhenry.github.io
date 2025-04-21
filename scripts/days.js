// Start of challenge
const START_DATE = new Date("4/15/2025")
// Milliseconds in a day
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24; // 1000 milliseconds/second * 60 seconds/minute, 60 minutes/hour * 24 hours/day
// Find out what the date will be 99 days from the start
const END_DATE = addDaysToDate(START_DATE, 99);
// Today's Date
const TODAY = new Date();

// Display a date range if the 100 days have ended
if(TODAY > END_DATE)
{
    const DATE_RANGE = formatDate(START_DATE) + " - " + formatDate(END_DATE);
    document.querySelector("#days").innerHTML = DATE_RANGE;
}
// Display remaining days if challenge in progress
else
{
    // Subtract two dates to get milliseconds between the two days
    let daysRemaining = END_DATE - TODAY;
    // Convert milliseconds into days
    daysRemaining = Math.ceil(daysRemaining / MILLISECONDS_IN_A_DAY);
    // Add 1 because the first day counts
    daysRemaining++;
    
    document.querySelector("#countdown").innerText = daysRemaining;
}

function formatDate(dateToFormat)
{
    let day = dateToFormat.getDate();
	let month = dateToFormat.getMonth() + 1; //January is 0!

	if (day < 10)
	{
		day = "0" + day;
	}
	if(month < 10)
	{
		month = "0" + month;
	}

    return month + "/" + day + "/" + dateToFormat.getFullYear();
}

function addDaysToDate(startDate, numDaysToAdd)
{
    // Get the number of milliseconds for this date since the epoch (midnight at the beginning of January 1, 1970)
    let endDate = startDate.getTime();
    // Add milliseconds to start date (milliseconds/day * days)
    endDate += MILLISECONDS_IN_A_DAY * numDaysToAdd;
    // Create a new Date object to return
    return new Date(endDate);
}
