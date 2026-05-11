/* =========================
   SAVE NOTES
========================= */

function saveNotes() {

    const notes = document.getElementById('tripNotes').value;

    localStorage.setItem('tripNotes', notes);

    alert("Notes saved successfully!");
}


/* =========================
   LOAD NOTES
========================= */

function loadNotes() {

    const savedNotes = localStorage.getItem('tripNotes');

    if (savedNotes) {
        document.getElementById('tripNotes').value = savedNotes;
    }
}


/* =========================
   SAVE RECENT TRIPS
========================= */

function saveRecentTrip(start, destination, distance) {

    let trips =
        JSON.parse(localStorage.getItem('recentTrips')) || [];

    const newTrip = {
        start,
        destination,
        distance
    };

    trips.unshift(newTrip);

    // Keep only latest 5
    trips = trips.slice(0, 5);

    localStorage.setItem(
        'recentTrips',
        JSON.stringify(trips)
    );

    displayRecentTrips();
}


/* =========================
   DISPLAY RECENT TRIPS
========================= */

function displayRecentTrips() {

    const recentTripsList =
        document.getElementById('recentTrips');

    let trips =
        JSON.parse(localStorage.getItem('recentTrips')) || [];

    recentTripsList.innerHTML = "";

    if (trips.length === 0) {

        recentTripsList.innerHTML =
            "<li>No trips planned yet.</li>";

        return;
    }

    trips.forEach((trip) => {

        const li = document.createElement('li');

        li.textContent =
            `${trip.start} → ${trip.destination} (${trip.distance})`;

        recentTripsList.appendChild(li);
    });
}


/* =========================
   CHECKLIST PERSISTENCE
========================= */

function saveChecklistState() {

    const checkboxes =
        document.querySelectorAll('.checklist input');

    const states = [];

    checkboxes.forEach((checkbox) => {
        states.push(checkbox.checked);
    });

    localStorage.setItem(
        'checklistStates',
        JSON.stringify(states)
    );
}


function loadChecklistState() {

    const savedStates =
        JSON.parse(localStorage.getItem('checklistStates'));

    if (!savedStates) return;

    const checkboxes =
        document.querySelectorAll('.checklist input');

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedStates[index];
    });
}