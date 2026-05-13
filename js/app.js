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
document
    .getElementById(
        "useCurrentLocationBtn"
    )
    .addEventListener(

        "click",

        () => {

            fillCurrentLocation(
                "startLocation"
            );
        }
    );

document
    .getElementById(
        "useCurrentDestinationBtn"
    )
    .addEventListener(

        "click",

        () => {

            fillCurrentLocation(
                "destination"
            );
        }
    );
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

function fillCurrentLocation(
    inputId
) {

    if (!navigator.geolocation) {

        alert(
            "Geolocation not supported."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            console.log(position);

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;

            const geocoder =
                new google.maps.Geocoder();

            geocoder.geocode(

                {
                    location: {
                        lat,
                        lng
                    }
                },

                (results, status) => {

                    console.log(results);

                    if (
                        status !== "OK"
                    ) {

                        alert(
                            "Could not fetch address."
                        );

                        return;
                    }

                    document.getElementById(
                        inputId
                    ).value =
                        results[0]
                            .formatted_address;
                }
            );
        },

        (error) => {

            console.error(error);

            alert(
                "Location access failed."
            );
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
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
   TRIP SCHEDULE HELPERS
========================= */

const mealWindows = [
    {
        id: "breakfast",
        label: "Breakfast",
        startHour: 7,
        startMinute: 0,
        targetHour: 8,
        targetMinute: 30,
        endHour: 10,
        endMinute: 0,
        pauseMinutes: 35,
        keyword: "breakfast restaurant cafe"
    },
    {
        id: "lunch",
        label: "Lunch",
        startHour: 12,
        startMinute: 0,
        targetHour: 13,
        targetMinute: 0,
        endHour: 14,
        endMinute: 30,
        pauseMinutes: 50,
        keyword: "restaurant dhaba lunch"
    },
    {
        id: "tea",
        label: "Tea Break",
        startHour: 16,
        startMinute: 0,
        targetHour: 17,
        targetMinute: 0,
        endHour: 18,
        endMinute: 30,
        pauseMinutes: 25,
        keyword: "tea cafe snacks"
    },
    {
        id: "dinner",
        label: "Dinner",
        startHour: 20,
        startMinute: 0,
        targetHour: 20,
        targetMinute: 45,
        endHour: 22,
        endMinute: 0,
        pauseMinutes: 50,
        keyword: "restaurant dhaba dinner"
    }
];

function parseDepartureTime(timeValue) {

    const fallbackTime =
        getCurrentTimeInputValue();

    const parts =
        (timeValue || fallbackTime).split(":");

    const hours =
        parseInt(parts[0], 10);

    const minutes =
        parseInt(parts[1], 10);

    const departure =
        new Date();

    departure.setHours(
        Number.isNaN(hours) ? 6 : hours,
        Number.isNaN(minutes) ? 0 : minutes,
        0,
        0
    );

    return departure;
}

function getCurrentTimeInputValue() {

    const now =
        new Date();

    const hours =
        String(now.getHours())
            .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    return `${hours}:${minutes}`;
}

function formatClock(date) {

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}

function formatEta(
    departureAt,
    arrivalAt
) {

    const etaTime =
        formatClock(arrivalAt);

    const departureDay =
        new Date(departureAt);

    departureDay.setHours(0, 0, 0, 0);

    const arrivalDay =
        new Date(arrivalAt);

    arrivalDay.setHours(0, 0, 0, 0);

    const dayOffset =
        Math.round(
            (arrivalDay - departureDay) /
            86400000
        );

    if (dayOffset <= 0) {

        return etaTime;
    }

    return `${etaTime} (+${dayOffset} day${dayOffset === 1 ? "" : "s"})`;
}

function getDayKey(date) {

    return [
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ].join("-");
}

function makeTimeForDay(baseDate, hour, minute) {

    const date =
        new Date(baseDate);

    date.setHours(hour, minute, 0, 0);

    return date;
}

function getRouteSteps(route) {

    return route.legs.flatMap(
        leg => leg.steps
    );
}

function getRoutePointAtDriveSeconds(
    steps,
    driveSeconds
) {

    let coveredSeconds = 0;

    for (const step of steps) {

        coveredSeconds +=
            step.duration.value;

        if (
            coveredSeconds >= driveSeconds
        ) {

            return step.end_location;
        }
    }

    return steps.length
        ? steps[steps.length - 1].end_location
        : null;
}

function getNextNightHalt(clock) {

    const halt =
        new Date(clock);

    halt.setHours(22, 0, 0, 0);

    if (clock >= halt) {

        halt.setDate(
            halt.getDate() + 1
        );
    }

    return halt;
}

function getResumeTime(haltTime) {

    const resume =
        new Date(haltTime);

    resume.setDate(
        resume.getDate() + 1
    );

    resume.setHours(6, 0, 0, 0);

    return resume;
}

function getMealTargetBetween(
    startClock,
    endClock,
    consumedMeals
) {

    const cursor =
        new Date(startClock);

    cursor.setHours(0, 0, 0, 0);

    while (cursor <= endClock) {

        for (const meal of mealWindows) {

            const target =
                makeTimeForDay(
                    cursor,
                    meal.targetHour,
                    meal.targetMinute
                );

            const mealKey =
                `${getDayKey(target)}-${meal.id}`;

            if (
                target > startClock &&
                target <= endClock &&
                !consumedMeals.has(mealKey)
            ) {

                return {
                    meal,
                    target,
                    mealKey
                };
            }
        }

        cursor.setDate(
            cursor.getDate() + 1
        );
    }

    return null;
}

function getImmediateMeal(
    clock,
    consumedMeals
) {

    for (const meal of mealWindows) {

        const windowStart =
            makeTimeForDay(
                clock,
                meal.startHour,
                meal.startMinute
            );

        const windowEnd =
            makeTimeForDay(
                clock,
                meal.endHour,
                meal.endMinute
            );

        const mealKey =
            `${getDayKey(clock)}-${meal.id}`;

        if (
            clock >= windowStart &&
            clock <= windowEnd &&
            !consumedMeals.has(mealKey)
        ) {

            return {
                meal,
                target: new Date(clock),
                mealKey
            };
        }
    }

    return null;
}

function buildTripSchedule(
    route,
    departureTimeValue
) {

    const steps =
        getRouteSteps(route);

    const totalDriveSeconds =
        route.legs.reduce(
            (sum, leg) =>
                sum + leg.duration.value,
            0
        );

    let driveSeconds = 0;

    let clock =
        parseDepartureTime(departureTimeValue);

    const consumedMeals =
        new Set();

    const mealStops = [];

    const overnightHalts = [];

    const startPoint =
        route.legs[0].start_location;

    let currentPoint =
        startPoint;

    const immediateMeal =
        getImmediateMeal(
            clock,
            consumedMeals
        );

    if (immediateMeal) {

        consumedMeals.add(
            immediateMeal.mealKey
        );

        mealStops.push({
            meal: immediateMeal.meal,
            time: new Date(clock),
            point: currentPoint,
            driveSeconds
        });

        clock = new Date(
            clock.getTime() +
            immediateMeal.meal.pauseMinutes * 60000
        );
    }

    while (
        driveSeconds < totalDriveSeconds
    ) {

        if (
            clock.getHours() >= 22 ||
            clock.getHours() < 6
        ) {

            const haltStart =
                new Date(clock);

            const resumeAt =
                clock.getHours() < 6
                    ? makeTimeForDay(clock, 6, 0)
                    : getResumeTime(clock);

            overnightHalts.push({
                time: haltStart,
                resumeAt,
                point: currentPoint,
                driveSeconds
            });

            clock =
                new Date(resumeAt);

            continue;
        }

        const remainingDriveSeconds =
            totalDriveSeconds - driveSeconds;

        const nightHalt =
            getNextNightHalt(clock);

        const driveUntilNight =
            Math.max(
                0,
                Math.floor(
                    (nightHalt - clock) / 1000
                )
            );

        const segmentDriveSeconds =
            Math.min(
                remainingDriveSeconds,
                driveUntilNight
            );

        const segmentEndClock =
            new Date(
                clock.getTime() +
                segmentDriveSeconds * 1000
            );

        const nextMeal =
            getMealTargetBetween(
                clock,
                segmentEndClock,
                consumedMeals
            );

        if (nextMeal) {

            const secondsUntilMeal =
                Math.floor(
                    (nextMeal.target - clock) / 1000
                );

            driveSeconds +=
                secondsUntilMeal;

            clock =
                new Date(nextMeal.target);

            currentPoint =
                getRoutePointAtDriveSeconds(
                    steps,
                    driveSeconds
                );

            consumedMeals.add(
                nextMeal.mealKey
            );

            mealStops.push({
                meal: nextMeal.meal,
                time: new Date(clock),
                point: currentPoint,
                driveSeconds
            });

            clock =
                new Date(
                    clock.getTime() +
                    nextMeal.meal.pauseMinutes * 60000
                );

            continue;
        }

        driveSeconds +=
            segmentDriveSeconds;

        currentPoint =
            getRoutePointAtDriveSeconds(
                steps,
                driveSeconds
            );

        clock =
            new Date(segmentEndClock);

        if (
            driveSeconds < totalDriveSeconds &&
            clock.getTime() === nightHalt.getTime()
        ) {

            overnightHalts.push({
                time: new Date(clock),
                resumeAt: getResumeTime(clock),
                point: currentPoint,
                driveSeconds
            });

            clock =
                getResumeTime(clock);
        }
    }

    return {
        departureAt: parseDepartureTime(departureTimeValue),
        arrivalAt: clock,
        mealStops,
        overnightHalts
    };
}

function getCityFromPoint(
    point,
    callback
) {

    const geocoder =
        new google.maps.Geocoder();

    geocoder.geocode(
        {
            location: point
        },
        (results, status) => {

            if (status !== "OK") {

                callback("");

                return;
            }

            if (
                !results ||
                !results.length
            ) {

                callback("");

                return;
            }

            const cityResult =
                results.find(result =>
                    result.types.includes("locality")
                )
                ||
                results.find(result =>
                    result.types.includes(
                        "administrative_area_level_2"
                    )
                )
                ||
                results[0];

            callback(
                cityResult
                    ? cityResult.formatted_address
                    : ""
            );
        }
    );
}

function renderOvernightHalt(
    tripSchedule
) {

    const haltContainer =
        document.getElementById(
            "halt-recommendation-container"
        );

    haltContainer.innerHTML = "";

    if (
        !tripSchedule.overnightHalts.length
    ) {

        return;
    }

    const halt =
        tripSchedule.overnightHalts[0];

    const hotelRequest = {
        location: halt.point,
        radius: 12000,
        keyword: "hotel",
        type: "lodging"
    };

    placesService.nearbySearch(
        hotelRequest,
        (results, status) => {

            if (
                status !==
                google.maps.places.PlacesServiceStatus.OK
            ) {

                haltContainer.innerHTML = `

                    <div class="halt-card">

                        <h2>
                            Overnight Halt
                        </h2>

                        <p>
                            Plan to stop around ${formatClock(halt.time)} and resume at ${formatClock(halt.resumeAt)}.
                        </p>

                        <p>
                            No suitable hotels found near this route segment.
                        </p>

                    </div>
                `;

                return;
            }

            const filteredHotels =
                results.filter(hotel =>
                    !hotel.rating ||
                    hotel.rating >= 3.8
                );

            const hotel =
                filteredHotels[0] ||
                results[0];

            if (!hotel) {

                return;
            }

            const hotelLat =
                hotel.geometry.location.lat();

            const hotelLng =
                hotel.geometry.location.lng();

            const mapsUrl =
                `https://www.google.com/maps/search/?api=1&query=${hotelLat},${hotelLng}`;

            haltContainer.innerHTML = `

                <div class="halt-card">

                    <h2>
                        Recommended Overnight Halt
                    </h2>

                    <p>
                        Stop: ${formatClock(halt.time)}
                    </p>

                    <p>
                        Resume: ${formatClock(halt.resumeAt)}
                    </p>

                    <p>
                        ${hotel.vicinity || "On the selected route"}
                    </p>

                    <a
                        href="${mapsUrl}"
                        target="_blank"
                        class="hotel-link"
                    >
                        ${hotel.name}
                    </a>

                    <p>
                        Rating: ${hotel.rating || "N/A"}
                    </p>

                </div>
            `;
        }
    );
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

        const departureTime =
            document.getElementById(
                "departureTime"
            ).value || getCurrentTimeInputValue();


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
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
},

async (result, status) => {


    if (status !== "OK") {

        document.getElementById(
    "route-comparison-container"
).innerHTML = `

<div class="error-card">

    <h3>
        ⚠ Route Generation Failed
    </h3>

    <p>
        Please verify locations and try again.
    </p>

</div>
`;

        hideLoading();

        return;
    }

    const routes = result.routes;

    const parsedRoutes = routes.map((route, index) => {

        const leg = route.legs[0];

return {
    id: index,
    label: index === 0 ? "Fastest" : `Alternative ${index}`,
    overviewPath: route.overview_path,

    distanceKm: Math.round(leg.distance.value / 1000),

    durationMin: Math.round(leg.duration.value / 60),

    durationText: leg.duration.text,

    fuelNeeded: (
        Math.round(leg.distance.value / 1000) / mileage
    ).toFixed(1),

    fuelCost: (
        (
            Math.round(leg.distance.value / 1000) / mileage
        ) * fuelPrice
    ).toFixed(0),

    summary: route.summary
};
    });


const tripSchedule =
    buildTripSchedule(
        routes[0],
        departureTime
    );

let coveredDistance = 0;

let haltPoint = null;

if (
    tripSchedule.overnightHalts.length
) {

    haltPoint =
        tripSchedule.overnightHalts[0].point;
}

const totalRouteDistance =
    routes[0].legs.reduce(
        (sum, leg) =>
            sum + leg.distance.value,
        0
    );

const targetDistance =
    totalRouteDistance * 0.45;

for (const leg of routes[0].legs) {

    for (const step of leg.steps) {

        coveredDistance +=
            step.distance.value;

        if (
            !haltPoint &&
            coveredDistance >= targetDistance
        ) {

            haltPoint =
                step.end_location;

            break;
        }
    }

    if (haltPoint) {
        break;
    }
}

/* fallback */

if (!haltPoint) {

    haltPoint =
        routes[0]
            .legs[0]
            .end_location;
}

document.getElementById(
    "halt-recommendation-container"
).innerHTML = "";

if (
    tripSchedule.overnightHalts.length
) {

const hotelRequest = {

    location: haltPoint,

    radius: 12000,

    keyword: "hotel",

    type: "lodging"
};

placesService.nearbySearch(

    hotelRequest,

    (results, status) => {

        if (
            status !==
            google.maps.places.PlacesServiceStatus.OK
        ) {

            console.error(
                "Hotel search failed"
            );

            document.getElementById(
                "halt-recommendation-container"
            ).innerHTML = `

                <div class="halt-card">

                    <h2>
                        Overnight Halt
                    </h2>

                    <p>
                        Stop: ${formatClock(tripSchedule.overnightHalts[0].time)}
                    </p>

                    <p>
                        Resume: ${formatClock(tripSchedule.overnightHalts[0].resumeAt)}
                    </p>

                    <p>
                        Search for hotels near this route point.
                    </p>

                </div>
            `;

            return;
        }

        const filteredHotels =
            results.filter(hotel =>

                hotel.rating >= 4
            );

        if (
            filteredHotels.length === 0
        ) {

            document.getElementById(
                "halt-recommendation-container"
            ).innerHTML = `

                <div class="halt-card">

                    <h2>
                        Overnight Halt
                    </h2>

                    <p>
                        Stop: ${formatClock(tripSchedule.overnightHalts[0].time)}
                    </p>

                    <p>
                        Resume: ${formatClock(tripSchedule.overnightHalts[0].resumeAt)}
                    </p>

                    <p>
                        No suitable hotels found near this route segment.
                    </p>

                </div>
            `;

            return;
        }

        if (
    filteredHotels.length === 0
) {

    document.getElementById(
        "halt-recommendation-container"
    ).innerHTML = `

        <div class="halt-card">

            <h2>
                🌙 Overnight Halt
            </h2>

            <p>
                No suitable hotels found near this route segment.
            </p>

        </div>
    `;

    return;
}

const hotel =
    filteredHotels[0];
        const hotelLat =
            hotel.geometry.location.lat();

        const hotelLng =
            hotel.geometry.location.lng();

        const mapsUrl =
`https://www.google.com/maps/search/?api=1&query=${hotelLat},${hotelLng}`;

document.getElementById(
    "halt-recommendation-container"
).innerHTML = `

<div class="halt-card">

<h2>
🌙 Recommended Overnight Halt
</h2>

<p>
Stop: ${formatClock(tripSchedule.overnightHalts[0].time)}
</p>

<p>
Resume: ${formatClock(tripSchedule.overnightHalts[0].resumeAt)}
</p>

<p>
📍 ${hotel.vicinity}
</p>

<a
href="${mapsUrl}"
target="_blank"
class="hotel-link"
>
🏨 ${hotel.name}
</a>

<p>
⭐ ${hotel.rating || "N/A"}
</p>

</div>
`;
    }
);
}
const fastestRoute =
    parsedRoutes.reduce((prev, current) =>
        prev.durationMin < current.durationMin
            ? prev
            : current
    );

const shortestRoute =
    parsedRoutes.reduce((prev, current) =>
        prev.distanceKm < current.distanceKm
            ? prev
            : current
    );

const cheapestRoute =
    parsedRoutes.reduce((prev, current) =>
        parseFloat(prev.fuelCost) < parseFloat(current.fuelCost)
            ? prev
            : current
    );

parsedRoutes.forEach(route => {

    route.label = "";

    if (route.id === fastestRoute.id) {
        route.label += "⚡ Fastest ";
    }

    if (route.id === shortestRoute.id) {
        route.label += "📏 Shortest ";
    }

    if (route.id === cheapestRoute.id) {
        route.label += "💰 Cheapest ";
    }

    if (route.label === "") {
        route.label = "Alternative";
    }
});
    document.getElementById("route-comparison-container").innerHTML =
        parsedRoutes.map(route => `
            <div
    class="route-card"
    data-route-id="${route.id}"
>
                <h3>${route.label}</h3>
                <p>🛣 ${route.distanceKm} km</p>

<p>⏱ ${route.durationText}</p>

<p>⛽ ${route.fuelNeeded} L</p>

<p>💰 ₹${route.fuelCost}</p>

<p>📍 ${route.summary}</p>
            </div>
        `).join('');
document
    .querySelectorAll(".route-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const selectedId =
                parseInt(
                    card.dataset.routeId
                );

            document
                .querySelectorAll(".route-card")
                .forEach(c =>
                    c.classList.remove("selected-route")
                );

            card.classList.add("selected-route");

            directionsRenderer.setRouteIndex(
                selectedId
            );
        });
    });

    const firstCard =
    document.querySelector(".route-card");

if (firstCard) {

    firstCard.classList.add(
        "selected-route"
    );
}

    directionsRenderer.setDirections(result);

    const legs = routes[0].legs;

    let totalDistance = 0;
    let totalDuration = 0;

    legs.forEach((leg) => {

        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
    });

    const totalDurationHours =
    totalDuration / 3600;

const recommendedBreaks =
    Math.floor(totalDurationHours / 4);


const breakPoints = [];

for (
    let i = 1;
    i <= recommendedBreaks;
    i++
) {

    const checkpointIndex =
        Math.floor(
            (
                i / (recommendedBreaks + 1)
            ) *
            parsedRoutes[0]
                .overviewPath.length
        );

    breakPoints.push(
        parsedRoutes[0]
            .overviewPath[checkpointIndex]
    );
}


const breakGeocoder =
    new google.maps.Geocoder();

document.getElementById(
    "route-weather-container"
).innerHTML = "";

breakPoints.forEach(point => {

    breakGeocoder.geocode(
{
    location: point
},

async (results, status) => {

        if (status !== "OK") {

        console.error("Geocoder failed");

        return;
    }

const cityResult =
    results.find(result =>
        result.types.includes("locality")
    )

    ||

    results.find(result =>
        result.types.includes(
            "administrative_area_level_2"
        )
    );

if (!cityResult) {

    console.error(
        "No halt city found"
    );

    return;
}

const haltCity =
    cityResult.formatted_address;

const breakCity =
    cityResult.formatted_address;

const weatherData =
    await getWeather(
        point.lat(),
        point.lng()
    );
console.error(
    "Weather API failed"
);
if (!weatherData) {

    return;
}

if (
    !weatherData
    ||
    !weatherData.weather
    ||
    !weatherData.weather[0]
) {

    return;
}

const condition =
    weatherData.weather[0]
        .main
        .toLowerCase();

const temperature =
    weatherData.main.temp;
let warning = "";
let emoji = "";

if (condition.includes("rain")) {

    emoji = "🌧";

    warning =
        "Heavy rain possible on this stretch.";
}

else if (condition.includes("fog")) {

    emoji = "🌫";

    warning =
        "Low visibility risk due to fog.";
}

else if (temperature >= 35) {

    emoji = "🥵";

    warning =
        "Extreme heat expected.";
}

if (warning !== "") {

    document.getElementById(
        "route-weather-container"
    ).innerHTML += `

        <div class="weather-warning-card">

            <h3>
                ${emoji} Route Weather Alert
            </h3>

            <p>
                📍 ${breakCity}
            </p>

            <p>
                ${warning}
            </p>

        </div>
    `;
}


    });
});

    const distanceKm =
        (totalDistance / 1000).toFixed(1);

    const durationText =
        formatDuration(totalDuration);

    const etaText =
        formatEta(
            tripSchedule.departureAt,
            tripSchedule.arrivalAt
        );

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
        etaText,
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

    departureTime,

    arrivalTime: formatClock(
        tripSchedule.arrivalAt
    ),

    etaText,

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

loadScheduledRestaurants(
    result.routes[0],
    tripSchedule
);
                saveRecentTrip(
                    startLocation,
                    destination,
                    `${distanceKm} km`
                );

               const destinationLocation =
    routes[0].legs[0].end_location;

const weatherData =
    await getWeather(
        destinationLocation.lat(),
        destinationLocation.lng()
    );
                if (weatherData) {

                    updateWeatherUI(weatherData);
                    generatePackingChecklist(
        weatherData
    );
                }

                hideLoading();
            }
        );

    } catch (error) {

        console.error(error);

        document.getElementById(
    "route-comparison-container"
).innerHTML = `

<div class="error-card">

    <h3>
        ⚠ Unexpected Error
    </h3>

    <p>
        Something went wrong while planning your trip.
    </p>

</div>
`;

        hideLoading();
    }
});


/* =========================
   START MAP
========================= */

window.onload = () => {

    initMap();

    const params =
        new URLSearchParams(
            window.location.search
        );

    const start =
        params.get("start");

    const destination =
        params.get("destination");

    const mileage =
    params.get("mileage");

const fuelPrice =
    params.get("fuelPrice");

const budget =
    params.get("budget");

const departureTime =
    params.get("departureTime");

const departureTimeInput =
    document.getElementById(
        "departureTime"
    );

departureTimeInput.value =
    getCurrentTimeInputValue();

    if (start) {

        document.getElementById(
            "startLocation"
        ).value = start;
    }

    if (destination) {

        document.getElementById(
            "destination"
        ).value = destination;
    }
    if (mileage) {

    document.getElementById(
        "mileage"
    ).value = mileage;
}

if (fuelPrice) {

    document.getElementById(
        "fuelPrice"
    ).value = fuelPrice;
}

if (budget) {

    document.getElementById(
        "budget"
    ).value = budget;
}

if (departureTime) {

    departureTimeInput.value =
        departureTime;
}

if (
    start &&
    destination &&
    mileage &&
    fuelPrice
) {

    setTimeout(() => {

        document
            .getElementById(
                "planTripBtn"
            )
            .click();

    }, 1000);
}
};

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

   const privacyEnabled =

    document.getElementById(
        "privacyMode"
    ).checked;

if (privacyEnabled) {

    alert(
        "Privacy Mode enabled. Trip will not be saved to cloud."
    );

    return;
}

await saveTripToCloud(
    currentTripData
);
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

                    if (
    !results ||
    results.length === 0
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

function loadScheduledRestaurants(
    route,
    tripSchedule
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

    if (
        !tripSchedule.mealStops.length
    ) {

        restaurantSection
            .classList
            .add("hidden");

        return;
    }

    restaurantSection
        .classList
        .remove("hidden");

    tripSchedule.mealStops.forEach(
        (stop, index) => {

            const request = {
                location: stop.point,
                radius: 5000,
                keyword: stop.meal.keyword,
                type: "restaurant"
            };

            getCityFromPoint(
                stop.point,
                (cityName) => {

                    placesService.nearbySearch(
                        request,
                        (results, status) => {

                            const place =
                                status ===
                                google.maps.places.PlacesServiceStatus.OK &&
                                results &&
                                results.length
                                    ? (
                                        results.find(result =>
                                            result.rating >= 4
                                        ) ||
                                        results[0]
                                    )
                                    : null;

                            const card =
                                document.createElement("div");

                            card.classList.add(
                                "restaurant-card"
                            );

                            const mapsUrl =
                                place
                                    ? `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}`
                                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cityName || "restaurant near route")}`;

                            card.innerHTML = `

                                <h3>
                                    ${stop.meal.label} - ${formatClock(stop.time)}
                                </h3>

                                <p>
                                    ${cityName || "On the selected route"}
                                </p>

                                <p>
                                    ${place ? place.name : "Search restaurants at this route point"}
                                </p>

                                <p>
                                    Rating: ${place && place.rating ? place.rating : "N/A"}
                                </p>

                                <a
                                    href="${mapsUrl}"
                                    target="_blank"
                                    class="restaurant-link"
                                >
                                    Navigate
                                </a>
                            `;

                            card.style.order =
                                index + 1;

                            restaurantContainer
                                .appendChild(card);
                        }
                    );
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

            <button
                type="button"
                class="use-destination-btn"
                data-destination="${place.name}"
            >
                Use as Destination
            </button>
        `;

        container.appendChild(card);
    });

    container
        .querySelectorAll(".use-destination-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const destinationInput =
                        document.getElementById(
                            "destination"
                        );

                    destinationInput.value =
                        button.dataset.destination;

                    destinationInput.focus();
                }
            );
        });
}

document
    .getElementById("exportPdfBtn")
    .addEventListener("click", exportTripPdf);

function exportTripPdf() {

    if (!currentTripData) {

        alert(
            "Generate a trip first."
        );

        return;
    }

    const {
        jsPDF
    } = window.jspdf;

    const doc =
        new jsPDF();

    const page = {
        marginX: 18,
        top: 18,
        bottom: 280,
        width: 174
    };

    let y = page.top;

    const normalizeText = text =>
        (text || "")
            .replace(/â‚¹|₹/g, "Rs. ")
            .replace(/Â°C|°C|°/g, " deg C")
            .replace(/â­/g, "Rating")
            .replace(/â±/g, "Time")
            .replace(/â›½/g, "Fuel")
            .replace(/ðŸ“/g, "Location")
            .replace(/ðŸ’°|ðŸ’µ/g, "Cost")
            .replace(/ðŸ›£/g, "Distance")
            .replace(/ðŸ˜´/g, "")
            .replace(/ðŸŽ’/g, "")
            .replace(/ðŸŒ¡/g, "Temperature")
            .replace(/ðŸ’§/g, "Humidity")
            .replace(/ðŸŒ¬/g, "Wind")
            .replace(/âœ…/g, "")
            .replace(/â˜”/g, "")
            .replace(/â˜/g, "")
            .replace(/[^\x20-\x7E\n]/g, " ")
            .replace(/[=<>@#]+/g, " ")
            .replace(/\s&\s/g, " and ")
            .replace(/\s[+\-._]{1,2}\s/g, " ")
            .replace(/\bNavigate\b/g, "")
            .replace(/\s+/g, " ")
            .trim();

    const getVisibleText = id => {

        const element =
            document.getElementById(id);

        if (
            !element ||
            element.classList.contains("hidden")
        ) {

            return "";
        }

        return normalizeText(
            element.textContent
        );
    };

    const getVisibleSectionText = (
        sectionId,
        contentId
    ) => {

        const section =
            document.getElementById(sectionId);

        if (
            !section ||
            section.classList.contains("hidden")
        ) {

            return "";
        }

        return getVisibleText(contentId);
    };

    const getCardTexts = selector =>
        Array.from(
            document.querySelectorAll(selector)
        )
            .map(card =>
                normalizeText(card.textContent)
            )
            .filter(Boolean);

    const addPageIfNeeded = height => {

        if (y + height <= page.bottom) {

            return;
        }

        doc.addPage();

        y = page.top;
    };

    const addWrappedText = (
        text,
        fontSize = 11,
        gap = 5
    ) => {

        if (!text) {

            return;
        }

        text = normalizeText(text);

        if (!text) {

            return;
        }

        doc.setFontSize(fontSize);
        doc.setFont("helvetica", "normal");

        const lines =
            doc.splitTextToSize(
                text,
                page.width
            );

        const lineHeight =
            fontSize * 0.42;

        addPageIfNeeded(
            lines.length * lineHeight + gap
        );

        doc.text(
            lines,
            page.marginX,
            y
        );

        y +=
            lines.length * lineHeight + gap;
    };

    const addSection = (
        title,
        entries
    ) => {

        const content =
            Array.isArray(entries)
                ? entries.filter(Boolean)
                : [entries].filter(Boolean);

        if (!content.length) {

            return;
        }

        addPageIfNeeded(18);

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(
            title,
            page.marginX,
            y
        );

        y += 8;

        doc.setDrawColor(210);
        doc.line(
            page.marginX,
            y - 4,
            page.marginX + page.width,
            y - 4
        );

        content.forEach((entry, index) => {

            addWrappedText(
                content.length > 1
                    ? `${index + 1}. ${entry}`
                    : entry
            );
        });

        y += 3;
    };

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(
        "RoadWise Trip Report",
        page.marginX,
        y
    );

    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        page.marginX,
        y
    );

    y += 10;

    addSection(
        "Trip Summary",
        [
            `From: ${currentTripData.startLocation}`,
            `To: ${currentTripData.destination}`,
            `Departure Time: ${currentTripData.departureTime || "Now"}`,
            `ETA: ${currentTripData.etaText || currentTripData.arrivalTime || "N/A"}`,
            `Distance: ${currentTripData.distanceKm} km`,
            `Duration: ${currentTripData.durationText}`,
            `Fuel Needed: ${currentTripData.fuelNeeded} L`,
            `Fuel Cost: Rs. ${currentTripData.fuelCost}`,
            currentTripData.budget !== null
                ? `Trip Budget: Rs. ${currentTripData.budget}`
                : ""
        ]
    );

    addSection(
        "Route Options",
        getCardTexts(".route-card")
    );

    addSection(
        "Overnight Halt",
        getCardTexts(".halt-card")
    );

    addSection(
        "Food Stops Nearby",
        getCardTexts("#restaurantContainer .restaurant-card")
    );

    addSection(
        "Route Weather Alerts",
        getCardTexts(".weather-warning-card")
    );

    addSection(
        "Packing and Safety Checklist",
        getCardTexts(".packing-card")
    );

    addSection(
        "Fuel Stop Alert",
        getVisibleSectionText(
            "fuelAlertSection",
            "fuelAlertText"
        )
    );

    addSection(
        "Driver Fatigue Alert",
        getVisibleSectionText(
            "fatigueAlertSection",
            "fatigueAlertText"
        )
    );

    const destinationWeather =
        getVisibleText("weatherInfo");

    if (
        destinationWeather &&
        destinationWeather !==
            "Weather data will appear here."
    ) {

        addSection(
            "Destination Weather",
            destinationWeather
        );
    }

    addWrappedText(
        "Generated by RoadWise",
        10
    );

    doc.save(
        "roadwise-trip-report.pdf"
    );
}
function generateShareLink() {

    const start =
        encodeURIComponent(
            document.getElementById(
                "startLocation"
            ).value
        );

    const destination =
        encodeURIComponent(
            document.getElementById(
                "destination"
            ).value
        );

    const mileage =
        encodeURIComponent(
            document.getElementById(
                "mileage"
            ).value
        );

    const fuelPrice =
        encodeURIComponent(
            document.getElementById(
                "fuelPrice"
            ).value
        );

    const budget =
        encodeURIComponent(
            document.getElementById(
                "budget"
            ).value
        );

    const departureTime =
        encodeURIComponent(
            document.getElementById(
                "departureTime"
            ).value
        );

    const shareUrl =

`${window.location.origin}${window.location.pathname}?start=${start}&destination=${destination}&mileage=${mileage}&fuelPrice=${fuelPrice}&budget=${budget}&departureTime=${departureTime}`;

    navigator.clipboard.writeText(
        shareUrl
    );

    alert(
        "Trip link copied to clipboard."
    );
}
document
    .getElementById("shareTripBtn")
    .addEventListener(
        "click",
        generateShareLink
    );


function generatePackingChecklist(
    weatherData
) {

    if (!weatherData) {

        return;
    }

    const condition =
        weatherData.weather[0]
            .main
            .toLowerCase();

    const temp =
        weatherData.main.temp;

    const items = [];

    if (
        condition.includes("rain")
    ) {

        items.push(
            "☔ Carry umbrella or raincoat"
        );
    }

    if (temp >= 35) {

        items.push(
            "🧴 Carry water and sunscreen"
        );
    }

    if (temp <= 15) {

        items.push(
            "🧥 Carry warm clothing"
        );
    }

    if (
        condition.includes("fog")
        ||
        condition.includes("mist")
    ) {

        items.push(
            "🚘 Drive carefully in low visibility"
        );
    }

    if (items.length === 0) {

        items.push(
            "✅ Weather conditions look normal"
        );
    }

    document.getElementById(
        "packing-checklist-container"
    ).innerHTML = `

        <div class="packing-card">

            <h2>
                🎒 Packing & Safety Checklist
            </h2>

            ${items.map(item =>
                `<p>${item}</p>`
            ).join("")}

        </div>
    `;
}
