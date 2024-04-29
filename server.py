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
    print(user_quiz_answers)
    return render_template(
        "quiz.html",
        quiz_item=quiz_item,
        num=num_quiz_items,
        user_quiz_answers=user_quiz_answers,
    )

@app.route("/quiz/results")
def quiz_results():
    global user_quiz_answers
    visited_times["quiz_results"] = datetime.now()
    # iterate through user_quiz_answers and calculate user's score
    correct = 0
    for id, ans in user_quiz_answers.items():
        q_dict = data["quiz"][f"{id}"]
        if isinstance(ans, list) and isinstance(q_dict["answer"], list):
            if sorted(ans) == sorted(q_dict["answer"]):
                correct += 1
        
        elif ans == q_dict["answer"]:
            correct += 1

    if correct >= 8:
        results_message = "Congratulations! You are now a stain master!"
    elif correct >= 6:
        results_message = "Nice job! You are on your way to becoming a stain master."
    elif correct >= 4:
        results_message = "Good job learning some stains! Let's keep practicing."
    else:
        results_message = "Let's try again, there's some room to improve."

    return render_template("quiz-results.html", num=num_quiz_items, correct=correct, results_message=results_message)


# AJAX FUNCTIONS
@app.route("/quiz/<int:id>/log_answer", methods=["POST"])
def log_quiz_answer(id):
    if request.is_json:
        global user_quiz_answers
        data = request.get_json()
        answer = data["answer"]
        user_quiz_answers[id] = answer
        return jsonify({"status": "success", "message": ""}), 200
    else:
        return jsonify({"status": "error", "message": "Request was not JSON"}), 400


if __name__ == "__main__":
    app.run(debug=True)
