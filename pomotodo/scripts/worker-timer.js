// This handles incoming messages from the main thread
onmessage = function(e) {
    // Get variable that was passed through
    const END_TIME = e.data;

    setInterval(function(){
        let timeRemaining = END_TIME.getTime() - new Date().getTime();
        
        const MINUTES_REMAINING = Math.floor(timeRemaining / 60000) % 60;
        let secondsRemaining = Math.floor(timeRemaining / 1000) % 60;
        if(secondsRemaining < 10)
        {
            secondsRemaining = "0" + secondsRemaining;
        }

        // Post time remaining to main thread
        timeRemaining = [MINUTES_REMAINING, secondsRemaining];
        postMessage(timeRemaining);

    }, 250); // Run this 4 times a second
};