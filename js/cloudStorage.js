/* =========================
   SAVE TRIP TO FIRESTORE
========================= */

async function saveTripToCloud(tripData) {

    const user = auth.currentUser;

    if (!user) {

        alert("Please login first.");

        return;
    }

    try {

        await db
            .collection("users")
            .doc(user.uid)
            .collection("trips")
            .add({

                ...tripData,

                createdAt:
                    firebase.firestore.FieldValue.serverTimestamp()
            });

        console.log("Trip saved.");
        loadCloudTrips();

    } catch (error) {

        console.error(error);

        alert("Failed to save trip.");
    }
}


/* =========================
   LOAD USER TRIPS
========================= */

async function loadCloudTrips() {

    const user = auth.currentUser;

    if (!user) return;

    try {

        const snapshot =
            await db
                .collection("users")
                .doc(user.uid)
                .collection("trips")
                .orderBy("createdAt", "desc")
                .get();

        renderCloudTrips(snapshot.docs);

    } catch (error) {

        console.error(error);
    }
}


/* =========================
   DELETE TRIP
========================= */

async function deleteTrip(tripId) {

    const user = auth.currentUser;

    if (!user) return;

    try {

        await db
            .collection("users")
            .doc(user.uid)
            .collection("trips")
            .doc(tripId)
            .delete();

        loadCloudTrips();

    } catch (error) {

        console.error(error);
    }
}

/* =========================
   RENDER CLOUD TRIPS
========================= */

function renderCloudTrips(trips) {

    const container =
        document.getElementById(
            "savedTripsContainer"
        );

    container.innerHTML = "";

    if (trips.length === 0) {

        container.innerHTML = `
            <p class="empty-state">
                No saved trips yet.
            </p>
        `;

        return;
    }

    trips.forEach((tripDoc) => {

        const trip = tripDoc.data();

        const card =
            document.createElement("div");

        card.classList.add("trip-card");

        card.innerHTML = `

            <h3>
                ${trip.startLocation}
                → 
                ${trip.destination}
            </h3>

            <p>
                Distance:
                ${trip.distanceKm} km
            </p>

            <p>
                Duration:
                ${trip.durationText}
            </p>

            <p>
                Fuel Cost:
                ₹${trip.fuelCost}
            </p>

            <button
                onclick="deleteTrip('${tripDoc.id}')"
            >
                Delete
            </button>
        `;

        container.appendChild(card);
    });
}