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
def welcome():
    """List all available api routes"""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/count<br/>"
        f"/api/v1.0/allgroupdata"
    )

@app.route("/frp_heatmap")
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

if __name__ == '__main__':
    app.run(debug=True)