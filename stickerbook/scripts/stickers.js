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
        moveSticker(CLONED_STICKER, event.pageX, event.pageY)

        // Move the sticker with the mouse
        function onMouseMove(e){
            moveSticker(CLONED_STICKER, e.pageX, e.pageY)
        }
        document.addEventListener("mousemove", onMouseMove)

        // Place the sticker when the mouse is released
        function onMouseUp() {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
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