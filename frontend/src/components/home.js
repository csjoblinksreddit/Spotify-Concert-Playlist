import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import { encode, decode } from '../scripts/encoder';
import generateRandomString from '../scripts/randomString';
import { checkIfRefreshTokenWorking, checkIfTokenActive} from '../scripts/checkTokens'



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
        if(!checkIfTokenActive(decryptedToken, spotifyApi)) {
          if(r_token) {
            if(checkIfRefreshTokenWorking(r_token)) {
              fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
              .then(response => response.json())
              .then(data => {
                key = generateRandomString(15);
                localStorage.setItem('key', key);
                localStorage.setItem('access_token', encode(data.access_token, key));
             })
            }
            else {
              localStorage.removeItem('key')
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
            }
          }
          else {
            localStorage.removeItem('key')
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
          }  
        }
      }
    }
    /*TODO:
      This method needs to be changed to create a playlist. At the moment 
      it gets what currently playing and sets it to the state object
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
