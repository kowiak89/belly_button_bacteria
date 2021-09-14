//console.log(cityGrowths);

// 1. Sort the cities in descending order of population growth.
// var citiesSorted = cityGrowths.sort((a,b) => a.population - b.poplulation);
// console.log(citiesSorted);

var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse()
console.log(sortedCities);

var topFiveCities = sortedCities.slice(0,5);
console.log(topFiveCities);

var topFiveCityNames = topFiveCities.map(city => city.City);
console.log(topFiveCityNames);

var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
console.log(topFiveCityGrowths);

// Create a bar chart of the new arrays
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: { title: "City" },
    yaxis: { title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);

// ******** SKILL DRILL TIME!! ********** ******** SKILL DRILL TIME!! **********

// Skill Drill: Create a bar chart of the 7 largest cities by population

// 1. Sort the cities by population
var sortedCities2 = cityGrowths.sort((a,b) => a.population - b.population).reverse();
// 2. Slice only the top 7 largest cities
var top7cities = sortedCities2.slice(0,7);

// 3. Create the x and y values of city name and population size
var trace2 = {
    x: top7cities.map(city => city.City),
    y: top7cities.map(city => parseInt(city.population)),
    type: "bar"
};
var data2 = [trace2];
var layout2 = {
    title: "7 Largest Cities by Population",
    xaxis: { title: "City"},
    yaxis: { title: "Population Size" }
};
// 4. Create the new plotly plot
Plotly.newPlot("bar-plot", data2, layout2);

// ******** SKILL DRILL OVER!! ********** ******** SKILL DRILL OVER!! **********

