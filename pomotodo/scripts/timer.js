//////////////////////////////////////////////////////////////////////////
//////////////////////////// Global Variables ////////////////////////////
//////////////////////////////////////////////////////////////////////////

const TIMER_BUTTONS = document.querySelectorAll(".timer-buttons"); // Pomodoro, Short Break, Long Break buttons
const CONTROL_BUTTONS = document.querySelectorAll(".timer-control-buttons"); // Start/Resume and Skip buttons
const COUNTDOWN_DISPLAY = document.querySelector("#countdown");

// Create a map for different timer data, timer buttons will be added later
const TIMERS = new Map([
    ["Pomodoro", {duration: 25, color: "danger", alarmSfx: sfx.pomodoroAlarm}],
    ["Short Break", {duration: 5, color: "success", alarmSfx: sfx.shortBreakAlarm}],
    ["Long Break", {duration: 15, color: "primary", alarmSfx: sfx.longBreakAlarm},]
]);

// State Machine for managing timer
const TIMER_STATE_MACHINE = {
    /*
    currentState: {
        event: nextState
    }
    */
    idle: {
        start: "running",
    },
    running: {
        pause: "paused",
        skip: "idle",
        end: "idle",
    },
    paused: {
        start: "running",
        skip: "idle",
    }
};

// Timer variables
let currentState = "idle";
let currentTimer = "Pomodoro"; 
let pomodoroCountSinceLongBreak = 0;
let timer = null;
let workerTimer;

// Skip modal
const SKIP_TIMER_MODAL_ELEMENT = document.querySelector("#skipTimerModal");
const SKIP_TIMER_MODAL = new bootstrap.Modal(SKIP_TIMER_MODAL_ELEMENT);
let modalConfirmCallback = null;

///////////////////////////////////////////////////////////////////////////
////////////////////////// Timer Button Handlers //////////////////////////
///////////////////////////////////////////////////////////////////////////

for(const btn of TIMER_BUTTONS)
{
    // Add button objects to TIMERS map
    const TIMERS_KEY = btn.dataset.timer;
    if(TIMERS.has(TIMERS_KEY))
    {
        TIMERS.get(TIMERS_KEY).button = btn;
    }

    // Allow users to change the active timer
    btn.onclick = function(){
        const NEW_TIMER = this.dataset.timer;

        // Only do something if a new timer was selected
        if(NEW_TIMER != currentTimer)
        {
            skipTimer(NEW_TIMER);
        }
    }
}

// Start/Resume and Skip buttons
for(const button of CONTROL_BUTTONS)
{
    button.onclick = function(){
        // Skip button was pressed
        if(this.dataset.button == "Skip")
        {
            skipTimer(getNextTimer());
        }
        // Start/Resume botton pressed
        else
        {
            // Check if desktop notifications are supported and haven't been allowed yet
            if("Notification" in window && Notification.permission === "default")
            {
                // Request permission to send notifcations
                Notification.requestPermission().then((permission) => {
                    if(permission === "granted")
                    {
                        new Notification("Thank you for allowing notifications!");
                    }
                });
            }

            switch(currentState)
            {
                case "idle":
                    if(currentTimer == "Pomodoro")
                    {
                        pomodoroCountSinceLongBreak++;
                    }
                    if(currentTimer == "Long Break")
                    {
                        pomodoroCountSinceLongBreak = 0;
                    }
                case "paused":
                    currentState = changeState("start");
                    changeStartButton("Pause");
                    startTimer();
                    break;
                case "running":
                    // Change timer to paused state
                    currentState = changeState("pause");

                    // Change button
                    changeStartButton("Resume");

                    // Stop timer
                    stopTimer();
                    break;
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////// Timer Controls /////////////////////////////
///////////////////////////////////////////////////////////////////////////

function skipTimer(newTimer)
{
    if(currentState == "idle")
    {
        changeCurrentTimer(newTimer);
    }
    else
    {
        if(currentState == "running")
        {
            stopTimer();
        }

        // Set current timer text for modal
        const MODAL_CURRENT_TIMER_HEADER_SPAN = document.querySelector("#modalHeaderCurrentTimer");
        MODAL_CURRENT_TIMER_HEADER_SPAN.innerText = currentTimer;
        const MODAL_CURRENT_TIMER_BODY_SPAN = document.querySelector("#modalBodyCurrentTimer");
        MODAL_CURRENT_TIMER_BODY_SPAN.innerText = currentTimer;
        const CURRENT_TIMER_COLOR_CLASS = getColorClass("text", TIMERS.get(currentTimer).color);
        MODAL_CURRENT_TIMER_BODY_SPAN.classList.add(CURRENT_TIMER_COLOR_CLASS);

        // Show modal
        SKIP_TIMER_MODAL.show();

        // Set callback function (this needs to go here so newTimer can be passed)
        modalConfirmCallback = function () {
            MODAL_CURRENT_TIMER_BODY_SPAN.classList.remove(CURRENT_TIMER_COLOR_CLASS);
            changeCurrentTimer(newTimer);
            currentState = changeState("skip");
            changeStartButton("Start");
        };
    }
}

function timerComplete()
{
    TIMERS.get(currentTimer).alarmSfx.play();

    if("Notification" in window && Notification.permission === "granted")
    {
        new Notification(currentTimer + " timer complete!");
    }

    // Change to idle state
    currentState = changeState("end");
    // Change current timer
    changeCurrentTimer(getNextTimer());
    // Change start button text 
    changeStartButton("Start");
}

function startTimer()
{
    // Get the amount of time currently displayed in timer
    let timeRemaining = COUNTDOWN_DISPLAY.innerText.split(":");
    const MINUTES_REMAINING = timeRemaining[0];
    const SECONDS_REMAINING = timeRemaining[1];

    // Find out how many milliseconds remain
    const MILLISECONDS_REMAINING = (MINUTES_REMAINING * 60 * 1000) + (SECONDS_REMAINING * 1000);

    // Find out when the timer should stop
    const START_TIME = new Date();
    const END_TIME = new Date(START_TIME.getTime() + MILLISECONDS_REMAINING);

    // Check if the browser supports web workers
    if (typeof(Worker) !== "undefined")
    {
        // Make sure web worker is not currently active
        if (typeof(workerTimer) === "undefined")
        {
            workerTimer = new Worker("scripts/worker-timer.js");

            // Pass end time to worker
            workerTimer.postMessage({
                START_TIME,
                END_TIME
            });

            workerTimer.onmessage = function(event){
                checkIfDateShouldBeUpdated(START_TIME, END_TIME);
                console.log("I'm using a web worker!!!!");
                console.log("Worker response: " + event.data);
                updateTimerCountdown(event.data[0], event.data[1]);
                // console.log(event.data[2]);
                // console.log(event.data[3]);
            }
        }
    }
    // Web workers not supported
    else
    {
        console.log("I'm using setTimeout!!!!");
        
        // First timer of session so give warning
        if(sessionStorage.getItem("browserIncompatibilityWarningGiven") != "true") //=== null)
        {
            // Show incompatability modal
            const BROWSER_INCOMPATIBILITY_MODAL_ELEMENT = document.querySelector("#browserIncompatibilityModal");
            const BROWSER_INCOMPATIBILITY_MODAL = new bootstrap.Modal(BROWSER_INCOMPATIBILITY_MODAL_ELEMENT);
            BROWSER_INCOMPATIBILITY_MODAL.show();

            // Start timer when incompatability modal is closed
            BROWSER_INCOMPATIBILITY_MODAL_ELEMENT.addEventListener("hidden.bs.modal", () => {
                tick(START_TIME, END_TIME, START_TIME, 0);
            });

            sessionStorage.setItem("browserIncompatibilityWarningGiven", "true");
        }
        else
        {
            // Run timer
            tick(START_TIME, END_TIME, START_TIME, 0);
        }
    }
}

function tick(startTime, endTime, currentTime, delay)
{
    timer = setTimeout(function(){
        // Timer finished
        if(currentTime >= endTime)
        {
            console.log("============================")
            console.log("Start time: " + startTime);
            console.log("Expected end time: " + endTime);
            console.log("Actual end time: " + currentTime);

            timerComplete();
        }
        // Timer still running
        else
        {
            // Update countdown
            const TIME_REMAINING = endTime.getTime() - currentTime.getTime();
            const MINUTES_REMAINING = Math.floor(TIME_REMAINING / 60000) % 60;
            let secondsRemaining = Math.floor(TIME_REMAINING / 1000) % 60;
            if(secondsRemaining < 10)
            {
                secondsRemaining = "0" + secondsRemaining;
            }

            updateTimerCountdown(MINUTES_REMAINING, secondsRemaining);

            // 1 minute remaining notification
            if(MINUTES_REMAINING == 1 && secondsRemaining == "00")
            {
                timerNotification(MINUTES_REMAINING);
            }

            // Set delay based on how many milliseconds until another second has passed since the start
            const CURRENT_TIME = new Date();
            const MILLISECONDS_PASSED = CURRENT_TIME.getTime() - startTime.getTime();
            // console.log("Milliseconds passed: " + MILLISECONDS_PASSED);
            const MILLISECONDS_TO_NEXT_SECOND = 1000 - (MILLISECONDS_PASSED % 1000);
            // console.log("Milliseconds to next second: " + MILLISECONDS_TO_NEXT_SECOND);

            tick(startTime, endTime, CURRENT_TIME, MILLISECONDS_TO_NEXT_SECOND);
        }
    }, delay);
}

function stopTimer()
{
    // Web worker supported
    if (typeof(Worker) !== "undefined")
    {
        // Check if web worker is currently active
        if (typeof(workerTimer) !== "undefined")
        {
            workerTimer.terminate();
            workerTimer = undefined;
        }
    }
    // Web worker not supported
    else
    {
        clearTimeout(timer);
    }
}

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Modal Functions /////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Modal confirm button pressed
document.querySelector("#confirmSkip").onclick = function(){
    SKIP_TIMER_MODAL.hide();

    if(typeof modalConfirmCallback === "function")
    {
        modalConfirmCallback();
        modalConfirmCallback = null;
    }
}

// Modal closed
SKIP_TIMER_MODAL_ELEMENT.addEventListener("hidden.bs.modal", () => {
    // Continue timer if it was running before the modal spawned
    if(currentState == "running")
    {
        startTimer();
    }
});


///////////////////////////////////////////////////////////////////////////
//////////////////////////// Helper Functions ////////////////////////////
///////////////////////////////////////////////////////////////////////////

function changeCurrentTimer(newTimer)
{
    // Get a reference to the timer div for changing bg color later
    const TIMER_DIV = document.querySelector("#timer");
    const POMODORO_INFO_BUTTON = document.querySelector("#pomodoroInfoButton");

    // Set up new timer
    const NEW_TIMER = TIMERS.get(newTimer);
    TIMER_DIV.classList.add(getColorClass("bg", NEW_TIMER.color));
    POMODORO_INFO_BUTTON.classList.add(getColorClass("text", NEW_TIMER.color))
    NEW_TIMER.button.classList.add("btn-outline-light");
    updateTimerCountdown(NEW_TIMER.duration, "00");

    // Clear previous timer
    const PREVIOUS_TIMER = TIMERS.get(currentTimer);
    PREVIOUS_TIMER.button.classList.remove("btn-outline-light");
    TIMER_DIV.classList.remove(getColorClass("bg", PREVIOUS_TIMER.color));
    POMODORO_INFO_BUTTON.classList.remove(getColorClass("text", PREVIOUS_TIMER.color))

    // Update current timer
    currentTimer = newTimer;
}

function changeStartButton(text)
{
    const START_BUTTON = document.querySelector("#startButton");
    START_BUTTON.innerText = text;

    // Pause button
    if(text == "Pause")
    {
        START_BUTTON.classList.add("btn-secondary")
        START_BUTTON.classList.remove("btn-light");    
    }
    // Start/Resume button
    else
    {
        START_BUTTON.classList.add("btn-light");
        START_BUTTON.classList.remove("btn-secondary");
    }
}

function changeState(event)
{
    // Get the next state
    const NEXT_STATE = TIMER_STATE_MACHINE[currentState]?.[event];
    return NEXT_STATE;
}

function getNextTimer()
{
    if(currentTimer == "Pomodoro")
    {
        return (pomodoroCountSinceLongBreak >= 4) ? "Long Break" : "Short Break";
    }
    else
    {
        return "Pomodoro";
    }
}

function getColorClass(classPrefix, color)
{
    return classPrefix + "-" + color;
}

function updateTimerCountdown(minutes, seconds)
{
    COUNTDOWN_DISPLAY.innerText = minutes + ":" + seconds;
}

// 
// TODO: Test this, then add it to non-web worker and test there as well
// 
function checkIfDateShouldBeUpdated(startTime, endTime)
{
    console.log("I'm checking if the date has changed!!!")
    const START_DATE = startTime.getDate();
    const END_DATE = endTime.getDate()

    if(START_DATE < END_DATE && new Date().getDate() != END_DATE)
    {
        maybeUpdateDate();
    }
}

function timerNotification(minutesRemaining)
{
    if("Notification" in window && Notification.permission === "granted")
    {
        new Notification(minutesRemaining + " minute remaining on your " + currentTimer + " timer.");
    }
}

// To Do
    // Pause timer while incompatability modal is open
    // Might not need hide() for skip timer modal
    // Move web worker check into a Try/Catch so that timer works locally?

// Features
    // Local Storage
    // Desktop Notifications
    // Howler.js
    // Web worker