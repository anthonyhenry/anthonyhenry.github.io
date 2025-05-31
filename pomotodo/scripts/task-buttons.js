/////////////////////////////////////////////////////////////////////
///////////////////// Bind Button Functionality /////////////////////
/////////////////////////////////////////////////////////////////////

bindEditAndDeleteButtons()

function bindEditAndDeleteButtons()
{
    setButtonColor();
    changeButtonColorOnHover();
    bindDelete();
    bindEdit();
}

/////////////////////////////////////////////////////////////////////
/////////////////////// Change Button Coloring ///////////////////////
/////////////////////////////////////////////////////////////////////

function setButtonColor()
{
    for(const btn of getEditAndDeleteButtons())
    {
        // For dark mode buttons are white
        if(document.documentElement.getAttribute('data-bs-theme') == "dark")
        {
            btn.classList.add("text-white");
        }
        // For light mode buttons use default color (black)
        else
        {
            btn.classList.remove("text-white");
        }
    }
}

function changeButtonColorOnHover()
{
    for(const btn of getEditAndDeleteButtons())
    {
        btn.onmouseenter = function(){
            // Light mode hover
            if(document.documentElement.getAttribute('data-bs-theme') == "light")
            {
                this.style.color = "#424649";
                // this.classList.add("text-secondary");
            }
            // Dark mode hover
            else
            {
                // Remove text-white class so text-secondary can show 
                this.classList.add("text-secondary");
                this.classList.remove("text-white");
            }
        }
        // Reset color after hover
        btn.onmouseleave = function(){
            if(document.documentElement.getAttribute('data-bs-theme') == "light")
            {
                // this.classList.remove("text-secondary");
                this.style.color = "";
            }
            else
            {
                this.classList.add("text-white");
                this.classList.remove("text-secondary");
            }
        }
    
    }
}

/////////////////////////////////////////////////////////////////////
//////////////////////////// Delete Tasks ////////////////////////////
/////////////////////////////////////////////////////////////////////

function bindDelete()
{
    for(const button of getDeleteButtons())
    {
        button.onclick = function()
        {
            // Get LI element of the task to delete
            const TASK_TO_DELETE = this.parentNode.parentNode;
            // Get the UUID for the task to delete
            const TASK_UUID = TASK_TO_DELETE.getAttribute("data-id");
            // Make sure savedTasks is set to latest save from local storage
            getLatestSavedTasks()
            // Remove task from savedTask array
            savedTasks = savedTasks.filter(task => task.id != TASK_UUID);
            // Update savedTasks in local storage
            saveLatestSavedTasks()
            // Update list to show most up todate tasks saved in local storage
            loadSavedTasks();
        }
    }
}

/////////////////////////////////////////////////////////////////////
///////////////////////////// Edit Tasks /////////////////////////////
/////////////////////////////////////////////////////////////////////

function bindEdit()
{
    for(const button of getEditButtons())
    {
        button.onclick = function()
        {
            console.log("You tried to edit a task.")
        }
    }
}

/////////////////////////////////////////////////////////////////////
////////////////////////// Helper Functons //////////////////////////
/////////////////////////////////////////////////////////////////////

function getEditAndDeleteButtons()
{
    // First get all edit buttons
    let buttons = getEditButtons()
    // Convert node list to an array
    buttons = Array.from(buttons);
    // Add all delete buttons to the array
    buttons = buttons.concat(Array.from(getDeleteButtons())); // Converted delete buttons node list to an array

    return buttons;
}

function getDeleteButtons()
{
    return document.querySelectorAll(".delete-btn");
}

function getEditButtons()
{
    return document.querySelectorAll(".edit-btn");
}