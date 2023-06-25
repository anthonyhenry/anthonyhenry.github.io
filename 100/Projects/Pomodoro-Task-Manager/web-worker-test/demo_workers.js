// var i = 0;

// function timedworkerCount() {
//   i = i + 1;
//   postMessage(i);
//   setTimeout("timedworkerCount()",1000);
// }

// timedworkerCount();


// self.addEventListener("message", function(e) {
//     // the passed-in data is available via e.data
//     console.log("Logging data...");
//     console.log(e.data);
// }, false);

//Initialize a variable for holding the time that the timer starts at
let timerStart;

onmessage = function(e){
    console.log("Logging data...");
    console.log(e.data);
    timerStart = e.data;
};

timerStart = timerStart.split(":");
let minutesStart = timerStart[0];
let secondsStart = timerStart[1];

let workerStart = new Date();
let workerIntervalRef = null;

//Start timer
workerIntervalRef = setInterval(function(){
    let workerCurrent = new Date();
    let workerCount = +workerCurrent - +workerStart;
    
    let workerS = Math.floor((workerCount /  1000)) % 60;
    let workerM = Math.floor((workerCount / 60000)) % 60;

    workerM = minutesStart - workerM;
    workerS = secondsStart - workerS;

    workerResult = workerM + ":" + workerS;

    postMessage(workerResult);

}, 1000/*1000*/);