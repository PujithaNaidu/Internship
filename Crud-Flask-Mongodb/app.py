from movies import *

@app.route('/movies', methods=["POST"])
def add_movie():
    body = request.get_json()
    movie = Movie(**body).save()
    return jsonify(movie), 201

@app.route('/movies',methods=["GET"])
def  get_all_movies():
    movies = Movie.objects()
    return  jsonify(movies), 200

@app.route('/movies/<id>',methods=["GET"])
def get_movie(id):
    movie=Movie.objects(id=id).first()
    return jsonify(movie),200

@app.route('/movies/<id>',methods=["PUT"])
def update_movie(id):
    body=request.get_json()
    movie=Movie.objects.get_or_404(id=id)
    movie.update(**body)
    return jsonify(str(movie.id)),200

@app.route('/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.objects.get_or_404(id=id)
    movie.delete()
    return jsonify(str(movie.id)), 200




