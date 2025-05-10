// This handles incoming messages from the main thread
onmessage = function(e) {
    
    let timeRemaining = e.data;
    timeRemaining = timeRemaining.split;
    
    let minutes = timeRemaining[0];
    let seconds = timeRemaining[1];

    // You can process the message here and then respond
    const response = minutes + ":" + seconds;
    postMessage(response);
};
