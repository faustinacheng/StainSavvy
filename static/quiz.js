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
$(document).ready(function() {
    if (quizData["question-type"] === "multiple-choice") {
        $('#next-button').click(function(event) {
            if (!$('input[name="quiz_option"]:checked').val()) {
                event.preventDefault();
                $('.error-message').text('Please select at least one answer!');
            } else {
                var answer = $('input[name="quiz_option"]:checked').val();
                var q_no = quizData.id;
                log_answer(answer);
            }
        });
    }
});

// Drag and drop specific functions
$(document).ready(function() {
    var droppedItems = []; // Array to store IDs of dropped items

    if (quizData["question-type"] === "drag-items") {
        var draggableItems = $('[draggable="true"]');
        draggableItems.each(function() {
            $(this).on('dragstart', function(event) {
                drag(event.originalEvent);
            });
        });

        $('img').on('dragover', function(event) {
            event.preventDefault(); // Necessary to allow dropping
            event.originalEvent.dataTransfer.dropEffect = 'move';
        }).on('drop', function(event) {
            event.preventDefault();
            var data = event.originalEvent.dataTransfer.getData("text");

            if (droppedItems.length < 3) {
                var draggedElement = document.getElementById(data);
                if (!droppedItems.includes(data)) {
                    $(this).parent().append(draggedElement);
                    droppedItems.push(data.id);
                    $(draggedElement).remove();
                    updateCurrentAnswers();  // Update the list of current answers
                }
            } else {
                $('.error-message').text('You cannot drop more than 3 items.');
            }
        });

        $('#resetButton').click(function() {
            window.location.reload();
            // Additional reset functionality
            // droppedItems = [];
            // $('.error-message').text('');
            // updateCurrentAnswers();
        });
    }
});




function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}


function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    if (droppedElement) {
        event.target.appendChild(droppedElement);
    }
}


//add checking to make sure they've selected a quiz answer
//when click next (valid answer)
    //ajax call to backend to the user_quiz_answers dictionary