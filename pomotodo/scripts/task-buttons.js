changeButtonColorOnHover();

function getEditAndDeleteButtons()
{
    // First get all edit buttons
    let buttons = document.querySelectorAll(".edit-btn");
    // Convert node list to an array
    buttons = Array.from(buttons);
    // Add all delete buttons to the array
    buttons = buttons.concat(Array.from(document.querySelectorAll(".delete-btn"))); // Converted delete buttons node list to an array

    return buttons;
}

function changeButtonColor()
{
    for(btn of getEditAndDeleteButtons())
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
    for(btn of getEditAndDeleteButtons())
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