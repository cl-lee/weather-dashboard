// --- Global Variable ---
let searchForm = document.querySelector(".form");
let searchInput = document.querySelector("#search-input");
let historyContainer = document.querySelector("#history");
let todayContainer = document.querySelector("#today");
let forecastCardDeck = document.querySelector(".forecast-card-deck");

displaySearchHistory();

// application functions:
// 1) enter city in textbox
//      add eventlistener on "submit" for city search
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let selectedCity = searchInput.value;
    addCityToHistory(selectedCity);
    displaySearchHistory();
    getTodaysWeather(selectedCity);
})

// 2) save entered city into local storage (nest within (1))
function addCityToHistory(selectedCity) {
    let searchHistoryArray = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
    searchHistoryArray.unshift(selectedCity);
    localStorage.setItem("citySearchHistory", JSON.stringify(searchHistoryArray));
}

//      on eventlistener "click" for city search: 


// --- DATA COLLECTION FUNCTIONS---
// 4) return today's weather
function getTodaysWeather(selectedCity) {
    //          (i) get lat and lon of city:
    //              API query URL:
    let geoDataURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + selectedCity + "&limit=5&appid=7018058f3ae12d10c5b76a1ecf1894e9"

    fetch(geoDataURL)
        .then(response => response.json())
        .then(function (geoData) {
            let lat = geoData[0].lat
            let lon = geoData[0].lon
            //                  chain fetch
            //                  return fetch(queryURL2)
            //              (ii) get today's weather for city
            //                   API query URL:
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7018058f3ae12d10c5b76a1ecf1894e9`)
        })
        .then(response => response.json())
        .then(function (weatherData) {
            //  todayContainer.append(
            // `<h2>${cityInput} (${moment().format("D/M/YYYY")})</h2>
            // <p>Temp: 
            console.log(weatherData);

            // get city name
            let selectedCityName = weatherData.city.name;

            // get today's date
            let getDate = moment(weatherData.list[0].dt, "X").format("D/M/YYYY");

            // get weather icon
            let weatherIconRef = weatherData.list[0].weather[0].icon;
            let weatherIconURL = `https://openweathermap.org/img/wn/${weatherIconRef}@2x.png`;

            // get today's temperature
            let todaysTemperatureInKelvin = weatherData.list[0].main.temp;
            let todaysTemperatureInCelsius = todaysTemperatureInKelvin - 273.15;
            let todaysTemperatureRounded = Math.round(todaysTemperatureInCelsius * 100) / 100;
            let todaysTemperature = `${todaysTemperatureRounded}°C`;

            // get today's wind speed
            let todaysWindSpeedMPS = weatherData.list[0].wind.speed;
            let todaysWindSpeedKPH = todaysWindSpeedMPS * 3.6;
            let todaysWindSpeedRounded = `${Math.round(todaysWindSpeedKPH * 100) / 100} KPH`;

            // get today's humidity
            let todaysHumidity = `${weatherData.list[0].main.humidity}%`;

            displayTodaysWeather(selectedCityName, getDate, weatherIconURL, todaysTemperature, todaysWindSpeedRounded, todaysHumidity)
            displayFiveDayForecast(getDate, weatherIconURL, todaysTemperature, todaysWindSpeedRounded, todaysHumidity);
        });

    // 5) return 5 day forecast
    // for (let i = 0; i < 6; i++) {
    // let getDate = moment(weatherData.list[0+8*i].dt, "X").format("D/M/YYYY");

    // let weatherIconRef = weatherData.list[0+8*i].weather[0+8*i].icon;
    // let weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconRef}@2x.png`;

    // let todaysTemperatureInKelvin = weatherData.list[0+8*i].main.temp;
    // let todaysTemperatureInCelsius = todaysTemperatureInKelvin - 273.15;
    // let todaysTemperatureRounded = Math.round(todaysTemperatureInCelsius * 100) / 100;
    // let todaysTemperature = `${todaysTemperatureRounded}°C`;

    // let todaysWindSpeedMPS = weatherData.list[0+8*i].wind.speed;
    // let todaysWindSpeedKPH = todaysWindSpeedMPS * 3.6;
    // let todaysWindSpeedRounded = `${Math.round(todaysWindSpeedKPH * 100) / 100} KPH`;

    // let todaysHumidity = `${weatherData.list[0+8*i].main.humidity}%`;
    // }
}

// --- RENDERING FUNCTIONS ---
// function to display the six most recently searched cities in sidebar
function displaySearchHistory() {
    let searchHistoryArray = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
    historyContainer.innerHTML =
        `<a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[0]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[1]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[2]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[3]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[4]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[5]}</a>`;
}

// function to display city name, today's date and today's weather icon
function displayTodaysWeather(selectedCityName, getDate, weatherIconURL, todaysTemperature, todaysWindSpeedRounded, todaysHumidity) {
    todayContainer.innerHTML =
        `<div class="card">
        <div class="card-body">
            <h3 class="card-title">${selectedCityName} (${getDate}) <img src="${weatherIconURL}" alt="Icon for today's weather"></h3>
            <p class="card-text">Temp: ${todaysTemperature}</p>
            <p class="card-text">Wind: ${todaysWindSpeedRounded}</p>
            <p class="card-text">Humidity: ${todaysHumidity}</p>
        </div>
    </div>`
}

function displayFiveDayForecast(getDate, weatherIconURL, todaysTemperature, todaysWindSpeedRounded, todaysHumidity) {

    let forecastCard = document.createElement("div");
    forecastCard.setAttribute("class", "card");
    forecastCard.innerHTML = 
    `<h4 class="card-title">${getDate}</h4>
    <img src="${weatherIconURL}" alt="The weather icon">
    <div class="card-body">
        <p class="card-text">Temp: ${todaysTemperature}</p>
        <p class="card-text">Wind: ${todaysWindSpeedRounded}</p>
        <p class="card-text">Humidity: ${todaysHumidity}</p>
    </div>`;
    forecastCardDeck.append(forecastCard);
}