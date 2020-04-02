// function to return the category name associated with the x or y point
function getPointCategoryName(point, x_y) {
    var series = point.series,
        isY = x_y === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
}

d3.json("../../fire_archive_M6_96619_group.json").then(function(data) {
    console.log(data);
    var hc_values = data.hc_values

    hc_arrays = [];

    //iterate through the hc_arrays and split the entries into arrays of three that represent the x,y,value for the heat map
    Object.entries(hc_values).forEach(([key, value]) => {
          var split_value = value.split(",");
          var date_time_frp = [];
          split_value.forEach((string)  => {
            var int = parseInt(string);
            console.log(int);
            date_time_frp.push(int);

          })
          hc_arrays.push(date_time_frp);
      });
  
    
    
    console.log(hc_arrays);

    //create heat map from high charts library
    Highcharts.chart('hc_heatmap', {

        chart: {
            type: 'heatmap',
            marginTop: 50,
            marginBottom: 80,
            plotBorderWidth: 1
        },

        //create title for the chart
        title: {
            text: 'Average Fire Radiative Power of Australian Fires per Day of Week and Time of Day'
        },

        //Create seven x-axis ticks each representing a day of the week
        xAxis: {
            categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            min: 0,
            max:6,

        },

        //Create 6 y-axis ticks representing UTC time bins
        yAxis: {
            categories: ['0 - 4:00 UTC', '4:00 - 8:00 UTC', '8:00 - 12:00 UTC', '12:00 - 16:00 UTC', '16:00 - 20:00 UTC', '20:00 - 24:00 UTC'],
            reversed: false,
            min: 0,
            max: 5,
        },

        //Color axis sets the color range for the heat map. The range starts with white (#FFFFFF) 
        //and ends with a red pulled from high charts default color array
        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[3]
        },

        //Set the legend on the right of the chart that show the color range as related to the frp
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },

        //sets the caption for the tool tip when hovering over each box in the heatmap.
        tooltip: {
            formatter: function () {
                return '<b>' +'</b> Average Fire Radiative Power: <b>' +
                    this.point.value + '</b> MW <br><b>' +getPointCategoryName(this.point, 'x') + '</b>,  <b>' + getPointCategoryName(this.point, 'y') + '</b>';
            }
         },

         //series takes in the array data to plot. Data is in the format x,y,value. 
        series: [{
            name: 'Fire Radiative Power',
            borderWidth: 1,
            borderColor: '#fc9d03',
            data: hc_arrays
      
        }],

        responsive: {
            rules: [{
                condition: {
                 maxWidth: 500
            },
                chartOptions: {
                    yAxis: {
                        labels: {
                         formatter: function () {
                             return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }

});
 });