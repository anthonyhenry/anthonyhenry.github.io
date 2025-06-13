// Get all sticker templates
const TEMPLATE_STICKERS = document.querySelectorAll(".template-sticker");
// Get a reference to the sticker page div
const STICKER_PAGE_DIV = document.querySelector("#stickerPage");

////////////////////////////////////////////////////////////////////////////////
////////////////////// Handlers for Creating New Stickers //////////////////////
////////////////////////////////////////////////////////////////////////////////

for(const sticker of TEMPLATE_STICKERS)
{
    // Sticker template clicked
    sticker.onmousedown = function(event){
        // Prevent default behavior (ghost image)
        event.preventDefault();

        // Create a duplicate of the sticker
        const CLONED_STICKER = document.createElement("img");
        CLONED_STICKER.src = sticker.src;

        // Add the sticker to the sticker page div
        STICKER_PAGE_DIV.appendChild(CLONED_STICKER);

        // Style cloned sticker
        CLONED_STICKER.style.position = "absolute";
        CLONED_STICKER.style.width = sticker.width + "px";

        // Place the cloned sticker under the mouse cursor
        moveSticker(CLONED_STICKER, event.pageX, event.pageY);

        // Move the sticker with the mouse
        function onMouseMove(e){
            moveSticker(CLONED_STICKER, e.pageX, e.pageY)
        }
        document.addEventListener("mousemove", onMouseMove)

        // Place the sticker when the mouse is released
        function onMouseUp() {

            // Disable listeners
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);

            // Get top, right, left, bottom coordinates of the scene div
            const SCENE_DIV = document.querySelector("#scene");
            const SCENE_RECT = SCENE_DIV.getBoundingClientRect();

            // Get top, right, left, bottom coordinates of the sticker img
            const STICKER_RECT = CLONED_STICKER.getBoundingClientRect();
            
            // Only add the sticker if it is visible within the scene
            if(STICKER_RECT.right >= SCENE_RECT.left 
                && STICKER_RECT.left <= SCENE_RECT.right 
                && STICKER_RECT.bottom >= SCENE_RECT.top 
                && STICKER_RECT.top <= SCENE_RECT.bottom)
            {
                // Change the sticker's parent to the scene div
                SCENE_DIV.appendChild(CLONED_STICKER);
                // Give the sticker the placed sticker class
                CLONED_STICKER.classList.add("placed-sticker");
                bindPlacedStickers();
            }
            else
            {
                // Delete stickers that aren't in the scene
                CLONED_STICKER.parentElement.removeChild(CLONED_STICKER);
            }
		}
		document.addEventListener("mouseup", onMouseUp);
    }
}

function moveSticker(sticker, mousePosX, mousePosY)
{
    // offsetLeft/Top returns the distance in pixels from the specified edge of an element to the specified edge of its nearest positioned ancestor
    sticker.style.left = mousePosX - STICKER_PAGE_DIV.offsetLeft - (sticker.width / 2) + "px"; 
    sticker.style.top = mousePosY - STICKER_PAGE_DIV.offsetTop - (sticker.height / 2) + "px";
}


function bindPlacedStickers()
{
    const PLACED_STICKERS = document.querySelectorAll(".placed-sticker");

    for(sticker of PLACED_STICKERS)
    {
        sticker.onmousedown = function(event){
            // Prevent default behavior (ghost image)
            event.preventDefault();

            // Set grabbing cursor
            sticker.style.cursor = "grabbing";


            // Add the sticker to the sticker page div
            // STICKER_PAGE_DIV.appendChild(CLONED_STICKER);

            // Place the cloned sticker under the mouse cursor
            // moveSticker(this, event.pageX, event.pageY);

            test(sticker);


        }
    }
}


function test(sticker)
{
    // console.log(e);

    function onMouseMove(e)
    {
        moveSticker(sticker, e.pageX, e.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);

    // Place the sticker when the mouse is released
    function onMouseUp() {
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
        
        // Only add the sticker if it is visible within the scene
        if(STICKER_RECT.right >= SCENE_RECT.left 
            && STICKER_RECT.left <= SCENE_RECT.right 
            && STICKER_RECT.bottom >= SCENE_RECT.top 
            && STICKER_RECT.top <= SCENE_RECT.bottom)
        {
            // Change the sticker's parent to the scene div
            // SCENE_DIV.appendChild(CLONED_STICKER);
            // Give the sticker the placed sticker class
            // CLONED_STICKER.classList.add("placed-sticker");
            // bindPlacedStickers();
        }
        else
        {
            // Delete stickers that aren't in the scene
            sticker.parentElement.removeChild(sticker);
        }
    }
    document.addEventListener("mouseup", onMouseUp);
}

function placeSticker(mouseMoveListenerFunc)
{
    function onMouseUp()
    {
        document.removeEventListener("mousemove", mouseMoveListenerFunc);
        document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mouseup", onMouseUp);
}