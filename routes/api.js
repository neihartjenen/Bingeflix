//needs jquery CDN

$( document ).ready(function() {

    var createContent = function(data) {
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

    // document.getElementById("#search").onclick = function () {
    //     location.href = "searchPage.html";
    // } 
    
});