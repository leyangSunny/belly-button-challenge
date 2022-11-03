
function init() {
  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then((Belly) => {
      Belly.names.forEach((item) => {
          dropdown.append("option").text(item).property("value", item);
      });
      var bellyID = dropdown.property("value");
      console.log(bellyID);
      CreateBar(bellyID);
      CreateBubble(bellyID);
      Info(bellyID);
  }); 
}

function optionchoose(bellyID) {
  console.log(bellyID);
  CreateBar(bellyID);
  CreateBubble(bellyID);
  Info(bellyID);
}

function Info(details) { 

  var board = d3.select("#sample-metadata");
 
  d3.json("samples.json").then(function(data) {
      var DataNeeded = data.metadata.filter(object =>object.id.toString() == details)[0];
      console.log(DataNeeded);

  Object.entries(DataNeeded).forEach(([key, value]) => {
    board.append("h6").text(`${key}: ${value}`);
  });

})

}

function CreateBar(Bellydata) {

  d3.json("samples.json").then(function(data) {
          var chart = data.samples.filter(object =>object.id.toString() == Bellydata)[0];
          console.log(chart);
    
          var trace = {
              x : chart.sample_values.slice(0,10).reverse(),
              y : chart.otu_ids.slice(0,10).reverse().map (row => "OTU " + row),
              text: chart.otu_labels.slice(0,10).reverse(),
              type : "bar",
              orientation : "h"
          };

          var data = [trace];

          var layout = {
              height: 500,
              width: 500,
              
            };

          Plotly.newPlot("bar", data, layout);
})

}

function CreateBubble(Bellydata) {

  d3.json("samples.json").then(function(data) {
          var chart = data.samples.filter(object =>object.id.toString() == Bellydata)[0];
         
          var trace = {
              x : chart.otu_ids,
              y : chart.sample_values,
              text: chart.otu_labels,
              mode: 'markers',
              marker: {
                  size: chart.sample_values,
                  color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
              }
          };

          var data = [trace];

          var layout = {
              xaxis:{title: "OTU ID"},
              showlegend: false,
              height: 500,
              width: 1000
            };
            
          Plotly.newPlot("bubble", data, layout);
})
}

init();