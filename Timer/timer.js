document.addEventListener('DOMContentLoaded', function () {
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');
    
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    
    let intervalId = null;

    function toTimeValue(value) {
      return value.toString().padStart(2, '0');
    }

    function getTimeInSeconds() {
      const hours = parseInt(hoursInput.value, 10);
      const minutes = parseInt(minutesInput.value, 10);
      const seconds = parseInt(secondsInput.value, 10);
      return (hours * 3600) + (minutes * 60) + seconds;
    }

    function updateTimeInputs(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      hoursInput.value = toTimeValue(hours);
      minutesInput.value = toTimeValue(minutes);
      secondsInput.value = toTimeValue(seconds);
    }

    function updateTimer() {
        let totalSeconds = getTimeInSeconds();
      
        if (totalSeconds <= 0) {
          pauseTimer();
          
          hoursInput.value = minutesInput.value = secondsInput.value = '00';
         
          alert("Time's up!");
          return;
        }
      
        totalSeconds--;
        updateTimeInputs(totalSeconds);
      }      
      

    function startTimer() {
      if (intervalId === null && getTimeInSeconds() > 0) {
        intervalId = setInterval(updateTimer, 1000);
      }
    }

    function pauseTimer() {
      clearInterval(intervalId);
      intervalId = null;
    }

    function resetTimer() {
      pauseTimer();
      hoursInput.value = minutesInput.value = secondsInput.value = '00';
    }

    // Function to set a two-digit format for timer values
    function formatTimeInput(event) {
        let value = event.target.value;
        value = value.replace(/\D/g, ''); // Remove non-digits
        value = value.substring(0, 2); // Limit to 2 digits
        event.target.value = toTimeValue(value); // Pad with leading zeros if necessary
    }
  
    // Add the input formatting function to each timer input field
    hoursInput.addEventListener('input', formatTimeInput);
    minutesInput.addEventListener('input', formatTimeInput);
    secondsInput.addEventListener('input', formatTimeInput);

    // Add event listeners for the buttons
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
});


