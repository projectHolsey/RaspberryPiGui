//For Sunrise and Moonrise get your free Api key from ipgeolocation.io
let iPgeoAPI="3ff332c420ca4793ac965c97b66625f3"
//Enter your Location's Latitude
let iPgeoLAT="42.4154"
//Enter your locations's Longitude
let iPgeolong="71.1565"

export function rise() {

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
}