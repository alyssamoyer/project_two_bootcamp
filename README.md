# Fires in Australia August 2019 - September 2019

## Dataset 
The data used was collected by the NASA satellites Terra MODIS and Aqua MODIS. The NASA satellite data used covers the period of August - September 2019. The entire fire season spanned June 2019 - February 2020. Data was acquired from Kaggle: https://www.kaggle.com/carlosparadis/fires-from-space-australia-and-new-zeland

## Data Cleaning and Transformation
The CSV of the data was loaded into jupyter notebook as a dataframe. We looped through the data and added new columns for the day of the week and time of day (bins). We then created a separate dataframe that grouped the dataset by day of week and time of day. For the purpose of the high charts heat map visualization x and y value columns were added that represented the x and y values of day of week and time of day.
![Dates](static/Images/data_groupby.png)

## Database and Flask
From jupyter notebook the clean data was exported to CSVs. We then created two databases in SQLite to hold the larger dataset and the grouped data. In our python app we then connected to the database and created flask app routes for each dataset. The app route returns the data in json format. NOTE: Installing simplejson is required for data to load properly. We created app routes for each visualization. The app routes render each visualizations HTML index. 

## Visualizations
![Dates](static/images/bar_chart.png)
![Dates](static/images/heatmap.png)
