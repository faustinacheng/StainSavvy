$(document).ready(function () {
    fetch("../static/data.json")
        .then((response) => response.json())
        .then((data) => {
            $(".navbar-nav").empty();
            $.each(data.learn, function (i, item) {
                $(".navbar-nav").append(
                    `<div class="nav-item"><a href="learn/${item.id}">${item.stain}</a></div>`
                );
            });
            $(".navbar-nav").append(
                `<div class="nav-item"><a href="quiz">Quiz</a></div>`
            );
        })
        .catch((error) => console.error("Error:", error));
});
