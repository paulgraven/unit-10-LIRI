require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// FIND BAND FUNCTION
var band = function(artist) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        artist +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      var data = response.data;
      if (data.length < 1) {
        console.log("No information");
      } else {
        console.log("Upcoming concerts for " + artist + "!\n");

        for (var i = 0; i < data.length; i++) {
          var show = data[i];

          console.log(
            show.venue.city +
              ", " +
              show.venue.country +
              "\nPerforming at " +
              show.venue.name +
              "\n" +
              moment(show.datetime).format("MM/DD/YYYY") +
              "\n"
          );
        }
      }
    });
};

// FIND MOVIE FUNCTION
var movie = function(movieName) {
  var url =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(url).then(function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
};

// FIND SONG FUNCTION
var spotifySearch = function(song) {
  spotify
    .search({
      type: "track",
      query: song
    })
    .then(function(response) {
      for (var i = 0; i < response.tracks.items.length; i++) {
        console.log(i);
        console.log("Song Name: " + response.tracks.items[i].name);
        console.log(
          "Artist: " + response.tracks.items[i].album.artists[0].name
        );
        console.log("Album: " + response.tracks.items[i].album.name);
        console.log("Preview Song: " + response.tracks.items[i].preview_url);
        console.log("----------------------------");
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};

// DO WHAT IT SAYS FUNCTION
var whatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var textDetails = data.split(",");
    liri(textDetails[0], textDetails[1]);
  });
};

// LIRI FUNCTION
var liri = function(command, input) {
  switch (command) {
    case "band":
      band(input);
      break;
    case "spotify":
      spotifySearch(input);
      break;
    case "movie":
      movie(input);
      break;
    case "what-it-says":
      whatItSays();
      break;
    default:
      console.log("Please input 'band', 'spotify', 'movie', or 'what-it-says'");
  }
};

var runLiri = function(argOne, argTwo) {
  liri(argOne, argTwo);
};

runLiri(process.argv[2], process.argv.slice(3).join(" "));
