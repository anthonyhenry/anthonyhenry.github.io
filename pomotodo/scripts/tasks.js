class Task {
    constructor(description, dueDate)
    {
        this.description = description;
        this.dueDate = dueDate;
    }
}

document.querySelector("#newTaskForm").onsubmit = function()
{
    // Validate data
    const DESCRIPTION = document.querySelector("#newTaskDescription").value.trim();
    const DUE_DATE = document.querySelector("#newTaskDueDate").value;

    if(validateTask(DESCRIPTION, DUE_DATE))
    {
        const NEW_TASK = new Task(DESCRIPTION, DUE_DATE);
        console.log(NEW_TASK);


        console.log("Tasks validated");
        return false;
    }
    

    console.log(DESCRIPTION);
    console.log(DUE_DATE);

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