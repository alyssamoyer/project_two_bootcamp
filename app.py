from flask import Flask, render_template

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import pandas as pd
import json

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)


# Create new database
db = client.aus_fires
collection = db.nrt_M6_96619

df = pd.read_csv("fire_nrt_M6_96619.csv",encoding = 'ISO-8859-1')  
df.to_json('fire_nrt_M6_96619.json')                               
jdf = open('fire_nrt_M6_96619.json').read()                        
data = json.loads(jdf)  

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)