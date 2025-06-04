//////////////////////////////////////////////////////////////////////////////
////////////////////////////// Global Variables //////////////////////////////
//////////////////////////////////////////////////////////////////////////////

let savedTasks = []; // Initialize as an empty array

const DESCRIPTION_INPUT = document.querySelector("#newTaskDescription");
const DATE_INPUT = document.querySelector("#newTaskDueDate");

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Initialize savedTasks //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// Check for tasks saved in local storage
if(localStorage.getItem("savedTasks"))
{
    // Set savedTasks to the saved list 
    savedTasks = JSON.parse(localStorage.getItem("savedTasks"))
    // Update task priorities. This also loads the task list saved in web storage
    updatePriorities();
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// New Task Submitted //////////////////////////////
////////////////////////////////////////////////////////////////////////////////

document.querySelector("#newTaskForm").onsubmit = function()
{
    // Validate data
    const DESCRIPTION = DESCRIPTION_INPUT.value.trim();//document.querySelector("#newTaskDescription").value.trim();
    let dueDate = DATE_INPUT.value;
    
    if(validateTask(DESCRIPTION, dueDate))
    {
        // Create new task
        dueDate = convertDateInputToDateObject(dueDate)

        const NEW_TASK = {
            id: crypto.randomUUID(),
            description: DESCRIPTION,
            deadline: dueDate,
            priority: calculatePriority(dueDate)
        }

        saveTask(NEW_TASK);
        loadSavedTasks();
        setFormInputs("", "");
    }

    // Block default behavior
    return false;
}

function validateTask(desc, dueDate)
{
    if(desc.length == 0 || dueDate.length == 0)
    {
        const INVALID_TASK_MODAL_ELEMENT = document.querySelector("#invalidTaskModal");
        const INVALID_TASK_MODAL = new bootstrap.Modal(INVALID_TASK_MODAL_ELEMENT);;
        const MISSING_TASK_ELEMENTS_SPAN = document.querySelector("#missingTaskElements");
        MISSING_TASK_ELEMENTS_SPAN.innerText = "";

        if(desc.length == 0 && dueDate.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText = "description and due date"
        }
        else if(desc.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText += "description";
        }
        else if(dueDate.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText += "due date";
        }

        INVALID_TASK_MODAL.show();
        return false;
    }
    else
    {
        return true;
    }
}

// Function that converts a date form input into a date object
function convertDateInputToDateObject(input)
{
    let date = input.split("-"); // Date inputs always come in ISO format: "YYYY-MM-DD"
    date = new Date(date[0], date[1] - 1, date[2]); // new Date(year, monthIndex, day)
    return date;
}

function setFormInputs(desc, date)
{
    DESCRIPTION_INPUT.value = desc;
    DATE_INPUT.value = date;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Set Task Priorities //////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function calculatePriority(dueDateObj)
{
    const DAYS_UNTIL_DUE_DATE = ( dueDateObj - getTodaysDate() ) / MILLISECONDS_IN_A_DAY;

    if(DAYS_UNTIL_DUE_DATE < 0)
    {
        return "Overdue";
    }
    else if(DAYS_UNTIL_DUE_DATE == 0)
    {
        return "Due Today";
    }
    else if(DAYS_UNTIL_DUE_DATE <= 3)
    {
        return "High";   
    }
    else if(DAYS_UNTIL_DUE_DATE < 7)
    {
        return "Medium";
    }
    else
    {
        return "Low";
    }
}

function updatePriorities()
{
    getLatestSavedTasks();

    for(const task of savedTasks)
    {
        const CURRENT_PRIORITY = task.priority;

        const NEW_PRIORITY = calculatePriority(new Date(task.deadline));

        if(CURRENT_PRIORITY != NEW_PRIORITY)
        {
            task.priority = NEW_PRIORITY;
        }
    }

    saveLatestSavedTasks()
    loadSavedTasks();
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Saving and Loading Tasks ///////////////////////////
////////////////////////////////////////////////////////////////////////////////

function saveTask(task)
{
    getLatestSavedTasks()

    // Add task to array
    savedTasks.push(task);
    // Sort array by due dates
    savedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    
    saveLatestSavedTasks()
}

function getLatestSavedTasks()
{
    if(localStorage.getItem("savedTasks"))
    {
        savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    }
}

function saveLatestSavedTasks()
{
    // Save updated task list to local storage
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks))
}

function loadSavedTasks()
{
    // Clear current list 
    const LIST = document.querySelector("#taskList");
    LIST.innerHTML = "";

    for(const task of savedTasks)
    {
        // Create new DOM elements
        const LI = document.createElement("li");
        const DESCRIPTION_DIV = document.createElement("div");
        const DUE_DATE_SPAN = document.createElement("span");
        const BADGE_N_BUTTONS_DIV = document.createElement("div");
        const PRIORITY_BADGE = document.createElement("span");
        const EDIT_BUTTON = document.createElement("i");
        const DELETE_BUTTON = document.createElement("i");

        // Format new elements
        LI.classList.add("list-group-item", "py-3", "d-flex", "justify-content-between");
        if(task.priority == "Overdue")
        {
            LI.classList.add("bg-danger");
        }
        else if(task.priority == "Due Today")
        {
            LI.classList.add("bg-warning");
        }
        LI.setAttribute("data-id", task.id);
        
        DESCRIPTION_DIV.innerText = task.description;
        if(task.priority == "Overdue" || task.priority == "Due Today")
        {
            DESCRIPTION_DIV.classList.add("text-dark");
        }
        LI.appendChild(DESCRIPTION_DIV);

        let deadlineText = new Date(task.deadline);
        deadlineText = " [" + deadlineText.toLocaleDateString() + "]";
        DUE_DATE_SPAN.innerText = deadlineText;
        DESCRIPTION_DIV.appendChild(DUE_DATE_SPAN);

        BADGE_N_BUTTONS_DIV.classList.add("d-flex", "align-items-center");
        LI.appendChild(BADGE_N_BUTTONS_DIV);

        PRIORITY_BADGE.classList.add("badge");
        switch(task.priority)
        {
            case "Overdue":
                PRIORITY_BADGE.classList.add("bg-dark");
                break;
            case "Due Today":
                PRIORITY_BADGE.classList.add("bg-secondary");
                break;
            case "High":
                PRIORITY_BADGE.classList.add("bg-danger");
                break;
            case "Medium":
                PRIORITY_BADGE.classList.add("bg-warning", "text-dark");
                break;
            case "Low":
                PRIORITY_BADGE.classList.add("bg-success");
                break;
        }
        PRIORITY_BADGE.innerText = task.priority;
        BADGE_N_BUTTONS_DIV.appendChild(PRIORITY_BADGE);

        EDIT_BUTTON.classList.add("fa-solid", "fa-pen", "ms-2", "edit-btn");
        EDIT_BUTTON.title = "Edit";
        BADGE_N_BUTTONS_DIV.appendChild(EDIT_BUTTON);

        DELETE_BUTTON.classList.add("fa-solid", "fa-circle-xmark", "ms-1", "delete-btn");
        DELETE_BUTTON.title = "Remove";
        BADGE_N_BUTTONS_DIV.appendChild(DELETE_BUTTON);

        // Add new elements to list
        LIST.appendChild(LI);
    }

    // Bind edit and delete button functionality 
    bindEditAndDeleteButtons();
}

/*

https://www.w3schools.com/jsref/met_element_scrollintoview.asp

https://stackoverflow.com/questions/12346381/set-date-in-input-type-date

https://www.google.com/search?q=javascript+set+value+of+a+date+input&rlz=1C1GCEU_enUS1161US1161&oq=javascript+set+value+of+a+date+input&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMggIAxAAGBYYHjINCAQQABiGAxiABBiKBTIHCAUQABjvBTIKCAYQABiiBBiJBdIBCDYzNzlqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8

Here's how to set the value of a date input in JavaScript: Access the date input element.
JavaScript

    const dateInput = document.getElementById('yourDateInputId'); // Replace 'yourDateInputId' with the actual ID of your input element
Set the value using a string in yyyy-mm-dd format: 
JavaScript

    dateInput.value = '2025-05-19'; // Sets the date to May 19, 2025
Set the value using the valueAsDate property and a Date object:
JavaScript

    const newDate = new Date(2025, 4, 19); // Month is 0-indexed, so 4 represents May
    dateInput.valueAsDate = newDate;
Set the value to today's date.
JavaScript

    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    dateInput.value = `${year}-${month}-${day}`;
It is important to note that the value property of a date input expects a string in the yyyy-mm-dd format. If you are working with Date objects, you can use the valueAsDate property to set the date directly.



2. Add Support for Editing Tasks
You've stubbed the edit function. Here’s a basic version to repopulate the form:

function editTask(taskId) {
    const task = savedTasks.find(t => t.id === taskId);
    if (!task) return;

    DESCRIPTION_INPUT.value = task.description;
    DATE_INPUT.value = new Date(task.deadline).toISOString().split("T")[0];

    // Optional: remove the old version from savedTasks until it's resubmitted
    savedTasks = savedTasks.filter(t => t.id !== taskId);
    saveLatestSavedTasks();
    loadSavedTasks();
}


*/