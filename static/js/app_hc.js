function getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
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


Highcharts.chart('hc_heatmap', {

    chart: {
        type: 'heatmap',
        marginTop: 50,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Fire Radiative Power of Australian Fires per Day of Week and Time of Day'
    },

    xAxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        min: 0,
        max:6,

    },

    yAxis: {
        categories: ['0 - 4:00 UTC', '4:00 - 8:00 UTC', '8:00 - 12:00 UTC', '12:00 - 16:00 UTC', '16:00 - 20:00 UTC', '20:00 - 24:00 UTC'],
        title: null,
        reversed: false,
        min: 0,
        max: 5,
    },

    // accessibility: {
    //     point: {
    //         descriptionFormatter: function (point) {
    //             var ix = point.index + 1,
    //                 xName = getPointCategoryName(point, 'x'),
    //                 yName = getPointCategoryName(point, 'y'),
    //                 val = point.value;
    //             return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
    //         }
    //     }
    // },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[3]
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    // return '<b>' + getPointCategoryName(this.point, 'x') + '</b> frp was <br><b>' +
    // this.point.value + '</b> MW at <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';

    tooltip: {
        formatter: function () {
            return '<b>' +'</b> Average Fire Radiative Power: <b>' +
                this.point.value + '</b> MW <br><b>' +getPointCategoryName(this.point, 'x') + '</b>,  <b>' + getPointCategoryName(this.point, 'y') + '</b>';
        }
    },

    series: [{
        name: 'Fire Radiative Power',
        borderWidth: 1,
        borderColor: '#fc9d03',
        data: hc_arrays,
        // dataLabels: {
        //     enabled: true,
        //     color: '#000000'
        // }
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