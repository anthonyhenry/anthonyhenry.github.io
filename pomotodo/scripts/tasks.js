class Tasks {
    constructor(description, dueDate)
    {
        this.description = description;
        this.dueDate = dueDate;
    }
}

console.log("Hello from tasks.js!");

document.querySelector("#newTaskForm").onsubmit = function()
{
    // Validate data
    const DESCRIPTION = document.querySelector("#newTaskDescription").value.trim();
    const DUE_DATE = document.querySelector("#newTaskDueDate").value;

    if(DESCRIPTION.length == 0 || DUE_DATE.length == 0)
    {
        const INVALID_TASK_MODAL_ELEMENT = document.querySelector("#invalidTaskModal");
        const INVALID_TASK_MODAL = new bootstrap.Modal(INVALID_TASK_MODAL_ELEMENT);;
        const MISSING_TASK_ELEMENTS_SPAN = document.querySelector("#missingTaskElements");
        MISSING_TASK_ELEMENTS_SPAN.innerText = "";

        if(DESCRIPTION.length == 0 && DUE_DATE.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText = "description and due date"
        }
        else if(DESCRIPTION.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText += "description";
        }
        else if(DUE_DATE.length == 0)
        {
            MISSING_TASK_ELEMENTS_SPAN.innerText += "due date";
        }

        INVALID_TASK_MODAL.show();
    }
    

    console.log(DESCRIPTION);
    console.log(DUE_DATE);

    // Block default behavior
    return false;
}