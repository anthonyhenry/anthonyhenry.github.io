////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Global Variables ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Get all sticker templates
const TEMPLATE_STICKERS = document.querySelectorAll(".template-sticker");
// Get a reference to the sticker page div
const STICKER_PAGE_DIV = document.querySelector("#stickerPage");
// Reference to scene div
const SCENE_DIV = document.querySelector("#scene");
// Element of the last clicked sticker
let activeSticker = ""

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Create New Stickers /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

for(const sticker of TEMPLATE_STICKERS)
{
    // Sticker template clicked
    sticker.onmousedown = function(event){
        // Prevent default behavior (ghost image)
        event.preventDefault();

        // Clear active sticker
        clearActiveSticker();

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

        // Place the new sticker under the mouse cursor
        const ANCHOR = {
            x: parseInt(STICKER_DIV.style.width) / 2,
            y: parseInt(STICKER_DIV.style.height) / 2
        };
        setStickerPos(STICKER_DIV, event.pageX, event.pageY, ANCHOR);

        // Allow sticker to be moved
        moveSticker(STICKER_DIV, ANCHOR);
    }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////// Move and Rotate Placed Stickers ///////////////////////
////////////////////////////////////////////////////////////////////////////////

function bindPlacedStickers()
{
    // Get all placed stickers
    const PLACED_STICKERS = document.querySelectorAll(".placed-sticker");

    for(sticker of PLACED_STICKERS)
    {
        // Sticker div clicked
        sticker.onmousedown = function(event){
            // Prevent default behavior (ghost image)
            event.preventDefault();

            // Rotate sticker
            if(event.target.classList.contains("sticker-rotate-handle"))
            {
                const STICKER_DIV_RECT = this.getBoundingClientRect();
                const CENTER_X = STICKER_DIV_RECT.left + STICKER_DIV_RECT.width / 2
                const CENTER_Y = STICKER_DIV_RECT.top + STICKER_DIV_RECT.height / 2

                const INITIAL_X = event.pageX;
                const INITIAL_Y = event.pageY;

                const INITIAL_ANGLE = Math.atan2(INITIAL_Y - CENTER_Y, INITIAL_X - CENTER_X);

                const CURRENT_ROTATION = getStickerRotation(this);

                const STICKER_DIV = this;
                STICKER_DIV.style.willChange = "transform"; // this is to help with performance
                function rotateSticker(e)
                {
                    const dx = e.pageX - CENTER_X;
                    const dy = e.pageY - CENTER_Y;
                    let angle = Math.atan2(dy, dx);
                    angle -= INITIAL_ANGLE;
                    angle *= (180 / Math.PI);
                    angle += CURRENT_ROTATION;

                    STICKER_DIV.style.transform = `rotate(${angle}deg)`;
                }
                document.addEventListener("mousemove", rotateSticker);

                function stopRotating()
                {
                    // Need to reset willChange to save memory
                    resetWillChange(STICKER_DIV)

                    document.removeEventListener("mousemove", rotateSticker);
                    document.removeEventListener("mouseup", stopRotating);
                }
                document.addEventListener("mouseup", stopRotating);
            }
            // Move sticker
            else
            {
                // Make this the active sticker
                if(activeSticker != this)
                {
                    setActiveSticker(this);
                }

                // Clone the node to get the correct anchor
                const CLONED_NODE = this.cloneNode();
                CLONED_NODE.style.transform = "rotate(0deg)"
                CLONED_NODE.style.outline = ""
                SCENE_DIV.insertBefore(CLONED_NODE, this)
                

                // Set anchor for sticker movement
                const STICKER_RECT = CLONED_NODE.getBoundingClientRect();
                const ANCHOR = {
                    x: event.pageX - STICKER_RECT.left,
                    y: event.pageY - STICKER_RECT.top
                }

                // Delete the cloned node
                SCENE_DIV.removeChild(CLONED_NODE);

                // Allow sticker to be moved
                moveSticker(this, ANCHOR); // Needs to be this, otherwise only the last sticker placed will be moved for some reason    
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
////////// Handler for Setting Cursor and Clearing the Active Sticker //////////
////////////////////////////////////////////////////////////////////////////////

document.addEventListener("mousedown", function(event){
    // Check if a sticker was clicked
    const STICKER_CLICKED = (
        event.target.classList.contains("template-sticker")
        || event.target.classList.contains("sticker-rotate-handle")
        || event.target.parentElement.classList.contains("placed-sticker")
    )
    if(STICKER_CLICKED)
    {
        // Set cursor to grabbing
        document.querySelector("body").style.cursor = "grabbing";
        
        // Reset cursor on mouse up
        function resetCursor()
        {
            document.querySelector("body").style.cursor = "default";

            document.removeEventListener("mouseup", resetCursor);
        }
        document.addEventListener("mouseup", resetCursor);
    }
    // Sticker not clicked
    else
    {
        clearActiveSticker();
    }
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Helper Functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function moveSticker(sticker, anchor)
{
    // Set will change to help with performance
    sticker.style.willChange = "left, top";

    function onMouseMove(e)
    {
        // Move sticker position
        setStickerPos(sticker, e.pageX, e.pageY, anchor);
    }
    document.addEventListener("mousemove", onMouseMove);

    // Place the sticker when the mouse is released
    function onMouseUp()
    {
        // Get top, right, left, bottom coordinates of the scene div
        const SCENE_RECT = SCENE_DIV.getBoundingClientRect();

        // Get top, right, left, bottom coordinates of the sticker img
        const STICKER_RECT = sticker.getBoundingClientRect();
        
        // Only keep stickers that are visible within the scene
        if(STICKER_RECT.right >= SCENE_RECT.left 
            && STICKER_RECT.left <= SCENE_RECT.right 
            && STICKER_RECT.bottom >= SCENE_RECT.top 
            && STICKER_RECT.top <= SCENE_RECT.bottom)
        {
            // Reset will change
            resetWillChange(sticker);

            if(sticker.parentElement != SCENE_DIV)
            {
                // Change the sticker's parent to the scene div
                SCENE_DIV.appendChild(sticker);
                // Give the sticker the placed sticker class
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

        // Disable listeners
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mouseup", onMouseUp);
}

function setStickerPos(sticker, mousePosX, mousePosY, anchor)
{
    // offsetLeft/Top returns the distance in pixels from the specified edge of an element to the specified edge of its nearest positioned ancestor
    sticker.style.left = mousePosX - STICKER_PAGE_DIV.offsetLeft - anchor.x + "px"; 
    sticker.style.top = mousePosY - STICKER_PAGE_DIV.offsetTop - anchor.y + "px";
}

function setActiveSticker(sticker)
{
    // Clear previous active sticker and set new one
    clearActiveSticker();
    activeSticker = sticker;

    // Give the new active sticker an outline
    sticker.style.outline = "2px dashed blue";

    // Create rotate handle for the active sticker
    const rotateHandle = document.createElement("div");
    rotateHandle.classList.add("sticker-rotate-handle");
    activeSticker.appendChild(rotateHandle);

    rotateHandle.addEventListener("mousedown", function(event){
        event.preventDefault();
        console.log("test")


    })
}

function clearActiveSticker()
{
    if(activeSticker)
    {
        // Remove rotation handle
        activeSticker.removeChild(activeSticker.children[1]);

        // Reset active sticker
        activeSticker.style.outline = "";
        activeSticker = "";
    }
}

function getStickerRotation(sticker)
{
    let rotation = sticker.style.transform;

    if(rotation)
    {
        rotation = rotation.split("(");
        rotation = parseFloat(rotation[1]);
        return rotation;
    }
    else
    {
        return 0;
    }
}

function resetWillChange(element)
{
    element.style.willChange = "";
}