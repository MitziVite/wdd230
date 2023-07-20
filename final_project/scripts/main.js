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

  const today = new Date().setHours(0, 0, 0, 0);

  if (date.setHours(0, 0, 0, 0) === today) {
    return "today";
  } else {
    return daysOfWeek[dayIndex];
  }
}


  function displayResults(weatherData) {
    const currentWeather = weatherData.list[0];
    const forecasts = weatherData.list.slice(0, 3); // Obtener los siguientes 4 elementos de la lista de pronósticos
    const weatherContainer = document.getElementById("weather-container");

    const currentWeatherCard = createWeatherCard(currentWeather, false, 0);
    weatherContainer.appendChild(currentWeatherCard);

    forecasts.forEach((forecast, index) => {
      const forecastCard = createWeatherCard(forecast, false, index + 1);
      weatherContainer.appendChild(forecastCard);
    });
  }

  function createWeatherCard(data, isCurrent, dayOffset) {
    const date = new Date(data.dt * 1000); // Convertir la fecha UNIX a una fecha legible
    date.setDate(date.getDate() + dayOffset); // Ajustar la fecha en base al desplazamiento (dayOffset)
    const dayOfWeek = getDayOfWeek(date); // Obtener el día de la semana
    const temp = kelvinToFahrenheit(data.main.temp);
    const desc = data.weather[0].description;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const hum = data.main.humidity;
    const tempMin = kelvinToFahrenheit(data.main.temp_min);
    const tempMax = kelvinToFahrenheit(data.main.temp_max);

    const weatherCard = document.createElement("div");
    weatherCard.className = "weather-card";

    const dateHeading = document.createElement("h3");
    dateHeading.textContent = dayOfWeek; // Mostrar el día de la semana en lugar de la fecha completa

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
      const response = await fetch(weatherURL);
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

  getWeather();

  const currentDate = moment();
  const formattedDate = currentDate.format("MM/DD/YYYY  HH:mm:ss");
  document.querySelector("#date2").textContent = formattedDate;

