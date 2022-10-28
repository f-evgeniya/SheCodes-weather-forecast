function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateIndex = date.getDate();

  return `${day}, ${month} ${dateIndex}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="forecast-first-day">
          <p class="weather-forecast-date">${formatDay(forecastDay.time)}</p>
          <img
            src="${forecastDay.condition.icon_url}"
            alt="${forecastDay.condition.description}"
            width="60px"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}° </span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temperature.minimum
            )}° </span>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5ba04o3cadf5t843538c5f40f329e3dc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#weather-descr");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.temperature.humidity;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  const apiKey = "5ba04o3cadf5t843538c5f40f329e3dc";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}
&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

let currentTime = new Date();
let currentDay = document.querySelector("#date");
currentDay.innerHTML = formatDate(currentTime);

search("Kyiv");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
