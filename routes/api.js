//needs jquery CDN

$( document ).ready(function() {

    var createContent = function(data) {
        //created new p tag
        var p = $("p");

        var title = $("<p>").text(data.Title);
        var actors = $("<p>").text(data.Actors);
        var year = $("<p>").text(data.Year);
        var plot = $("<p>").text(data.Plot);
        // var poster = $("<img>").src(data.poster);

        p.append(title, actors, year, plot);

        $("#searchResults").append(p)
        
    }
    
    
    var searchOMDB = function(movie) {
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            createContent(response);
        });
    };
    
    $("#search").on("click", function(){
        var movie = document.getElementById("userInput").value;
        searchOMDB(movie)
        console.log(movie);
    });
    
});