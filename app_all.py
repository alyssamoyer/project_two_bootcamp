import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, session

import json 
import requests
from datetime import datetime

import simplejson as json

engine = create_engine("sqlite:///firegroup3.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Group_fire = Base.classes.firegroup3

# Flask Routes 
app = Flask(__name__)

@app.route("/")
def heatmap():
    return render_template('index_hc.html')

@app.route("/api/v1.0/allgroupdata")
def allgroupdata():
    session = Session(engine)
    results = session.query(Group_fire.count, Group_fire.day_of_week, Group_fire.frp, Group_fire.x_value, Group_fire.y_value, Group_fire.hc_values).all()
    session.close

    all_firegroup = []

    for count, day_of_week, frp, x_value, y_value, hc_values in results:
        group_fire_dict = {}
        group_fire_dict["count"] = count
        group_fire_dict["day_of_week"] = day_of_week
        group_fire_dict["frp"] = frp
        group_fire_dict["x_value"] = x_value
        group_fire_dict["y_value"] = y_value
        group_fire_dict["hc_values"] = hc_values
        all_firegroup.append(group_fire_dict)

    return jsonify(all_firegroup)


engine2 = create_engine("sqlite:///allfiredata.sqlite")

# reflect an existing database into a new model
Base2 = automap_base()
# reflect the tables classes.tablename (table name is fireaus1)
Base2.prepare(engine2, reflect=True)
Aus_fire = Base2.classes.fireaus1


@app.route("/api/v1.0/allAUSfiredata")
def allAUSfiredata():
    session = Session(engine2)
    results = session.query(Aus_fire.count,Aus_fire.latitude, Aus_fire.longitude, Aus_fire.brightness, Aus_fire.scan, Aus_fire.track, Aus_fire.acq_date, Aus_fire.acq_time, Aus_fire.satelite, Aus_fire.instrument, Aus_fire.confidence, Aus_fire.version, Aus_fire.bright_t31, Aus_fire.frp, Aus_fire.daynight, Aus_fire.type, Aus_fire.day_of_week).all()
    session.close()

    all_fire_aus_data = []

    for count, latitude, longitude, brightness, scan, track, acq_date, acq_time, satelite, instrument, confidence, version, bright_t31, frp, daynight, type, day_of_week in results:
        aus_fire_dict = {}
        aus_fire_dict["count"] = count
        aus_fire_dict["latitude"] = latitude
        aus_fire_dict["longitude"] = longitude
        aus_fire_dict["brightness"] = brightness
        aus_fire_dict["scan"] = scan
        aus_fire_dict["track"] = track
        aus_fire_dict["acq_date"] = acq_date
        aus_fire_dict["acq_time"] = acq_time
        aus_fire_dict["satelite"] = satelite
        aus_fire_dict["instrument"] = instrument
        aus_fire_dict["confidence"] = confidence
        aus_fire_dict["version"] = version
        aus_fire_dict["bright_t31"] = bright_t31
        aus_fire_dict["frp"] = frp
        aus_fire_dict["daynight"] = daynight
        aus_fire_dict["type"] = type
        aus_fire_dict["day_of_week"] = day_of_week
        all_fire_aus_data.append(aus_fire_dict)

    return jsonify(all_fire_aus_data)

@app.route("/dropmarker")
def dropmarker():
    """Return lat and long for wildfires"""
    session = Session(engine2)
    lat_long_result = session.query(Aus_fire.latitude, Aus_fire.longitude).all()
    session.close()

    fire_aus_lat_long = []

    for latitude, longitude in lat_long_result:
        lat_long_dict = {}
        lat_long_dict["latitude"] = latitude
        lat_long_dict["longitude"] = longitude
        fire_aus_lat_long.append(lat_long_dict)
    
    return jsonify(lat_long_result)


if __name__ == '__main__':
    app.run(debug=True)