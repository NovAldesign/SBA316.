//caching the main display
const display = document.getElementById('display');

//caching form 
const goalForm = document.getElementById('goal');

//caching all mode buttons at once
const modeButtons = document.querySelectorAll('mode');

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
    }
});