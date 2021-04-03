from connection import *
import json

db=SQLAlchemy(app)

class Movie(db.Model):
    __tablename__='movies'
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(80),nullable=False)
    genre=db.Column(db.String(80),nullable=False)
    year=db.Column(db.Integer,nullable=False)

    def json(self):
        return{
            'id':self.id,
             'title':self.title,
             'year':self.year,
             'genre':self.genre
        }
    def add_movies(_title_,_year_,_genre_):
          print("entered into addmovies")
          new_movie= Movie(title=_title_,year=_year_,genre=_genre_)
          db.session.add(new_movie)
          db.session.commit()

    def get_all_movies():
        print("get_movies")
        return [Movie.json(movie) for movie in Movie.query.all()]

    def get_movie_by_id(_id_):
        return [Movie.json(Movie.query.filter_by(id=_id_).first())]

    def update_movie(_id_,_title_,_year_,_genre_):
         editData=Movie.query.filter_by(id=_id_).first()
         editData.title=_title_
         editData.year=_year_
         editData.genre=_genre_
         db.session.commit()

    def delete_movie(_id_):   
        Movie.query.filter_by(id=_id_).delete()
        db.session.commit()
       
