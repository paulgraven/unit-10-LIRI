require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

function findSong(song) {
  spotify
    .search({
      type: "track",
      query: "All the Small Things"
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// findSong(process.argv.slice(2).join(" "));
findSong();
