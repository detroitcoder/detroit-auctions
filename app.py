from flask import Flask
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, Float

app = Flask(__name__, static_url_path="")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auctions.db"
db = SQLAlchemy(app)

class Votes(db.Model):
    user = Column(Text, primary_key=True)
    score = Column(Integer, unique=False)
    house = Column(Integer, primary_key=True)

class Auctions(db.Model):
    id = Column(Integer, primary_key=True)
    addr = Column(Text, unique=False)
    img = Column(Text, unique=False)
    lat = Column(Float, unique=False)
    lon = Column(Float, unique=False)
    score = Column(Integer, unique=False)

db.create_all()
api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Votes, methods=["GET", "PUT", "POST"],
                       results_per_page=600,
                       primary_key="house")

api_manager.create_api(Auctions, methods=["GET", "PUT", "POST"], results_per_page=600)

@app.route("/")
def index():
    return app.send_static_file("index.html")

app.run(debug=True)