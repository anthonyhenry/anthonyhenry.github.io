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
		if(tasksArray[i].classList.contains("example") == false) //For some reason ! and == false behave differently
		{
			//Get the due date for the current task
			let taskDeadline = getTaskDueDate(tasksArray[i]);
			//Get the task priority on load
			let currentTaskPriority = tasksArray[i].children[1].children[0].innerText;
			//Get the updated priority
			let newPriority = calculatePriority(taskDeadline)

			//Compare current task priority with calculated priority
			if(currentTaskPriority != newPriority)
			{
				formatTask(tasksArray[i], newPriority);
				placeTaskInList2(getListToPlaceTask(newPriority), tasksArray[i]);

				// if(newPriority == "Overdue")
				// {
				// 	placeTaskInList2(getListToPlaceTask(newPriority), tasksArray[i]);
				// }
			}
		}
	}
}

function getTaskDueDate(task){
	//Get the due date of the current task in the list
	let dueDate = task.children[0].children[0].innerText;
	const dateRegex = /\[(.*?)\]/;
	dueDate = dueDate.match(dateRegex)[1];
	dueDate = new Date(dueDate);
	return dueDate;
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
			badgeSpan.classList.add("bg-white", "text-dark");

			list = document.querySelector("#overdueTasks");
		}
		else if(priority == "Due Today")
		{
			li.classList.add("bg-warning");
			badgeSpan.classList.add("bg-dark");

			list = document.querySelector("#tasksDueToday");
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

function formatTask(task, priority){
	let taskLi = task;
	let taskDescriptionDiv = task.children[0];
	let taskBadgeSpan = task.children[1].children[0];

	//Remove any classes that might carry over from lower priorities moving up
	taskLi.classList.remove("bg-warning");
	taskBadgeSpan.classList.remove("bg-dark", "bg-danger", "bg-warning", "text-dark", "bg-success");

	if(priority == "Overdue")
	{
		taskLi.classList.add("bg-dark");
		taskDescriptionDiv.classList.add("text-white");
		taskBadgeSpan.classList.add("bg-white", "text-dark");
	}
	else if(priority == "Due Today")
	{
		taskLi.classList.add("bg-warning");
		taskBadgeSpan.classList.add("bg-dark");
	}
	else if(priority == "High")
	{
		taskBadgeSpan.classList.add("bg-danger");
	}
	else if(priority == "Medium")
	{
		taskBadgeSpan.classList.add("bg-warning", "text-dark");
	}
	else
	{
		taskBadgeSpan.classList.add("bg-success");
	}

	//Set the priority text
	taskBadgeSpan.innerText = priority;
}

function getListToPlaceTask(priority){
	if(priority == "Overdue")
	{
		return document.querySelector("#overdueTasks");
	}
	else if(priority == "Due Today")
	{
		return document.querySelector("#tasksDueToday");
	}
	else if(priority == "High")
	{
		return document.querySelector("#highPriorityTasks");
	}
	else if(priority == "Medium")
	{
		return document.querySelector("#mediumPriorityTasks");
	}
	else
	{
		return document.querySelector("#lowPriorityTasks");
	}
}

function placeTaskInList2(list, taskElement){
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
				let dueDateToCompare = getTaskDueDate(listContents[i]);

				
				//Format the date of the task to place
				let taskToPlaceDueDate = getTaskDueDate(taskElement);
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
				let dueDateToCompare = getTaskDueDate(listContents[i]);

				// listContents[i].children[0].children[0].innerText;	//Make this a function since it will be used in Update Priorities
				// const dateRegex = /\[(.*?)\]/;
				// dueDateToCompare = dueDateToCompare.match(dateRegex)[1];
				// dueDateToCompare = new Date(dueDateToCompare);
				// console.log(dueDateToCompare);
				// console.log(getTaskDueDate(listContents[i]));

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