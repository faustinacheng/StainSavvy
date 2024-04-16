function log_answer(answer){

    var base = window.location.origin + window.location.pathname;
    if (base.endsWith('/')){
        base = base.slice(0, -1);
    }
    new_url = base + '/log_answer';
    $.ajax({
        url: new_url, 
        type: 'POST', 
        contentType: 'application/json',
        data: JSON.stringify({'answer':answer}), 
        success: function(response){
            console.log('Answer logged: ', response)
        },
        error: function(xhr, status, error){
            console.error('Failed to log answer: ', error)
        }
    })
}

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

// Multiple-choice specific functions
$(document).ready(function(){
    if(quizData["question-type"] == "multiple-choice"){
        $('#next-button').click(function(event){
            if(!$('input[name="quiz_option"]:checked').val()){
                event.preventDefault();
                var errorMessage = document.querySelector('.error-message');
                errorMessage.textContent = 'Please select at least one answer!'
            }else{
                var answer = $('input[name="quiz_option"]:checked').val()
                var q_no = quizData.id
                log_answer(answer)
            }
        });
    }

});

//add checking to make sure they've selected a quiz answer
//when click next (valid answer)
    //ajax call to backend to the user_quiz_answers dictionary