// Start of challenge
const START_DATE = new Date("4/15/2025")
// Find out what the date will be 99 days from the start
let endDate = START_DATE.getTime(); // Get the number of milliseconds for this date since the epoch, (midnight at the beginning of January 1, 1970)
console.log(new Date(endDate));
endDate += (99*1000*60*60*24);
console.log(new Date(endDate));

// console.log((END_DATE - START_DATE) / (1000*60*60*24) )

// console.log(START_DATE.getDate() + (100*1000*60*60*24))

