from movies import *

# @app.route('/',methods=['GET'])
# def home():
#     return jsonify("this is home page")


@app.route('/createmovies', methods=['POST'])
def add_movie():
    request_data = request.get_json()
    Movie.add_movies(request_data["title"], request_data["year"],
                    request_data["genre"])
    response = Response("Movie added", status=201, mimetype='application/json')
    return response


@app.route('/getmovies',methods=['GET'])
def get_movies():
    return jsonify({
    'status':200,
    'Movies':Movie.get_all_movies()
    })

@app.route('/movies/<int:id>',methods=['GET'])
def get_movie_id(id):
    response=Movie.get_movie_by_id(id)
    return jsonify({
        'staus':200,
        'Movie':response})

@app.route('/movies/<int:id>',methods=['PUT'])
def update_movie_byid(id):
    request_data=request.get_json()
    title=request_data['title']
    year=request_data['year']
    genre=request_data['genre']
    Movie.update_movie(id,title,year,genre)
    # response = Response("Movie Updated", status=200, mimetype='application/json')
    return jsonify({
        'status':200,
        'message':'Movie-updated',
        })

@app.route('/movies/<int:id>', methods=['DELETE'])
def remove_movie(id):
    Movie.delete_movie(id)
    return jsonify({
        'status':200,
        'message':'Movie-deleted',
        })
   