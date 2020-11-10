// Initialize page with default plots
// Use D3 to fetch and read the JSON file
function buildPlots(id) {
    d3.json("./samples.json").then((importedData) => {      
        console.log(importedData);
        var data = importedData.samples;

        // Object.entries(data).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
        
        // console print the data we are interested in extracting
        var otu_ids = data[0].otu_ids;
        console.log(otu_ids);
    
        var sample_values = data[0].sample_values;
        console.log(sample_values);

        var otu_labels = data[0].otu_labels;
        console.log(otu_labels);

        // Grab the values from the data samples object to build the plot
        // Slice the first 10 objects for plotting
        var sliced_ids = otu_ids.slice(0,10);
        console.log(sliced_ids);
        var sliced_values = sample_values.slice(0,10).reverse();
        console.log(sliced_values);
        var sliced_labels = otu_labels.slice(0,10);
        console.log(sliced_labels);
        
        var top_ten_id = sliced_ids.map(d => "OTU " + d);

        //  Create the trace for bar plot
        var trace1 = {
        x: sliced_values,
        y: top_ten_id,
        type: "bar",
        text: sliced_labels,
        orientation: 'h',
        marker: {
            width: 3,
            color: 'rgba(50,171,96,0.6)',
            line: {color: 'rgba(50,171,96,1.0)',width: 2}
        },
        name: 'OTU Top 10',  
        };
        
        //  Create the trace for bubble chart
        var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels, 
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values,
            colorscale: 'Jet',
        }
        };
    
        // // Create the data array for the BAR PLOT
        var data1 = [trace1];
        // Create the data array for the BUBBLE CHART
        var data2 = [trace2];
    

        // // Define the BAR PLOT layout
        var layout1 = {
        title: "Sample",
        xaxis: { title: "Value" },
        //   yaxis: { tickmode:"linear" }
        };
        // Define the BUBBLE CHART layout
        var layout2 = {
        //   margin: {t:0},
        title: 'Bellybutton Biodiversity',
        xaxis: { title: "OTU ID"},
        // showlegend: false,
        // height: 700,
        // width: 1500
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data1, layout1);
        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot("bubble", data2, layout2);

        // var metadata = importedData.metadata;
        // console.log(metadata);

    });
};
buildPlots();

function demographicPanel(id) {
    d3.json("./samples.json").then((importedData) => {      
        var metadata = importedData.metadata;
        console.log(metadata);

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(metadata).forEach(([key, value]) => {
            // Log the key and value
            panel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });

    });

};

function optionChanged(id) {
    buildPlots(id);
    demographicPanel(id);
}


function init() {
    // Grab a Reference to the Dropdown Select Element
    var dropdown = d3.select("#selDataset");
  
    // Use the List of Sample Names to Populate the Select Options
    d3.json("./samples.json").then((dataNames) => {
      dataNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the First Sample from the List to Build Initial Plots
      var firstName = dataNames[0];
      buildPlots(firstName);
      demographicPanel(firstName);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch New Data Each Time a New Sample is Selected
    buildPlots(id);
    demographicPanel(id);
  }
  
  // Initialize the Dashboard
  init();
