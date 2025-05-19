let savedTasks = [];
localStorage.clear();

document.querySelector("#newTaskForm").onsubmit = function()
{
    // Validate data
    const DESCRIPTION = document.querySelector("#newTaskDescription").value.trim();
    let dueDate = document.querySelector("#newTaskDueDate").value;
    
    if(validateTask(DESCRIPTION, dueDate))
    {
        dueDate = convertDateInputToDateObject(dueDate)

        const NEW_TASK = {
            description: DESCRIPTION,
            deadline: dueDate,
            priority: calculatePriority(dueDate)
        }

        console.log(NEW_TASK);
    }

    // Block default behavior
    return false;
}

// Function that converts a date form input into a date object
function convertDateInputToDateObject(input)
{
    let date = input.split("-"); // Date inputs always come in ISO format: "YYYY-MM-DD"
    date = new Date(date[0], date[1] - 1, date[2]); // new Date(year, monthIndex, day)
    return date;
}

function calculatePriority(dueDate)
{
    const DAYS_UNTIL_DUE_DATE = ( dueDate - getTodaysDate() ) / MILLISECONDS_IN_A_DAY;

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