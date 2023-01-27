// --- Global Variable ---
let searchForm = document.querySelector(".form");
let searchInput = document.querySelector("#search-input");
//let historyContainer = document.querySelector("#history"); 
//let todayContainer = document.querySelector("#today");

// application functions:
// 1) enter city in textbox
//      add eventlistener on "submit" for city search
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let chosenCity = searchInput.value;
    addCityToHistory(chosenCity);
    getTodaysWeather(chosenCity);
})

// 2) save entered city into local storage (nest within (1))
//      create: function addToHistory();     
function addCityToHistory(chosenCity) {
    let searchHistoryArray = JSON.parse(localStorage.getItem("citySearchHistory")) || [];
    searchHistoryArray.unshift(chosenCity);
    localStorage.setItem("citySearchHistory", JSON.stringify(searchHistoryArray));
}

// 3) add city to history section (after adding bootstrap list and buttons to the index file)
//      on eventlistener "click" for city search: 
//          for loop:
//          let historyButton = document.createElement("button");
//          historyButton.textContent = citiesHistoryArray[i];
//          historyContainer.prepend(historyButton);

// 4) return today's weather
function getTodaysWeather(chosenCity) {
    //          (i) get lat and lon of city:
    //              API query URL:
    let geoDataURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + chosenCity + "&limit=5&appid=7018058f3ae12d10c5b76a1ecf1894e9"

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
            let chosenCityName = weatherData.city.name;

            // get today's date
            let getDate = moment(weatherData.list[0].dt, "X").format("D/M/YYYY");

            // get weather icon
            let weatherIconRef = weatherData.list[0].weather[0].icon;
            let weatherIconURL = `http://openweathermap.org/img/wn/${weatherIconRef}@2x.png`;

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


