// This handles incoming messages from the main thread
onmessage = function(e) {
    console.log(e.data);

    // const TIME_REMAINING = e.data;

    // let minutes = TIME_REMAINING[0];
    // let seconds = TIME_REMAINING[1];

    // setInterval(function(){
    //     if(seconds == "00")
    //     {
    //         minutes--;
    //         seconds = 59;
    //     }
    //     else
    //     {
    //         seconds--;

    //         if(seconds < 10)
    //         {
    //             seconds = "0" + seconds;
    //         }
    //     }

    //     const RESPONSE = minutes + ":" + seconds;
    //     postMessage(RESPONSE);
    // }, 1000);
};
