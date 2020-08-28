import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import '../App.css';
import ZipForm from './ZipForm';
import Genres from './genres/Genres';

const spotifyApi = new SpotifyWebApi();

const ContainerStyle ={
  display: 'flex',
  alignItems: 'center'
}
class Home extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      zipSubmit: false,
      zipCode: '',
      genreSubmit: false,
      genreCodes: [],
      artistSubmit: false
    }

    this.zipHandle = this.zipHandle.bind(this);

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

  zipHandle(zip){
    this.setState({
      zipSubmit: true,
      zipCode: zip

    });
    console.log(this.state.zip);
  }

  genreHandle(){
    this.setState({
      genreSubmit: true 
    });
  }
  artistHandle(){
    this.setState({
      artistSubmit: true
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          
              <ZipForm action= {this.zipHandle}/>
              {this.state.zipSubmit && <Genres zip = {this.state.zip}/>}
         
         
        </header>
      </div>
    );
  }
}

export default Home;