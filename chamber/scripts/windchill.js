function windchill(windspeed, temp){

    //Get HTML element to update
const tempElement = document.querySelector("#temp");
const windspeedElement  = document.querySelector("#wind-speed");
const windchillElement = document.querySelector("#wind-chill");

    //Calculate windchill, if applicable
    let windchillmsg = "N/A";
    if (windspeed > 3.0 && temp <= 50){
        let chillfactor = Math.pow(windspeed, 0.16);
        let windchillamt = Math.round(35.74 + (0.6215 * temp) - (35.75 * chillfactor) + (0.4275 * temp * chillfactor));
        windchillmsg = `${windchillamt}`;
    }
    //Update HTML element with values
    tempElement.textContent = temp;
    windspeedElement.textContent = windspeed;
    windchillElement.textContent = windchillmsg;
}

//call windchill
windchill(5, 45);