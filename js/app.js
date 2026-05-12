/* =========================
   GOOGLE MAPS INIT
========================= */

let map;
let directionsService;
let directionsRenderer;
let currentTripData = null;
let placesService;

function initMap() {

    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 5,
            styles: darkMapStyle
        }
    );

    placesService =
    new google.maps.places.PlacesService(map);

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


/* =========================
   STORE CURRENT TRIP
========================= */

currentTripData = {

    startLocation,

    destination,

    distanceKm,

    durationText,

    fuelNeeded,

    fuelCost,

    budget,

    createdAt: new Date()
};
generateFuelAlert(
    parseFloat(distanceKm),
    parseFloat(mileage)
);
generateFatigueAlert(
    totalDuration
);

loadRestaurants(
    result.routes[0],
    parseFloat(distanceKm)
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

/* =========================
   SAVE CLOUD TRIP
========================= */

const saveTripBtn =
    document.getElementById("saveTripBtn");


saveTripBtn.addEventListener("click", async () => {

    if (!currentTripData) {

        alert("Generate a trip first.");

        return;
    }

    await saveTripToCloud(currentTripData);

    alert("Trip saved successfully.");
});

/* =========================
   SMART FUEL ALERT
========================= */

function generateFuelAlert(
    distanceKm,
    mileage
) {

    const fuelAlertSection =
        document.getElementById(
            "fuelAlertSection"
        );

    const fuelAlertText =
        document.getElementById(
            "fuelAlertText"
        );

    const estimatedRange =
        mileage * 35;


    if (distanceKm > estimatedRange) {

        fuelAlertSection
            .classList
            .remove("hidden");

        fuelAlertText.textContent =

            `Your vehicle's estimated range is around ${estimatedRange.toFixed(0)} km.

A fuel refill stop may be required during this trip.

Consider planning a refuel break roughly midway through the route.`;

    } else {

        fuelAlertSection
            .classList
            .add("hidden");
    }
}

/* =========================
   FATIGUE ALERT
========================= */

function generateFatigueAlert(
    durationSeconds
) {

    const fatigueSection =
        document.getElementById(
            "fatigueAlertSection"
        );

    const fatigueText =
        document.getElementById(
            "fatigueAlertText"
        );

    const hours =
        durationSeconds / 3600;


    if (hours >= 8) {

        fatigueSection
            .classList
            .remove("hidden");

        fatigueText.textContent =

            "This is a long-duration drive. Multiple rest breaks are strongly recommended to reduce fatigue and maintain driving safety.";

    }

    else if (hours >= 4.5) {

        fatigueSection
            .classList
            .remove("hidden");

        fatigueText.textContent =

            "This trip may cause driver fatigue. Consider taking a short break during the journey.";
    }

    else {

        fatigueSection
            .classList
            .add("hidden");
    }
}


/* =========================
   SMART FOOD STOPS
========================= */

function loadRestaurants(
    route,
    distanceKm
) {

    const restaurantSection =
        document.getElementById(
            "restaurantSection"
        );

    const restaurantContainer =
        document.getElementById(
            "restaurantContainer"
        );

    restaurantContainer.innerHTML = "";


    const path =
        route.overview_path;


    /* =========================
       DETERMINE STOP COUNT
    ========================= */

    let stopCount = 1;

    if (distanceKm > 900) {

        stopCount = 5;
    }

    else if (distanceKm > 600) {

        stopCount = 4;
    }

    else if (distanceKm > 350) {

        stopCount = 3;
    }

    else if (distanceKm > 150) {

        stopCount = 2;
    }


    restaurantSection
        .classList
        .remove("hidden");


    /* =========================
       GENERATE CHECKPOINTS
    ========================= */

    const checkpoints = [];

    for (
        let i = 1;
        i <= stopCount;
        i++
    ) {

        const index = Math.floor(

            (i * path.length)
            / (stopCount + 1)
        );

        checkpoints.push({
            point: path[index],
            stopNumber: i
        });
    }


    /* =========================
       SEARCH EACH CHECKPOINT
    ========================= */

    checkpoints.forEach(

        ({ point, stopNumber }) => {

            const request = {

                location: point,

                radius: 4000,

                type: "restaurant"
            };


            placesService.nearbySearch(

                request,

                (results, status) => {

                    if (
                        status !==
                        google.maps.places.PlacesServiceStatus.OK
                    ) {

                        return;
                    }


                    const place =
                        results[0];

                    if (!place) return;


                    const lat =
                        place.geometry.location.lat();

                    const lng =
                        place.geometry.location.lng();

                    const mapsUrl =

                        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;


                    const card =
                        document.createElement("div");

                    card.classList.add(
                        "restaurant-card"
                    );


                    card.innerHTML = `

                        <h3>
                            🍴 Stop ${stopNumber}
                        </h3>

                        <p>
                            ${place.name}
                        </p>

                        <p>
                            ⭐ ${place.rating || "N/A"}
                        </p>

                        <a
                            href="${mapsUrl}"
                            target="_blank"
                            class="restaurant-link"
                        >
                            Navigate →
                        </a>
                    `;

                    card.style.order = stopNumber;

restaurantContainer
    .appendChild(card);
                }
            );
        }
    );
}

/* =========================
   DESTINATION ENGINE
========================= */

const recommendBtn =
    document.getElementById(
        "recommendBtn"
    );


recommendBtn.addEventListener(

    "click",

    () => {

        const budget =
            document.getElementById(
                "budgetSelect"
            ).value;

        const vibe =
            document.getElementById(
                "vibeSelect"
            ).value;

        const weather =
            document.getElementById(
                "weatherSelect"
            ).value;
        



const scoredDestinations =

    destinations.map(

        (destination) => {

            let score = 0;


            /* Budget Match */

            if (
                destination.budget === budget
            ) {

                score += 4;
            }


            /* Vibe Match */

            if (
                destination.vibes.includes(vibe)
            ) {

                score += 5;
            }


            /* Weather Match */

            if (
                destination.weather.includes(weather)
            ) {

                score += 3;
            }



            /* Safety Bonus */

            score +=
                destination.safetyScore / 10;


            return {

                ...destination,

                recommendationScore:
                    Number(score.toFixed(1))
            };
        }
    );

const sortedResults =

    scoredDestinations

        .sort(

            (a, b) =>

                b.recommendationScore
                -
                a.recommendationScore
        )

        .slice(0, 5);
        renderRecommendations(
    sortedResults
);


    }
);



function renderRecommendations(
    places,
    sourceCity
) {

    const container =
        document.getElementById(
            "recommendResults"
        );

    container.innerHTML = "";


    if (places.length === 0) {

        container.innerHTML = `

            <p>
                No matching destinations found.
            </p>
        `;

        return;
    }


    places.forEach((place) => {

        const card =
            document.createElement("div");

        card.classList.add(
            "restaurant-card"
        );


        card.innerHTML = `

            <h3>
                🌍 ${place.name}
            </h3>

            <p>
                📍 ${place.state}
            </p>

            <p>
                🎯 ${place.vibes.join(", ")}
            </p>

            <p>
                🌤 ${place.weather.join(", ")}
            </p>

            <p>
                💰 ${place.budget}
            </p>


            <p>
                🛡 Safety:
                ${place.safetyScore}/10
            </p>

            <p>
                ⭐ Match Score:
                ${place.recommendationScore}
            </p>
        `;

        container.appendChild(card);
    });
}