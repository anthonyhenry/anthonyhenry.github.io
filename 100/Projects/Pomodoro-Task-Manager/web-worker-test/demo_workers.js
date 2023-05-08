var i = 0;

function timedworkerCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedworkerCount()",1000);
}

timedworkerCount();



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
    
}, 1000/*1000*/);