$(document).ready(function () {
    if (quizData.id == 1) {
        $("#back-button").attr("href", "/quiz");
    } else {
        $("#back-button").attr("href", "/quiz/" + (quizData.id - 1));
    }
    if (quizData.id == numItems) {
        $("#next-button").attr("href", "/quiz/results");
    } else {
        $("#next-button").attr("href", "/quiz/" + (quizData.id + 1));
    }
});

//add checking to make sure they've selected a quiz answer
//when click next (valid answer)
    //ajax call to backend to the user_quiz_answers dictionary