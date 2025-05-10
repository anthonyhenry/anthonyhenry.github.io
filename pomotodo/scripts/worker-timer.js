// For restarting the timer, consider passing the time in as seconds and doing some conversion

onmessage = function(e){
    //Worker function passed data is available via e.data
    console.log("Logging data...");
    console.log(e.data);
};

let workerStart = new Date();
let workerIntervalRef = null;

workerIntervalRef = setInterval(function(){
    let workerCurrent = new Date();
    let workerCount = +workerCurrent - +workerStart;
    
    let workerS = Math.floor((workerCount /  1000)) % 60;
    let workerM = Math.floor((workerCount / 60000)) % 60;

    workerM = 24 - workerM;
    workerS = 59 - workerS;

    workerResult = "Web Worker: " + workerM + ":" + workerS;

    postMessage(workerResult);

}, 1000);