//Initialize Variables
let minutesDisplay = document.querySelector("#timerMinutes"); //span element for minutes
let secondsDisplay = document.querySelector("#timerSeconds"); //span element for seconds
const pomodoroTimerLength = 25; //pomodoro = 25 minutes
const shortBreakTimerLength = 5; //short break = 5 minutes
const longBreakTimerLength = 15; //long break = 15 minutes
const pomodoroTimer = document.querySelector("#pomodoroTimer"); //pomodoro timer element
const shortBreakTimer = document.querySelector("#shortBreakTimer"); //short break timer element
const longBreakTimer = document.querySelector("#longBreakTimer"); //long break timer element
let activeTimer = pomodoroTimer; //on start active timer is pomodoro
let pomodorosSinceLastLongBreak = 0; //variable that counts the number of pomodoros completed since the last long break

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
				//Stop the timer
				stopCurrentTimer();
			}
			else
			{
				//Do not proceed
				return;
			}
		}

		//Change the active timer
		console.log("User opted to switch to " + this.innerText + " timer.")
		changeActiveTimer(this);
	}
}

function changeActiveTimer(newTimer){
	//Grab all the control buttons
	let timerControlButtons = document.querySelectorAll(".timer-control-button");

	//Reset the format of each of the control buttons
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

	//Reset the format of the previous timer button and the background color
	activeTimer.classList.remove("btn-outline-light");

	let pomodoroDiv = activeTimer.parentNode.parentNode;

	if(activeTimer == pomodoroTimer)
	{
		//remove the timer specific background color
		pomodoroDiv.classList.remove("bg-danger");
		//Give the previous timer back it's specific color
		activeTimer.classList.add("btn-danger");
	}
	else if(activeTimer == shortBreakTimer)
	{
		pomodoroDiv.classList.remove("bg-success");
		activeTimer.classList.add("btn-success");
	}
	else
	{
		pomodoroDiv.classList.remove("bg-primary");
		activeTimer.classList.add("btn-primary");
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
	activeTimer = newTimer;
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

		//Check if a pomodoro has been started
		if(activeTimer == pomodoroTimer && minutes == 25)
		{
			//Increment the number of pomodoros needed for a long break
			pomodorosSinceLastLongBreak += 1;
			console.log(pomodorosSinceLastLongBreak);
		}
		//Check if a long break has been started
		else if(activeTimer == longBreakTimer)
		{
			//Reset the count since last long break
			pomodorosSinceLastLongBreak = 0;
			console.log(pomodorosSinceLastLongBreak);
		}

		console.log("Beginning " + activeTimer.innerText);
		//Start an interval to run code every second
		timerInterval = setInterval(function(){
			//Check if the timer is over
			if(minutes == 0 && seconds == 0)
			{
				if(activeTimer.innerText == "Pomodoro")
				{
					sfx.pomodoroAlarm.play();
				}
				else if(activeTimer.innerText == "Short Break")
				{
					sfx.shortAlarm.play();
				}
				else
				{
					sfx.longAlarm.play();
				}
				//Stop the timer
				stopCurrentTimer();
				//Set up the next timer
				changeActiveTimer(getNextTimer());
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

function getNextTimer(){
	//Check if we just finished a pomodoro
	if(activeTimer == pomodoroTimer)
	{
		//Check if it's time for a long break
		if(pomodorosSinceLastLongBreak >= 4)
		{
			//Queue up a long break
			return longBreakTimer;
		}
		else
		{
			//Queue up a normal short break
			return shortBreakTimer;
		}
	}
	else
	{
		//Always do a pomodoro coming back from a break
		return pomodoroTimer;
	}
}

//Stop button pressed
stopButton.onclick = function(){
	stopCurrentTimer();
	newActiveControlButton(this);
}

//Skip button pressed
skipButton.onclick = function(){
	//Verify that the user wants to skip the current timer
	if(confirm("Are you sure you want to skip this " + activeTimer.innerText + " timer?"))
	{
		stopCurrentTimer();
		console.log("User opted to skip " + activeTimer.innerText + " timer.")
		changeActiveTimer(getNextTimer());
	}
}

//Function for changing the format of the control buttons
function newActiveControlButton(button){
	//Start Button was clicked
	if(button.innerText == "Start")
	{
		//Adjust classes for each button
		stopButton.classList.remove("btn-outline-light");
		stopButton.classList.add("btn-secondary");

		button.classList.remove("btn-light");
	}
	//Stop Button was clicked
	else//if(button.innerText == "Stop")
	{
		startButton.classList.remove("btn-outline-light");
		startButton.classList.add("btn-light");

		button.classList.remove("btn-secondary");
	}

	//Give the active button a white outline
	button.classList.add("btn-outline-light");
}

//Function for stopping the timer
function stopCurrentTimer(){
	clearInterval(timerInterval);
	timerInterval = null;
}