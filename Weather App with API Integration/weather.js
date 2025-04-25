// DOM Elements
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const weatherInfo = document.querySelector("#weatherInfo");
const errorDiv = document.querySelector("#error");
const loadingDiv = document.querySelector("#loading");
const weatherDetails = document.querySelector("#weatherDetails");

// DOM Elements for weather details
const temperatureSpan = document.querySelector("#temperature");
const humiditySpan = document.querySelector("#humidity");
const weatherSpan = document.querySelector("#weather");
const windSpeedSpan = document.querySelector("#windSpeed");
const visibilitySpan = document.querySelector("#visibility");
const cloudinessSpan = document.querySelector("#cloudiness");
const pressureSpan = document.querySelector("#pressure");

searchButton.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    showError("Please enter a city name");
    return;
  }
  getWeather(cityName);
});

const showError = (message) => {
  errorDiv.textContent = message;
  weatherDetails.style.display = "none";
  loadingDiv.style.display = "none";
};

const showLoading = () => {
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  weatherDetails.style.display = "none";
};

const showWeatherDetails = () => {
  loadingDiv.style.display = "none";
  weatherDetails.style.display = "block";
};

const getWeather = async (cityName) => {
  try {
    showLoading();

    // Validate city name format
    if (!/^[a-zA-Z\s-]+$/.test(cityName)) {
      throw new Error(
        "Please enter a valid city name (letters, spaces, and hyphens only)"
      );
    }

    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2511fd50878d457b8a5124106251104&q=${encodeURIComponent(
        cityName
      )}&aqi=no`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "City not found or API error"
      );
    }

    const data = await response.json();

    // Validate response data structure
    if (!data.current || !data.location) {
      throw new Error("Invalid response from weather API");
    }

    // Update weather information with proper error handling for each field
    try {
      temperatureSpan.textContent = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
      humiditySpan.textContent = `${data.current.humidity}%`;
      weatherSpan.textContent = data.current.condition.text;
      windSpeedSpan.textContent = `${data.current.wind_kph} km/h`;
      visibilitySpan.textContent = `${data.current.vis_km} km`;
      cloudinessSpan.textContent = `${data.current.cloud}%`;
      pressureSpan.textContent = `${data.current.pressure_mb} mb`;
    } catch (dataError) {
      throw new Error("Error processing weather data");
    }

    showWeatherDetails();
  } catch (error) {
    showError(error.message);
    resetWeatherData();
  }
};
