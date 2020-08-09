import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import {encode, decode} from '../scripts/encoder'
import createRandomString from '../scripts/randomString'

const spotifyApi = new SpotifyWebApi();

class Home extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    
    let key = createRandomString(15);
    let encryptedToken = encode(token, key);
    
    localStorage.setItem('token', encryptedToken);
    localStorage.setItem('key', key);

    if (encryptedToken) {
      const decryptedToken = decode(encryptedToken, key)
      spotifyApi.setAccessToken(decryptedToken);
    }
  }
  componentDidMount() {
    console.log(spotifyApi.getAccessToken());

    // if (spotifyApi.getAccessToken()) {
    //   /*TODO:
    //    This method needs to be changed to create a playlist. At the moment 
    //    it gets what currently playing and sets it to the state object
    //   */
    //   spotifyApi.getMyCurrentPlaybackState()
    //     .then((response) => {
    //       console.log(response.item)
    //       if(response){
    //         this.setState({
    //           nowPlaying: {
    //             name: response.item.name,
    //             albumArt: response.item.album.images[0].url
    //           }
    //         });
    //       }
          
    //     })
    // }

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            HOME PAGE
          </h1>
        </header>
      </div>
    );
  }
}

export default Home;