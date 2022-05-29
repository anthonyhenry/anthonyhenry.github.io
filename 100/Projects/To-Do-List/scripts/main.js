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

			list = document.querySelector("#overdueTasks");
		}
		else if(priority == "Highest")
		{
			li.classList.add("bg-warning");
			badgeSpan.classList.add("bg-danger");

			list = document.querySelector("#highestPriorityTasks");
		}
		else if(priority == "High")
		{
			badgeSpan.classList.add("bg-danger");
			list = document.querySelector("#highPriorityTasks");
		}
		else if(priority == "Medium")
		{
			badgeSpan.classList.add("bg-warning", "text-dark");
			list = document.querySelector("#mediumPriorityTasks");
		}
		else
		{
			badgeSpan.classList.add("bg-success");
			list = document.querySelector("#lowPriorityTasks");
		}

		//Add all child elements for the new task
		li.appendChild(descriptionDiv);
		descriptionDiv.appendChild(dateSpan);
		li.appendChild(priorityDiv);
		priorityDiv.appendChild(badgeSpan);
		priorityDiv.appendChild(removeSpan);

		//Place the new task in the correct list
		placeTaskInList(list, li, deadline);

		//Reset form fields
		document.querySelector("#newTaskDescription").value = "";
		document.querySelector("#newTaskDueDate").value = "";

		//Add the new task to the delete array
		bindDelete();
	}
	return false;
}

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

function placeTaskInList(list, taskElement, taskToPlaceDueDate){
	//Check if there are any items currently in the list
	if(list.children.length > 0)
	{
		//Check if the first item in the list is an example
		let firstListItem = list.children[0];

		if(firstListItem.classList.contains("example"))
		{
			//Delete the example
			list.removeChild(firstListItem);
			//Add the new task
			list.appendChild(taskElement);
			return;
		}
		else
		{
			//Array for all the tasks in a list
			let listContents = list.children;

			//Loop through all the list tasks
			for(let i = 0; i < listContents.length; i++)
			{
				//Get the due date of the current task in the list
				let dueDateToCompare = listContents[i].children[0].children[0].innerText;
				const dateRegex = /\[(.*?)\]/;
				dueDateToCompare = dueDateToCompare.match(dateRegex)[1];
				dueDateToCompare = new Date(dueDateToCompare);

				//Format the date of the task to place
				taskToPlaceDueDate = new Date(taskToPlaceDueDate);

				//Check if the new task due date comes before the current task in the list
				if(dueDateToCompare > taskToPlaceDueDate)
				{
					//Add the new task before this task
					list.insertBefore(taskElement, listContents[i]);
					return;
				}
				//Check if all the tasks in the list have been checked
				else if(i == (listContents.length -1) )
				{
					//Add the new task as the last item in the list
					list.appendChild(taskElement);
					return
				}
			}
		}
	}
	else
	{
		//Add the new task as the first item in the list
		list.appendChild(taskElement);
	}
}

//Allow all task to be deleted
bindDelete();

function bindDelete(){
	//Create an array of all delete buttons
	let deleteButtons = document.querySelectorAll(".remove");

	//Loop through all the delete buttons
	for(let j = 0; j < deleteButtons.length; j++)
	{
		//Add a function for deleting tasks to each delete button
		deleteButtons[j].onclick = function(){
			//Find which list the task belongs to
			let parentList = this.parentNode.parentNode.parentNode;
			//Grab the task to delete
			let taskToRemove = this.parentNode.parentNode;

			//Delete the task
			parentList.removeChild(taskToRemove);
		}
	}
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

// console.log(found);

// const startDate = new Date("4/18/2022");

// const endDate = new Date("4/18/2022");

// const dayGap = (endDate - startDate) / 86400000

// console.log(dayGap);