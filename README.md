# Fires in Australia August 2019 - September 2019

## Dataset 
The data used was collected by the NASA satellites Terra MODIS and Aqua MODIS. The NASA satellite data used covers the period of August - September 2019. The entire fire season spanned June 2019 - February 2020. Data was acquired from Kaggle: https://www.kaggle.com/carlosparadis/fires-from-space-australia-and-new-zeland

## Data Cleaning and Transformation
The CSV of the data was loaded into jupyter notebook as a dataframe. We looped through the data and added new columns for the day of the week and time of day (bins). We then created a separate dataframe that grouped the dataset by day of week and time of day. For the purpose of the high charts heat map visualization x and y value columns were added that represented the x and y values of day of week and time of day.
![Dates](static/images/data_groupby.png)

## Database and Flask
From jupyter notebook the clean data was exported to CSVs. We then created two databases in SQLite to hold the larger dataset and the grouped data. In our python app we then connected to the database and created flask app routes for each dataset. The app route returns the data in json format. We created app routes for each visualization. The app routes render each visualizations HTML index. 

NOTE: Installing simplejson is required for data to load properly.

## Visualizations
Our visualizations were displayed on our homepage:
![Dates](static/images/page.PNG)

For our first visualization we choose to use the javascript library High Chart's heatmap. We grouped the average fire radiative power by day of week and time of day to see if there were any patterns in the radiative power by weekday or time of day. Fire Radiative Power (FRP) is a measure of the rate of radiant heat output from a fire (Roberts & Wooster "SEVIRI Fire Radiative Power (FRP) Dataset"). It is used to quantify burned biomass. Quantifying biomass is important because it helps estimate the amount of smoke caused by the fire. Smoke has detrimental effects on local humans and animals as well as larger consequences for the environment.

There were a few time periods that showed a clear heat spot such as Saturday, 8 -12 UTC but there was no clear overall pattern between fire radiative power and the time of day. Taking the average fire radiative power did hide the full range of FRPs over this time period. Well the heat map only showed a range from 0 to 200 the max FRP was actually 3679 MW.  



![Dates](static/images/heatmap.PNG)
The NASA satellites collected data on the brightness of the fire in Kelvin. For each day the satellites collected hundreds of brightness data points by latitude and longitude. For this chart we took the average brightness per day. This was not specific to a particular location in Australia but an average across locations. We expected to see some variation in brightness of the fire but there was very little variation in average fire brightness. 

Averaging the values by day may have not been the best choice to analyze this data. When we look at the raw data there is a range in the brightness of the fire with the max brightness being 504 Kelvin and the minimum being 300 Kelvin. A better way to look at this data would have been by latitude and longitude as the fire brightness varied more by location rather than day. Our original plan was to create a heatmap of the fire brightness.

![Dates](static/images/bar_chart.PNG)


We wanted to understand if fire brightness and radiative power were related. So we created a scatter plot of the two. For this scatter we used the raw data points since the average per day was not representative of the full range of brightness and FRP. We saw a positive correlation between brightness and FRP. There were only a few points that did not show a relationship with brightness having  a large value and fire radiative power being zero. Fire radiative power has a much larger range than fire brightness. It seems that fire radiative power can get very strong without affecting the brightness of the fire. If we had more time it would be interesting to compare the topography of the region to see how the burn material affects fire brightness and radiative power.

 
![Dates](static/images/scatter.PNG)

## Notes to Run
Programs must be installed to run app: simplejson, sqlalchemy, flask

Run app_all.py
