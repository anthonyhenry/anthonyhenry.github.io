const minutesDisplay = document.querySelector("#pomodoroMinutes");
const secondsDisplay = document.querySelector("#pomodoroSeconds");

let minutes = 25;
let seconds = 0;


setInterval( function(){
	seconds -= 1;

	//Decrement the minute every 60 seconds
	if(seconds < 0)
	{
		minutes -= 1;
		seconds = 59;
		minutesDisplay.innerText = minutes;
	}

	if(seconds < 10)
	{
		secondsDisplay.innerHTML = "0" + seconds;
	}
	else
	{
		secondsDisplay.innerHTML = seconds;
	}
}, 1000);

