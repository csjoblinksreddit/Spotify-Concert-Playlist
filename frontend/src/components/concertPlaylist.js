import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import {Button, Form} from 'reactstrap'

import '../styles/playlist.css'
import CustomizePlaylist from './CustomizePlaylist';
const { Search } = Input;

let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken('BQDvsdEnJdjRF7XF9iMqVm_wH2D525HD8FWGO0NyWeWZlrXXMM0ub6wk28u_IErAoQKmwr4h2QeCMIQ7jTFGpz-52dyL0qmUa8RWxDsHurhbIvhfEB7ec2iRYLgDmKEPleBQuk-pN9NKfbdiA-bqJBmdOrQCYqZJ3whFdzGOVPR1zqMO4yJG63Y7jFY6VqNhgUbM&refresh_token=AQD7PNbeye6IF00u8Qcpectjc1YmsRIK8EWCSYeZjPevsk864lVeNrVRjr90dUb8lPbrgY_LAxlmVozmYkDyl40V8SZsE-pVqz31z8n0RphxtbEWO2JL41Y8GMaZbBSj4T4');

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      userId: '',
      userPlaylistId: '',
      artist: '',
      artistId: '',
      topTracks: [],
      topTracksIds: [],
      isSubmitted: false
    }
  }

  //ISSUE: MAKES A NEW PLAYLIST EVERY TIME PAGE IS REFRESHED
  componentDidMount(){
    this.getUser();
    if(this.props.location.artists){
      this.props.location.artists.concertList.forEach(artist => this.searchArtist(artist));
    }
  }

  sliceUserId = (url) => {
      let string = url.split(/[/?]/);
      return string[5]
  }

  getUser = () => {
      spotifyApi.getUserPlaylists().then(
        (data) => {
            this.setState({
                userId: this.sliceUserId(data.href)
            })
            this.createPlaylist();
            
        },
        (err) => {
        console.error(err);
        }
    );
  }

  searchArtist = (artist) => {
    console.log(artist);
    spotifyApi.searchArtists(artist).then(
        (data) => {
            if(data !== undefined) {
                let artistName = data.artists.items[0].name
                let id = data.artists.items[0].id
                this.setState({
                    artist: artistName, // index is 0 because most popular query's index is 0 
                    artistId: id // index is 0 because most popular query's index is 0 
                })
            }
            this.getTopTracks(this.state.artistId, 'TR');
        },
        (err) => {
            console.log(err)
        }
    );
  }

  getTopTracks = (artistId, country) => {
      spotifyApi.getArtistTopTracks(artistId, country).then(
          (data) => {
            this.setState({
                topTracks: data.tracks, // track info
            })
            
            this.state.topTracks.map((track) => {
                this.setState({
                    topTracksIds:this.state.topTracksIds.concat(track.uri) //storing track id's in an array
                })
            })
          },
          (err) => {
              console.log(err)
          }
      )
  }

  createPlaylist = () => {
      spotifyApi.createPlaylist(this.state.userId, {name: 'playlistApp_000001', description: 'created with playlistApp'}).then(
          (data) => {
              this.setState({
                  userPlaylistId: data.id
              })              
          },
          (err) => {
              console.log(err)
          }
      )
  }

  addTracksToPlaylist = () => {
      this.setState({isSubmitted: true})
      spotifyApi.addTracksToPlaylist(this.state.userPlaylistId, this.state.topTracksIds).then(
          (data) => {
              console.log(data)
          },
          (err) => {
              console.log(err)
          }
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      
          {/*EDIT TO STOP MAKING REPEATED ARTIST ENTRIES*/}
          <Button placeholder="finalize playlist" onClick={this.addTracksToPlaylist}>Finalize!</Button>
          {this.state.isSubmitted && <CustomizePlaylist playlistID = {this.state.userPlaylistId}/>}
        </header>
        
      </div>
    );
  }
}

export default Playlist;