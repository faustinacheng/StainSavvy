from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json

app = Flask(__name__)

with open("static/data.json") as json_file:
    data = json.load(json_file)

num_learn_items = len(data["learn"])
num_quiz_items = len(data["quiz"])

user_quiz_answers = {}


# ROUTES
@app.route("/")
def welcome():
    return render_template("home.html", data=data)


@app.route("/learn/<id>")
def learn_item(id):
    print(f"viewing learn page {format(id)}")
    learn_item = data["learn"].get(id)
    return render_template("learn.html", learn_item=learn_item, num=num_learn_items)


@app.route("/quiz")
def quiz_welcome():
    #clear the user_quiz_answers dictionary
    return render_template("quiz-welcome.html", num=num_learn_items)


@app.route("/quiz/<id>")
def quiz_item(id):
    print(f"viewing quiz page {format(id)}")
    quiz_item = data["quiz"].get(id)
    return render_template("quiz.html", quiz_item=quiz_item, num=num_quiz_items)


@app.route("/quiz/results")
def quiz_results():
    #iterate through user_quiz_answers and calculate user's score
    return render_template("quiz-results.html", num=num_quiz_items)
    


# AJAX FUNCTIONS

#need a function for adding an entry to user_quiz_answers, should be of form {id: answer}


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
