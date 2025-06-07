// Get all sticker templates
const STICKERS = document.querySelectorAll(".template-sticker");

for(const sticker of STICKERS)
{
    sticker.onmouseenter = function(){
        console.log("Hovering!!!");

        const CLONED_STICKER = document.createElement("img");
        CLONED_STICKER.src = sticker.src;


        // Get the sticker's position relative to the viewport
        const TEMPLATE_STICKER_RECT = sticker.getBoundingClientRect();

        // Get canvas's position
        const CANVAS_DIV = document.querySelector("#canvas");
        const CANVAS_RECT = CANVAS_DIV.getBoundingClientRect();

        // Calculate sticker position relative to canvas
        const STICKER_LEFT = TEMPLATE_STICKER_RECT.left - CANVAS_RECT.left;
        const STICKER_TOP = TEMPLATE_STICKER_RECT.top - CANVAS_RECT.top;

        // Style cloned sticker
        CLONED_STICKER.style.position = "absolute";
        CLONED_STICKER.style.width = sticker.width + "px";
        CLONED_STICKER.style.top = STICKER_TOP + "px";
        CLONED_STICKER.style.left = STICKER_LEFT + "px";
        
        CANVAS_DIV.appendChild(CLONED_STICKER);
    }
}