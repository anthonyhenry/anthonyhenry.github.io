//New youtube embed code submitted
document.querySelector("#jukeboxForm").onsubmit = function(){
    //Get the new embed code that has been submitted
    let newVideoEmbedCode = document.querySelector("#embedCode").value.trim();
    //Youtube embed code regex
    const ytEmbedLinkRegEx = /^<iframe.*src.*youtube.*embed.*<\/iframe>$/;
    
    // Verify the submitted embed code
    if(/^$/.test(newVideoEmbedCode))
    {
        alert("Please provide a YouTube embed code.")
    }
    else if( !getYouTubeVideoIdByUrl(newVideoEmbedCode) && ytEmbedLinkRegEx.test(newVideoEmbedCode) == false )
    {
        alert("Error: The input you submitted does not appear to be a YouTube embed code. Please paste a YouTube embed code into the form and resubmit. \nTo get the embed code for a YouTube video follow these steps: \n\n 1. Go to YouTube and find the video you would like to embed\n 2. Click on the Share button below the video\n 3. Select the Embed option that appears.\n 4.You will see a box with some code inside. This code is the embed code for the video. Copy that code.\n 5.Paste the code into the YouTube Embed Code input box on this website.");
    }
    // User supplied propper embed code
    else if(ytEmbedLinkRegEx.test(newVideoEmbedCode))
    {
        //Update the embedded video
        let embeddedYoutubeVid = document.querySelector("#embeddedVideo");
        document.querySelector("#embeddedVideo").innerHTML = newVideoEmbedCode;
        // Size the new embedded video
        embeddedYoutubeVid.firstElementChild.width = "100%"; //Prevent the player from going outside the window
        embeddedYoutubeVid.firstElementChild.height = "100%"; //Auto size height based on width
    }
    //User supplied youtube link but not an embed code
    else
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

    //Reset form
    document.querySelector("#embedCode").value = "";

    return false;
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