const SCENE_BG = document.querySelector("#sceneBackground");

for(let bg of document.querySelector("#backgroundGallery").children)
{
    bg.onclick = function(){
        if(SCENE_BG.src != this.src)
        {
            const PLACED_STICKERS = document.querySelectorAll(".placed-sticker");

            if(PLACED_STICKERS.length > 0)
            {
                if(confirm("There are stickers placed on the current scene. Changing the background will remove all placed stickers."))
                {
                    for (let sticker of PLACED_STICKERS)
                    {
                        removeElement(sticker);
                    }

                    SCENE_BG.src = this.src;
                }
            }
            else
            {
                SCENE_BG.src = this.src;
            }
        }
    }
}