//New youtube embed code submitted
document.querySelector("#jukeboxForm").onsubmit = function(){
    //Get a reference to the new embed code that has been submitted
    let newVideoEmbedCode = document.querySelector("#embedCode").value.trim();
    //Youtube embed code regex
    const ytEmbedLinkRegEx = /^<iframe.*src.*youtube.*embed.*<\/iframe>$/;
    
    // Verify the submitted embed code
    if(/^$/.test(newVideoEmbedCode))
    {
        alert("Please provide a YouTube embed code.")
    }
    else if( !getYouTubeVideoIdByUrl(newVideoEmbedCode) && !ytEmbedLinkRegEx.test(newVideoEmbedCode))
    {
        alert("Error: The input you submitted does not appear to be a YouTube embed code. Please paste a YouTube embed code into the form and resubmit. \nTo get the embed code for a YouTube video follow these steps: \n\n 1. Go to YouTube and find the video you would like to embed\n 2. Click on the Share button below the video\n 3. Select the Embed option that appears.\n 4.You will see a box with some code inside. This code is the embed code for the video. Copy that code.\n 5.Paste the code into the YouTube Embed Code input box on this website.");
    }
    //User supplied an embed code or youtube video link
    else
    {
        //Get a reference to the iframe element
        let player = this.previousElementSibling;

        //Check if the user supplied a proper embed code
        if(ytEmbedLinkRegEx.test(newVideoEmbedCode))
        {
            //Get just the source of the embeded video and save it in the existing newVideoEmbedCode variable
            const regGetEmbedSource = /src="([^"]*)"/;
            newVideoEmbedCode = newVideoEmbedCode.match(regGetEmbedSource);
            newVideoEmbedCode = newVideoEmbedCode[1];
        }

        //Get the youtube video source's id
        let videoID = getYouTubeVideoIdByUrl(newVideoEmbedCode);

        ////Split the iframe src attibute into parts
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