import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'antd/dist/antd.css';
import '../styles/playlist.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken('BQD--_RsMQYo_2lONWrZ5pCpKii9TSZ_IFWQDSQwpVQWl22tqKRa4a5UZh-pPMOuv9upcMi42-jZS1YMDA2VKqEn7Fy3sb0XpUxaCdpTcXdULmoZAf_ZxqhceNp8BHa03XHSRcqfzrpaH2ShropaQYcRmDeoV5iy7WIhciRKpikwi1C8esEYRlr9GtXPSi7D3100sA');

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      userId: '',
      userPlaylistId: '',
      artist: '',
      artistId: '',
      topTracks: [],
      topTracksIds: [] 
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

        },
        (err) => {
        console.error(err);
        }
    );
  }

  searchArtist = (artist) => {
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
      spotifyApi.getArtistTopTracks(artistId, country, {limit: 5}).then(
          (data) => {
            this.setState({
                topTracks: data.tracks, // track info
            })
            this.getAlbumTracks();
            this.state.topTracks.map((track) => {
                this.setState({
                    topTracksIds:this.state.topTracksIds.concat(track.uri) //storing track id's in an array
                })
            })
            this.getUser();
          },
          (err) => {
              console.log(err)
          }
      )
  }

  getAlbumTracks = () => {
    spotifyApi.getTrack('3wFGRek61NIF330UwJCI52').then(
      (data) => {
        console.log('data :')
        console.log(data)
      }, 
      (err) => {console.log(err)}
    )    
  }

  createPlaylist = () => {
      spotifyApi.createPlaylist(this.state.userId, {name: 'playlistApp_000001', description: 'created with playlistApp'}).then(
          (data) => {
              this.setState({
                  userPlaylistId: data.id
              })
              this.addTracksToPlaylist();
          },
          (err) => {
              console.log(err)
          }
      )
  }

  addTracksToPlaylist = () => {
      spotifyApi.addTracksToPlaylist(this.state.userPlaylistId, this.state.topTracksIds).then(
          (data) => {
              console.log('tracks added ')
          },
          (err) => {
              console.log(err)
          }
      )
  }

  trigger = () => {
    console.log('triggered')
  }
  triggered = () => {
    console.log('triggeredd')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="artistInput">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <Button onClick={this.trigger}>Submit</Button>
            </Form>
          </div>
          <ul>
            <li>{this.state.artist}</li>
            <li>{this.state.artistId}</li>
          </ul>
          <Button onClick={this.triggered}>Submit</Button>
        </header>
      </div>
    );
  }
}

export default Playlist;