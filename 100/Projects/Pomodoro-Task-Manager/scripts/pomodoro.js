//Initialize Variables
let minutesDisplay = document.querySelector("#timerMinutes");
let secondsDisplay = document.querySelector("#timerSeconds");
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
		//Check if the active timer was clicked
		if(activeTimer == this.innerText)
		{
			//don't do anything
			return;
		}
		//Check if a timer is running
		if(timerInterval != null /*&& activeTimer != this.innerText*/)
		{
			//Ask the user if they really wish to proceed
			if(confirm("A " + activeTimer + " timer is currently running.\nAre you sure you want to switch?"))
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

		//Reset the formatting of the control buttons
		newActiveControlButton();

		//Get pomodoro div for background color changing
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

		//set the seconds to 00 if not already
		secondsDisplay.innerText = "00";

		//Give the active timer a white outline
		this.classList.add("btn-outline-light");
	}
}

//Initialize a variable for the timer interval later
let timerInterval = null;

//Constant variables for the timer control buttons
const startButton = document.querySelector("#startButton");

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
document.querySelector("#stopButton").onclick = function(){
	stopCurrentTimer();
	newActiveControlButton(this);
}

//Skip button pressed
document.querySelector("#skipButton").onclick = function(){
	stopCurrentTimer();
	newActiveControlButton(this);	
}

//Function for changing the format of the control buttons
function newActiveControlButton(button){
	//No button clicked, switched via change of activeTimer
	if(button === undefined)
	{
		document.querySelector("#startButton").classList.remove("btn-outline-light");
		document.querySelector("#startButton").classList.add("btn-light");
		document.querySelector("#stopButton").classList.remove("btn-outline-light");;
		document.querySelector("#stopButton").classList.add("btn-secondary");
		document.querySelector("#skipButton").classList.remove("btn-outline-light");
		document.querySelector("#skipButton").classList.add("btn-dark");
		return;
	}
	//Chcek which button was clicked
	else if(button.innerText == "Start")
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
		document.querySelector("#startButton").classList.remove("btn-outline-light");
		document.querySelector("#startButton").classList.add("btn-light");
		document.querySelector("#skipButton").classList.remove("btn-outline-light");
		document.querySelector("#skipButton").classList.add("btn-dark");

		button.classList.remove("btn-secondary");
	}
	else
	{
		document.querySelector("#startButton").classList.remove("btn-outline-light");
		document.querySelector("#startButton").classList.add("btn-light");
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