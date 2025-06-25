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
// Custom rotate icon
const ROTATE_ICON = document.querySelector("#rotateIcon");
// Offset for setting how much bigger than a sticker the rotation div should be
const ROTATION_DIV_OFFSET = 25;
// Body element
const HTML_ELEMENT = document.querySelector("html");
// Track if the shift key is being held down
let shiftKeyDown = false;

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

        // Add the sticker div to the sticker page div
        STICKER_PAGE_DIV.appendChild(STICKER_DIV);

        // Create a duplicate of the sticker
        const CLONED_STICKER = document.createElement("img");
        CLONED_STICKER.src = sticker.src;

        // Add the sticker to the sticker div
        STICKER_DIV.appendChild(CLONED_STICKER);

        // Style sticker
        CLONED_STICKER.style.height = "100%";
        CLONED_STICKER.style.width = "100%";
        CLONED_STICKER.style.pointerEvents = "none";

        // Place the new sticker under the mouse cursor
        const ANCHOR = {
            x: parseFloat(STICKER_DIV.style.width) / 2,
            y: parseFloat(STICKER_DIV.style.height) / 2
        };
        setStickerPos(STICKER_DIV, event.pageX, event.pageY, ANCHOR);

        // Allow sticker to be moved
        moveSticker(STICKER_DIV, ANCHOR);
    }
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Move Placed Stickers /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

SCENE_DIV.addEventListener("mousedown", function(event){
    // Check if a sticker was clicked
    if(stickerTargeted(event.target))
    {
        // Prevent default behavior (ghost image)
        event.preventDefault();

        const CLICKED_STICKER = event.target;

        // Make this the active sticker
        if(activeSticker != CLICKED_STICKER)
        {
            setActiveSticker(CLICKED_STICKER);
        }

        // Get anchor of unrotated sticker
        const PREVIOUS_ROTATION = CLICKED_STICKER.style.transform;
        CLICKED_STICKER.style.transform = "rotate(0deg)";
        // Set anchor for sticker movement
        const STICKER_RECT = CLICKED_STICKER.getBoundingClientRect();
        const ANCHOR = {
            x: event.pageX - STICKER_RECT.left,
            y: event.pageY - STICKER_RECT.top
        }
        // Reset sticker rotation
        CLICKED_STICKER.style.transform = PREVIOUS_ROTATION;

        // Allow sticker to be moved
        moveSticker(CLICKED_STICKER, ANCHOR);
    }
})

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
        
        // Only keep stickers that are visible within the scene
        if(isActiveStickerInScene(sticker))
        {
            // Check if this is a new sticker
            if(sticker.parentElement != SCENE_DIV)
            {
                // Change the sticker's parent to the scene div
                SCENE_DIV.appendChild(sticker);
                // Give the sticker the placed sticker class
                sticker.classList.add("placed-sticker");
                // Set sticker as active sticker
                setActiveSticker(sticker);
            }
        }
        else
        {
            removeElement(sticker)
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
//////////////////////////// Resize Active Sticker ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

SCENE_DIV.addEventListener("wheel", function(event){
    if(event.target == activeSticker)
    {
        event.preventDefault() // Prevent page scrolling

        const INITIAL_SIZE = getStickerDimensionFloatValues(activeSticker);
        const MIN_SIZE = 16;

        const SCROLL_DIRECTION = event.deltaY < 0 ? 1 : -1;
        const SCROLL_SPEED = shiftKeyDown ? 15 : 5;

        const NEW_WIDTH = INITIAL_SIZE.width + (SCROLL_DIRECTION * SCROLL_SPEED)

        if(NEW_WIDTH >= MIN_SIZE)
        {
            const NEW_HEIGHT = (INITIAL_SIZE.height * NEW_WIDTH) / INITIAL_SIZE.width;
            if(NEW_HEIGHT >= MIN_SIZE)
            {
                activeSticker.style.willChange = "width, height, top, left";

                // Get mouse coordinates relative to sticker left, top
                let stickerLeft = STICKER_PAGE_DIV.offsetLeft + parseFloat(activeSticker.style.left);
                let stickerTop = STICKER_PAGE_DIV.offsetTop + parseFloat(activeSticker.style.top);
                let anchor = {
                    x: event.pageX - stickerLeft,
                    y: event.pageY - stickerTop
                };

                // Set new width and height
                activeSticker.style.width = NEW_WIDTH + "px";
                activeSticker.style.height = NEW_HEIGHT + "px";

                // Use proportion to get new anchor
                anchor = {
                    x: (anchor.x * NEW_WIDTH) / INITIAL_SIZE.width,
                    y: (anchor.y * NEW_HEIGHT) / INITIAL_SIZE.height
                };

                // Update sticker position using new anchor
                setStickerPos(activeSticker, event.pageX, event.pageY, anchor)

                setActiveSticker(activeSticker); // Reset active sticker so that rotate div also updates
                resetWillChange(activeSticker);
            }
        }
    }
    else if(event.target.classList.contains("placed-sticker"))
    {
        setActiveSticker(event.target)
    }
});

////////////////////////////////////////////////////////////////////////////////
///////////////////////// Set and Clear Active Sticker /////////////////////////
////////////////////////////////////////////////////////////////////////////////

function setActiveSticker(sticker)
{
    // Clear previous active sticker and set new one
    clearActiveSticker();
    activeSticker = sticker;
    activeSticker.style.cursor = "all-scroll";

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
        activeSticker.style.cursor = "default";
        activeSticker = "";
    }
}

document.addEventListener("mousedown", function(event){
    // Check if a sticker was clicked
    const STICKER_CLICKED = (
        (event.target.classList.length > 0)
        && 
        (event.target.classList.contains("template-sticker")
        || event.target.classList.contains("sticker-rotate-handle")
        || event.target.classList.contains("placed-sticker"))
    )
    if(STICKER_CLICKED)
    {
        // Set cursor to grabbing
        if(activeSticker)
        {
            activeSticker.style.cursor = "";
        }
        HTML_ELEMENT.style.cursor = "grabbing";
        
        // Reset cursor on mouse up
        function resetCursor()
        {
            HTML_ELEMENT.style.cursor = "default";
            if(activeSticker)
            {
                activeSticker.style.cursor = "all-scroll";
            }

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
    ROTATE_DIV.style.width = parseFloat(activeSticker.style.width) + (ROTATION_DIV_OFFSET * 2) + "px";
    ROTATE_DIV.style.height = parseFloat(activeSticker.style.height) + (ROTATION_DIV_OFFSET * 2) + "px";
    ROTATE_DIV.style.transform = activeSticker.style.transform;
    ROTATE_DIV.id = "rotationDiv";
    SCENE_DIV.insertBefore(ROTATE_DIV, activeSticker);

    // Initialize rotate variables
    let rotatingSticker = false;
    let insideRotateDiv = false;

    // Move the rotate icon while the cursor is in the rotate div
    ROTATE_DIV.addEventListener("mouseenter", function(event){        
        // Make rotate icon visible
        ROTATE_ICON.style.display = "block";
        // Hide the default cursor
        HTML_ELEMENT.style.cursor = "none";
        activeSticker.style.cursor = "none";
        // Set inside div flag to true
        insideRotateDiv = true;

        // Move the rotate icon to the cursor position
        document.addEventListener("mousemove", setRotateIconPos)

        ROTATE_DIV.addEventListener("mouseleave", exitRotationDiv);
    })

    // Set rotate icon position to mouse position
    setRotateIconPos = function(e)
    {
        const ICON_STYLE = window.getComputedStyle(ROTATE_ICON);
        const X_POS = e.pageX - parseFloat(ICON_STYLE.width) + "px";
        const Y_POS = e.pageY - parseFloat(ICON_STYLE.height) + "px";

        ROTATE_ICON.style.left = X_POS;
        ROTATE_ICON.style.top = Y_POS;
    }

    function exitRotationDiv()
    {
        insideRotateDiv = false;
        resetCursor();
        ROTATE_DIV.removeEventListener("mouseleave", exitRotationDiv);
    }

    // Reset cursor to default
    function resetCursor()
    {
        // Check if the sticker is not being rotated and the cursor is not in the rotate div
        if(rotatingSticker == false && insideRotateDiv == false)
        {
            activeSticker.style.cursor = "all-scroll";
            resetRotateIcon();
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

        const CURRENT_ROTATION = getStickerRotationFloatValue(sticker);

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
            resetCursor();

            // Need to reset willChange to save memory
            resetWillChange(sticker);
            resetWillChange(ROTATE_DIV);

            if(!isActiveStickerInScene(activeSticker))
            {
                removeElement(activeSticker);
                insideRotateDiv = false;
                resetCursor();
            }

            document.removeEventListener("mousemove", rotateSticker);
            document.removeEventListener("mouseup", stopRotating);
        }
        document.addEventListener("mouseup", stopRotating);
    })
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Keyboard Inputs ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event){
    // console.log(event.key)

    switch(event.key)
    {
        // Deselect active sticker with escape key    
        case "Escape":
            clearActiveSticker();
            resetRotateIcon();
            break;
        // Delete active sticker with delete key
        case "Delete":
            if(activeSticker)
            {
                removeElement(activeSticker);
                resetRotateIcon();
            }
            break;
        case "Shift":
            shiftKeyDown = true;
            break;
    }
});

document.addEventListener("keyup", function(event){
    if(event.key == "Shift")
    {
        shiftKeyDown = false;
    }
})

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Helper Functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function isActiveStickerInScene(sticker)
{
    // Get top, right, left, bottom coordinates of the scene div
    const SCENE_RECT = SCENE_DIV.getBoundingClientRect();

    // Get top, right, left, bottom coordinates of the sticker img
    const STICKER_RECT = sticker.getBoundingClientRect();


    if(STICKER_RECT.right >= SCENE_RECT.left 
        && STICKER_RECT.left <= SCENE_RECT.right 
        && STICKER_RECT.bottom >= SCENE_RECT.top 
        && STICKER_RECT.top <= SCENE_RECT.bottom)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function removeElement(element)
{
    if(element == activeSticker)
    {
        clearActiveSticker();
    }

    element.parentElement.removeChild(element);    
}

function stickerTargeted(element)
{
    return element.classList.contains("placed-sticker");
}

function getStickerRotationFloatValue(sticker)
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

function getStickerDimensionFloatValues(sticker)
{
    const dimensions = {
        width: parseFloat(sticker.style.width),
        height: parseFloat(sticker.style.height)
    };
    return dimensions;
}

function resetWillChange(element)
{
    element.style.willChange = "";
}

let setRotateIconPos; // This needs to be here to remove the event function
function resetRotateIcon()
{
    // Reset custom rotate cursor
    ROTATE_ICON.style.display = "none";
    ROTATE_ICON.style.top = "0px";
    ROTATE_ICON.style.left = "0px";
    // Reset cursor
    HTML_ELEMENT.style.cursor = "default";
    document.removeEventListener("mousemove", setRotateIconPos);
}

// TODO:
    // Change setStickerPos function name to attachElementToMouse

// // Take a look at my code. How can I make sticker placement mobile friendly. It currently uses dragging with a mousedown event but that doesn't work on mobile

// Will probably have to deal with multiple transforms for horizontal/vertical flipping. Chat GPT suggested a way to handle this.

// I think it would be a good idea to allow users to undo actions by doing something like pressing ctrl + z. How would I go about implementing this?