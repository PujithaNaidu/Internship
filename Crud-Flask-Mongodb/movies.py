from connection import *
import json
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
    
    def add_movies():
        body = request.get_json()
        movie = Movie(**body).save()
        return jsonify(movie), 201
