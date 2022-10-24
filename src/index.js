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

function displayTemperature(response) {
  console.log(response.data);
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
  celsiusTemp = Math.round(response.data.temperature.current);
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
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

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  showCelsius.classList.remove("active");
  showFahrenheit.classList.add("active");
  currentTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  showCelsius.classList.add("active");
  showFahrenheit.classList.remove("active");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let showFahrenheit = document.querySelector("#fahrenheit-dergees");
showFahrenheit.addEventListener("click", changeToFahrenheit);

let showCelsius = document.querySelector("#celsius-degrees");
showCelsius.addEventListener("click", changeToCelsius);
