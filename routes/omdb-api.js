//needs jquery CDN

// import { response } from "express";

$(document).ready(function () {

    var showId;

    var createContent = function (data) {
        //created new p tag
        var p = $("<p>");

        var resultsDiv = $("<div>")

        var title = $("<h3>").text(data.Title);
        var actors = $("<p>").text(data.Actors);
        var year = $("<p>").text(data.Year);
        var plot = $("<p>").text(data.Plot);
        
        var poster = $("<img>");
        poster.attr("src", data.Poster);

        p.append(title, actors, year, plot);
        resultsDiv.append(poster);
        resultsDiv.append(p);
      

        $("#searchResults").prepend(resultsDiv);


    }


    var searchOMDB = function (movie) {
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            createContent(response);
        });
    };


    function clear() {
        $("#searchResults").empty();
    }


    $("#search").on("click", function (event) {
        //this loads our search results page on button click
        // window.location = "searchPage.html";
        //supposed to allow enter press to search but not working
        console.log("button pressed");
        event.preventDefault();
        //clears data from last search
        clear();

        //saves user input as the movie/show being searched for
        var movie = document.getElementById("userInput").value;
        //runs search movie
        searchOMDB(movie)
        console.log(movie);
    });

    
    
    var featuredData = function(img, movie) {
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            featuredContent(img, response);
        });
    };
    
    
    function featuredContent(img, data){
        //adds a src tag to a specific img for poster img
       img.attr("src", data.Poster);
       
    }

    //calls specific img and updates with new show data
   featuredData($("#featured1"),  "the office");
   featuredData($("#featured2"), "friends");
   featuredData($("#featured3"), "outer banks");


//    function searchDB (userInput) {
//        //needs to be connected to shows db by the shows path that still needs to be made
//     var queryURL = "/api/shows";
//     return $.ajax({
//         url: queryURL,
//         method: "GET",
//         data: {
//             title: userInput
//         }
//     }).then(function (response) {
//         console.log(response);
//         if (response.data.length > 0){
//             showId = response.data[0].id
//             createContent(response.data[0]);
//         } else {
//             searchOMDB(userInput);
//         }
//     });
//    }

   

//    //call this inside of on click funtion to submit a new review
//    // save userReview in on click function
//    function pushToReviewDB(userReview, showId) {
//     var queryURL = "/api/reviews";
//     return $.ajax({
//         url: queryURL,
//         method: "POST",
//         data: {
//             showId: showId,
//             review: userReview
//         }
//     }).then(function (response) {
//         console.log("success");
       
//     }).catch(function(err){
//         console.error(err);
//     })
//    }

//    function pushToShowDB(userInput){
//     var queryURL = "/api/shows";
//     return $.ajax({
//         url: queryURL,
//         method: "POST",
//         data: {
//             showData: userInput
//         }
//     }).then(function (response) {
//         console.log("success");
       
//     }).catch(function(err){
//         console.error(err);
//     })
//    }
   
//    function submitReview() {
//     var title = $("<p>").text(data.Title);
//     var actors = $("<p>").text(data.Actors);
//     var year = $("<p>").text(data.Year);
//     var plot = $("<p>").text(data.Plot);
    
//     var poster = data.Poster
//     var showData = {
//         Title: data.title,
//         Actors: data.actors,
//         //go through rest of data
//     }

//     //then grab userReview data
//    pushToShowDB(showData).then(function(){
//        pushToReviewDB(userReview)
//    })
   
//    }

   
});