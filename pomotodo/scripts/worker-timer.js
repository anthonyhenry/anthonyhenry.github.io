// This handles incoming messages from the main thread
onmessage = function(e) {
    // Get variables that were passed through
    const END_TIME = e.data;

    // Run timer first time
    // workerTick(START_TIME, END_TIME, START_TIME);

    setInterval(function(){
        let timeRemaining = END_TIME.getTime() - new Date().getTime();
        
        const MINUTES_REMAINING = Math.floor(timeRemaining / 60000) % 60;
        let secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
        if(secondsRemaining < 10)
        {
            secondsRemaining = "0" + secondsRemaining;
        }

        // Post time remaining to main thread
        timeRemaining = [MINUTES_REMAINING, secondsRemaining, END_TIME, END_TIME.getTime()];
        postMessage(timeRemaining);

    }, 250);
};

// function workerTick(startTime, endTime, currentTime)
// {
//     timer = setTimeout(function(){
//         // Find out how much time is left
//         let timeRemaining = endTime.getTime() - currentTime.getTime();
//         const MINUTES_REMAINING = Math.floor(timeRemaining / 60000) % 60;
//         let secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
//         if(secondsRemaining < 10)
//         {
//             secondsRemaining = "0" + secondsRemaining;
//         }

//         // Post time remaining to main thread
//         timeRemaining = [MINUTES_REMAINING, secondsRemaining];
//         postMessage(timeRemaining);


//         workerTick(startTime, endTime, new Date());
//     }, 250) // Tick 4 times a second
// }