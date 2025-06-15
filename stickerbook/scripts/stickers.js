////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Global Variables ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Get all sticker templates
const TEMPLATE_STICKERS = document.querySelectorAll(".template-sticker");
// Get a reference to the sticker page div
const STICKER_PAGE_DIV = document.querySelector("#stickerPage");
// Element of the last clicked sticker
let activeSticker = ""

////////////////////////////////////////////////////////////////////////////////
////////////////////// Handler for Creating New Stickers //////////////////////
////////////////////////////////////////////////////////////////////////////////

for(const sticker of TEMPLATE_STICKERS)
{
    // Sticker template clicked
    sticker.onmousedown = function(event){
        // Prevent default behavior (ghost image)
        event.preventDefault();

        // Create a div for the new sticker
        const STICKER_DIV = document.createElement("div");

        // Style sticker div
        STICKER_DIV.style.position = "absolute";
        STICKER_DIV.style.width = sticker.width + "px";
        STICKER_DIV.style.height = sticker.height + "px";
        // STICKER_DIV.style.backgroundColor = "white";

        // Add the sticker div to the sticker page div
        STICKER_PAGE_DIV.appendChild(STICKER_DIV);

        // Create a duplicate of the sticker
        const CLONED_STICKER = document.createElement("img");
        CLONED_STICKER.src = sticker.src;

        // Add the sticker to the sticker div
        STICKER_DIV.appendChild(CLONED_STICKER);

        // Style sticker
        CLONED_STICKER.style.height = "100%";
        CLONED_STICKER.style.transform = "rotate(90deg)"

        // Place the new sticker under the mouse cursor
        const ANCHOR = {
            x: parseInt(STICKER_DIV.style.width) / 2,
            y: parseInt(STICKER_DIV.style.height) / 2
        }
        setStickerPos(STICKER_DIV, event.pageX, event.pageY, ANCHOR);

        // Allow sticker to be moved
        moveSticker(STICKER_DIV, ANCHOR);
    }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////// Handler for Moving Placed Stickers //////////////////////
////////////////////////////////////////////////////////////////////////////////


function bindPlacedStickers()
{
    const PLACED_STICKERS = document.querySelectorAll(".placed-sticker");

    for(sticker of PLACED_STICKERS)
    {
        sticker.onmousedown = function(event){
            // Prevent default behavior (ghost image)
            event.preventDefault();

            // Add the sticker to the sticker page div
            // STICKER_PAGE_DIV.appendChild(this);

            // Add an outline to this sticker
            if(activeSticker != this)
            {
                setActiveSticker(this);
            }

            // Set anchor for sticker movement
            const STICKER_RECT = this.getBoundingClientRect();
            const ANCHOR = {
                x: event.pageX - STICKER_RECT.left,
                y: event.pageY - STICKER_RECT.top
            }
            // Allow sticker to be moved
            moveSticker(this, ANCHOR); // Needs to be this, otherwise only the last sticker placed will be moved for some reason
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////// Handler for Clearing the Active Sticker ///////////////////
////////////////////////////////////////////////////////////////////////////////

document.addEventListener("click", function(){

    //  // This won't make newly placed stickers active
    // if(activeSticker && event.target != activeSticker && event.target.parentElement != activeSticker)
    // {
    //     clearActiveSticker();
    // }

    function test(e)
    {
        if(activeSticker && e.target != activeSticker && e.target.parentElement != activeSticker)
        {
            clearActiveSticker();
        }
    }
    document.addEventListener("mouseup", test);
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Helper Functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function moveSticker(sticker, anchor)
{
    function onMouseMove(e)
    {
        // Move sticker position
        setStickerPos(sticker, e.pageX, e.pageY, anchor);
    }
    document.addEventListener("mousemove", onMouseMove);

    // Place the sticker when the mouse is released
    function onMouseUp()
    {
        // Reset cursor to default
        sticker.style.cursor = "default";

        // Disable listeners
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        // Get top, right, left, bottom coordinates of the scene div
        const SCENE_DIV = document.querySelector("#scene");
        const SCENE_RECT = SCENE_DIV.getBoundingClientRect();

        // Get top, right, left, bottom coordinates of the sticker img
        const STICKER_RECT = sticker.getBoundingClientRect();
        
        // Only keep stickers that are visible within the scene
        if(STICKER_RECT.right >= SCENE_RECT.left 
            && STICKER_RECT.left <= SCENE_RECT.right 
            && STICKER_RECT.bottom >= SCENE_RECT.top 
            && STICKER_RECT.top <= SCENE_RECT.bottom)
        {
            if(sticker.parentElement != SCENE_DIV)
            {
                // Change the sticker's parent to the scene div
                SCENE_DIV.appendChild(sticker);
                // Give the sticker the placed sticker class and set active
                sticker.classList.add("placed-sticker");
                // Bind placed sticker behavior
                bindPlacedStickers();
                // Set sticker as active sticker
                setActiveSticker(sticker);
            }
        }
        else
        {
            // Delete stickers that aren't in the scene
            sticker.parentElement.removeChild(sticker);
        }
    }
    document.addEventListener("mouseup", onMouseUp);
}

function setStickerPos(sticker, mousePosX, mousePosY, anchor)
{
    // Set grabbing cursor
    sticker.style.cursor = "grabbing";
    // offsetLeft/Top returns the distance in pixels from the specified edge of an element to the specified edge of its nearest positioned ancestor
    sticker.style.left = mousePosX - STICKER_PAGE_DIV.offsetLeft - anchor.x + "px"; 
    sticker.style.top = mousePosY - STICKER_PAGE_DIV.offsetTop - anchor.y + "px";
}

function setActiveSticker(sticker)
{
    clearActiveSticker();

    sticker.style.outline = "2px dashed blue";
    activeSticker = sticker;
    console.log("I set the active sticker!")
}

function clearActiveSticker()
{
    if(activeSticker)
    {
        activeSticker.style.outline = "";
        activeSticker = "";
    }
}