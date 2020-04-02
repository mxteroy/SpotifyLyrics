import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Lyrics from './components/Lyrics/Lyrics';
import SpotifyLogin from 'react-spotify-login';
import {baseServerURL, spotifyClientID} from './data/auth';

function App() {
  const [lyrics, setLyrics] = useState('');
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');

  var fetchLyrics = async() => {
    await axios.get(
      baseServerURL  + '/?artist=' + artist + '&song=' + song
    ).then(function (response) {
      setLyrics(response.data);
      console.log(response.data);
    }).catch(function(error) {
      setLyrics("The song could not be found on Genius")
      console.log(error)
      return error;
    }).then(function() {});
  }

  var getCurrentSong = async(token) => {
    console.log(token);
    await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {headers: {Authorization: "Bearer ".concat(token.access_token)}}
    ).then(function (response) {
      setArtist(response.data.item.artists[0].name)
      setSong(response.data.item.name)
      fetchLyrics()
      console.log(response)
    }).catch(function (error) {
      setLyrics(error)
      console.log(error)
    }).then(function () {});
  }

  return (
    <div className="App">
        {/* <input type="text" id="artist_box" onChange={e => setArtist(e.target.value)} name="fname" placeholder="artist"/>
        <input type="text" id="song_box" onChange={e => setSong(e.target.value)} name="fname" placeholder="song"/>
        <input type="submit" value="Submit" onClick={() => fetchLyrics()}/> */}
        < SpotifyLogin clientId = {spotifyClientID}
        redirectUri='http://localhost:3000' scope="user-read-playback-state" onSuccess={(token) => getCurrentSong(token)} onFailure={() => console.log("FAILED LOGIN")}/>
        <Lyrics lyrics={lyrics}/>
    </div>
  );
}

export default App;