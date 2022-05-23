//Get and format today's date
let todaysDate = new Date();
let dd = todaysDate.getDate();
let mm = todaysDate.getMonth() + 1; //January is 0!
let yyyy = todaysDate.getFullYear();
todaysDate = new Date(yyyy, mm-1, dd);

if(dd < 10)
{
	dd = "0" + dd;
}
if(mm < 10)
{
	mm = "0" + mm;
}

//set date as month/day/year
let todaysDateFormatted = mm + "/" + dd + "/" + yyyy;

//Display the date in the top right corner
document.querySelector("#date").innerHTML = todaysDateFormatted;

function calculatePriority(dueDate){
	//Create date object for the due date
	dueDate = new Date(dueDate);

	//Calculate how many days left to complete task
	let daysRemaining = (dueDate - todaysDate) / 86400000

	if(daysRemaining < 0)
	{
		//Due date passed
		return "Overdue";
	}
	else if(daysRemaining == 0)
	{
		//Due today
		return "Highest";
	}
	else if(daysRemaining <= 3)
	{
		//Due in 1-3 days
		return "High";
	}
	else if(daysRemaining < 7)
	{
		//Due in 4-6 days
		return "Medium";
	}
	else
	{
		//7+ days
		return "Low";
	}

}

//New task form submission
document.querySelector("#newTaskForm").onsubmit = function(){
	let description = document.querySelector("#newTaskDescription").value.trim();
	let deadline = document.querySelector("#newTaskDueDate").value;

	//Verify entry
	if(/^$/.test(description))
	{
		alert("Please provide a title or description for your new to do item.")
	}
	//Checek for any [ or ] in the new entry
	else if(/[\[\]]/.test(description))
	{
		alert("Please do not use '[' or ']' characters in your new to do item.");
	}
	else if(/^$/.test(deadline))
	{
		alert("Please provide a due date for your new to do item")
	}
	//Entry verified
	else
	{
		//Creat new DOM elements
		let li = document.createElement("li");
		let descriptionDiv = document.createElement("div");
		let dateSpan = document.createElement("span");
		let priorityDiv = document.createElement("div");
		let spanBadge = document.createElement("span");
		let spanRemove = document.createElement("span");

		//Format date
		deadline = deadline.split("-");
		deadline = deadline[1] + "/" + deadline[2] + "/" + deadline[0].slice(-2);
		
		//Get a priority for the new task
		let priority = calculatePriority(deadline);
		console.log(priority);



		// <li class="list-group-item d-flex justify-content-between border-bottom py-3">
		// 	<div>High Priority Task</div>
		// 	<div class="d-flex align-items-center">
		// 		<span class="badge rounded-pill bg-danger ">High</span>
		// 		<span class="remove oi oi-circle-x ms-1" title="Remove"></span>
		// 	</div>
		// </li>



		// let test = new taskItem(description, deadline);
		// console.log(test.calculatePriority());
	}
	return false;
}

// class taskItem{
// 	constructor(description, deadline){
// 		this.description = description;
// 		this.deadline = deadline;
// 	}

// 	calculatePriority(){
// 		//Format the deadline
// 		let formattedDeadline = this.deadline.split("-");
// 		formattedDeadline = formattedDeadline[1]+ "/" + formattedDeadline[2] + "/" + formattedDeadline[0];

// 		const MILLISECONDS_IN_A_DAY = 86400000;
		
// 		//Create a date variable for comparing
// 		let daysRemaing = ( (new Date(formattedDeadline) - new Date(todaysDateFormatted)) / MILLISECONDS_IN_A_DAY);

// 		if(daysRemaing < 0)
// 		{
// 			return "Overdue";
// 		}
// 		else if(daysRemaing == 0)
// 		{
// 			return "Highest";
// 		}
// 		else if(daysRemaing <= 3)
// 		{
// 			return "High";
// 		}
// 		else if(daysRemaing < 7)
// 		{
// 			return "Medium";
// 		}
// 		else
// 		{
// 			return "Low";
// 		}
// 	}
// }


// const paragraph = 'The quick brown fox jumps over the lazy dog [10-12-2022]';
// const regex = /\[(.*?)\]/;
// const found = paragraph.match(regex)[1];

// console.log(found);

// const startDate = new Date("4/18/2022");

// const endDate = new Date("4/18/2022");

// const dayGap = (endDate - startDate) / 86400000

// console.log(dayGap);