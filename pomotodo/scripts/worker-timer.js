// This handles incoming messages from the main thread
onmessage = function(e) {
    // Get variables that were passed through
    const { START_TIME, END_TIME } = e.data;

    // Run timer first time
    workerTick(START_TIME, END_TIME, START_TIME, 0);
};

function workerTick(startTime, endTime, currentTime, delay)
{
    timer = setTimeout(function(){
        // Find out how much time is left
        let timeRemaining = endTime.getTime() - currentTime.getTime();
        const MINUTES_REMAINING = Math.floor(timeRemaining / 60000) % 60;
        let secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
        if(secondsRemaining < 10)
        {
            secondsRemaining = "0" + secondsRemaining;
        }
        // timeRemaining = [MINUTES_REMAINING, secondsRemaining];
        // postMessage(timeRemaining);

        

        // Set delay based on how many milliseconds until another second has passed since the start
        const CURRENT_TIME = new Date();
        const MILLISECONDS_PASSED = CURRENT_TIME.getTime() - startTime.getTime();
        let millisecondsToNextSecond = 1000 - (MILLISECONDS_PASSED % 1000);
        millisecondsToNextSecond = Math.min(millisecondsToNextSecond, 998);

        // Post time left to main thread
        timeRemaining = [MINUTES_REMAINING, secondsRemaining, MILLISECONDS_PASSED, millisecondsToNextSecond];
        postMessage(timeRemaining);

        workerTick(startTime, endTime, new Date(), millisecondsToNextSecond);

    }, delay)
}