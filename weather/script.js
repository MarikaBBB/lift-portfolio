const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}

const postcodeInput = document.getElementById("postcodeInput")
const showButton = document.getElementById("showButton")
const weatherDiv = document.getElementById("weatherDiv")
const locationSpan = document.getElementById("locationSpan")
const descriptionSpan = document.getElementById("descriptionSpan")
const temperatureSpan = document.getElementById("temperatureSpan")
const errorDiv = document.getElementById("errorDiv")
const postcodeSpan = document.getElementById("postcodeSpan")

async function getAreaDataForPostcode(postcode) {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    const areaData = await response.json()
    return areaData["result"]
}

async function getWeatherDataForLocation(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    const weatherData = await response.json()
    return weatherData["current_weather"]
}

async function showWeather() {
    const postcode = postcodeInput.value
    if (postcode) {
        try {
            const areaData = await getAreaDataForPostcode(postcode)
            locationSpan.textContent = areaData["admin_district"]
            const weatherData = await getWeatherDataForLocation(areaData["latitude"], areaData["longitude"])
            descriptionSpan.textContent = weatherCodes[weatherData["weathercode"]]
            temperatureSpan.textContent = weatherData["temperature"]
            errorDiv.hidden = true
            weatherDiv.hidden = false
        } catch {
            postcodeSpan.textContent = postcode
            weatherDiv.hidden = true
            errorDiv.hidden = false
        }
    } else {
        weatherDiv.hidden = true
        errorDiv.hidden = true
    }
}

showButton.addEventListener("click", showWeather)