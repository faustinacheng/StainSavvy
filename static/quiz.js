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

//save previously entered answers
$(document).ready(function() {
    if (userQuizAnswers.hasOwnProperty(quizData.id)) {
        console.log("YESS")
        $('input[name="quiz_option"][value="' + userQuizAnswers[quizData.id] + '"]').prop('checked', true);
    }
});


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


// Drag and drop specific functions 
$(document).ready(function() {
    if (quizData["question-type"] === "drag-items") {
<<<<<<< HEAD
        var draggableItems = document.querySelectorAll('[draggable="true"]');
        draggableItems.forEach(function(item) {
            item.addEventListener('dragstart', drag);
        });

=======
        // Get all draggable items
        var draggableItems = document.querySelectorAll('[draggable="true"]');
        draggableItems.forEach(function(item) {
            item.addEventListener('dragstart', function(event) {
                drag(event);
            });
        });

        // Get the dropzone
>>>>>>> 0332217c6dddc809c200eb8f9371b12815d0d2af
        var dropzone = document.getElementById('dropzone');
        dropzone.addEventListener('dragover', allowDrop);
        dropzone.addEventListener('drop', drop);
    }
});

<<<<<<< HEAD
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

=======
>>>>>>> 0332217c6dddc809c200eb8f9371b12815d0d2af
function allowDrop(event) {
    event.preventDefault();
}

<<<<<<< HEAD
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

=======
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    if (droppedElement) {
        event.target.appendChild(droppedElement);
    }
}


>>>>>>> 0332217c6dddc809c200eb8f9371b12815d0d2af
//add checking to make sure they've selected a quiz answer
//when click next (valid answer)
    //ajax call to backend to the user_quiz_answers dictionary