
import { getForecast } from "./dataRequests/forecast.js";
import { rise } from "./dataRequests/rise.js";
import { getWeather}  from "./dataRequests/currentTemp.js";


// Creating an array for the number of divs on screen
let divContainers = {};
let divCountainerCountCount = 0;

// temp globals
let tempcond1 = null;
let handp1 = null;

// rise globals
let riseData1 = null;

// forecast globals
let forecast = [];
let forecastdays = [];


// call the function every 10 minutes
setInterval(getForecast(), 600000);
setInterval(rise(), 600000);
setInterval(getWeather(), 600000);







// creating a list of all the potential layouts
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
        return layoutCurTemp();
    }
    if (number == 2) {
        return layoutRiseData();
    }
    if (number == 3) {
        return layoutForecast();
    } 
    if (number == 4) {
        return layoutCPUData();
    }


    function layoutCurTemp() {
        let layout2 = document.createElement('div');
        let label2 = document.createElement('label');
        label2.innerHTML = tempcond1;
        layout2.appendChild(label2);
        return layout2;
    }
    
    function layoutRiseData() {
        let layout3 = document.createElement('div');
        let label3 = document.createElement('label');
        label3.innerHTML = riseData1;
        layout3.appendChild(label3);
        return layout3;
    }

    function layoutForecast() {
        let layout4 = document.createElement('div');
        let label4 = document.createElement('label');
        console.log(forecast);
        label4.innerHTML = forecast;
        layout4.appendChild(label4);
        return layout4;
    }

    function layoutCPUData() {
        let layout = document.createElement("div");
        let lbl = document.createElement("label");
        lbl.innerHTML = "cpuData"
        layout.appendChild(lbl);
        return layout;
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


/**
 * Function to read in the start file fields
 * TODO :
 * - if any fields are missing, we either don't start or request input
 */
function readStartFile() {
    
}




function main() {

    let curTime = Date.now();
    let counter = 0;
    document.getElementById("main").addEventListener("click", ()=> {
        // Creating a listener that will close the application if the screen is click 5 times in quick succession
        if (Date.now() - curTime <= 5000) {
            counter += 1;
            
            // close if we're > 5 inputs in 5 seconds
            if (counter > 5) {
                process.exit(0);
            }
        } else {
            time = Date.now();
            counter += 1;
        }

    })

    // if we want to make this easier, we'll need something that can find the current screen size.

    // start the 2 functions polling for data in background
    getWeather();
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

