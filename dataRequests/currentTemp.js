
import { myGlobalVars } from "./dataGlobals.js"


//API ID from Openweathermap.org : Register to get a free API from openweathermap.org
let oWapi='cc2c427e479c4ce58d22220b7efe0d39'
//Enter your City as per the format from Openweathermap.org
let cIty="Boston,US"
//Choose your units. Change the C to F as required in Line 41
let uNits="metric"
// Line 36 concatenates the date form the FULL_URL for openweathermap.org

export function getWeather () {
    let full_url = "https://api.openweathermap.org/data/2.5/weather?q="+cIty+"&units="+uNits+"&appid="+oWapi
    
    fetch(full_url)
    .then(response => response.json())
    .then(data => {
        let data2 = data['main']
        let temp1 = data2["temp"]
        let tempc = String(temp1)+' C' //Change the C to F as required.

        let pressure1 = main['pressure']
        let pressurep = "P: "+String(pressure1)+' hpa'

        let humid1 = main['humidity']
        let humidh= "H:"+String(humid1)+' %'

        let wind = "WS: " + String(data['wind']['speed']) +" MPH"

        let handp1 = pressurep + "      " + humidh + "      " + wind

        let weather = data['weather']
        let condition1 = weather [0]['description']
        let condition2 = String(condition1)

        myGlobalVars["tempcond"] = tempc + " " + condition2;
        return tempc + "  " + condition2;
        
    })
    .catch((error) => {
        console.log(error)
    });
}