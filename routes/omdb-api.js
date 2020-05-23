//needs jquery CDN

$(document).ready(function () {

    var createContent = function (data) {
        //created new p tag
        var p = $("<p>");

        var resultsDiv = $("<div>")

        var title = $("<p>").text(data.Title);
        var actors = $("<p>").text(data.Actors);
        var year = $("<p>").text(data.Year);
        var plot = $("<p>").text(data.Plot);
        // var poster = $("<img>").src(data.poster);
        var poster = $("<img>");
        poster.attr("src", data.Poster);

        p.append(title, actors, year, plot);

        resultsDiv.append(p);
        resultsDiv.append(poster);

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

        // var featuredDiv = $("#featured")
        
        // var poster = $("<img>");
        // poster.attr("src", data.Poster);
        // featuredDiv.prepend(poster);

       img.attr("src", data.Poster);
        // $("#featured2").attr("src", data.Poster);
        // $("#featured3").attr("src", data.Poster);
    }

//    var featuredShows = ["the office", "friends", "outer banks"];

   featuredData($("#featured1"),  "the office");
   featuredData($("#featured2"), "friends");
   featuredData($("#featured3"), "outer banks");
   
});