require('dotenv').config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require('axios');
var moment = require('moment');

// import bandsintown
var omdb = (keys.omdb.id);
var bandsintown = (keys.bandsintown);

// import spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// user input
var command = process.argv[2];
var input = process.argv[3];

switch(command) {
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        spotifyThis(input);
        break;
    case "movie-this":
        movieThis(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
};

function concertThis(input) {
    if ( input === undefined ) {
        input = "prince" 
        } 
    else {
        axios({
            method: 'get',
            url: "https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bandsintown
            })
            .then(function (response) {
            var concertResults = response.data[0]
            for (var i = 0; i < 1; i++ ) {
                var newConcertResults = "------------" +"\nBand: " + input + "\nVenue: " + concertResults.venue.name + "\nVenue Location: " + concertResults.venue.city + "\nDate of the Event: " + concertResults.datetime
                }
            console.log(newConcertResults);
            fs.appendFile("log.txt", newConcertResults, function(err) {
                if (err) {
                return logThis("Error: " + err);

                }
            });
        });
    }
}

function spotifyThis(input) {
    if ( input === undefined ) {
        input = "The Sign";
        } 
    else {
        spotify.search({ type: 'track', query: input })
        .then(function(data) {
            for (var i = 0; i < 1; i++ ) {
                var spotifyResults = "------------" + "\nArtist(s): " + data.tracks.items[i].artists[0].name + "\nSong: " + data.tracks.items[i].name + "\nAlbum: " + data.tracks.items[i].album.name + "\nPreview: " + data.tracks.items[i].preview_url;

                console.log(spotifyResults);

                fs.appendFile("log.txt", spotifyResults , function(err) {
                    if(err) {
                    return console.log(err);
                    }
                })
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }
};

function movieThis(input) {
    if (input === undefined ) {
        input = "Mr. Nobody";
    } else {
        axios.get("http://www.omdbapi.com/?apikey="+ omdb + "&t=" + input)
        .then(function(response) {
             
            var movieResults = response.data
            
            var country = movieResults.Country;
            var language = movieResults.Language;
            var plot = movieResults.Plot;
            var actors = movieResults.Actors;
            // Conditional for the case in which Rotten Tomatoes data does not exist
            if(movieResults.Ratings.length <= 1) {
                console.log("------------");
                console.log("Title: " + title);
                console.log("Year Of Production: " + year);
                console.log("IMDB Rating: " + imdb);
                console.log("Unfortunately, this film has not been rated by Rotten Tomatoes.");
                console.log("Filming Location: " + country);
                console.log("Language: " + language);
                console.log("Plot: " + plot);
                console.log("Featured Actors: " + actors);
            } else if (movieResults.Ratings[1].Source === "Rotten Tomatoes") {
                var RottenTomatoes = movieResults.Ratings[1].Value;
                console.log("------------");
                console.log("Title: " + title);
                console.log("Year Of Production: " + year);
                console.log("IMDB Rating: " + imdb);
                console.log("Rotten Tomatoes Rating: " + RottenTomatoes);
                console.log("Filming Location: " + country);
                console.log("Language: " + language);
                console.log("Plot: " + plot);
                console.log("Featured Actors: " + actors);
                fs.appendFile("log.txt", movieResults , function(err) {
                    if(err) {
                    return console.log(err);
                    }
                })
            }
        })
    }
}


function doThis(input) {
    
}