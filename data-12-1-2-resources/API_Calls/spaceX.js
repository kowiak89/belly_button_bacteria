const url = "https://api.spacexdata.com/v2/launchpads";


var lat = []
const spaceData = d3.json(url).then()

console.log(spaceData)

// d3.json(url).then(spaceXResults =>
//     console.log(spaceXResults.location.latitude));

d3.json("samples.json").then(function(data){
    console.log("hello there this is working");
});