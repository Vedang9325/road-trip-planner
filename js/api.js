/* =========================
   WEATHER API KEY
========================= */

const WEATHER_API_KEY =
    "eda3f85b56030f2eb1d27da1c0f8deb8";


/* =========================
   WEATHER FUNCTION
========================= */

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        return null;
    }
}