var temp;
var weather;

function setTemp(tempKelvin) {
  temp = tempKelvin - 273.15;
  $("#temp").html(Math.floor(temp));
}

function getWeather(geolocation) {

  $("#city").html(geolocation.city + ", " + geolocation.regionName);
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + geolocation.lat + "&lon=" + geolocation.lon + "&APPID=3d46ddc5857d31d05cb855f315723e84", function(openApiJson) {
    $("#neighborhood").html(openApiJson.name + " Neighborhood");
    weather = openApiJson.weather[0].main;
     setIcon();
    $("#weather").html(weather);
    $("#humidity").html("Humidity: " + openApiJson.main.humidity + "%");
    $("#wind").html("Wind speed: " + openApiJson.wind.speed + "m/s");
    setTemp(openApiJson.main.temp);
  });
}

function getLocation() {
  $.getJSON("http://ip-api.com/json", getWeather);
}

function setIcon() {
  var weatherIcon = "ion-home";
  console.log(weather);
  switch (weather) {
    case "Thunderstorm":
      weatherIcon = "ion-ios-thunderstorm";
      break;
    case "Drizzle":
    case "Rain":
      weatherIcon = "ion-ios-rainy";
      break;
    case "Snow":
      weatherIcon = "ion-ios-snowy";
      break;
    case "Atmosphere":
      weatherIcon = "ion-ios-partlysunny";
      break;
    case "Clear":
      weatherIcon = "ion-ios-sunny";
      break;
    case "Clouds":
      weatherIcon = "ion-ios-cloudy";
      break;
    case "Extreme":
      weatherIcon = "ion-ios-thunderstorm";
      break;
    case "Additional":
      weatherIcon = "ion-ios-cloudy-night";
      break;
    default: 
      weatherIcon = "ion-ios-moon";
      break;
  }
  
  $("#weatherIcon").addClass(weatherIcon);
}

$(document).ready(function() {
  var today = new Date();
  $("#date").html(today.toDateString());
  getLocation();
 
  $(".unit").click(function() {
    if (!$(this).is(".active")) {
      $(".unit.active").removeClass("active");
      $(this).addClass("active");
      if ($(this).is("#far")) {
        temp = temp * 9 / 5 + 32;
      } else {
        temp = (temp - 32) * 5 / 9;
      }
      $("#temp").html(Math.floor(temp));
    }
  });
});