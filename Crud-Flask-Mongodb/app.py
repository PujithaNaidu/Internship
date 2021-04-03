from movies import *

@app.route('/movies', methods=["POST"])
def add_movie():
    body = request.get_json()
    title=body.get("title")
    year=body.get("year")
    genre=body.get("genre")
    movie = Movie(**body).save()
    return jsonify({
        "status":200,
        "message":'movie '+title+ ' is added'
    })

@app.route('/movies',methods=["GET"])
def  get_all_movies():
    movies = Movie.objects()
    return jsonify({
        "status":200,
        "MovieList":movies
    })

@app.route('/movies/<id>',methods=["GET"])
def get_movie(id):
    movie=Movie.objects(id=id).first()
    return jsonify({
        "status":200,
        "Movie":movie
    })

@app.route('/movies/<id>',methods=["PUT"])
def update_movie(id):
    body=request.get_json()
    title=body.get("title")
    year=body.get("year")
    genre=body.get("genre")
    movie=Movie.objects.get_or_404(id=id)
    movie.update(**body)
    return jsonify({
        "status":200,
        "message":'movie '+title+ 'is updated'
    })

@app.route('/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.objects.get_or_404(id=id)
    movie.delete()
    return jsonify({
        "status":200,
        "message":'movie is deleted'
    })




