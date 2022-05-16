let currentDate = new Date();
let dd = currentDate.getDate();
let mm = currentDate.getMonth() + 1; //January is 0!
let yyyy = currentDate.getFullYear();

if(dd < 10)
{
	dd = "0" + dd;
}
if(mm < 10)
{
	mm = "0" + mm;
}

//set date as month/day/year
currentDate = mm + "/" + dd + "/" + yyyy;

//Display the date in the top right corner
document.querySelector("#date").innerHTML = currentDate;