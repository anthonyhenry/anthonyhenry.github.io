// This handles incoming messages from the main thread
onmessage = function(e) {
    console.log(e.data);

    // You can process the message here and then respond
    // const response = minutes + ":" + seconds;
    // postMessage(response);
};
