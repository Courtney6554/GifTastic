var players = ["Peyton Manning", "Doug Flutie", "Leveon Bell", "Adam Vinatieri", "Jason Witten", "Alex Smith"];

// Function to create and display new player buttons.
function newButton() {

    for (var i = 0; i < players.length; i++) {

        $("#btn-display").append("<button class='playerID' data-name='" + players[i] + "'>" + players[i] + "</button>");

        console.log(players[i]);
    }
}

// Push user input to players array and create new button.
$("#add-player").on("click", function() {
    event.preventDefault();

    var player = $("#player-input").val().trim();

    players.push(player);
    $("#btn-display").empty();
    newButton();

})

// Function ajax call/response, display gifs.
function displayGifs() {

    var player = $(this).attr("data-name");
    var apikey = "e67755d4160e42749433606a53d2c8e3";
    var limit = 5;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + player + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='item'>");
            gifDiv.attr("id", "player-display");
            // Insert gifDiv within column
            $("#player-gifs").after(gifDiv);

            var animatedURL = results[i].images.fixed_height.url;
            var stillURL = results[i].images.fixed_height_still.url;

            var img = $("<img style='height:256px; width:350px;'>");

            img.attr("src", stillURL);
            img.addClass("images");
            img.attr("data-still", stillURL);
            img.attr("data-animate", animatedURL);
            img.attr("data-state", "still");

            $("#player-display").prepend(img);

            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            gifDiv.append(img);
            gifDiv.append(p);
        }

        $(".images").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    })

}

$(document.body).on("click", "button", displayGifs);
newButton(players);