const weather = document.querySelector(".js-weather");

const API_KEY = "8a0f347bd074c54a4d4b23161d39ad03";

const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    ).then(function(response){
      return response.json();
    }).then(function(json){
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}℃ @ ${place}`
    })
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError(){
  console.log('Cant access GeoLocation');
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init(){
  loadCoords()
}

init();