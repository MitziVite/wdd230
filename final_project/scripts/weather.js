const lat1 = 19.43;
const lon1 = 99.13;
const appid1 = "aec8372b3538aac5be3fb27c66198b48";
const weatherURL1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon1}&appid=${appid1}`;

function kelvinToFahrenheit(temp) {
  return ((temp - 273.15) * 9 / 5 + 32).toFixed(0);
}

function getDayOfWeek(date) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

function createWeatherCard(data, isCurrent, dayOfWeek) {
  const date = new Date(data.dt * 1000); // Convertir la fecha UNIX a una fecha legible
  const temp = kelvinToFahrenheit(data.main.temp);
  const desc = data.weather[0].description;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const hum = data.main.humidity;
  const tempMin = kelvinToFahrenheit(data.main.temp_min);
  const tempMax = kelvinToFahrenheit(data.main.temp_max);

  const weatherCard = document.createElement("div");
  weatherCard.className = "weather-card";

  const dateHeading = document.createElement("h3");
  dateHeading.textContent = isCurrent ? "today" : dayOfWeek;

  const figure = document.createElement("figure");
  const weatherIcon = document.createElement("img");
  weatherIcon.src = iconsrc;
  weatherIcon.alt = "";
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = desc;
  figure.appendChild(weatherIcon);
  figure.appendChild(figcaption);

  const tempParagraph = document.createElement("p");
  tempParagraph.innerHTML = `<strong>${temp}</strong> &deg;F`;

  weatherCard.appendChild(dateHeading);
  weatherCard.appendChild(figure);
  weatherCard.appendChild(tempParagraph);

  if (isCurrent) {
    const humidityParagraph = document.createElement("p");
    humidityParagraph.textContent = `Humidity: ${hum}%`;
    weatherCard.appendChild(humidityParagraph);
  } else {
    const tempMinMaxParagraph = document.createElement("p");
    tempMinMaxParagraph.innerHTML = `High: <strong>${tempMax}</strong> &deg;F<br>Low: <strong>${tempMin}</strong> &deg;F`;
    weatherCard.appendChild(tempMinMaxParagraph);
  }

  return weatherCard;
}

async function getWeather() {
  try {
    const response = await fetch(weatherURL1);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(weatherData) {
  const currentWeather = weatherData.list[0];
  const forecasts = weatherData.list.slice(1, 4); // Cambiar a 5 para obtener cuatro pronósticos
  const weatherContainer = document.getElementById("weather-container");

  const currentWeatherCard = createWeatherCard(currentWeather, true);
  weatherContainer.appendChild(currentWeatherCard);

  let tomorrow = new Date(); // Obtener la fecha de mañana
  tomorrow.setDate(tomorrow.getDate() + 1); // Establecer la fecha para mañana

  forecasts.forEach(forecast => {
    // Calcular el día de la semana para el pronóstico actual (comenzando desde mañana)
    const dayOfWeek = getDayOfWeek(tomorrow);
    const forecastCard = createWeatherCard(forecast, false, dayOfWeek);
    weatherContainer.appendChild(forecastCard);

    // Avanzar al siguiente día para el próximo pronóstico
    tomorrow.setDate(tomorrow.getDate() + 1);
  });
}

getWeather();
