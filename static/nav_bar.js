$(document).ready(function () {
    fetch("../static/data.json")
        .then((response) => response.json())
        .then((data) => {
            $(".navbar-nav").empty();
            const currentPath = window.location.pathname;
            if (currentPath === "/") {
                $("#navbar-logo").addClass("active");
            }
            $.each(data.learn, function (i, item) {
                let activeClass =
                    currentPath === `/learn/${item.id}` ? "active" : "";
                $(".navbar-nav").append(
                    `<div class="nav-item ${activeClass}"><a href="/learn/${item.id}">${item.stain}</a></div>`
                );
            });
            let quizActiveClass = currentPath.startsWith("/quiz")
                ? "active"
                : "";
            $(".navbar-nav").append(
                `<div class="nav-item ${quizActiveClass}"><a href="/quiz">Quiz</a></div>`
            );
        })
        .catch((error) => console.error("Error:", error));
});
