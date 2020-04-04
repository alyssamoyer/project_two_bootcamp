from flask import Flask, render_template

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pandas as pd
import json

# Create an instance of our Flask app.
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/main_fire_date")
# def index():
#     return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)

