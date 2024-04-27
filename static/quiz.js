function log_answer(answer) {
    var base = window.location.origin + window.location.pathname;
    if (base.endsWith("/")) {
        base = base.slice(0, -1);
    }
    new_url = base + "/log_answer";
    $.ajax({
        url: new_url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ answer: answer }),
        success: function (response) {
            console.log("Answer logged: ", response);
        },
        error: function (xhr, status, error) {
            console.error("Failed to log answer: ", error);
        },
    });
}

//save previously entered answers
$(document).ready(function () {
    if (userQuizAnswers.hasOwnProperty(quizData.id)) {
        console.log("YESS");
        $(
            'input[name="quiz_option"][value="' +
                userQuizAnswers[quizData.id] +
                '"]'
        ).prop("checked", true);
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

// Multiple-choice and select-item specific functions
$(document).ready(function () {
    if (
        quizData["question-type"] == "multiple-choice" ||
        quizData["question-type"] == "select-item"
    ) {
        $("#next-button").click(function (event) {
            if (!$('input[name="quiz_option"]:checked').val()) {
                event.preventDefault();
                var errorMessage = document.querySelector(".error-message");
                errorMessage.textContent = "Please select at least one answer!";
            } else {
                var answer = $('input[name="quiz_option"]:checked').val();
                var q_no = quizData.id;
                log_answer(answer);
            }
        });
    }
});


// Order-steps specific functions
$(document).ready(function () {
    if (quizData["question-type"] == "order-steps") {
        const sortableList = document.getElementById("sortable-steps");
        new Sortable(sortableList, {
            animation: 150,
            handle: ".sortable-item",
            onEnd: function (evt) {
                const stepNumbers = sortableList.querySelectorAll('.row > div:first-child');
                stepNumbers.forEach((stepNumber, index) => {
                    stepNumber.textContent = index + 1 + '.';
                });
            },
        });

        //function to restore the order from saved answers
        function restoreOrder(savedOrder) {
            const stepBoxes = document.querySelectorAll('.step-box');
            stepBoxes.forEach((stepBox, index) => {
                stepBox.textContent = savedOrder[index];
            });
        }
        if (userQuizAnswers.hasOwnProperty(quizData.id)) {
            restoreOrder(userQuizAnswers[quizData.id]);
        }

        $("#next-button").click(function (event) {
            var stepOrder = [];
            const stepBoxes = document.querySelectorAll('.step-box');
            stepBoxes.forEach(stepBox => {
                stepOrder.push(stepBox.textContent.trim());
            });
            console.log(stepOrder);
            log_answer(stepOrder);
        });
        
    }
});

$(document).ready(function() {
    var droppedItems = []; // Array to store IDs of dropped items

    if (quizData["question-type"] === "drag-items") {
        var draggableItems = $('.draggable-image'); // Select draggable images
        draggableItems.each(function() {
            $(this).on('dragstart', function(event) {
                drag(event.originalEvent);
            });
        });

        $('.quiz-image-block').on('dragover', function(event) {
            event.preventDefault(); // Necessary to allow dropping
            event.originalEvent.dataTransfer.dropEffect = 'move';
        }).on('drop', function(event) {
            event.preventDefault();
            var data = event.originalEvent.dataTransfer.getData("text");
            if (droppedItems.length < 3) {
                var draggedElement = document.getElementById(data);
                if (!droppedItems.includes(data)) {
                    // Clone the dragged element and add a class to differentiate it
                    var clonedElement = $(draggedElement).clone().addClass('dropped-tile');
                    // Calculate the position relative to the quiz-image-block container
                    var posX = event.originalEvent.layerX - (clonedElement.width() / 2);
                    var posY = event.originalEvent.layerY - (clonedElement.height() / 2);
                    // Set the position of the cloned element
                    clonedElement.css({position: 'absolute', left: posX, top: posY});
                    // Append cloned element to the target drop zone
                    $('.quiz-image-block').append(clonedElement);
                    // Remove the original dragged element from draggableItems
                    draggableItems = draggableItems.not(draggedElement);
                    droppedItems.push(data);
                    $(draggedElement).remove();
                }
            } else {
                $('.error-message').text('You cannot drop more than 3 items.');
            }
        });

        $('#next-button').click(function(event) {
            if (droppedItems.length == 3){
                log_answer(droppedItems.sort());
            } else{
                event.preventDefault();
                $('.error-message').text('Please select three answers!');
            }
        });

        $('#resetButton').click(function() {
            window.location.reload();
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
    var droppedElement = document.getElementById(data);
    if (droppedElement) {
        var dropZone = event.target.closest('.drop-zone'); // assuming you have a class .drop-zone for droppable areas
        if (dropZone) {
            dropZone.appendChild(droppedElement);
        }
    }
}
