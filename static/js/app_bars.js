d3.json("/api/v1.0/allAUSfiredata").then(function(data) {
   
  //loop through the json value and for each day average the brightness 
   dates =[];
   brights = [];
  var uniqueKeys = new Set(data.map(el => el.acq_date));
  uniqueKeys.forEach(eachKey => {
    var eachDateRecords = data.filter(el => el.acq_date == eachKey);
    var avg_brightness = eachDateRecords.reduce( (avg_bright, eachRecord) => (avg_bright + eachRecord.brightness)/2, 0);
    dates.push(eachKey);
    brights.push(avg_brightness);
  });

  //loop through the json data and create add the frp value to one list and the brightness value to another list
  var frp_ls = [];
  var brightness_ls = [];
  Object.entries(data).forEach(([key, value]) => {

    var frp = value.frp;
    var brightness = value.brightness;

    frp_ls.push(frp);
    brightness_ls.push(brightness);
  });

  console.log(frp_ls);


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

  //create scatter plot using the lists of frp and brightness
  var trace2 = {
    x: frp_ls,
    y: brightness_ls,
    type:"scatter",
    mode: 'markers',
    marker: {
    color: 'rgba(221, 52, 0, 0.6)'
    }

};

var data2 = [trace2];

//set the y axis
var layout2 = {
    yaxis: {
        title: "Brightness (Kelvin)"
    },
    xaxis: {
       title: "Fire Radiative Power (MW)"
    },
    title: `Fire Radiative Power and Brightness of Australian Fires`
};
//add chart to page
Plotly.newPlot("scatter", data2, layout2);

});
  
