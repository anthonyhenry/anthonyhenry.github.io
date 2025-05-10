// This handles incoming messages from the main thread
onmessage = function(e) {
    console.log("Worker received:", e.data);

    // You can process the message here and then respond
    const response = "Worker got: " + e.data;
    postMessage(response);
};
