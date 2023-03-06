// let player = document.querySelector("iframe");

// console.log(player);

// //Size the embedded video
// player.width = "100%"; //Prevent the player from going outside the window
// player.height = ""; //Auto size height based on width

// document.querySelector("#jukeboxForm").onsubmit = function(){
//     let newVideo = document.querySelector("#embedCode").value.trim();

//     //update this to match regular youtube links and turn them into embed codes
//     var ytRegEx = /^<iframe.*src.*youtube.*embed.*<\/iframe>$/;

//     console.log(ytRegEx.test(newVideo));


//     //
//     if(!ytRegEx.test(newVideo) || /^$/.test(newVideo))
//     {
//         alert("Error: The input you sumbited does not appear to be a Youtube embed code. Please paste a youtube embed code into the form and resubmit.");
//     }
//     else
//     {
//         console.log(document.querySelector("#jukebox").children);
//         document.querySelector("#jukebox").children[0] = newVideo;

//         // player.innerHTML = newVideo;
        
//     }

//     return false;
// }

//New youtube embed code submission
document.querySelector("#jukeboxForm").onsubmit = function(){
    //Get the new embed code that has been submitted
    let newVideoEmbedCode = document.querySelector("#embedCode").value.trim();
    //Get the embedded video element
    let embeddedVideoElement = document.querySelector("#embeddedVideo");

    const ytEmbedLinkRegEx = /^<iframe.*src.*youtube.*embed.*<\/iframe>$/;

    //User supplied propper embed code
    if(ytEmbedLinkRegEx.test(newVideoEmbedCode))
    {
        //Update embedded video
        document.querySelector("#embeddedVideo").innerHTML = newVideoEmbedCode;

    }
    //User supplied youtube link but not an embed code
    else if(getYouTubeVideoIdByUrl(newVideoEmbedCode) != null)
    {
        //Get the youtube video's id
        let videoID = getYouTubeVideoIdByUrl(newVideoEmbedCode);

        //Get the iframe element
        let player = document.querySelector("iframe");
        //Split the iframe src attibute into parts
        let playerSrc = player.src.split("/");
        //Change the last part of the src to the new video id
        playerSrc[playerSrc.length-1] = videoID
        //Recombine the src url
        let newSrc = playerSrc.join("/");
        //Set the embedded video source to the new video and clear the title
        player.src = newSrc;
        player.title = "";
    }
    else
    {
        alert("Fail");
    }

    return false;
}

console.log(getYouTubeVideoIdByUrl('<iframe width="950" height="534" src="https://www.youtube.com/embed/-dTHqO1dN3M" title="60 Minutes of Relaxing/Emotional Once Upon a Time Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'));
console.log(getYouTubeVideoIdByUrl('https://www.youtube.com/watch?v=-dTHqO1dN3M'));
console.log(getYouTubeVideoIdByUrl('<iframe width="950" height="534" src="https://www.youtube.com/embed/jzF_y039slk?list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f" title="Over the Rainbow/Simple Gifts (Piano/Cello Cover) - The Piano Guys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'));
console.log(getYouTubeVideoIdByUrl('https://www.youtube.com/watch?v=mJ_fkw5j-t0&list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f&index=1'));

function updateEmbeddedVideo(){

}

function getYouTubeVideoIdByUrl(url) {
    const reg = /^(https?:)?(\/\/)?((www\.|m\.)?youtube(-nocookie)?\.com\/((watch)?\?(feature=\w*&)?vi?=|embed\/|vi?\/|e\/)|youtu.be\/)([\w\-]{10,20})/i
    const match = url.match(reg);
    if (match) {
        return match[9];
    } else {
        return null;
    }
}

// ^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\?\S*)?$ 
// /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

// <iframe width="950" height="534" src="https://www.youtube.com/embed/-dTHqO1dN3M" title="60 Minutes of Relaxing/Emotional Once Upon a Time Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
// https://www.youtube.com/watch?v=-dTHqO1dN3M
// <iframe width="950" height="534" src="https://www.youtube.com/embed/jzF_y039slk?list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f" title="Over the Rainbow/Simple Gifts (Piano/Cello Cover) - The Piano Guys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
// https://youtu.be/jzF_y039slk