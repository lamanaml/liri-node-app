require('dotenv').config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

function getMeSpotify (songName) {
   spotify.search({ type: 'track', query: 'artist' }, function(err, data) {
   if ( err ) {
       console.log('Error occurred: ' + err);
       return;
   }
   var songs = data.tracks.items;
   console.log(response.data)
//    for(var i=0; i<songs.length; i++) {
//        //console.log [i];
//   //     console.log('artist(s): ' + songs[i].artist.map(
//     //       getArtistnames));
//        console.log('song name: ' + songs[4].name);
//    }
//    console.log(data.tracks.items[0]);
//    });
// }

getMeSpotify(process.argv[2])