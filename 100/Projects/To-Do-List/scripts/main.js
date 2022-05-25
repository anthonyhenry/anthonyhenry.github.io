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
		let badgeSpan = document.createElement("span");
		let removeSpan = document.createElement("span");

		//Format date
		deadline = deadline.split("-");
		deadline = deadline[1] + "/" + deadline[2] + "/" + deadline[0].slice(-2);
		
		//Get a priority for the new task
		let priority = calculatePriority(deadline);

		//Set the text for elements that need
		descriptionDiv.innerHTML = description;
		dateSpan.innerHTML = " [" + deadline + "]";
		badgeSpan.innerHTML = priority;

		//Add classes to new elements
		li.classList.add("list-group-item", "d-flex", "justify-content-between", "border-bottom", "py-3");
		priorityDiv.classList.add("d-flex", "align-items-center");
		badgeSpan.classList.add("badge", "rounded-pill");
		removeSpan.classList.add("remove", "oi", "oi-circle-x", "ms-1");

		//Initialize a variable for which list to add the new task to
		let list;

		//Add the priority specific tasks and set the list variable
		if(priority == "Overdue")
		{
			li.classList.add("bg-dark");
			descriptionDiv.classList.add("text-white");
			badgeSpan.classList.add("bg-primary");

			list = document.querySelector("#overdueTasks")
		}
		else if(priority == "Highest")
		{
			li.classList.add("bg-warning");
			badgeSpan.classList.add("bg-danger");

			list = document.querySelector("#highestPriorityTasks")
		}
		else if(priority == "High")
		{
			badgeSpan.classList.add("bg-danger");
			list = document.querySelector("#highPriorityTasks")
		}
		else if(priority == "Medium")
		{
			badgeSpan.classList.add("bg-warning", "text-dark");
			list = document.querySelector("#mediumPriorityTasks")
		}
		else
		{
			badgeSpan.classList.add("bg-success");
			list = document.querySelector("#lowPriorityTasks")
		}

		console.log(list);
		placeTask(list);

		//Check if the first item in the list is an example
		let firstListItem = list.children[0];
		let listContents = list.children;
		// console.log(listContents);

		//If this is the first task for this list made by the useer
		if(firstListItem.classList.contains("example"))
		{
			//Delete the example
			list.removeChild(firstListItem);
			//Add the new task
			list.appendChild(li);
		}
		else
		{
			//Loop through all list items
			for(let i = 0; i < listContents.length; i++)
			{
				// let dueDateToCompare = listContents.children[i]//.children[0].children[0].innerHTML;
				// console.log(dueDateToCompare);
				let dueDateToCompare = listContents[i].children[0].children[0].innerText;

				const dateRegex = /\[(.*?)\]/;

				dueDateToCompare = dueDateToCompare.match(dateRegex)[1];
				console.log(dueDateToCompare);

				//Get the date of the current listContents item
				//Compare that date against the deadline of the new task item
				//If it's sooner than the current listContents item, insertBefore()
				//https://www.javascripttutorial.net/javascript-dom/javascript-insertbefore/

			}
		}

		//Add all other elements for the new task
		// list.appendChild(li);
		li.appendChild(descriptionDiv);
		descriptionDiv.appendChild(dateSpan);
		li.appendChild(priorityDiv);
		priorityDiv.appendChild(badgeSpan);
		priorityDiv.appendChild(removeSpan);
	}
	return false;
}

function placeTask(list){
	console.log(list);
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