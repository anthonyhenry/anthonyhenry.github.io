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

//Allow all tasks at start to be deleted
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

//Update Priorities
let tasksDueToday = document.querySelector("#tasksDueToday").children;
let highPriorityTasks = document.querySelector("#highPriorityTasks").children;
let mediumPriorityTasks = document.querySelector("#mediumPriorityTasks").children;
let lowPriorityTasks = document.querySelector("#lowPriorityTasks").children;

updatePriorities(tasksDueToday);
updatePriorities(highPriorityTasks);
updatePriorities(mediumPriorityTasks);
updatePriorities(lowPriorityTasks);

function updatePriorities(tasksArray){
	//For loop to check each task in the list
	for(let i = 0; i < tasksArray.length; i++)
	{
		//Skip Examples
		if(!tasksArray[i].classList.contains("example"))
		{
			//Get the current task priority
			let currentTaskPriority = tasksArray[i].children[1].children[0].innerText;
			//Get the due date for the current task
			let taskDeadline = getTaskDueDate(tasksArray[i]);
			//Get the updated priority
			let newPriority = calculatePriority(taskDeadline);

			//Compare current task priority with calculated priority
			if(currentTaskPriority != newPriority)
			{
				//Move any tasks that have a new priority
				formatAndPlaceTask(tasksArray[i], newPriority);
			}
		}
	}
}

//Function that returns the due date of a given task list item
function getTaskDueDate(task){
	let dueDate = task.children[0].children[0].innerText;
	const dateRegex = /\[(.*?)\]/;
	dueDate = dueDate.match(dateRegex)[1];
	dueDate = new Date(dueDate);
	return dueDate;
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
		return "Due Today";
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
	//Variables for user input
	let description = document.querySelector("#newTaskDescription").value.trim();
	let deadline = document.querySelector("#newTaskDueDate").value;

	//Verify entry
	if(/^$/.test(description))
	{
		alert("Please provide a title or description for your new to do item.")
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

		//Add all child elements for the new task
		li.appendChild(descriptionDiv);
		descriptionDiv.appendChild(dateSpan);
		li.appendChild(priorityDiv);
		priorityDiv.appendChild(badgeSpan);
		priorityDiv.appendChild(removeSpan);

		//Format and place the new task
		formatAndPlaceTask(li, priority);

		//Add the new task to the delete array
		bindDelete();

		//Reset form fields
		document.querySelector("#newTaskDescription").value = "";
		document.querySelector("#newTaskDueDate").value = "";
	}
	return false;
}

function formatAndPlaceTask(task, priority)
{
	/*** Format Task ***/

	//Variables for all task elements that need formatting
	let taskLi = task;
	let taskDescriptionDiv = task.children[0];
	let taskBadgeSpan = task.children[1].children[0];

	//Remove any classes that might carry over from updating lower priorities
	taskLi.classList.remove("bg-warning");
	taskBadgeSpan.classList.remove("bg-dark", "bg-danger", "bg-warning", "text-dark", "bg-success");

	//Initialize a variable for which list to place the task in
	let list;

	//Add classes for each priority and set the list variable
	if(priority == "Overdue")
	{
		taskLi.classList.add("bg-dark");
		taskDescriptionDiv.classList.add("text-white");
		taskBadgeSpan.classList.add("bg-white", "text-dark");

		list = document.querySelector("#overdueTasks");
	}
	else if(priority == "Due Today")
	{
		taskLi.classList.add("bg-warning");
		taskBadgeSpan.classList.add("bg-dark");

		list = document.querySelector("#tasksDueToday");
	}
	else if(priority == "High")
	{
		taskBadgeSpan.classList.add("bg-danger");

		list = document.querySelector("#highPriorityTasks");
	}
	else if(priority == "Medium")
	{
		taskBadgeSpan.classList.add("bg-warning", "text-dark");

		list = document.querySelector("#mediumPriorityTasks");
	}
	else
	{
		taskBadgeSpan.classList.add("bg-success");

		list = document.querySelector("#lowPriorityTasks");
	}

	//Set the priority text
	taskBadgeSpan.innerText = priority;

	/*** Place Task in List ***/

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
			list.appendChild(task);
		}
		else
		{
			//Array for all the tasks in a list
			let listContents = list.children;

			//Loop through all the tasks in the list
			for(let i = 0; i < listContents.length; i++)
			{
				//Get the due date of the current task for comparison
				let dueDateToCompare = getTaskDueDate(listContents[i]);
				//Get the due date of the task to place
				let taskToPlaceDueDate = getTaskDueDate(task);
				
				//Check if the new task due date comes before the current task in the list
				if(dueDateToCompare > taskToPlaceDueDate)
				{
					//Add the new task before this task
					list.insertBefore(task, listContents[i]);
				}
				//Check if all the tasks in the list have been checked
				else if(i == (listContents.length - 1) )
				{
					//Add the new task as the last item in the list
					list.appendChild(task);
				}
			}
		}
	}
	else
	{
		//Add the new task as the first item in the list
		list.appendChild(task);
	}
}