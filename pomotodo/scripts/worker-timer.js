// This handles incoming messages from the main thread
onmessage = function(e) {
    console.log(e.data);

    const TIME_REMAINING = e.data;

    let minutes = TIME_REMAINING[0];
    let seconds = TIME_REMAINING[1];

    setInterval(function(){
        seconds--;
        const RESPONSE = minutes + ":" + seconds;
        postMessage(RESPONSE);
    }), 1000;
};
