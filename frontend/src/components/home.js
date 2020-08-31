import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import LandingPage from './landingPage/landingPage.js'

const spotifyApi = new SpotifyWebApi();

class Home extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);

    }
  }
  componentDidMount() {
    if (spotifyApi.getAccessToken()) {
      /*TODO:
       This method needs to be changed to create a playlist. At the moment 
       it gets what currently playing and sets it to the state object
      */
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          console.log(response.item)
          if(response){
            this.setState({
              nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url
              }
            });
          }
          
        })
    }

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q)
    }
    return hashParams;
  }

  render() {
    return (
      <LandingPage/>
    );
  }
}

export default Home;