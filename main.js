const url = "https://api.openweathermap.org/data/2.5/";
const key = "5668fde44328a07540169d5374ddced0";

const submitBtn = document.querySelector("#submit");
const input = document.querySelector(".search-box");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getResults(input.value);
});

const getResults = (cityName) => {
  let weatherType = "metric";
  let query = `${url}weather?q=${cityName}&appid=${key}&units=${weatherType}`;

  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
};

const displayResults = (result) => {
  let city = document.querySelector(".location .city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuild(now);

  let temp = document.querySelector(".current .temp");
  temp.innerText = `${Math.round(result.main.temp)}°c`;

  let desc = document.querySelector(".current .weather");
  desc.innerText = result.weather[0].description;

  var icon = document.getElementById("icon");

  icon.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;

  // console.log(icon);

  let minmax = document.querySelector(".min-max");
  minmax.innerText = `${Math.round(result.main.temp_min)}°c / ${Math.round(
    result.main.temp_max
  )}°c`;

  input.value = "";
  input.focus();

  // console.log(result);
};

function dateBuild(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
