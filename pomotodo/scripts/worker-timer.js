onmessage = function(e){
    //Worker function passed data is available via e.data
    console.log("Logging data...");
    console.log(e.data);
};