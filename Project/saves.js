//Don't let this app be open in another window
var duplicateWindow = false;

//Check if the app is open in another tab
if(localStorage.getItem("isOpen") == "true")
{
  //Let the user know that the app is already open
  alert("This window is already open in another tab!\nChanges in one tab may override the other.\nFor best results, keep only one window of this site open at a time.");
  //set the duplicate variable to true
  duplicateWindow = true;
}
else
{
  //let the browser know that the app has been opened for the first time
  localStorage.setItem("isOpen", "true");
}

window.onbeforeunload = function(){
  //Check that this is the only tab open
  if(duplicateWindow == false)
  {
  	//Save
  	save();
    //Tell the browser that the page has been closed
    localStorage.setItem("isOpen", "false");
  }
};

function save(){
	//Grab the contents of both lists and the class dropdown
	var allClasses = document.querySelector("#classList").innerHTML;
	var allAssignments = document.querySelector("#assignmentList").innerHTML;
	var allClassOptions = document.querySelector("#assignmentClass").innerHTML;

	//Save both lists and class options into local storage
	localStorage.setItem("savedClasses", allClasses);
	localStorage.setItem("savedAssignments", allAssignments);
	localStorage.setItem("savedClassOptions", allClassOptions);
}

function load(){
	//Check if a class list has been previously saved
	if(localStorage.getItem("savedClasses"))
	{
		//Load in the saved classes
		document.querySelector("#classList").innerHTML = localStorage.getItem("savedClasses");
	}
	//Check if an assignment list has been previously saved
	if(localStorage.getItem("savedAssignments"))
	{
		//Load in the saved classes
		document.querySelector("#assignmentList").innerHTML = localStorage.getItem("savedAssignments");
	}
	if(localStorage.getItem("savedClassOptions"))
	{
		//Load in the saved classes
		document.querySelector("#assignmentClass").innerHTML = localStorage.getItem("savedClassOptions");
	}
}

//Load any saved lists on start
load();