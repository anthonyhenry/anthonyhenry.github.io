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
        const INVALID_YT_MODAL_ELEMENT = document.querySelector("#invalidYouTubeModal");
        const INVALID_YT_MODAL = new bootstrap.Modal(INVALID_YT_MODAL_ELEMENT);
        INVALID_YT_MODAL.show();
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
        // Check if input starts with http://
        if (/^http:\/\//i.test(input))
        {
            // Replace http:// with https://
            input = input.replace(/^http:\/\//i, 'https://');
        }

        return input;
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

    return null;
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

/*
const inputs = [
    '',
    'https://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0',
    'http://www.youtube.com/embed/lalOy8Mbfdc',
    '',
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
    '',
    '',
];*/
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

/*

Here's how to upload and read a JSON file using JavaScript:
HTML Structure: Create an input element of type "file" to allow users to select a file.
Code

<input type="file" id="jsonFile" accept=".json">
JavaScript Code: Add an event listener to the input element that triggers when a file is selected. Inside the event listener, use the FileReader API to read the file's content as text. Then, parse the text as JSON using JSON.parse().
JavaScript

const fileInput = document.getElementById('jsonFile');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        // Process the JSON data here
        console.log(jsonContent);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    reader.readAsText(file);
  }
});
This code snippet first gets the file selected by the user. If a file is selected, it creates a FileReader object. The onload event handler is defined to parse the file content as JSON when it's loaded. The readAsText method initiates the file reading process. Error handling is included in case the JSON parsing fails.


*/

// Star wars video: https://www.youtube.com/watch?v=BK7alfdvVbw



// TODO:
    // Add a little extra margin to the top of embed button