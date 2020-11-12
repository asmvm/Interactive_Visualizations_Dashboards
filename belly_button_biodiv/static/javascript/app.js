// Initialize page with default plots
// Use D3 to fetch and read the JSON file
function demographicPanel(id) {
    
    d3.json("samples.json").then((importedData) => {      
        console.log(importedData);
        var metadata = importedData.metadata;
        // console.log(metadata);
        // Filter the data for the object with the desired sample number
        var filteredData = metadata.filter(m => m.id == id);
        var object = filteredData[0];
        console.log(object);
        // Use d3 to select the panel with id of `#sample-metadata`
        var demoPanel = d3.select("#sample-metadata");
        // Use `.html("") to clear any existing metadata
        demoPanel.html("");

        Object.entries(object).forEach(([key, value]) => {
            demoPanel.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
        
    });
}    
    
function buildPlots(id) {
    d3.json("samples.json").then((importedData) => {      
        // console.log(importedData);
        var data = importedData.samples;
        var filtData = data.filter(m => m.id == id);
        console.log(filtData);
        var samples_object = filtData[0];
        console.log(samples_object);

        // console print the data we are interested in extracting
        var otu_ids = samples_object.otu_ids;
        console.log(otu_ids);
        var sample_values = samples_object.sample_values;
        console.log(sample_values);
        var otu_labels = samples_object.otu_labels;
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

    });
}

function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdown = d3.select("#selDataset");
    // Populate all the sample names as options in the dropdown menu
    d3.json("./samples.json").then((importedData) => {
        var sampleNames = importedData.names;
        sampleNames.forEach((sample) => {
            dropdown
            .append("option")
            .text(sample)
            .property("value", sample);
        });

        // Use the first sample name from the List to build initial plots
        initialName = sampleNames[0]
        buildPlots(initialName);
        demographicPanel(initialName);
    });  
    
}
// Fetch new data each time a new ID is selected
function optionChanged (newID) {
      buildPlots(newID);
      demographicPanel(newID);
}

// Initialize the Dashboard
init();
       
