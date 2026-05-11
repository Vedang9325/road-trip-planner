/* =========================
   UPDATE RESULTS UI
========================= */

function updateTripResults(
    distanceKm,
    durationText,
    fuelNeeded,
    fuelCost,
    remainingBudget
) {

    document.getElementById('distanceResult')
        .textContent = `${distanceKm} km`;

    document.getElementById('timeResult')
        .textContent = durationText;

    document.getElementById('fuelNeededResult')
        .textContent = `${fuelNeeded} L`;

    document.getElementById('fuelCostResult')
        .textContent = `₹${fuelCost}`;

    if (remainingBudget !== null) {

        document.getElementById('budgetResult')
            .textContent = `₹${remainingBudget}`;

    } else {

        document.getElementById('budgetResult')
            .textContent = "--";
    }
}


/* =========================
   UPDATE WEATHER UI
========================= */

function updateWeatherUI(weatherData) {

    const weatherContainer =
        document.getElementById('weatherInfo');

    const icon =
        weatherData.weather[0].icon;

    weatherContainer.innerHTML = `
        <div class="weather-box">

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="Weather Icon"
            >

            <div>

                <h3>
                    ${weatherData.name}
                </h3>

                <p>
                    🌡 ${weatherData.main.temp}°C
                </p>

                <p>
                    ☁ ${weatherData.weather[0].description}
                </p>

                <p>
                    💧 Humidity:
                    ${weatherData.main.humidity}%
                </p>

                <p>
                    🌬 Wind:
                    ${weatherData.wind.speed} m/s
                </p>

            </div>

        </div>
    `;
}


/* =========================
   SHOW LOADING STATE
========================= */

function showLoading() {

    const button =
        document.getElementById('planTripBtn');

    const loader =
        document.getElementById('loader');

    const btnText =
        document.getElementById('btnText');

    btnText.textContent = "Planning";

    loader.classList.remove('hidden');

    button.disabled = true;
}


function hideLoading() {

    const button =
        document.getElementById('planTripBtn');

    const loader =
        document.getElementById('loader');

    const btnText =
        document.getElementById('btnText');

    btnText.textContent = "Plan Trip";

    loader.classList.add('hidden');

    button.disabled = false;
}