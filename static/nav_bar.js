$(document).ready(function () {
    // $("form").submit(function (event) {
    //     event.preventDefault();

    //     let searchTerm = $("#search-term").val();
    //     console.log("Search term: " + searchTerm);

    //     if (searchTerm.trim() != "") {
    //         console.log("working")
    //         $.ajax({
    //             type: "POST",  
    //             url: "/search", 
    //             contentType: 'application/json',
    //             data: JSON.stringify({ term: searchTerm }),
    //             success: function (data) {
    //                 window.location.href = "/search_results/"+ encodeURIComponent(searchTerm);
    //             },
    //             error: function (error) {
    //                 console.error("Error:", error);
    //             }
    //         });
    //     } else {
    //         $("#search-term").focus();
    //     }
    // });
    // $("#search-term").focus();
});