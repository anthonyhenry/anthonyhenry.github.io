const minutesDisplay = document.querySelector("#pomodoroMinutes");
const secondsDisplay = document.querySelector("#pomodoroSeconds");

// let minutes = 25;
// let seconds = 0;


// setInterval( function(){
// 	seconds -= 1;

// 	//Decrement the minute every 60 seconds
// 	if(seconds < 0)
// 	{
// 		minutes -= 1;
// 		seconds = 59;
// 		minutesDisplay.innerText = minutes;
// 	}

// 	if(seconds < 10)
// 	{
// 		secondsDisplay.innerHTML = "0" + seconds;
// 	}
// 	else
// 	{
// 		secondsDisplay.innerHTML = seconds;
// 	}
// }, 1000);

//Initialize Variables
let activeTimer = "Pomodoro";
const pomodoroTimerLength = 25;
const shortBreakTimerLength = 5;
const longBreakTimerLength = 15;

//Grab all timer buttons
let timerButtons = document.querySelectorAll(".timer-button");

//Allow the user to switch between timers
for(let k = 0; k < timerButtons.length; k++)
{

	timerButtons[k].onclick = function(){

		let pomodoroDiv = this.parentNode.parentNode;

		//Check what the current active timer is and remove specific classes
		if(activeTimer == "Pomodoro")
		{
			pomodoroDiv.classList.remove("bg-danger");
			timerButtons[0].classList.remove("btn-outline-light");
			timerButtons[0].classList.add("btn-danger");
		}
		else if(activeTimer == "Short Break")
		{
			pomodoroDiv.classList.remove("bg-success");
			timerButtons[1].classList.remove("btn-outline-light");
			timerButtons[1].classList.add("btn-success");
		}
		else
		{
			pomodoroDiv.classList.remove("bg-primary");
			timerButtons[2].classList.remove("btn-outline-light");
			timerButtons[2].classList.add("btn-primary");
		}

		//Set the new active timer
		activeTimer = this.innerText;

		
		if(activeTimer == "Pomodoro")
		{
			//Adjust timer specific classes
			pomodoroDiv.classList.add("bg-danger");
			this.classList.remove("btn-danger");

			//Set the new timer
			minutesDisplay.innerText = pomodoroTimerLength;
		}
		else if(activeTimer == "Short Break")
		{
			pomodoroDiv.classList.add("bg-success");
			this.classList.remove("btn-success");

			minutesDisplay.innerText = "0" + shortBreakTimerLength;
		}
		else
		{
			pomodoroDiv.classList.add("bg-primary");
			this.classList.remove("btn-primary");

			minutesDisplay.innerText = longBreakTimerLength;
		}

		this.classList.add("btn-outline-light");
	}
}