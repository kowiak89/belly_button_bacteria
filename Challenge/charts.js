function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var samples = data.samples; 

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samples.filter(sampleNum => sampleNum.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = filteredSamples[0];
    console.log(result)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var sampleOTU_ids = result.otu_ids;
    var sampleOTU_labels = result.otu_labels;
    var sampleValues = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sortedSampleValues = sampleValues.sort((a,b) => a - b);
    console.log(sortedSampleValues);
    var top10OTU = sortedSampleValues.slice(-10,);
    console.log(top10OTU);

    var sampleId10 = sampleOTU_ids.slice(-10,)
    var testID = []
    var top10id = sampleId10.map(id => {
      return testID.push('OTU ' + id)
    });
    console.log("***************")
    console.log(testID);

    var yticks = sampleOTU_ids;
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: top10OTU,
      y: testID,
      text: sampleOTU_labels,
      type: "bar",
      orientation: 'h'
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Belly Button Bacteria",
      // yaxis: yticks
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 2**
    var colors = [];
    sampleOTU_ids.forEach(color => {
    if (color < 750) {
      colors.push("brown")
    } else if (color < 1500 && color > 750) {
      colors.push("green")
    } else if (color > 1500 && color < 2250) {
      colors.push("blue")
    } else if (color > 2250 && color < 3000) {
      colors.push("yellow")
    } else {
      colors.push("red")
    }})
    console.log(colors)

    var bubbleData = [{
      x: sampleOTU_ids,
      y: sampleValues,
      text: sampleOTU_labels,
      mode: 'markers',
      marker: {
        color: colors,
        size: sampleValues
      }

    }
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 


    // ******* DELIVERABLE 3 **************

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];
    console.log("*******METADATA******")
    console.log(result)


    // 3. Create a variable that holds the washing frequency.
    var washingFreq = result.wfreq
  
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
		  value: washingFreq,
		  title: { text: "Washing Frequency" },
		  type: "indicator",
		  mode: "gauge+number",
      gauge: {
        axis: { range: [0, 10] },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow"},
          { range: [6, 8], color: "lightgreen"},
          { range: [8, 10], color: "green"}
        ],
        bar: { color: "black" }}
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 

    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}






