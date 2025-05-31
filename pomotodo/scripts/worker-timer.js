// This handles incoming messages from the main thread
onmessage = function(e) {
    console.log(e.data);

    const END_TIME = e.data;

    let delay = 0;
    timer = setTimeout(function(){
        console.log("I also ticked!!!")
    }, delay)
    workerTick(delay);

    interval = setInterval(() => {
        // Get current time
        const CURRENT_TIME = new Date();

        // Timer finished
        if(CURRENT_TIME >= END_TIME)
        {
            postMessage("done");
            clearInterval(interval);
        }
        // Timer still running
        else
        {
            let timeRemaining = END_TIME.getTime() - CURRENT_TIME.getTime();
            const MINUTES_REMAINING = Math.floor(timeRemaining / 60000) % 60;
            let secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
            if(secondsRemaining < 10)
            {
                secondsRemaining = "0" + secondsRemaining;
            }

            timeRemaining = MINUTES_REMAINING + ":" + secondsRemaining;
            console.log(timeRemaining);

            postMessage(timeRemaining);
        }
    }, 1000);

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

function workerTick(delay)
{
    timer = setTimeout(function(){
        console.log("I ticked!")
    }, delay)
}