// Normal YT link: https://www.youtube.com/watch?v=BK7alfdvVbw

document.querySelector("#embedVideoButton").onclick = function(){
    const INPUT_ELEMENT = document.querySelector("#embedVideoInput");
    const INPUT = INPUT_ELEMENT.value.trim();

    // Get an embed url from the user input
    const SRC_URL = getYouTubeEmbedURL(INPUT);

    // Valid input
    if(SRC_URL)
    {
        document.querySelector("#videoPlayer").src = SRC_URL;
    }
    // Invalid input 
    else
    {
        alert("invalid");
    }

    // Clear input
    INPUT_ELEMENT.value = "";
    // Block default behavior
    return false;
}

function getYouTubeEmbedURL(input)
{
    // Replace &amp; with & for pattern matching
    input = input.replace(/&amp;/g, "&");

    // Verify that input is a YouTube related link before continuing
    const YOUTUBE_LINK_PATTERN = /(?:youtube(?:-nocookie)?\.com|youtu\.be)/;
    const IS_YOUTUBE_LINK = YOUTUBE_LINK_PATTERN.test(input);
    if (!IS_YOUTUBE_LINK)
    {
        return null;
    }

    // Check if a YouTube embed code was submitted
    const IFRAME_SRC = input.match(/<iframe[^>]+src="([^"]+)"/i);
    if(IFRAME_SRC)
    {
        // Return extracted src attribute of iframe 
        return IFRAME_SRC[1];
    }

    // Check if a youtube embed link was submitted
    const EMBED_LINK_PATTERN = /^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/[^/?&]+/;
    if(EMBED_LINK_PATTERN.test(input))
    {
        alert("Youtube Embed link submitted")
        // console.log("EMBED_LINK: " + EMBED_LINK);
        return input;
        // Test this: https://www.youtube.com/embed/videoseries?si=EW1p2MakJpk6QfUN&amp;start=2726&amp;list=PLdSUTU0oamrzflitm5wLvphEMVbsZwt7L
    }


    // Get video id if there is one
    let videoID = input.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:(?:watch\?v=|v\/|embed\/|shorts\/|live\/))|youtu\.be\/)(?!videoseries)([a-zA-Z0-9_-]{11})/);
    if(videoID)
    {
        videoID = videoID[1];
    }

    // Get playlist id if there is one
    let playlistID = input.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if(playlistID)
    {
        playlistID = playlistID[1];
    }

    // Yotube video or playlist link submitted
    if(videoID || playlistID)
    {
        // Initialize youtube embed url
        let url = "https://www.youtube.com/embed/";

        // Input is a playlist with no specific video
        if(playlistID && !videoID)
        {
            // Add playlist to url
            url += "videoseries?list=" + playlistID;
        }
        // Input includes a video id
        else if(videoID)
        {
            // Add video id to url
            url += videoID;

            // Check if a playlist id was also included
            if(playlistID)
            {
                // Add playlist id to url
                url += "?list=" + playlistID;
            }            
        }

        // Check if a start time was included
        let startTime = input.match(/[?&](?:start|t)=([0-9]+)/);
        if(startTime)
        {
            startTime = startTime[1];

            // Add start time to url
            if(url.includes("?"))
            {
                url += "&"
            }
            else
            {
                url += "?"
            }
            url += "start=" + startTime;
        }

        return url;
    }
}

// console.log("Youtube URL")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://www.youtube.com/watch?v=2V8iGRw2ugk")
// console.log("====")

// console.log("Share link")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://www.youtube.com/live/2V8iGRw2ugk?si=pVlaqb7VdvI-TpDc")
// console.log("====")

// console.log("Share link")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://www.youtube.com/live/jfKfPfyJRdk?si=jbezE9tsswgAHClT")
// console.log("====")

// console.log("Share link")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://youtu.be/g8zst3r2cIc?si=3EFxeCwu-34L5HO2")
// console.log("====")

// console.log("Embed code")
// console.log("Expected output video id")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/2V8iGRw2ugk?si=Dw29q9zPy0mmwGa7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Embed link")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://www.youtube.com/embed/2V8iGRw2ugk?si=Dw29q9zPy0mmwGa7")
// console.log("====")

// console.log("Youtube URL with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL("https://www.youtube.com/watch?v=auDwPSu0sLI&t=2891s")
// console.log("====")

// console.log("Share link with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL("https://youtu.be/auDwPSu0sLI?si=zwvYLIDOv17M6-eF&t=2907")
// console.log("====")

// console.log("Embed code with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/rJhSZQdLARE?si=K4P-kF6Fa4nTPdGm&amp;start=11950" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Embed link with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL("https://www.youtube.com/embed/rJhSZQdLARE?si=K4P-kF6Fa4nTPdGm&amp;start=11950")
// console.log("====")

// /////////////////// Test this one
// console.log("URL of video in a playlist")
// console.log("Expected output video id and playlist id")
// getYouTubeEmbedURL("https://www.youtube.com/watch?v=QgaTQ5-XfMM&list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f")
// console.log("====")
// /////////////////// Test this one

// console.log("Share link of video in a playlist")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://youtu.be/QgaTQ5-XfMM?si=01twZZzUGNh6_o1U")
// console.log("====")

// console.log("Share link of video in a playlist")
// console.log("Expected output video id")
// getYouTubeEmbedURL("https://youtu.be/QgaTQ5-XfMM?si=tKDwLyUOmg4RtZlP")
// console.log("====")

// console.log("Embed code of a specific video in a playlist")
// console.log("Expected output video id")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/QgaTQ5-XfMM?si=Vfd1nofQ3tW79rs6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Embed code of a specific video in a playlist with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/QgaTQ5-XfMM?si=2mepoCwff9UaLfxT&amp;start=177" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Embed code of a specific video from a playlist view with start time")
// console.log("Expected output video id and start time")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/QgaTQ5-XfMM?si=bZitrAyhzOFCg3ln&amp;start=177" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Entire playlist share link")
// console.log("Expected output playlist id")
// getYouTubeEmbedURL('https://youtube.com/playlist?list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f&si=jl0I6QqrXlOnsM-i')
// console.log("====")

// console.log("Entire playlist embed code")
// console.log("Expected output playlist id")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=jl0I6QqrXlOnsM-i&amp;start=177&amp;list=PLXh3_htGAZzmLFV3zqZLchUbHI_llE_7f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")

// console.log("Entire playlist embed code")
// console.log("Expected output playlist id")
// getYouTubeEmbedURL('<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=2oKUb0NJpXE7xMEu&amp;list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
// console.log("====")


// Embed code
// Embed link

// function getYouTubeEmbedURL_C(input) {
//     let videoID = null;
//     let playlistID = null;
//     let startTime = null;

//     // Decode HTML entities (&amp; → &)
//     input = input.replace(/&amp;/g, "&");

//     // Extract video ID (ignore "videoseries")
//     const videoMatch = input.match(
//         /(?:https?:\/\/)?(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)|youtu\.be\/)(?!videoseries)([a-zA-Z0-9_-]{11})/
//     );
//     if (videoMatch) {
//         videoID = videoMatch[1];
//         console.log("videoID:", videoID);
//     }

//     // Extract playlist ID
//     const playlistMatch = input.match(/[?&]list=([a-zA-Z0-9_-]+)/);
//     if (playlistMatch) {
//         playlistID = playlistMatch[1];
//         console.log("playlistID:", playlistID);
//     }

//     // Extract start time (in seconds)
//     const startMatch = input.match(/[?&](?:start|t)=([0-9]+)/);
//     if (startMatch) {
//         startTime = startMatch[1];
//         console.log("startTime:", startTime);
//     }

//     // Only a playlist
//     if (playlistID && !videoID) {
//         let url = `https://www.youtube.com/embed/videoseries?list=${playlistID}`;
//         if (startTime) url += `&start=${startTime}`;
//         return url;
//     }

//     // Video with optional playlist
//     if (videoID) {
//         let url = `https://www.youtube.com/embed/${videoID}`;
//         const params = [];
//         if (playlistID) params.push(`list=${playlistID}`);
//         if (startTime) params.push(`start=${startTime}`);
//         if (params.length) url += `?${params.join('&')}`;
//         return url;
//     }

//     return null;
// }


// function getYouTubeEmbedURL(input)
// {
//     // Pattern that matches video id of any youtube video link
//     let videoID = input.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)|youtu\.be\/)(?!videoseries)([a-zA-Z0-9_-]{11})/);
//     if(videoID)
//     {
//         videoID = videoID[1];
//     }

//     // Pattern that matches playlist id of a youtube link
//     let playlistID = input.match(/[?&]list=([a-zA-Z0-9_-]+)/);
//     if(playlistID)
//     {
//         playlistID = playlistID[1];
//     }

//     // Input includes a playlist without a specific video
//     if(playlistID && !videoID)
//     {
//         console.log("playlistID: " + playlistID);
//         return "https://www.youtube.com/embed/videoseries?list=" + playlistID;
//     }
//     // Input includes a video id
//     else if(videoID)
//     {
//         console.log("videoID: " + videoID)
//         let url = "https://www.youtube.com/embed/" + videoID;

//         // Also includes a playlist
//         if(playlistID)
//         {
//             console.log("playlistID: " + playlistID);
//             url += "?list=" + playlistID;
//         }

//         // Check for time parameter
//         let startTime = input.match(/[?&](?:start|t)=([0-9]+)/);
//         if(startTime)
//         {
//             startTime = startTime[1];
//             console.log("startTime: " + startTime)
//             url += url.includes("?") ? "&start=" + startTime : "?start=" + startTime;
//         }

//         return url;
//     }

//     return null;
// }

// https://youtu.be/WOgQpjARYyc?si=n0RXYkNBWXxIFk_e&t=56
// src="https://www.youtube.com/embed/WOgQpjARYyc?si=n0RXYkNBWXxIFk_e&amp;start=56"


const inputs = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/BK7alfdvVbw?si=KIuvTV83kxRNGA6S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    'http://www.youtube-nocookie.com/embed/WOgQpjARYyc?rel=0',
    'https://www.youtube-nocookie.com/embed/WOgQpjARYyc?rel=0',
    'http://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0',
    'https://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0',
    'http://www.youtube.com/embed/lalOy8Mbfdc',
    'http://m.youtube.com/embed/lalOy8Mbfdc',
    'https://www.youtube.com/embed/lalOy8Mbfdc',
    'https://youtube.com/embed/lalOy8Mbfdc',
    'https://m.youtube.com/embed/lalOy8Mbfdc',
    'http://youtu.be/lalOy8Mbfdc?t=1s',
    'https://youtu.be/lalOy8Mbfdc?t=1',
    'https://youtu.be/lalOy8Mbfdc?t=1s',
    'http://www.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://m.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'https://www.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'https://youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'https://m.youtube.com/watch?v=lalOy8Mbfdc&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://www.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'http://youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'http://m.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'https://www.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'https://youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'https://m.youtube.com/watch?v=lalOy8Mbfdc&feature=youtu.be',
    'https://www.youtube.com/watch?v=lalOy8Mbfdc',
    'https://youtube.com/watch?v=lalOy8Mbfdc',
    'https://m.youtube.com/watch?v=lalOy8Mbfdc',
    'https://youtu.be/WOgQpjARYyc?si=S1juZXIFLLHOPuGq',
    'https://www.youtube.com/watch?v=WOgQpjARYyc&list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu',
    'https://youtube.com/playlist?list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu&si=jHxEoAO2jEIyD-IC',
    'https://www.youtube.com/playlist?list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu', // Playlist link
    'https://youtube.com/playlist?list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu&si=awQ41bBcjJheYyiv', // Playlist share link
    'https://www.youtube.com/watch?v=WOgQpjARYyc&list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu&index=6', // Playlist video link
    'https://youtu.be/WOgQpjARYyc?si=TQnZ5QvtGpIDOhwq', // Playlist video share link
    // Playlist video embed link
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WOgQpjARYyc?si=TQnZ5QvtGpIDOhwq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    //Playlist embed link
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=awQ41bBcjJheYyiv&amp;list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>', 
    'https://www.youtube.com/embed/videoseries?si=jHxEoAO2jEIyD-IC&amp;start=56&amp;list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=jHxEoAO2jEIyD-IC&amp;start=56&amp;list=PLFTG4_keyt5xWQnQu6TWQIG9i97EJ8JHu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WOgQpjARYyc?si=XYTFqJGjTQ8Gnyf8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WOgQpjARYyc?si=mu-nelx9DQlw5Uok&amp;start=54" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    'https://www.youtube.com/embed/WOgQpjARYyc?si=mu-nelx9DQlw5Uok&amp;start=54'
];

// playlist link
// playlist share link
// playlist embed link
// playlist video link
// playlist video share link
// playlist video embed link

// let i = 1;
// inputs.forEach(input => {
//     console.log(i + "/" + inputs.length)
//     i++;

//     const id = getYouTubeEmbedURL(input);
//     console.log("===")
// });
// console.log("done testing")




/*

Here's how to export a .txt file in JavaScript:
JavaScript

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Example usage:
const textToSave = "Hello, this is the content of the text file.";
const filename = "my_text_file.txt";

download(filename, textToSave);
This code snippet defines a download function that takes the desired filename and the text content as arguments. It creates a temporary <a> element, sets its href attribute to a data URL containing the text content, and sets the download attribute to the specified filename. The element is then programmatically clicked to trigger the download, and finally removed from the DOM. This approach works entirely client-side and does not require any server-side interaction.
*/

// Star wars video: https://www.youtube.com/watch?v=BK7alfdvVbw