//Variable to check if this is a duplicate
let isDuplicate = "false";

//Check if the app is already open
if(localStorage.getItem("taskManagerAlreadyOpen") == "true")
{
  //Let the user know that the app is already open
  alert("This window is already open in another tab or window!\nChanges in one instance of the site may override the other.\nFor best results keep only one instance of this website open at a time.");
  //set the duplicate variable to true
  isDuplicate = "true";
}
else
{
  //let the browser know that the app has been opened open
  localStorage.setItem("taskManagerAlreadyOpen", "true");
}

//Execute when the page is about to be unloaded:
window.onbeforeunload = function(){
  //Check that this is the only instance of the app
  if(isDuplicate == "false")
  {
    //Tell the browser that the page has been closed
    localStorage.setItem("taskManagerAlreadyOpen", "false");
  }
}