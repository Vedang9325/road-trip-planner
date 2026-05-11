/* =========================
   GOOGLE MAPS INIT
========================= */

let map;
let directionsService;
let directionsRenderer;

function initMap() {

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 5,
            styles: darkMapStyle
        }
    );

    directionsService =
        new google.maps.DirectionsService();

    directionsRenderer =
        new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
                strokeColor: "#38bdf8",
                strokeWeight: 6
            }
        });

    directionsRenderer.setMap(map);

    initAutocomplete();
}

/* =========================
   MULTI STOP MANAGEMENT
========================= */

const addStopBtn =
    document.getElementById("addStopBtn");

const stopsContainer =
    document.getElementById("stopsContainer");

let stopCount = 0;

addStopBtn.addEventListener("click", () => {

    if (stopCount >= 5) {

        alert("Maximum 5 stops allowed.");

        return;
    }

    stopCount++;

    const stopDiv =
        document.createElement("div");

    stopDiv.classList.add("stop-input-group");

    stopDiv.innerHTML = `
        <input
            type="text"
            class="stop-input"
            placeholder="Stop ${stopCount}"
        >

        <button
            type="button"
            class="remove-stop-btn"
        >
            ✕
        </button>
    `;

    stopsContainer.appendChild(stopDiv);

    // Enable Google autocomplete
    const input =
        stopDiv.querySelector("input");

    new google.maps.places.Autocomplete(input);

    // Remove stop
    stopDiv
        .querySelector(".remove-stop-btn")
        .addEventListener("click", () => {

            stopDiv.remove();

            stopCount--;
        });
});

/* =========================
   AUTOCOMPLETE
========================= */

function initAutocomplete() {

    const startInput =
        document.getElementById("startLocation");

    const destinationInput =
        document.getElementById("destination");

    new google.maps.places.Autocomplete(startInput);

    new google.maps.places.Autocomplete(destinationInput);
}


/* =========================
   DARK MODE MAP STYLE
========================= */

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#1d2c4d" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#8ec3b9" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1a3646" }]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#4b6878" }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#64779e" }]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#4b6878" }]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#334e87" }]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{ "color": "#023e58" }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#283d6a" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#6f9ba5" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1d2c4d" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#023e58" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#3C7680" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#304a7d" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#98a5be" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1d2c4d" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#2c6675" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#255763" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#b0d5ce" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#023e58" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#98a5be" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1d2c4d" }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{ "color": "#283d6a" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{ "color": "#3a4762" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#0e1626" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#4e6d70" }]
  }
];



/* =========================
   FORMAT DURATION
========================= */

function formatDuration(seconds) {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
}


/* =========================
   LOAD STORAGE
========================= */

loadNotes();
displayRecentTrips();
loadChecklistState();


/* =========================
   SAVE NOTES
========================= */

document
    .getElementById("saveNotesBtn")
    .addEventListener("click", saveNotes);


/* =========================
   CHECKLIST EVENTS
========================= */

const checklistCheckboxes =
    document.querySelectorAll(".checklist input");

checklistCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        saveChecklistState
    );
});


/* =========================
   MAIN TRIP LOGIC
========================= */

const planTripBtn =
    document.getElementById("planTripBtn");

planTripBtn.addEventListener("click", async () => {

    try {

        showLoading();

        const startLocation =
            document.getElementById("startLocation")
            .value
            .trim();

        const destination =
            document.getElementById("destination")
            .value
            .trim();

        const mileage =
            parseFloat(
                document.getElementById("mileage").value
            );

        const fuelPrice =
            parseFloat(
                document.getElementById("fuelPrice").value
            );

        const budgetInput =
            document.getElementById("budget").value;

        const budget =
            budgetInput ? parseFloat(budgetInput) : null;


        if (
            !startLocation ||
            !destination ||
            !mileage ||
            !fuelPrice
        ) {

            alert("Please fill all required fields.");

            hideLoading();

            return;
        }

/* =========================
   COLLECT MULTI-STOPS
========================= */

const stopInputs =
    document.querySelectorAll(".stop-input");

const waypoints = [];

stopInputs.forEach((input) => {

    if (input.value.trim() !== "") {

        waypoints.push({
            location: input.value.trim(),
            stopover: true
        });
    }
});


/* =========================
   ROUTE REQUEST
========================= */

directionsService.route(
    {
        origin: startLocation,

        destination: destination,

        waypoints: waypoints,

        optimizeWaypoints: true,

        travelMode:
            google.maps.TravelMode.DRIVING
    },


            async (result, status) => {

                if (
                    status !== "OK"
                ) {

                    alert("Could not generate route.");

                    hideLoading();

                    return;
                }

                directionsRenderer.setDirections(result);

                const legs =
    result.routes[0].legs;

let totalDistance = 0;

let totalDuration = 0;

legs.forEach((leg) => {

    totalDistance += leg.distance.value;

    totalDuration += leg.duration.value;
});

const distanceKm =
    (totalDistance / 1000).toFixed(1);

const durationText =
    formatDuration(totalDuration);

                const fuelNeeded =
                    (
                        distanceKm / mileage
                    ).toFixed(2);

                const fuelCost =
                    (
                        fuelNeeded * fuelPrice
                    ).toFixed(2);

                let remainingBudget = null;

                if (budget !== null) {

                    remainingBudget =
                        (
                            budget - fuelCost
                        ).toFixed(2);
                }

                updateTripResults(
                    distanceKm,
                    durationText,
                    fuelNeeded,
                    fuelCost,
                    remainingBudget
                );

                saveRecentTrip(
                    startLocation,
                    destination,
                    `${distanceKm} km`
                );

                const weatherData =
                    await getWeather(destination);

                if (weatherData) {

                    updateWeatherUI(weatherData);
                }

                hideLoading();
            }
        );

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

        hideLoading();
    }
});


/* =========================
   START MAP
========================= */

window.onload = initMap;