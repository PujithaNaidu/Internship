# importing libraries
from flask import Flask, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy


# creating an instance of the flask app
app = Flask(__name__)

# Configure our Database

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:1234@localhost:3306/moviedb'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False