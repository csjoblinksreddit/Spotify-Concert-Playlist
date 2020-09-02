import React, { Component } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import {Button, Form} from 'reactstrap'


import CustomizePlaylist from './customizePlaylist';
const { Search } = Input;

let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken('BQCQ_8CJZZ9rw7yIzYXgT6iZsvM9fj-DFk_3VvB03bBnrrRgTAKIM4i8jvJIrEqoIlKAfWBIGdw-cyTz9m8DaHx6dBHvHCwoLFQN39jyaTHbqThypLU-JHJWHmtYnOsgfNCtLP4rPiDZfCHgbihZp9SiQURjdyh8YS0cv-pISw3qdkpuZUnPnh3oNd6seUak4DZI&refresh_token=AQCYRV2Fj5n0TNKOey-HNMQpeRUZrmMd3cou9EnpP2Lpta6_ffB6eJW5FKjmS9MFxjz2cLdumS_3KkWYNPmCdS0keuG4CokCr-4wBPBjZJtbO3CQq_Z65wo53USF-UsG728');

class Concert extends Component {
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
      <div >
        <header>
          
      
          {/*EDIT TO STOP MAKING REPEATED ARTIST ENTRIES*/}
          <Button placeholder="finalize playlist" onClick={this.addTracksToPlaylist}>Add Playlist to Spotify</Button>
          {this.state.isSubmitted && <CustomizePlaylist playlistID = {this.state.userPlaylistId}/>}
        </header>
        
      </div>
    );
  }
}

export default Concert;