let intervalId;

self.onmessage = function(e) {
    const { command, endTime } = e.data;

    if (command === "start") {
        clearInterval(intervalId);

        intervalId = setInterval(() => {
            const now = new Date();
            if (now >= new Date(endTime)) {
                clearInterval(intervalId);
                self.postMessage({ type: "end" });
            } else {
                const remaining = new Date(endTime) - now;
                const minutes = Math.floor(remaining / 60000) % 60;
                const seconds = Math.floor(remaining / 1000) % 60;
                self.postMessage({
                    type: "tick",
                    minutes,
                    seconds: seconds < 10 ? "0" + seconds : seconds
                });
            }
        }, 1000);
    } else if (command === "stop") {
        clearInterval(intervalId);
    }
}  
