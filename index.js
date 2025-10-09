
import { getForecast } from "./dataRequests/forecast.js";
import { rise } from "./dataRequests/rise.js";
import { getWeather, getWeatherIcon }  from "./dataRequests/currentTemp.js";

import { myGlobalVars } from "./dataRequests/dataGlobals.js"

// Creating an array for the number of divs on screen
let divContainers = {};
let divCountainerCountCount = 0;

// temp globals

let handp1 = null;

// rise globals
let riseData1 = null;



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
async function createLayout(number) {

    console.log("Here");

    if (number === 1) {
        return await layoutCurTemp();
    }
    if (number === 2) {
        return await layoutRiseData();
    }
    if (number === 3) {
        return await layoutCPUData();
    }
    
    if (number === 4) {
        return await layoutForecast();
    } 

    async function layoutCurTemp() {
        let layout2 = document.createElement('div');
        let label2 = document.createElement('label');
        label2.innerHTML = myGlobalVars["tempcond"]["description"];
        label2.innerHTML += " ";
        label2.innerHTML += myGlobalVars["tempcond"]["temperature"];
        
        let icon = document.createElement('img');
        let iconToGet = myGlobalVars["tempcond"]["icon"];

        const response = await getWeatherIcon();
        const imageObjectURL = URL.createObjectURL(response);
    
        const image = document.createElement('img')
        image.src = imageObjectURL;
    
        
        layout2.appendChild(label2);
        layout2.appendChild(image);

        return layout2;
    }
    
    function layoutRiseData() {
        let layout3 = document.createElement('div');
        let label3 = document.createElement('label');
        label3.innerHTML = myGlobalVars["riseData"].join("\n");
        layout3.appendChild(label3);
        return layout3;
    }

    function layoutForecast() {
        let layout4 = document.createElement('div');
        layout4.style.display = "block";
        // for (let i = 0; i < myGlobalVars["forecastdays"].length; i++) {
            
        //     let tmpDiv = document.createElement("div");
        //     tmpDiv.style.display = "block";
            
        //     let label = document.createElement('label');
        //     label.innerHTML = myGlobalVars["forecastdays"][i];

        //     let label1 = document.createElement('label');
        //     label1.innerHTML = " : ";
            
        //     let label4 = document.createElement('label');
        //     label4.innerHTML = myGlobalVars["forecast"][i] + "C";
            
            
        //     tmpDiv.appendChild(label);
        //     tmpDiv.appendChild(label1);
        //     tmpDiv.appendChild(label4);
        //     layout4.appendChild(tmpDiv);
        // }

        let newCanvas = document.createElement("canvas");
        const ctx = newCanvas.getContext('2d');
        const myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: myGlobalVars["forecastdays"],
                datasets: [
                // {
                //     label: 'Feelslike',
                //     data: myGlobalVars["forecast"],
                //     borderColor: 'rgba(52, 24, 117, 1)',
                //     tension: 0.1
                // },
                {
                    label: 'min',
                    data: myGlobalVars["forecastmin"],
                    borderColor: 'rgba(49, 154, 223, 0.91)',
                    tension: 0.1
                },
                {
                    label: 'max',
                    data: myGlobalVars["forecastmax"],
                    borderColor: 'rgba(194, 62, 62, 1)',
                    tension: 0.1
                },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        layout4.appendChild(newCanvas);
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



async function createToDoList() {
    
    let todoList = document.getElementById("todochecklist");

    for (let i = 0; i < 3; i++) {
        let newDiv = document.createElement('div');
        let input = document.createElement('input');
        input.type = "checkbox";
        input.id = "cl_item" + String(i);
        let newLbl = document.createElement("label");
        newLbl.textContent = "Checklist item " + String(i);
        newLbl.htmlFor = "cl_item" + String(i);

        newDiv.appendChild(input);
        newDiv.appendChild(newLbl);
        todoList.appendChild(newDiv);    
    }

}

/**
 * Function to change the current layout of whatever div element was passed
 * 
 * @param {gui element} divElement 
 * @returns 
 */
async function changeLayout(divElement) {

    console.log(divElement);
    if (divElement.children.length === 0 ){
        // Create the first layout
        let newNode = await createLayout(1);
        divElement.appendChild(newNode);
    }
    
    // We get the current child element shown
    let childElement = divElement.children[0];
    console.log(childElement)
    
    // remove the current child
    divElement.removeChild(childElement);
    
    // reset the counter
    if (divContainers[divElement.id] == 3) {
        divContainers[divElement.id] = 1
    } else {
        // increment the counter
        divContainers[divElement.id] = divContainers[divElement.id] + 1;
    }
    
    let currentElementNum = divContainers[divElement.id];
    console.log(currentElementNum);
    // Add the new layout to the current div
    let newnode = await createLayout(currentElementNum)
    divElement.appendChild(newnode);

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




async function main() {

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
            let time = Date.now();
            counter += 1;
        }

    })

    // if we want to make this easier, we'll need something that can find the current screen size.

    // start the 2 functions polling for data in background
    await getWeather();
    await rise();
    await getForecast();

    // const screenHeight = 400;
    // const screenWidth = 700;
    // const numberOfSegments = 2;

    // // If there's only 1 segment, we make it the size of the screen
    // if (numberOfSegments == 1){
    //     createDiv(screenHeight, screenWidth);
    // } else if (numberOfSegments == 2) {
    //     // If there's 2, we make 2 that are half the height of the screen
    //     createDiv(screenHeight / 2, screenWidth);
    //     createDiv(screenHeight / 2, screenWidth);
    // } else if (numberOfSegments == 3) {
    //     // if 3, we create 3 divs. 1 half the size of the screen, the other is 1/4 the size of screen
    //     createDiv(screenHeight / 2, screenWidth);
    //     createDiv(screenHeight / 2, screenWidth / 2);
    //     createDiv(screenHeight / 2, screenWidth / 2);
    // } else {
    //     // If it's > 3, we're only gonna make 4 layouts
    //     createDiv(screenHeight / 2, screenWidth / 2);
    //     createDiv(screenHeight / 2, screenWidth / 2);
    //     createDiv(screenHeight / 2, screenWidth / 2);
    //     createDiv(screenHeight / 2, screenWidth / 2);
    // }

    // Now create a bunch of onClick functions for each div created
    for (let i = 1; i <= 2; i++) {

        if (i === 3) {
            continue;
        }
        let tmpDiv = document.getElementById("DivContainer" + i);
        tmpDiv.id = "DivContainer" + divCountainerCountCount;
        divContainers[tmpDiv.id] = 1;
        console.log(divContainers);

        console.log(tmpDiv);

        // Add the div to the main section on screen
        // document.getElementById('main').appendChild(tmpDiv);

        changeLayout(tmpDiv);

        // get the current div, set it's on click to change the current layout
        tmpDiv.addEventListener("click", () => {
            changeLayout(tmpDiv);
        });
    }

    // Adding the forecast as a permenant layout 
    let tmpDiv = document.getElementById("DivContainer3");
    let newNode = await createLayout(4);
    tmpDiv.appendChild(newNode);

    createToDoList();
}



main();

