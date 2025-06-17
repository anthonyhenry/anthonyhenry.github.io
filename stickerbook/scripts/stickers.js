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
////////////////////// Handler for Creating New Stickers //////////////////////
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
        // CLONED_STICKER.style.transform = "rotate(90deg)"

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

            console.log(event.target)

            if(event.target.classList.contains("sticker-rotate-handle"))
            {
                const ROTATION_HANDLE = event.target;
                const STICKER_IMG = this.children[0]

                // Create a clone of the sticker div
                const CLONED_DIV = this.cloneNode();
                CLONED_DIV.style.transform = getComputedStyle(this).transform;
                // Add the clone underneath the active sticker
                SCENE_DIV.insertBefore(CLONED_DIV, this)
                // Clone the sticker img
                const CLONED_IMG = STICKER_IMG.cloneNode();
                // Add the cloned sticker to the cloned div
                CLONED_DIV.appendChild(CLONED_IMG);
                // Move the rotation handler to the cloned div
                CLONED_DIV.appendChild(ROTATION_HANDLE);

                const CENTER_X = CLONED_DIV.offsetLeft + CLONED_DIV.offsetWidth;
                const CENTER_Y = CLONED_DIV.offsetTop + CLONED_DIV.offsetHeight;

                const INITIAL_X = event.pageX;
                const INITIAL_Y = event.pageY;

                const INITIAL_ANGLE = Math.atan2(INITIAL_Y - CENTER_Y, INITIAL_X - CENTER_X);

                const CURRENT_ROTATION = getStickerRotation(STICKER_IMG);
                
                function rotateSticker(e)
                {
                    const dx = e.pageX - CENTER_X;
                    const dy = e.pageY - CENTER_Y;
                    let angle = Math.atan2(dy, dx);
                    angle -= INITIAL_ANGLE;
                    angle *= (180 / Math.PI);
                    angle += CURRENT_ROTATION;

                    // Rotate the cloned div
                    CLONED_DIV.style.transform = `rotate(${angle}deg)`;
                    // Rotate the sticker
                    STICKER_IMG.style.transform = `rotate(${angle}deg)`;
                }
                document.addEventListener("mousemove", rotateSticker);

                function stopRotating()
                {
                    STICKER_IMG.parentElement.appendChild(ROTATION_HANDLE);
                    SCENE_DIV.removeChild(CLONED_DIV);

                    document.removeEventListener("mousemove", rotateSticker);
                    document.removeEventListener("mouseup", stopRotating);
                }
                document.addEventListener("mouseup", stopRotating);

            }
            else
            {
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

            // Add the sticker to the sticker page div
            // STICKER_PAGE_DIV.appendChild(this);

            
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
        console.log(e.target);
        if(activeSticker && e.target != activeSticker && e.target.parentElement != activeSticker)
        {
            clearActiveSticker();
        }

        document.removeEventListener("mouseup", test);
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
    console.log("sticker: " + activeSticker)

    const ACTIVE_STICKER_RECT = activeSticker.getBoundingClientRect();
    console.log(ACTIVE_STICKER_RECT);

    const rotateHandle = document.createElement("div");
    rotateHandle.classList.add("sticker-rotate-handle");
    activeSticker.appendChild(rotateHandle);

    rotateHandle.addEventListener("mousedown", function(event){
        event.preventDefault();


    })
}

function clearActiveSticker()
{
    if(activeSticker)
    {
        if(activeSticker.childElementCount > 1)
        {
            activeSticker.removeChild(activeSticker.children[1]);
            activeSticker.style.outline = "";
            activeSticker = "";
        }
    }
}

let test = document.querySelector("#test");

test.addEventListener("mousedown", function(event){
    event.preventDefault();

    const CENTER_X = test.parentElement.offsetLeft + test.parentElement.offsetWidth / 2;
    const CENTER_Y = test.parentElement.offsetTop + test.parentElement.offsetHeight / 2;

    const INITIAL_X = event.pageX;
    const INITIAL_Y = event.pageY;

    const INITIAL_ANGLE = Math.atan2(INITIAL_Y - CENTER_Y, INITIAL_X - CENTER_X);

    const STICKER = document.querySelector("#activeSticker") // test.parentElement.children[0]

    // Get sticker current rotation
    const CURRENT_ROTATION = getStickerRotation(STICKER);

    function onMouseMove(e) {
        const dx = e.pageX - CENTER_X;
        const dy = e.pageY - CENTER_Y;
        let angle = Math.atan2(dy, dx)
        angle -= INITIAL_ANGLE;
        angle *= (180 / Math.PI);
        angle += CURRENT_ROTATION;
        test.parentElement.style.transform = `rotate(${angle}deg)`;
        STICKER.style.transform = `rotate(${angle}deg)`;
    }

    function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
})

function getStickerRotation(sticker)
{
    let rotation = sticker.style.transform;
    console.log(rotation)

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