from flask import Flask,request,Response,jsonify
from flask_mongoengine import MongoEngine
app=Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db':'moviedb',
    'host':'mongodb://localhost/moviedb',
    'port':27017
}


db = MongoEngine(app)

class Movie(db.Document):
    title=db.StringField(required=True)
    year=db.IntField()
    genre=db.StringField()

    def json(self):
        return {
             'title':self.title,   
             'year':self.year,
             'genre':self.genre
        }