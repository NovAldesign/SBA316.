let countdown; // This will hold our setInterval
let secondsLeft;
let isPaused = true;


//caching the main display
const display = document.getElementById('display');

//caching form 
const goalForm = document.getElementById('goal');

//caching all mode buttons at once
const modeButtons = document.querySelectorAll('.mode');

//caching history list
const logList = document.getElementById('log');

goalForm.addEventListener('submit', (event) => {
    // Stops the page from refreshing
    event.preventDefault();

    const goalInput = document.getElementById('study');
    const value = parseInt(goalInput.value);

    // DOM-based validation
    if (value <= 0 || value > 480) {
        alert("Please enter a realistic goal between 1 and 480 minutes.");
        goalInput.style.border = "2px solid red"; // Modify style
    } else {
        alert(`Goal set for ${value} minutes!`);
        goalInput.style.border = "none";

        const tagline = event.target.parentNode.querySelector('#concentrate');
        tagline.style.color = "#f1c40f";
    }
});

modeButtons.forEach((button) => {
    button.addEventListener('click', function () {
        // Get the time from the data attribute we set in HTML
        const time = this.getAttribute('data-time');

        // Requirement: Modify textContent
        display.textContent = `${time}:00`;

        // Requirement: Modify classList
        // This removes 'active' from all buttons and adds it to the clicked one
        modeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

// Caching control buttons
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function timer(seconds) {
    // Clear any existing timers before starting a new one
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    // BOM Method: setInterval (Requirement 12)
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            handleTimerComplete(); // Call our template function
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // Requirement 8: Modify textContent
    display.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

// Requirement 11: Register Event Listeners
startBtn.addEventListener('click', () => {
    const timeText = display.textContent.split(':');
    const totalSeconds = (parseInt(timeText[0]) * 60) + parseInt(timeText[1]);
    timer(totalSeconds);

    // Requirement 10: Modify Attribute (Disabling button while running)
    startBtn.disabled = true;
});

pauseBtn.addEventListener('click', () => {
    clearInterval(countdown);
    startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    display.textContent = '25:00';
    startBtn.disabled = false;
});

function handleTimerComplete() {
    // 1. Requirement 2: querySelector
    const template = document.querySelector('#session-template');

    // 2. Requirement 7: Use cloneNode (Requirement 5: createElement is handled by cloneNode internally)
    const clone = template.content.cloneNode(true);

    // 3. Requirement 3: Navigate parent-child-sibling
    // We navigate into the clone to find the span
    const sessionSpan = clone.querySelector('.session-type');
    sessionSpan.textContent = "Focus Round";

    // 4. Requirement 6: Use appendChild
    logList.appendChild(clone);

    // Requirement 12: BOM method (alert)
    alert("Great job! Time for a break.");

    // Requirement 9: Modify style/classList
    document.body.classList.add('break-mode');
}