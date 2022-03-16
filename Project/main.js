bindDelete();

//Add New Class
document.querySelector("#classForm").onsubmit = function(){
	//Get the new class
	var newClass = document.querySelector("#classEntry").value.trim();
	//Get all classes
	var myClasses = document.querySelectorAll(".my-classes");

	for(var i=0; i < myClasses.length; i++)
	{
		//Check if the new class matches the name of an existing class
		if(newClass == myClasses[i].innerText)
		{
			alert("You already have " + newClass + " in your class list");
			//Reset the form
			document.querySelector("#classEntry").value = "";
			return false;
		}
	}

	//Verify the new class
	if(newClass.length == 0)
	{
		alert("Please supply a name for your new class.");
	}
	//New class verified
	else
	{
		//Add new class to the class list div
		addToClassList(newClass);
		
		//Add the new class to the form dropdown
		addToClassDropdown(newClass);

		//Save
		save();

		//Reset the form
		document.querySelector("#classEntry").value = "";
	}
	
	//Keep the form from submitting
	return false;
};

function addToClassList(classToAdd){
	//Create elements for new class
	var newClassDiv = document.createElement("div");
	var newClassBtn = document.createElement("span");
	var newClassName = document.createElement("span");

	//Add classes to new elements
	newClassDiv.classList.add("mb-2");
	newClassBtn.classList.add("btn", "btn-danger");
	newClassName.classList.add("ml-2", "my-classes");

	//Set text for btn and name elements
	newClassBtn.innerText = "x";
	newClassName.innerText = classToAdd;

	//Add the new class
	document.querySelector("#classList").appendChild(newClassDiv);
	newClassDiv.appendChild(newClassBtn);
	newClassDiv.appendChild(newClassName);

	//Update delete array
	bindDelete();
}

function addToClassDropdown(newOption){
	//Create new form option element
	var newClassOption = document.createElement("option");

	//Add class to new option
	newClassOption.classList.add("class-option");

	//Set the text for the new option
	newClassOption.innerText = newOption;

	//Add the new option to the form dropdown
	document.querySelector("#assignmentClass").appendChild(newClassOption);
}

//Add new assignment
document.querySelector("#assignmentForm").onsubmit = function(){

	//Get form values
	var newAssignmentClass = document.querySelector("#assignmentClass").value;
	var newAssignment = document.querySelector("#assignment").value.trim();
	var newAssignmentType = document.querySelector("#assignmentType").value;
	var newAssignmentDueDate = document.querySelector("#assignmentDueDate").value;

	//Verify form values
	if (newAssignmentClass == "")
	{
		alert("Please choose a class for your assignment.\nYou can add more classes in the My Classes section.");
	}
	else if(newAssignment.length == 0)
	{
		alert("Please fill in the assignment field.");
	}
	else if(newAssignmentType == "")
	{
		alert("Please choose a type for your assignment.\nIf your assignment does not fit any of the categories, you can choose Other.");
	}
	else if(newAssignmentDueDate == "")
	{
		alert("Please provide a due date for your assignment.");
	}
	else
	{
		//Create elements for new assignment
		var li = document.createElement("li");
		var classDiv = document.createElement("div");
		var assignmentDiv = document.createElement("div");
		var typeDiv = document.createElement("div");
		var dateDiv = document.createElement("div");
		var btnDiv = document.createElement("div");

		
		//Add classes
		li.classList.add("list-group-item", "d-flex", "align-items-center", "mt-2", "row", "mx-1");
		classDiv.classList.add("col-12", "mt-1", "mt-md-0", "col-md-2", "text-center");
		assignmentDiv.classList.add("col-12", "mt-1", "mt-md-0", "col-md-5", "text-center");
		typeDiv.classList.add("col-12", "mt-1", "mt-md-0", "col-md-2", "text-center");
		dateDiv.classList.add("col-12", "mt-1", "mt-md-0", "col-md-2", "text-center");
		btnDiv.classList.add("btn", "btn-danger", "col-12", "mt-1", "mt-md-0", "col-md-auto", "ml-md-3");

		//Format the date
		var formattedDate = newAssignmentDueDate.split("-");
		newAssignmentDueDate = formattedDate[1] + "/" + formattedDate[2] + "/" + formattedDate[0];

		//Set text for new assignment elements
		classDiv.innerText = newAssignmentClass;
		assignmentDiv.innerText = newAssignment;
		typeDiv.innerText = newAssignmentType;
		dateDiv.innerText = newAssignmentDueDate;
		btnDiv.innerText = "x";

		//Add the new assignment
		document.querySelector("#assignmentList").appendChild(li);
		li.appendChild(classDiv);
		li.appendChild(assignmentDiv);
		li.appendChild(typeDiv);
		li.appendChild(dateDiv);
		li.appendChild(btnDiv);

		//Update the delete array
		bindDelete();
		//save
		save();

		//Reset the form
		document.querySelector("#assignmentClass").value = "";
		document.querySelector("#assignment").value = "";
		document.querySelector("#assignmentType").value = "";
		document.querySelector("#assignmentDueDate").value = "";
	}

	//Keep the form from submitting
	return false;
};

function bindDelete(){
	//Create an array of all delete buttons
	var deleteButtons = document.querySelectorAll(".btn-danger");

	for(var i=0; i < deleteButtons.length; i++)
	{
		deleteButtons[i].onclick = function(){
			//Find which list this item is in
			var parentList = this.parentNode.parentNode;

			//Cheeck if a class was deleteed
			if(parentList.id == "classList")
			{
				//Get the name of the class being deleted
				var classToDelete = this.nextElementSibling.innerText;

				//Get all classes from the assignment form dropdown
				var classOptions = document.querySelectorAll(".class-option");

				for(var n=0; n < classOptions.length; n++)
				{
					//Check if the deleted class matches the current classOption
					if( classToDelete == classOptions[n].innerText)
					{
						//Remove the ddleted class from the dropdown
						classOptions[n].remove();
					}
				}
			}

			//Delete the list item
			this.parentNode.remove();

			save();
		};
	}
}