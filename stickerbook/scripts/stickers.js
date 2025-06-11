// Get all sticker templates
const STICKERS = document.querySelectorAll(".template-sticker");

for(const sticker of STICKERS)
{
    sticker.onmousedown = function(event){
        // Create a duplicate of the sticker
        const CLONED_STICKER = document.createElement("img");
        CLONED_STICKER.src = sticker.src;

        // Get canvas's position
        const CANVAS_DIV = document.querySelector("#canvas");
        const CANVAS_RECT = CANVAS_DIV.getBoundingClientRect();

        // Style cloned sticker
        CLONED_STICKER.style.position = "absolute";
        CLONED_STICKER.style.width = sticker.width + "px";

        // Place the cloned sticker under the mouse cursor
        CLONED_STICKER.style.left = (event.clientX - CANVAS_RECT.left - (sticker.width / 2)) + "px";
        CLONED_STICKER.style.top = (event.clientY - CANVAS_RECT.top - (sticker.height / 2)) + "px";

        // Add the sticker to the canvas
        CANVAS_DIV.appendChild(CLONED_STICKER);

        function moveAt(clientX, clientY)
        {
            CLONED_STICKER.style.left = (clientX - CANVAS_RECT.left - (sticker.width / 2)) + "px";
            CLONED_STICKER.style.top = (clientY - CANVAS_RECT.top - (sticker.height / 2)) + "px";
        }

        function onMouseMove(e)
        {
            moveAt(e.clientX, e.clientY);
        }

        document.addEventListener('mousemove', onMouseMove);

        CLONED_STICKER.onmouseup = function (){
            document.removeEventListener("mousemove", onMouseMove);
            CLONED_STICKER.onmouseup = null;
        };

        CLONED_STICKER.ondragstart = () => false; // Prevent ghost image

    }
}