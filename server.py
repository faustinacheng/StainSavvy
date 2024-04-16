from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json
from datetime import datetime

app = Flask(__name__)

with open("static/data.json") as json_file:
    data = json.load(json_file)

num_learn_items = len(data["learn"])
num_quiz_items = len(data["quiz"])

visited_times = {}
user_quiz_answers = {}


# ROUTES
@app.route("/")
def welcome():
    visited_times["learn_welcome"] = datetime.now()
    print(visited_times)
    return render_template("home.html", data=data)


@app.route("/learn/<id>")
def learn_item(id):
    print(f"viewing learn page {format(id)}")
    visited_times["learn" + str(id)] = datetime.now()
    learn_item = data["learn"].get(id)
    return render_template("learn.html", learn_item=learn_item, num=num_learn_items)


@app.route("/quiz")
def quiz_welcome():
    visited_times["quiz_welcome"] = datetime.now()
    user_quiz_answers.clear()
    return render_template("quiz-welcome.html", num=num_learn_items)


@app.route("/quiz/<id>")
def quiz_item(id):
    print(f"viewing quiz page {format(id)}")
    visited_times["quiz" + str(id)] = datetime.now()
    quiz_item = data["quiz"].get(id)
    return render_template("quiz.html", quiz_item=quiz_item, num=num_quiz_items)

@app.route("/quiz/<int:id>/log_answer", methods=['POST'])
def log_quiz_answer(id):
    if request.is_json:
        global user_quiz_answers
        data = request.get_json()
        answer = data['answer']
        user_quiz_answers[id] = answer
        return jsonify({"status": "success", "message": ""}), 200
    else:
        return jsonify({"status": "error", "message": "Request was not JSON"}), 400

@app.route("/quiz/results")
def quiz_results():
    global user_quiz_answers
    visited_times["quiz_results"] = datetime.now()
    count = 0 
    for id, ans in user_quiz_answers.items():
        q_dict = data["quiz"][f"{id}"]
        if ans == q_dict["answer"]:
            count += 1
    # iterate through user_quiz_answers and calculate user's score
    user_quiz_answers.clear()
    return render_template("quiz-results.html", num=num_quiz_items, correct=count)


# AJAX FUNCTIONS

# need a function for adding an entry to user_quiz_answers, should be of form {id: answer}


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
