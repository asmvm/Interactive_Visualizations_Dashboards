d3.json("./samples.json").then((importedData) => {
      
    // console.log(data);
    var data = importedData.samples;
    // Object.keys(data).forEach(key => console.log(key));
    Object.values(data).forEach(value => console.log(value));
    // Object.entries(data).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
    
    // console print the data we are interested in extracting
    var otu_ids = data.map(function(d) {
        return d.otu_ids
    });
    console.log(otu_ids);
    
    var sample_values = data.map(function(d) {
        return d.sample_values
    });
    console.log(sample_values);

    var otu_labels = data.map(function(d) {
        return d.otu_labels
    });
    console.log(otu_labels);

    // Grab the values from the data samples object to build the plot
    var sliced_values = sample_values[6].slice(0,10).reverse();
    console.log(sliced_values);
    var sliced_labels = otu_labels[6].slice(0,10);
    console.log(sliced_labels);
    var sliced_ids = otu_ids[6].slice(0,10);
    console.log(sliced_ids);
    
    var top_ten_id = sliced_ids.map(d => "OTU " + d);

    //  Create the Traces
    var trace1 = {
      x: sliced_values,
      y: top_ten_id,
      type: "bar",
      text: sliced_labels,
      orientation: 'h',
      marker: {
        width: 3,
        color: 'rgba(50,171,96,0.6)',
        line: {
          color: 'rgba(50,171,96,1.0)',
          width: 2
        }
      },
      name: 'OTU Top 10',  
    };
  
    // Create the data array for the plot
    var data = [trace1];
  
    // Define the plot layout
    var layout = {
      title: "Sample 6",
      xaxis: { title: "Value" },
      // yaxis: { title: "OTU ID" }
    };
  
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);
  });