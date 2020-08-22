import React, { Component } from 'react';
import logo from '../logo.svg';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
const spotifyApi = new SpotifyWebApi();
let refresh_token;
class Home extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    refresh_token = params.refresh_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    if(refresh_token){
      console.log(refresh_token)
    }
  }
  componentDidMount() {
    if (refresh_token) {
      /*TODO:
       This method needs to be changed to create a playlist. At the moment 
       it gets what currently playing and sets it to the state object
      */
     fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
     .then(response => response.json())
     .then(data => {
      console.log(data);
    })}
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