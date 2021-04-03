from movies import *

@app.route('/createmovies',methods=["POST"])
def add_movie():
    request_data = request.get_json()
    Movie.add_movies(request_data["title"], request_data["year"],
                    request_data["genre"])
    response = Response("Movie added", status=201, mimetype='application/json')
    return response