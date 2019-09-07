require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

function band(artist) {
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
}

band(process.argv.slice(2).join(" "));
