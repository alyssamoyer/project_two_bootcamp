d3.json("/api/v1.0/allAUSfiredata").then(function(data) {
    console.log(data);
 

    //iterate through the hc_arrays and split the entries into arrays of three that represent the x,y,value for the heat map
  
     dates = [];
     brights = [];

     Object.entries(data).forEach(([key, value]) => {

        var date = value.acq_date;
        var time = value.acq_time;
        var bright = value.brightness;
     
        dates.push(date);
        brights.push(bright);

        
      });

      console.log(dates);
      console.log(brights);
      //Create horizontal bar chart for the top ten OTU ids
    var trace1 = {
        x: dates,
        y: brights,
        type:"bar",
        orientaiton: "h",
        // text: labels.slice(0,10),
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

    //set the y axis to the type category so all OTUs display
    var layout = {
        yaxis: {
            title: "Brightness (Kelvin)"
        },
        title: `Fire Brightness (Kelvin) over Time`
    };
    //add chart to page
    Plotly.newPlot("bar", data, layout);
  
   
    


 
});

