function displayCurrentTime() {
  let currentDate = new Date();

  let currentHour = currentDate.getHours();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = currentDate.getMinutes();

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  //Important to add the if statement for currentHour and currentMinute as we want the time to display 01:01 not 1:1

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[currentDate.getDay()];

  let currentDateInMonth = currentDate.getDate();

  let currentMonth = currentDate.getMonth();

  let currentYear = currentDate.getFullYear();

  let dateTime = document.querySelector("#current-date-time");

  dateTime.innerHTML = `${currentDay}, ${currentDateInMonth}/${
    currentMonth + 1
  }/${currentYear}, ${currentHour}:${currentMinute}`;
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputText = document.querySelector("#search-bar");

  let cityName = `${cityInputText.value}`;

  searchWeatherCityName(cityName);
}

function searchWeatherCityName(cityName) {
  let apiKey = "45526f214a1657311e19c90163a6ab34";

  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchWeatherCoords(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getCoords);
}

function getCoords(position) {
  let lat = position.coords.latitude;

  let lon = position.coords.longitude;

  let apiKey = "45526f214a1657311e19c90163a6ab34";

  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let currentTemperature = Math.round(celsiusTemperature);

  let currentCity = response.data.name;

  let currentCountryCode = response.data.sys.country;

  let isoCountryCodes = {
    GB: "UK",
    JP: "Japan",
  };

  let currentCountry = isoCountryCodes[currentCountryCode];

  let currentWeatherIconCode = response.data.weather[0].icon;

  let currentWeatherDescription = response.data.weather[0].description;

  let currentLocationElement = document.querySelector("#current-location");

  let tempDisplay = document.querySelector("#current-temperature-value");

  let weatherIcon = document.querySelector("#current-weather-icon");

  let weatherDescription = document.querySelector("#current-description");

  currentLocationElement.innerHTML = `${currentCity}, ${currentCountry}`;

  tempDisplay.innerHTML = `${currentTemperature}`;

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png`
  );

  weatherIcon.setAttribute("alt", `${currentWeatherDescription}`);

  weatherDescription.innerHTML = `${currentWeatherDescription}`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#current-temperature-value");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  celsiusLink.classList.add("active");

  fahrenheitLink.classList.remove("active");

  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let currentTemperature = document.querySelector("#current-temperature-value");

  celsiusLink.classList.remove("active");

  fahrenheitLink.classList.add("active");

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let citySearchForm = document.querySelector("#search-engine");

let currentLocationButton = document.querySelector("#location-search-button");

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");

let celsiusLink = document.querySelector("#celsius-link");

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

celsiusLink.addEventListener("click", displayCelsiusTemperature);

citySearchForm.addEventListener("submit", handleSubmit);

currentLocationButton.addEventListener("click", searchWeatherCoords);

displayCurrentTime();

searchWeatherCityName("London");
