import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import { encode, decode } from '../scripts/encoder';
import generateRandomString from '../scripts/randomString';


const spotifyApi = new SpotifyWebApi();
class Home extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const params = this.getHashParams();
    const access_token = params.access_token;
    const refresh_token = params.refresh_token;
    let key = '';


    if(access_token || localStorage.getItem('access_token')) {
      if(access_token) {
        key = generateRandomString(15);
        localStorage.setItem('key', key);
        localStorage.setItem('access_token', encode(access_token, key));
        localStorage.setItem('refresh_token', refresh_token);
      }

      else {
        let decryptedToken = decode(localStorage.getItem('access_token'), localStorage.getItem('key'))
        let r_token = localStorage.getItem('refresh_token');
        if(!this.checkIfTokenActive(decryptedToken)) {
          if(r_token) {
            if(this.checkIfRefreshTokenWorking(localStorage.getItem('refresh_token'))) {
              fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
              .then(response => response.json())
              .then(data => {
                key = generateRandomString(15);
                localStorage.setItem('key', key);
                localStorage.setItem('access_token', encode(data.access_token, key));
             })
            }
            else {
              // login again
            }
          }
          else {
            //login again
          }  
        }
      }
    }
      /*
        1. check if local storage have access token
        2. if it has, decrypt it
        3. check decrypted token is working
        4. if it isn't create another token
        5. encrypt it
        6. store it
        7. if it is working do nothing
        8. if we don't have access token at all create one go to 5 stop after finishing 6 
      
      */
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

  checkIfTokenActive(decryptedToken) {
    let trueOrFalse;
    spotifyApi.setAccessToken(decryptedToken);
    spotifyApi.getUserPlaylists().then(
      (data) => {
          trueOrFalse = true;
      },
      (err) => {
        trueOrFalse= false;
      }
    )
    return trueOrFalse;
  }

  checkIfRefreshTokenWorking(refresh_token) {
    let trueOrFalse;
    fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
    .then(response => {
      response.json()
      trueOrFalse = true;
    })
    .catch(err =>{
      trueOrFalse = false;
    })
    return trueOrFalse;
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

      /*TODO:
       This method needs to be changed to create a playlist. At the moment 
       it gets what currently playing and sets it to the state object
      */