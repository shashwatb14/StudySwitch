let sliderSwitch = document.getElementById("slider-switch");
let darkSlider = document.getElementById("dark-slider-switch");
let pomodoroStyle = document.getElementById("pomodoro");
let todoList = document.getElementById("todo-list");
let pomdoroTitle = document.getElementById("pomodoro-timer");
let todoTitle = document.getElementById("todo");
let r = document.querySelector(":root");



sliderSwitch.addEventListener('click', function handleClick() {
    if (sliderSwitch.checked) {
        todoList.classList.add("opac-down");
        todoTitle.classList.add("opac-down");
        todoList.classList.remove("opac-up");
        todoTitle.classList.remove("opac-up");
        pomodoroStyle.classList.add("opac-up");
        pomdoroTitle.classList.add("opac-up");
        pomodoroStyle.classList.remove("opac-down");
        pomdoroTitle.classList.remove("opac-down");
    } else {
        todoList.classList.add("opac-up");
        todoTitle.classList.add("opac-up");
        todoList.classList.remove("opac-down");
        todoTitle.classList.remove("opac-down");
        pomodoroStyle.classList.add("opac-down");
        pomdoroTitle.classList.add("opac-down");
        pomodoroStyle.classList.remove("opac-up");
        pomdoroTitle.classList.remove("opac-up");
        document.getElementById("task-input").focus();
    }
});

darkSlider.addEventListener('click', function handleClick() {
    if (darkSlider.checked) {
        document.getElementById("image").src = "assets/img-dark.png";
        r.style.setProperty('--dark', '#fff7f2');
        r.style.setProperty('--light', '#37312b');
        r.style.setProperty('--darker', '#9c8b80');
    } else {
        r.style.setProperty('--light', '#fff7f2');
        r.style.setProperty('--dark', '#37312b');
        r.style.setProperty('--darker', '#201e1c');
        document.getElementById("image").src = "assets/img.png";
    }
});

document.addEventListener('DOMContentLoaded', function() {

    if (sliderSwitch.checked) {
        todoList.classList.add("opac-down");
        todoTitle.classList.add("opac-down");
        todoList.classList.remove("opac-up");
        todoTitle.classList.remove("opac-up");
        pomodoroStyle.classList.add("opac-up");
        pomdoroTitle.classList.add("opac-up");
        pomodoroStyle.classList.remove("opac-down");
        pomdoroTitle.classList.remove("opac-down");
    } else {
        todoList.classList.add("opac-up");
        todoTitle.classList.add("opac-up");
        todoList.classList.remove("opac-down");
        todoTitle.classList.remove("opac-down");
        pomodoroStyle.classList.add("opac-down");
        pomdoroTitle.classList.add("opac-down");
        pomodoroStyle.classList.remove("opac-up");
        pomdoroTitle.classList.remove("opac-up");
        document.getElementById("task-input").focus();
    }

    if (darkSlider.checked) {
        document.getElementById("image").src = "assets/img-dark.png";
        r.style.setProperty('--dark', '#fff7f2');
        r.style.setProperty('--light', '#37312b');
        r.style.setProperty('--darker', '#9c8b80');
    } else {
        r.style.setProperty('--light', '#fff7f2');
        r.style.setProperty('--dark', '#37312b');
        r.style.setProperty('--darker', '#201e1c');
        document.getElementById("image").src = "assets/img.png";
    }


    const pomodoroDuration = 25;
    const breakDuration = 5;
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    let interval;
    let isPaused = false;
    let pomodoroCount = 1;
    let time = pomodoroDuration * 60;
    timerDisplay.innerHTML = formatTime(time);

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ":" + seconds;
    }
	const alarm = new Audio('assets/alarm.mp3');

    chrome.storage.sync.get(['time'], function(result) {
        time = result.time || time;
        timerDisplay.innerHTML = formatTime(time);
    });

    function startTimer() {
        
        if (!isPaused) {
            if (pomodoroCount === 0) {
                time = pomodoroDuration * 60;
            } else if (pomodoroCount % 2 === 0) {
                time = breakDuration * 60;
            } else {
                time = pomodoroDuration * 60;
            }
            pomodoroCount++;
        } else {
            isPaused = false;
        }
        interval = setInterval(() => {
            if (time > 0) {
                time--;
                timerDisplay.innerHTML = formatTime(time);
                chrome.storage.sync.set({time: time}, function() {
                    console.log('Time is stored in chrome.storage.sync');
                });
            } else {
                clearInterval(interval);
				alarm.play();
                /*if (pomodoroCount % 2 === 0) {
                	alert("Break Completed!");
                } else {
                	alert("Pomodoro Completed!");
                }*/
                startTimer();
            }
        }, 1000);
    }

    pauseButton.addEventListener('click', function() {
        clearInterval(interval);
        interval = null;
        pauseButton.setAttribute("disabled", true);
        startButton.removeAttribute("disabled");
        resetButton.removeAttribute("disabled");
        isPaused = true;
    });

    resetButton.addEventListener('click', function() {
        clearInterval(interval);
        interval = null;
        time = pomodoroDuration * 60;
        timerDisplay.innerHTML = formatTime(time);
        pomodoroCount = 0;
        resetButton.setAttribute("disabled", true);
        pauseButton.setAttribute("disabled", true);
        startButton.removeAttribute("disabled");
    });

    startButton.addEventListener('click', function() {
        if (!interval) {
            startTimer();
            startButton.setAttribute("disabled", true);
            pauseButton.removeAttribute("disabled");
            resetButton.setAttribute("disabled", true);
        }
    });

    pauseButton.addEventListener('click', function() {
        clearInterval(interval);
        interval = null;
        pauseButton.setAttribute("disabled", true);
        startButton.removeAttribute("disabled");
        resetButton.removeAttribute("disabled");
    });

    resetButton.addEventListener('click', function() {
        clearInterval(interval);
        interval = null;
        time = pomodoroDuration * 60;
        chrome.storage.sync.remove('time');
        timerDisplay.innerHTML = formatTime(time);
        pomodoroCount = 0;
        resetButton.setAttribute("disabled", true);
        pauseButton.setAttribute("disabled", true);
        startButton.removeAttribute("disabled");
    });
});