import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import { encode, decode } from '../scripts/encoder';
import generateRandomString from '../scripts/randomString';
import { checkIfRefreshTokenWorking, checkIfTokenActive, generateNewAccessToken, storeTokens, removeTokens } from '../scripts/handleTokens'



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

    if(access_token || localStorage.getItem('access_token')) { // is it new login or user logged in before
      if(access_token) { // new login
        key = generateRandomString(15);
        storeTokens(access_token, refresh_token, key)
      }

      else { // logged in before
        let decryptedToken = decode(localStorage.getItem('access_token'), localStorage.getItem('key'))
        let r_token = localStorage.getItem('refresh_token');
        if(!checkIfTokenActive(decryptedToken, spotifyApi)) { // if access token is not active
          if(r_token) { // do we have refresh token in local storage
            if(checkIfRefreshTokenWorking(r_token)) { // is our refresh token active
              generateNewAccessToken(refresh_token) 
            } 
            else {
              removeTokens() // login again if refresh token is not active
            }
          } 
          else { // login again if we don't have refresh token 
            removeTokens()
          }  
        }
      }
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
