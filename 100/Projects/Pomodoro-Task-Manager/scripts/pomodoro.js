//Initialize Variables
let minutesDisplay = document.querySelector("#timerMinutes");
let secondsDisplay = document.querySelector("#timerSeconds");
const pomodoroTimerLength = 25;
const shortBreakTimerLength = 5;
const longBreakTimerLength = 15;
const pomodoroTimer = document.querySelector("#pomodoroTimer");
const shortBreakTimer = document.querySelector("#shortBreakTimer");
const longBreakTimer = document.querySelector("#longBreakTimer");
let activeTimer = pomodoroTimer;

//Grab all timer buttons
let timerButtons = document.querySelectorAll(".timer-button");

//Allow the user to switch between timers
for(let i = 0; i < timerButtons.length; i++)
{
	timerButtons[i].onclick = function(){
		//Check if the active timer was clicked
		if(activeTimer == this)
		{
			//don't do anything
			return;
		}
		//Check if a timer is running
		if(timerInterval != null /*&& activeTimer != this*/)
		{
			//Ask the user if they really wish to proceed
			if(confirm("A " + activeTimer.innerText + " timer is currently running.\nAre you sure you want to switch?"))
			{
				//Stop the timer and proceed
				stopCurrentTimer();
			}
			else
			{
				//Do not proceed
				return;
			}
		}

		//Change the active timer;
		activeTimer = changeActiveTimer(activeTimer, this);
	}
}

function changeActiveTimer(previousTimer, newTimer){
	//Reset thee format of all the timer control buttons
	let timerControlButtons = document.querySelectorAll(".timer-control-button");

	for(let i = 0; i < timerControlButtons.length; i++)
	{
		timerControlButtons[i].classList.remove("btn-outline-light")

		if(timerControlButtons[i].innerText == "Start")
		{
			timerControlButtons[i].classList.add("btn-light");
		}
		else if(timerControlButtons[i].innerText == "Stop")
		{
			timerControlButtons[i].classList.add("btn-secondary");
		}
		else
		{
			timerControlButtons[i].classList.add("btn-dark");
		}
	}

	//Reset the format of the previous timer button
	previousTimer.classList.remove("btn-outline-light");

	let pomodoroDiv = previousTimer.parentNode.parentNode;

	if(previousTimer == pomodoroTimer)
	{
		pomodoroDiv.classList.remove("bg-danger");
		previousTimer.classList.add("btn-danger");
	}
	else if(previousTimer == shortBreakTimer)
	{
		pomodoroDiv.classList.remove("bg-success");
		previousTimer.classList.add("btn-success");
	}
	else
	{
		pomodoroDiv.classList.remove("bg-primary");
		previousTimer.classList.add("btn-primary");
	}

	//Format for the new active timer
	if(newTimer == pomodoroTimer)
	{
		//Adjust timer specific classes
		pomodoroDiv.classList.add("bg-danger");
		newTimer.classList.remove("btn-danger");

		//Set the new timer
		minutesDisplay.innerText = pomodoroTimerLength;
	}
	else if(newTimer == shortBreakTimer)
	{
		pomodoroDiv.classList.add("bg-success");
		newTimer.classList.remove("btn-success");

		minutesDisplay.innerText = "0" + shortBreakTimerLength;
	}
	else
	{
		pomodoroDiv.classList.add("bg-primary");
		newTimer.classList.remove("btn-primary");

		minutesDisplay.innerText = longBreakTimerLength;
	}

	//Give the new timer a white outline
	newTimer.classList.add("btn-outline-light");

	//Set the seconds to 00 if not already
	secondsDisplay.innerText = "00";

	//Set the active timer variable to be the new timer
	return newTimer;
}

//Initialize a variable for the timer interval later
let timerInterval = null;

//Constant variables for the timer control buttons
const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const skipButton = document.querySelector("#skipButton");

//Starting the clock
startButton.onclick = function(){
	//Make sure the timer is not already running
	if(timerInterval == null)
	{
		//Change control buttons formatting
		newActiveControlButton(this);

		//Get the current minute and seconds values
		let minutes = minutesDisplay.innerText;
		let seconds = secondsDisplay.innerText;

		//Start an interval to run code every second
		timerInterval = setInterval(function(){
			//Check if the timer is over
			if(minutes == 0 && seconds == 0)
			{
				stopCurrentTimer();
			}
			else
			{
				//Decrement the seconds
				seconds -= 1;

				//Decrement the minute every 60 seconds
				if(seconds < 0)
				{
					minutes -= 1;
					seconds = 59;

					//Keep the ## formatting for minutes
					if(minutes < 10)
					{
						minutesDisplay.innerText = "0" + minutes;	
					}
					else
					{
						minutesDisplay.innerText = minutes;
					}
				}

				//Keep the ## formatting for seconds
				if(seconds < 10)
				{
					secondsDisplay.innerText = "0" + seconds;
				}
				else
				{
					secondsDisplay.innerText = seconds;
				}
			}
		}, 1000);
	}
}

//Stop button pressed
stopButton.onclick = function(){
	stopCurrentTimer();
	newActiveControlButton(this);
}

//Skip button pressed
skipButton.onclick = function(){
	stopCurrentTimer();
	newActiveControlButton(this);	
}

//Function for changing the format of the control buttons
function newActiveControlButton(button){
	//Chcek which button was clicked
	if(button.innerText == "Start")
	{
		//Adjust classes for each button
		document.querySelector("#stopButton").classList.remove("btn-outline-light");
		document.querySelector("#stopButton").classList.add("btn-secondary");
		document.querySelector("#skipButton").classList.remove("btn-outline-light");
		document.querySelector("#skipButton").classList.add("btn-dark");

		button.classList.remove("btn-light");
	}
	else if(button.innerText == "Stop")
	{
		startButton.classList.remove("btn-outline-light");
		startButton.classList.add("btn-light");
		document.querySelector("#skipButton").classList.remove("btn-outline-light");
		document.querySelector("#skipButton").classList.add("btn-dark");

		button.classList.remove("btn-secondary");
	}
	else
	{
		startButton.classList.remove("btn-outline-light");
		startButton.classList.add("btn-light");
		document.querySelector("#stopButton").classList.remove("btn-outline-light");;
		document.querySelector("#stopButton").classList.add("btn-secondary");

		button.classList.remove("btn-dark");
	}
	
	//Give the active button a white outline
	button.classList.add("btn-outline-light");
}

//Function for stopping the timer
function stopCurrentTimer(){
	clearInterval(timerInterval);
	timerInterval = null;
}