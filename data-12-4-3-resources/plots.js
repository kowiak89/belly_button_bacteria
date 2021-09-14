// Create the optionChanged function to handle the change from the dropdown menu
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

// Build the buildMetadata function
function buildMetadata(sample) { // sample will be the individuals id number ie. 940
    d3.json("samples.json").then((data) => { // use d3 to go through the data
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); // filter through the metadata variable to only get the selected users id
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  


      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => 
      // this line uses Object.entries with the result variable to go through each line of result and get the [key:value]
      {PANEL.append("h6").text(key + ': ' + value);});
    });
  }


// Create the init function for when the webpage loads
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();