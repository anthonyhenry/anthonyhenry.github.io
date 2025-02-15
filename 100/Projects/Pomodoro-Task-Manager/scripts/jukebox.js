document.querySelector("#jukeboxForm").onsubmit = function(){
    //Get a reference to the new embed code that has been submitted
    const newEmbeddedVideoCode = document.querySelector("#embedCode").value.trim();
    //Youtube embed code regex
    const ytEmbedLinkRegEx = /^<iframe.*src.*youtube.*embed.*<\/iframe>$/;
    
    // Verify the submitted embed code
    if(/^$/.test(newEmbeddedVideoCode))
    {
        alert("Please provide a YouTube embed code.")
    }
    else if( !getYouTubeVideoIdByUrl(newEmbeddedVideoCode) && !ytEmbedLinkRegEx.test(newEmbeddedVideoCode))
    {
        alert("Error: The input you submitted does not appear to be a YouTube embed code. Please paste a YouTube embed code into the form and resubmit. \nTo get the embed code for a YouTube video follow these steps: \n\n 1. Go to YouTube and find the video you would like to embed\n 2. Click on the Share button below the video\n 3. Select the Embed option that appears.\n 4.You will see a box with some code inside. This code is the embed code for the video. Copy that code.\n 5.Paste the code into the YouTube Embed Code input box on this website.");
    }
    //User supplied an embed code or youtube video link
    else
    {
        //Set variables for the new embeded video's source and title
        let newEmbeddedVideoSource = newEmbeddedVideoCode; //this will get reassigned later
        let newEmbeddedVideoTitle = "Embedded YouTube Video"; //this might get reassigned later

        //Check if the user supplied a proper embed code
        if(ytEmbedLinkRegEx.test(newEmbeddedVideoCode))
        {
            //Get just the source of the embeded video and save it in the newEmbeddedVideoSource variable
            const regGetEmbedSource = /src="([^"]*)"/;
            newEmbeddedVideoSource = newEmbeddedVideoCode.match(regGetEmbedSource);
            newEmbeddedVideoSource = newEmbeddedVideoSource[1];

            //Set the new title for the embedded youtube video
            const regGetEmbedTitle = /title="([^"]*)"/;
            newEmbeddedVideoTitle = newEmbeddedVideoCode.match(regGetEmbedTitle);
            newEmbeddedVideoTitle = newEmbeddedVideoTitle[1];
        }

        //Get the youtube video's id
        let videoID = getYouTubeVideoIdByUrl(newEmbeddedVideoSource);

        //Get a reference to the iframe element
        let player = this.previousElementSibling;
        //Split the iframe src attibute into parts
        let playerSrc = player.src.split("/");
        //Change the last part of the src to the new video id
        playerSrc[playerSrc.length-1] = videoID
        //Recombine the src url
        let newSrc = playerSrc.join("/");
        //Set the embedded video source and title attributes
        player.src = newSrc;
        player.title = newEmbeddedVideoTitle;
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