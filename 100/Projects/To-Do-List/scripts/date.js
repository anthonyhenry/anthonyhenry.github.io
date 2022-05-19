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

document.querySelector("#todoForm").onsubmit = function(){
	let description = document.querySelector("#newTaskDescription").value.trim();
	let deadline = document.querySelector("#newTaskDueDate").value;


	console.log(description);
	console.log(deadline);

	//Verify entry
	if(description == "")
	{
		alert("Please provide a title or description for your new to do item.")
	}

	//Checek for any [ or ] in the new entry

	else if(date == "")
	{
		alert("Please provide a due date for your new to do item")
	}
	//Entry verified
	else
	{

	}

	console.log("test");
	return false;
}