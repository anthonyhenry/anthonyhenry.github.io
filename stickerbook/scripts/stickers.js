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
// Offset for setting how much bigger than a sticker the rotation div should be
const ROTATION_DIV_OFFSET = 25;
// Body element
const BODY = document.querySelector("body");

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
///////////////////////////// Move Placed Stickers /////////////////////////////
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

function moveSticker(sticker, anchor)
{
    // Get a reference to the rotate div if it exists (only exists on placed stickers)
    const ROTATE_DIV = document.querySelector("#rotationDiv")

    function onMouseMove(e)
    {
        // Set will change to help with performance
        sticker.style.willChange = "left, top";

        // Move sticker position
        setStickerPos(sticker, e.pageX, e.pageY, anchor);

        // Move rotate div if it exists
        if(ROTATE_DIV)
        {
            ROTATE_DIV.style.willChange = "left, top";

            const ROTATE_DIV_ANCHOR = {
                x: anchor.x + ROTATION_DIV_OFFSET,
                y: anchor.y + ROTATION_DIV_OFFSET
            }
            setStickerPos(ROTATE_DIV, e.pageX, e.pageY, ROTATE_DIV_ANCHOR)
        }
    }
    document.addEventListener("mousemove", onMouseMove);

    // Place the sticker when the mouse is released
    function onMouseUp()
    {
        // Reset will change for sticker and rotate div to save memory
        resetWillChange(sticker);
        if(ROTATE_DIV)
        {
            resetWillChange(ROTATE_DIV);
        }

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
            // Check if this is a new sticker
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

////////////////////////////////////////////////////////////////////////////////
///////////////////////// Set and Clear Active Sticker /////////////////////////
////////////////////////////////////////////////////////////////////////////////

function setActiveSticker(sticker)
{
    // Clear previous active sticker and set new one
    clearActiveSticker();
    activeSticker = sticker;

    // Give the new active sticker an outline
    activeSticker.style.outline = "2px dashed blue";

    allowActiveStickerToBeRotated(activeSticker);
}

function clearActiveSticker()
{
    if(activeSticker)
    {
        // Remove rotation div
        const ROTATION_DIV = document.querySelector("#rotationDiv");
        SCENE_DIV.removeChild(ROTATION_DIV);

        // Reset active sticker
        activeSticker.style.outline = "";
        activeSticker = "";
    }
}

document.addEventListener("mousedown", function(event){
    // Check if a sticker was clicked
    const STICKER_CLICKED = (
        (event.target.classList.length > 0
        || (event.target.parentElement && event.target.parentElement.classList.length > 0))
        && 
        (event.target.classList.contains("template-sticker")
        || event.target.classList.contains("sticker-rotate-handle")
        || event.target.parentElement.classList.contains("placed-sticker"))
    )
    if(STICKER_CLICKED)
    {
        // Set cursor to grabbing
        BODY.style.cursor = "grabbing";
        
        // Reset cursor on mouse up
        function resetCursor()
        {
            BODY.style.cursor = "default";

            document.removeEventListener("mouseup", resetCursor);
        }
        document.addEventListener("mouseup", resetCursor);
    }
    // Sticker not clicked
    else if(event.target.id != "rotationDiv")
    {
        clearActiveSticker();
    }
});

////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Rotate Active Sticker ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function allowActiveStickerToBeRotated(sticker)
{
    // Create a rotate div
    const ROTATE_DIV = document.createElement("div");
    ROTATE_DIV.style.position = "absolute"
    ROTATE_DIV.style.left = parseFloat(activeSticker.style.left) - ROTATION_DIV_OFFSET + "px";
    ROTATE_DIV.style.top = parseFloat(activeSticker.style.top) - ROTATION_DIV_OFFSET + "px";
    ROTATE_DIV.style.width = parseInt(activeSticker.style.width) + (ROTATION_DIV_OFFSET * 2) + "px";
    ROTATE_DIV.style.height = parseInt(activeSticker.style.height) + (ROTATION_DIV_OFFSET * 2) + "px";
    ROTATE_DIV.style.transform = activeSticker.style.transform;
    ROTATE_DIV.id = "rotationDiv";
    SCENE_DIV.insertBefore(ROTATE_DIV, activeSticker);
    ROTATE_DIV.style.backgroundColor = "white"

    // Create a rotate icon div
    const ICON = document.querySelector("#rotateIcon");

    // Initialize rotate variables
    let rotatingSticker = false;
    let insideRotateDiv = false;

    // Move the rotate icon while the cursor is in the rotate div
    ROTATE_DIV.addEventListener("mouseenter", function(event){        
        // Make rotate icon visible
        ICON.style.display = "block";
        // Hide the default cursor
        BODY.style.cursor = "none"
        // Set inside div flag to true
        insideRotateDiv = true;

        // Move the rotate icon to the cursor position
        document.addEventListener("mousemove", setRotateIconPos)

        ROTATE_DIV.addEventListener("mouseleave", exitRotationDiv);
    })

    // Set rotate icon position to mouse position
    function setRotateIconPos(e)
    {
        const ICON_STYLE = window.getComputedStyle(ICON);
        const X_POS = e.pageX - parseInt(ICON_STYLE.width) + "px";
        const Y_POS = e.pageY - parseInt(ICON_STYLE.height) + "px";

        ICON.style.left = X_POS;
        ICON.style.top = Y_POS;
    }

    function exitRotationDiv()
    {
        insideRotateDiv = false;
        resetRotateIcon();
        ROTATE_DIV.removeEventListener("mouseleave", exitRotationDiv);
    }

    // Reset cursor to default
    function resetRotateIcon()
    {
        // Check if the sticker is not being rotated and the cursor is not in the rotate div
        if(rotatingSticker == false && insideRotateDiv == false)
        {
            // Reset cursor
            BODY.style.cursor = "default";
            // Reset custom rotate cursor
            ICON.style.top = "0px";
            ICON.style.left = "0px";
            ICON.style.display = "none";
            document.removeEventListener("mousemove", setRotateIconPos);
        }
    }

    // Rotate sticker and rotateDiv on click and drag
    ROTATE_DIV.addEventListener("mousedown", function(event){
        event.preventDefault();

        const STICKER_DIV_RECT = sticker.getBoundingClientRect();
        const CENTER_X = STICKER_DIV_RECT.left + STICKER_DIV_RECT.width / 2;
        const CENTER_Y = STICKER_DIV_RECT.top + STICKER_DIV_RECT.height / 2;

        const INITIAL_X = event.pageX;
        const INITIAL_Y = event.pageY;

        const INITIAL_ANGLE = Math.atan2(INITIAL_Y - CENTER_Y, INITIAL_X - CENTER_X);

        const CURRENT_ROTATION = getStickerRotation(sticker);

        // This is to help with performance
        sticker.style.willChange = "transform";
        ROTATE_DIV.style.willChange = "transform";

        function rotateSticker(e)
        {
            const dx = e.pageX - CENTER_X;
            const dy = e.pageY - CENTER_Y;
            let angle = Math.atan2(dy, dx);
            angle -= INITIAL_ANGLE;
            angle *= (180 / Math.PI);
            angle += CURRENT_ROTATION;

            sticker.style.transform = `rotate(${angle}deg)`;
            ROTATE_DIV.style.transform = `rotate(${angle}deg)`;
        }
        document.addEventListener("mousemove", rotateSticker);

        rotatingSticker = true;

        function stopRotating()
        {
            rotatingSticker = false;
            resetRotateIcon();

            // Need to reset willChange to save memory
            resetWillChange(sticker);
            resetWillChange(ROTATE_DIV);

            document.removeEventListener("mousemove", rotateSticker);
            document.removeEventListener("mouseup", stopRotating);
        }
        document.addEventListener("mouseup", stopRotating);
    })
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Helper Functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

// TODO:
    // Change setStickerPos function name to attachElementToMouse