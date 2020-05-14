//needs jquery CDN

$( document ).ready(function() {
    
    
    var searchOMDB = function(movie) {
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            createRow(response);
        });
    };
    
    
});