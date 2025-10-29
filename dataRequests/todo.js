
import { myToDo } from "./dataGlobals.js";

// for (let x = 0; x < 28; x++ ){
    //     myToDo.append([]) // add 28 empty lists to the list
    // }
    
function addWaterPlants() {
    for (let i = 1; i < 31; i++)  {
        // water plants every 3rd day of the week
        if (i % 3 === 0 && i % 9 !== 0) {
            myToDo[String(i)].push("water flowers");
        }
        if (i % 9 === 0) {
            myToDo[String(i)].push("Sink water plants");
        }

        if (i % 7 === 0) {
            myToDo[String(i)].push("Put on vaccuum")
            myToDo[String(i)].push("Clean kitchen area")
            myToDo[String(i)].push("Take out trash")
            myToDo[String(i)].push("Take out Recycling")
        }
        if (i % 14 === 0) {
            myToDo[String(i)].push("Mop floors")
            myToDo[String(i)].push("Clean bed(s)")
            myToDo[String(i)].push("Clean Bathroom")
        }


    }    
}
    
    
export async function populateToDo() {
    // I'll leave it as a dict for the moment as i may want to change this to something else later on.
    
    myToDo[1] = [];
    myToDo[2] = [];
    myToDo[3] = [];
    myToDo[4] = [];
    myToDo[5] = [];
    myToDo[6] = [];
    myToDo[7] = [];
    myToDo[8] = [];
    myToDo[9] = [];
    myToDo[10] = [];
    myToDo[11] = [];
    myToDo[12] = [];
    myToDo[13] = [];
    myToDo[14] = [];
    myToDo[15] = [];
    myToDo[16] = [];
    myToDo[17] = [];
    myToDo[18] = [];
    myToDo[19] = [];
    myToDo[20] = [];
    myToDo[21] = [];
    myToDo[22] = [];
    myToDo[23] = [];
    myToDo[24] = [];
    myToDo[25] = [];
    myToDo[26] = [];
    myToDo[27] = [];
    myToDo[28] = [];
    myToDo[29] = [];
    myToDo[30] = [];
    myToDo[31] = [];
    addWaterPlants();

}




// let date = new Date();

// console.log(date);
// console.log(date.getDay());
// console.log(date.getMonth());
// console.log(date.getDate());