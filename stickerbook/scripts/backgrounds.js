const SCENE_BG = document.querySelector("#sceneBackground");

for(let bg of document.querySelector("#backgroundGallery").children)
{
    bg.onclick = function(){
        if(SCENE_BG.src != this.src)
        {
            SCENE_BG.src = this.src;
        }
    }
}