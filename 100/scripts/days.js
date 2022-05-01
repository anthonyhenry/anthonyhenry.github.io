const startDate = new Date("4/18/2022");

const endDate = new Date("7/26/2022");

const todaysDate = new Date();

//Check if the 100 days have ended
if(todaysDate > endDate)
{
	let output = formatDate(startDate) + " - " + formatDate(endDate);
	
	document.querySelector("#days").innerHTML = output;
}
//If the 100 days has not passed, display the remaining days
else
{
	const diffTime = Math.abs(todaysDate - endDate);

	let output = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	document.querySelector("#countdown").innerHTML = output;
}

function formatDate(dateToFormat){
	let day = dateToFormat.getDate();
	let month = dateToFormat.getMonth() + 1; //January is 0!
	let year = dateToFormat.getFullYear();

	if (day < 10)
	{
		day = "0" + day;
	}
	if(month < 10)
	{
		month = "0" + month;
	}

	const formattedDate = month + "/" + day + "/" + year;

	return formattedDate;
}