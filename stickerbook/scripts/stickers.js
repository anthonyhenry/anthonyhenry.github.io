// Get all sticker templates
const TEMPLATE_STICKERS = document.querySelectorAll(".template-sticker");
// Get a reference to the sticker page div
const STICKER_PAGE_DIV = document.querySelector("#stickerPage");

////////////////////////////////////////////////////////////////////////////////
////////////////////// Handler for Creating New Stickers //////////////////////
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
        const ANCHOR = {
            x: CLONED_STICKER.width / 2,
            y: CLONED_STICKER.height / 2
        }
        setStickerPos(CLONED_STICKER, event.pageX, event.pageY, ANCHOR);

        // Allow sticker to be moved
        moveSticker(CLONED_STICKER, ANCHOR);
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

                // Give the sticker the placed sticker class
                if(!sticker.classList.contains("placed-sticker"))
                {
                    sticker.classList.add("placed-sticker");
                    bindPlacedStickers();
                }
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