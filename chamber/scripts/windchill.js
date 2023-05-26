function windchill(windspeed, temperature){
    // Get the HTML elemnt to update

    const temperatureElt = document.querySelector("#temperature");
    const windspeedElt = document.querySelector("#windspeed");
    const windchillElt = document.querySelector("#windchill");

    //Calculate the Windchill, if applicable
    let windchillMsg = "N/A";

    if(windchill >= 3.0 && temperature <= 50){

        chillFactor = Math.pow(windspeed, 0.16);
        windchillamt = Math.round(35.74 + (0.6215 * temperature) - (35.75 * chillFactor) + (0.4275 * temperature * chillFactor));
        windchillMsg = `$(windchillamt)`;
    }
    
    //Update the HTML elements with values

    temperatureElt.textContent = temperature;
    windspeedElt.textContent = windspeed;
    windchillElt.textContent = windchillMsg;
}

//Call the windchill function with placeholder values
windchill(5,5)