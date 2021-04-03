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
    
    # def add_movies(_title_,_year_,_genre_):
    #     body = request.get_json()
    #     movie = Movie(body.title:_title_,body.year:_year_,body.genre:_genre_).save()
    #     return jsonify(movie), 201
