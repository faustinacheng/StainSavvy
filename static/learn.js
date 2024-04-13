$(document).ready(function () {
    if (itemData.id == 1) {
        $("#back-button").attr("href", "/");
    } else {
        $("#back-button").attr("href", "/learn/" + (itemData.id - 1));
    }
    if (itemData.id == numItems) {
        $("#next-button").attr("href", "/quiz");
    } else {
        $("#next-button").attr("href", "/learn/" + (itemData.id + 1));
    }
});
