d3.json("/api/v1.0/allAUSfiredata").then(function(data) {
    
   dates =[];
   brights = [];
  var uniqueKeys = new Set(data.map(el => el.acq_date));
  uniqueKeys.forEach(eachKey => {
    var eachDateRecords = data.filter(el => el.acq_date == eachKey);
    var avg_brightness = eachDateRecords.reduce( (avg_bright, eachRecord) => (avg_bright + eachRecord.brightness)/2, 0);
    dates.push(eachKey);
    brights.push(avg_brightness);
  });


    //Create horizontal bar chart
  var trace1 = {
      x: dates,
      y: brights,
      type:"bar",
      orientaiton: "h",
      marker: {
          color: 'rgba(243, 181, 4, 0.6)',
          width: 1
        },
        line: {
          color: 'rgb(253, 158, 4, 1)',
          width: 1.5
        }

  };

  var data = [trace1];

  //set the y axis
  var layout = {
      yaxis: {
          title: "Brightness (Kelvin)"
      },
      xaxis: {
         title: "Date"
      },
      title: `Average Fire Brightness (Kelvin) per Day`
  };
  //add chart to page
  Plotly.newPlot("bar", data, layout);

});
  
