from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json

app = Flask(__name__)

with open("static/data.json") as json_file:
    data = json.load(json_file)

num_learn_items = len(data["learn"])
num_quiz_items = len(data["quiz"])


# ROUTES
@app.route("/")
def welcome():
    return render_template("home.html", data=data)


@app.route("/learn/<id>")
def learn_item(id):
    print(f"viewing  {format(id)}")
    item = data["learn"].get(id)
    return render_template("learn.html", item=item, num=num_learn_items)


@app.route("/quiz")
def quiz_welcome():
    return render_template("quiz-welcome.html", data=data)


@app.route("/quiz/<id>")
def quiz_item(id):
    print(f"viewing  {format(id)}")
    quiz = data["quiz"].get(id)
    return render_template("quiz.html", quiz=quiz, num=num_quiz_items)


@app.route("/quiz/results")
def quiz_results():
    return render_template("quiz-results.html")


# AJAX FUNCTIONS
# @app.route('/search', methods=['POST'])
# def search():
#     global results
#     newResults = []

#     json_data = request.get_json()
#     search_term = json_data["term"]
#     print(f"searched for {search_term}")

#     for store_id, store_data in data.items():
#         if search_term in store_data.get('name', ''):
#             newResults.append(store_data)

#     results = newResults
#     return jsonify({'results': results})

if __name__ == "__main__":
    app.run(debug=True)
