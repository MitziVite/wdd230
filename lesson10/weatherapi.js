const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

const lat = 43.82;
const lon = -111.79;
const appid = 'aec8372b3538aac5be3fb27c66198b48'
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);
    const desc = weatherData.weather[0].description;
    captionDesc.textContent = desc;
}

async function apiFetch(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch(weatherURL);