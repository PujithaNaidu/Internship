from flask import Flask,request,Response
from flask_mongoengine import MongoEngine
app=Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db':'moviedb',
    'host':'mongodb://localhost/moviedb',
    'port':27017
}
