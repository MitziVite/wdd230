  const lat2 = 19.43;
  const lon2 = 99.13;
  const appid = "aec8372b3538aac5be3fb27c66198b48";
  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat2}&lon=${lon2}&appid=${appid}`;

  function kelvinToFahrenheit(temp) {
    return ((temp - 273.15) * 9 / 5 + 32).toFixed(0);
  }

  function getDayOfWeek(date) {
    const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const today = new Date().setHours(0, 0, 0, 0);

    if (date.setHours(0, 0, 0, 0) === today) {
      return "today";
    } else {
      const dayIndex = date.getDay();
      return daysOfWeek[dayIndex];
    }
  }

  function displayResults(weatherData) {
    const currentWeather = weatherData.list[0];
    const forecasts = weatherData.list.slice(1, 5); // Obtener los siguientes 4 elementos de la lista de pronósticos
    const weatherContainer = document.getElementById("weather-container");

    const currentWeatherCard = createWeatherCard(currentWeather, true);
    weatherContainer.appendChild(currentWeatherCard);

    let nextDate = new Date(currentWeather.dt * 1000);
    forecasts.forEach(forecast => {
      const forecastCard = createWeatherCard(forecast, false);
      weatherContainer.appendChild(forecastCard);
      nextDate.setDate(nextDate.getDate() + 1); // Incrementar la fecha en un día
    });
  }

  function createWeatherCard(data, isCurrent) {
    const date = new Date(data.dt * 1000); // Convertir la fecha UNIX a una fecha legible
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
    dateHeading.textContent = dayOfWeek;
    // dateHeading.appendChild(list.dt)
     // Mostrar el día de la semana en lugar de la fecha completa

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

