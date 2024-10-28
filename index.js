let eventCount = 0;

function addEvent() {
    eventCount++;

    // Create event container for each new event
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.setAttribute('id', `event-${eventCount}`);
    eventDiv.innerHTML = `
        <div>Event Number: ${eventCount}</div>
        <label>Event Name:</label>
        <input type="text" id="eventName-${eventCount}" placeholder="Enter event name">
        <label>Enter Time:</label>
        <input type="number" id="eventTime-${eventCount}" placeholder="Enter time in seconds" min="0">
        <div id="timer-${eventCount}" class="timer-display"></div>
        <div class="buttons">
          <button class="start" onclick="startCountdown(${eventCount})">Start</button>
          <button class="delete" onclick="deleteEvent(${eventCount})">Delete</button>
        </div>
      `;
    document.getElementById('eventContainer').appendChild(eventDiv);
}

function startCountdown(eventId) {
    const timeInput = document.getElementById(`eventTime-${eventId}`);
    let time = parseInt(timeInput.value);
    const eventName = document.getElementById(`eventName-${eventId}`).value || 'Unnamed Event';
    const timerDisplay = document.getElementById(`timer-${eventId}`);

    if (isNaN(time) || time <= 0) {
        alert('Please enter a valid time in seconds.');
        return;
    }

    // Disable the Start button to prevent multiple countdowns for the same event
    document.querySelector(`#event-${eventId} .start`).disabled = true;

    timerDisplay.innerHTML = `${eventName}: ${time} seconds remaining`;

    const interval = setInterval(() => {
        time--;
        timerDisplay.innerHTML = `${eventName}: ${time} seconds remaining`;

        if (time <= 0) {
            clearInterval(interval);
            timerDisplay.innerHTML = `${eventName}: Time's up!`;
            document.querySelector(`#event-${eventId} .start`).disabled = false;
        }
    }, 1000);
}

function deleteEvent(eventId) {
    const eventDiv = document.getElementById(`event-${eventId}`);
    if (eventDiv) {
        eventDiv.remove();
    }
}

// Attach click event to the Add Event button in the navbar
document.getElementById('add-event').addEventListener('click', addEvent);

// Create one default event when the page loads
window.onload = addEvent;
