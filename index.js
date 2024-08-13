/**
 * Idea here is to create a layout that when clicked, it can change to another layout
 * 
 * So we're basically gonna make tiles that can be
 * 
 * 
 */



//API ID from Openweathermap.org : Register to get a free API from openweathermap.org
let oWapi='cc2c427e479c4ce58d22220b7efe0d39'
//Enter your City as per the format from Openweathermap.org
let cIty="Boston,US"
//Choose your units. Change the C to F as required in Line 41
let uNits="metric"
// Line 36 concatenates the date form the FULL_URL for openweathermap.org

//For Sunrise and Moonrise get your free Api key from ipgeolocation.io
let iPgeoAPI="3ff332c420ca4793ac965c97b66625f3"
//Enter your Location's Latitude
let iPgeoLAT="42.4154"
//Enter your locations's Longitude
let iPgeolong="71.1565"

// Visual crossing API key for forecast - www.visualcrossing.com/
let ApiKey = 'ME727NEVFDFPU4AE2BNKCZY53'

let tempcond1 = null;
let handp1 = null;
let riseData1 = null;
let forecast = [];
let forecastdays = [];


function getForecast() {
    
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
            console.log(i['feelslike'])
            forecast.push(String(i['feelslike']))
            forecastdays.push(i['datetime'].slice(i['datetime'].length - 5, i['datetime'].length));
        }

        forecast = forecast.slice(0, 7);  // only want first 7 days
        forecastdays = forecastdays.slice(0, 7);  // only want first 7 days
    })
    .catch((error) => {
        console.log(error)
    });
    

    setInterval(getForecast, 21600000)
    // root.after(21600000,getForecast)
}


function getdata () {
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

        handp1 = pressurep + "      " + humidh + "      " + wind

        let weather = data['weather']
        let condition1 = weather [0]['description']
        let condition2 = String(condition1)

        tempcond1 = tempc + "  " + condition2
    })
    .catch((error) => {
        console.log(error)
    });

    setInterval(getdata, 600000);
}

function rise() {

    let full_url = 'https://api.ipgeolocation.io/astronomy?apiKey='+iPgeoAPI+'&lat='+iPgeoLAT+'&long='+iPgeolong
    
    fetch(full_url)
    .then(response => response.json())
    .then(data => { 
        console.log(data);
        let moonrise = data['moonrise']
        let sunrise = data['sunrise']
    
        riseData1= ("Sunrise : " + sunrise + "     Mooonrise : " + moonrise )
        
    })
    .catch((error) => {
        console.error(error)
    });

    setInterval(rise, 21600000);
    // root.after(21600000,rise)
}


// creating a list of all the potential layouts=c
let layouts = [1,2,3,4];

/**
 * Function creates the layouts for each quadrant
 * Will return a NEW instance of a layout, rather than reference to
 * pre-defined ones... as this, evidently, doesn't work
 * 
 * @param {int} number - number of layout you want to give  
 * @returns 
 */
function createLayout(number) {

    console.log("Here");

    if (number == 1) {
        return createLayout1();
    }
    if (number == 2) {
        return createLayout2();
    }
    if (number == 3) {
        return createLayout3();
    }
    if (number == 4) {
        return createLayout4();
    }

    function createLayout1() {
        let layout1 = document.createElement('div');
        let label1 = document.createElement('label');
        label1.innerHTML = "Label 1";
        layout1.appendChild(label1);
        return layout1;
    }

    function createLayout2() {
        let layout2 = document.createElement('div');
        let label2 = document.createElement('label');
        label2.innerHTML = tempcond1;
        layout2.appendChild(label2);
        return layout2;
    }
    
    function createLayout3() {
        let layout3 = document.createElement('div');
        let label3 = document.createElement('label');
        label3.innerHTML = riseData1;
        layout3.appendChild(label3);
        return layout3;
    }

    function createLayout4() {
        let layout4 = document.createElement('div');
        let label4 = document.createElement('label');
        label4.innerHTML = forecast;
        layout4.appendChild(label4);
        return layout4;
    }

}

/**
 * Function to change the current layout of whatever div element was passed
 * 
 * @param {gui element} divElement 
 * @returns 
 */
function changeLayout(divElement) {

    console.log(divElement);
    if (divElement.children.length == 0 ){
        // Create the first layout
        divElement.appendChild(createLayout(1));
        return;
    }

    // We get the current child element shown
    let childElement = divElement.children[0];
    console.log(childElement)
    
    // remove the current child
    divElement.removeChild(childElement);
    
    // reset the counter
    if (divContainers[divElement.id] == 4) {
        divContainers[divElement.id] = 1
    } else {
        // increment the counter
        divContainers[divElement.id] = divContainers[divElement.id] + 1;
    }

    let currentElementNum = divContainers[divElement.id];
    console.log(currentElementNum);
    // Add the new layout to the current div
    divElement.appendChild(createLayout(currentElementNum));

}


// Creating an array for the number of divs on screen
let divContainers = {};
let divCountainerCountCount = 0;

/**
 * This will be the default function call to create a new div.
 * It will be assigned to a list under a unique ID
 * The size and location can be programmed here..
 * 
 * @param {int} height 
 * @param {int} width 
 * @param {enum} location 
 */
function createDiv(height, width, location=null){

    let newDiv = document.createElement('div');

    newDiv.style.height = height;
    newDiv.style.width = width;

    // Assign a new one based on length of current array
    newDiv.id = "DivContainer" + divCountainerCountCount;
    console.log(newDiv.id)
    divCountainerCountCount += 1;
    // We can assign all of them the same on click later on

    divContainers[newDiv.id] = 1;
    console.log(divContainers);

    document.getElementById('main').appendChild(newDiv);
}


function main() {

    // if we want to make this easier, we'll need something that can find the current screen size.

    // start the 2 functions polling for data in background
    getdata();
    rise();
    getForecast();

    const screenHeight = 400;
    const screenWidth = 700;
    const numberOfSegments = 2;

    // If there's only 1 segment, we make it the size of the screen
    if (numberOfSegments == 1){
        createDiv(screenHeight, screenWidth);
    } else if (numberOfSegments == 2) {
        // If there's 2, we make 2 that are half the height of the screen
        createDiv(screenHeight / 2, screenWidth);
        createDiv(screenHeight / 2, screenWidth);
    } else if (numberOfSegments == 3) {
        // if 3, we create 3 divs. 1 half the size of the screen, the other is 1/4 the size of screen
        createDiv(screenHeight / 2, screenWidth);
        createDiv(screenHeight / 2, screenWidth / 2);
        createDiv(screenHeight / 2, screenWidth / 2);
    } else {
        // If it's > 3, we're only gonna make 4 layouts
        createDiv(screenHeight / 2, screenWidth / 2);
        createDiv(screenHeight / 2, screenWidth / 2);
        createDiv(screenHeight / 2, screenWidth / 2);
        createDiv(screenHeight / 2, screenWidth / 2);
    }

    // Now create a bunch of onClick functions for each div created
    for (let i = 0; i < numberOfSegments; i++) {

        console.log(divContainers);

        let tmpDiv = document.getElementById("DivContainer" + i);

        console.log(tmpDiv);

        // Add the div to the main section on screen
        document.getElementById('main').appendChild(tmpDiv);

        changeLayout(tmpDiv);

        // get the current div, set it's on click to change the current layout
        tmpDiv.addEventListener("click", () => {
            changeLayout(tmpDiv);
        });
    }
}

main();