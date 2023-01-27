// --- Global Variable ---
//let historyContainer = document.querySelector("#history"); 

// application functions:
// 1) enter city in textbox
//      add eventlistener on "click" for city search
//      if form: add preventDefault();
//      let #search-input.value = cityInput

// 2) save entered city into local storage (nest within (1))
//      create: function addToHistory();     
//      declare cityHistory as array, or retrieve from localStorage's citiesHistory if available    
//      create array: let citiesHistoryArray = JSON.parse(localStorage.getItem("citiesHistory")) || [];
//      citiesHistoryArray.push(cityInput);
//      localStorage.setItem("citiesHistory", JSON.stringify(citiesHistoryArray));

// 3) add city to history section
//      on eventlistener "click" for city search: 
//          for loop:
//          let historyButton = document.createElement("button");
//          historyButton.textContent = citiesHistoryArray[i];
//          historyContainer.prepend(historyButton);

// 4) return today's weather
//      create function todaysWeather() = 
//          (i) get lat and lon of city:
//              
//              API query URL:
//              let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=7018058f3ae12d10c5b76a1ecf1894e9"   
//              
//              fetch(queryURL).
//               then(response => response.json())
//                .then(function (response) {
//                      let lat = response[0].lat
//                      let lon = response[0].lon
// 
//              (ii) get today's weather for city
// 
// 
//                  
//              })
//                  
//      
// 
// 
// 




// 5) return 5 day forecast

             