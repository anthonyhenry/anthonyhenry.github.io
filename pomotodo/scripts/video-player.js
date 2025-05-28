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

const inputs = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/BK7alfdvVbw?si=KIuvTV83kxRNGA6S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    'http://www.youtube-nocookie.com/embed/WOgQpjARYyc?rel=0', // DID NOT WORK
    'https://www.youtube-nocookie.com/embed/WOgQpjARYyc?rel=0', // Works
    'http://www.youtube-nocookie.com/embed/lalOy8Mbfdc?rel=0', // Does not work
    'http://www.youtube.com/embed/lalOy8Mbfdc', // Does not work
];
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