//Enter your City as per the format from Openweathermap.org
let cIty="Boston,US"
// Visual crossing API key for forecast - www.visualcrossing.com/
let ApiKey = 'ME727NEVFDFPU4AE2BNKCZY53'


export function getForecast() {
    
    // get current time as unix (S) - 4h for east coast..
    let currentTime = (Date.now() / 1000) - (60 * 60 * 4)
    // get 7 day forecast ahead
    let targetDate = currentTime + (60 * 60 * 24 * 7)
       
    // This is the core of our weather query URL
    let BaseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'

    //UnitGroup sets the units of the output - us or metric
    let UnitGroup='metric'

    //Location for the weather data

    //Optional start and end dates
    //If nothing is specified, the forecast is retrieved. 
    //If start date only is specified, a single historical or forecast day will be retrieved
    //If both start and and end date are specified, a date range will be retrieved
    let StartDate = ''
    let EndDate=''

    //JSON or CSV 
    //JSON format supports daily, hourly, current conditions, weather alerts and events in a single JSON package
    //CSV format requires an 'include' parameter below to indicate which table section is required
    let ContentType="json"

    //include sections
    //values include days,hours,current,alerts
    let Include="days"


    console.log('')
    console.log(' - Requesting weather : ')

    //basic query including location
    let ApiQuery=BaseURL + cIty

    //append the start and end date if present
    if (String(StartDate).length){
        ApiQuery+="/"+StartDate
        if (String(EndDate).length){
            ApiQuery+="/"+EndDate
        }
    }

    //Url is completed. Now add query parameters (could be passed as GET or POST)
    ApiQuery+="?"
    //append each parameter as necessary
    if (String(UnitGroup).length)
        ApiQuery+="&unitGroup="+UnitGroup

    if (String(ContentType).length)
        ApiQuery+="&contentType="+ContentType

    if (String(Include).length)
        ApiQuery+="&include="+Include

    ApiQuery+="&key="+ApiKey



    console.log(' - Running query URL: ', ApiQuery)
    console.log()

    fetch(ApiQuery)
    .then(response => response.json())
    .then(weatherData => {
    
        console.log(weatherData);

        for (let i = 0; i < weatherData['days'].length; i++) {
            console.log(weatherData["days"][i]['feelslike'])
            forecast.push(String(weatherData["days"][i]['feelslike']))
            forecastdays.push(weatherData["days"][i]['datetime'].slice(weatherData["days"][i]['datetime'].length - 5, weatherData["days"][i]['datetime'].length));
        }

        forecast = forecast.slice(0, 7);  // only want first 7 days
        forecastdays = forecastdays.slice(0, 7);  // only want first 7 days

        console.log(forecast);
        console.log(forecastdays);
    })
    .catch((error) => {
        console.log(error)
    });
    
}