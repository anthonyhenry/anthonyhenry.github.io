const STICKERS = document.querySelectorAll(".sticker");

for(const sticker of STICKERS)
{
    sticker.onmouseover = function(){
        console.log("Hovering!!!");
        const CLONED_STICKER = sticker.cloneNode();
        // console.log(sticker.parentElement);

        console.log(sticker.style)
        console.log(sticker.style.position)
        console.log(sticker.x)
        console.log(sticker.y)
        // console.log(sticker.top)
        // console.log(sticker.left)
        console.log(sticker.style.x)
        console.log(sticker.style.y)

        CLONED_STICKER.style.position = "absolute";
        console.log(CLONED_STICKER.style.position)
        CLONED_STICKER.width = sticker.width;

        sticker.parentElement.appendChild(CLONED_STICKER);
        CLONED_STICKER.style.top = sticker.y + "px";
        // CLONED_STICKER.style.left = 0;
        

        console.log(sticker.style.top);
        console.log(sticker.style.left);

        
    }

}