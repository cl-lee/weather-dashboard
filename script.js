// Global variable
let historyContainer = document.querySelector("#history");


// Renders city search history upon loading the page
renderSearchHistory();


// Event listener for clicking on the search button
let searchForm = document.querySelector(".form");
let searchInput = document.querySelector("#search-input");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // captures city entered by the user
    let selectedCity = searchInput.value;
    addCityToHistory(selectedCity);
    renderSearchHistory();
    returnWeatherData(selectedCity);
})

// Saves city entered by user into local storage
function addCityToHistory(selectedCity) {
    let searchHistoryArray = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
    searchHistoryArray.unshift(selectedCity);
    localStorage.setItem("citySearchHistory", JSON.stringify(searchHistoryArray));
}

// Renders the six most recently searched cities in sidebar
function renderSearchHistory() {
    let searchHistoryArray = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
    historyContainer.innerHTML = 
    `<a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[0]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[1]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[2]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[3]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[4]}</a>
        <a href="#" class="list-group-item list-group-item-action active">${searchHistoryArray[5]}</a>`;
}


// Event listener for clicking on a city in the search history, gets weather for the selected city
historyContainer.addEventListener("click", function (event) {
    let selectedCity = event.target.textContent;
    returnWeatherData(selectedCity);
})


// Returns and renders the weather data
let todayContainer = document.querySelector("#today-card");
let forecastContainer = document.querySelector("#forecast");
let forecastHeader = document.querySelector("#forecast-header");
let forecastCardDeck = document.querySelector(".forecast-card-deck");

function returnWeatherData(selectedCity) {
    // determines lat and lon of a city, used to access its weather data:
    let geoDataURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + selectedCity + "&limit=5&appid=7018058f3ae12d10c5b76a1ecf1894e9"
    forecastCardDeck.innerHTML = "";
    fetch(geoDataURL)
    .then(response => response.json())
    .then(function (geoData) {
        let lat = geoData[0].lat
            let lon = geoData[0].lon

            // Collects the weather data
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7018058f3ae12d10c5b76a1ecf1894e9`)
        })
        .then(response => response.json())
        .then(function (weatherData) {          
            
            forecastHeader.innerHTML = "";
            forecastHeader.innerHTML = '5-Day Forecast:';
            
            for (let i = 0; i < 6; i++) {
                
                // index for determining date of weather forecast
                let index;
                if (i === 0) {
                    index = 0;
                } else {
                    index = 8 * i - 1;
                }

                // get city name
                let selectedCityName = weatherData.city.name;
                
                // get date
                let getDate = moment(weatherData.list[index].dt, "X").format("D/M/YYYY");
                
                // get weather icon
                let weatherIconRef = weatherData.list[index].weather[0].icon;
                let weatherIconURL = `https://openweathermap.org/img/wn/${weatherIconRef}@2x.png`;

                // get temperature
                let todaysTemperatureInKelvin = weatherData.list[index].main.temp;
                let todaysTemperatureInCelsius = todaysTemperatureInKelvin - 273.15;
                let todaysTemperatureRounded = Math.round(todaysTemperatureInCelsius * 100) / 100;
                let todaysTemperature = `${todaysTemperatureRounded}°C`;

                // get wind speed
                let todaysWindSpeedMPS = weatherData.list[index].wind.speed;
                let todaysWindSpeedKPH = todaysWindSpeedMPS * 3.6;
                let todaysWindSpeedRounded = `${Math.round(todaysWindSpeedKPH * 100) / 100} KPH`;

                // get humidity
                let todaysHumidity = `${weatherData.list[index].main.humidity}%`;

                // renders weather data to today and 5-day forecast sections 
                if (i === 0) {
                    todayContainer.innerHTML =
                    `<div class="card-body">
                    <h3 class="card-title">${selectedCityName} (${getDate}) <img src="${weatherIconURL}" alt="Icon for today's weather"></h3>
                    <p class="card-text">Temp: ${todaysTemperature}</p>
                    <p class="card-text">Wind: ${todaysWindSpeedRounded}</p>
                    <p class="card-text">Humidity: ${todaysHumidity}</p>
                    </div>`
                } else {
                    let forecastCard = document.createElement("div");
                    forecastCard.setAttribute("class", "card");
                    forecastCard.innerHTML =
                    `<h5 class="card-title">${getDate}</h5>
                    <img src="${weatherIconURL}" alt="The weather icon">
                    <div class="card-body">
                    <p class="card-text">Temp: ${todaysTemperature}</p>
                    <p class="card-text">Wind: ${todaysWindSpeedRounded}</p>
                    <p class="card-text">Humidity: ${todaysHumidity}</p>
                    </div>`;
                    forecastCardDeck.append(forecastCard);
                }
            }
        })
}