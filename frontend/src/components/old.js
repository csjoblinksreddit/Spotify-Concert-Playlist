import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../styles/playlist.css'
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;

let accessToken = 'BQBowQLOQhZfAoVQkumDKZ6SCzjPaC8QS1VO0S2zVcF3TLeTH-3GMf7ZgQrTPf2E11YQjfhxGfW0SFk4vMRBel2qotk5fTouV24yrkC7UqekY4oAHnP06I54A0ue-yd-RgTKy39HTh1PfUmIYKCFlEvooTHOhquG0eYUFYzX9VA3Dk0t4OAB95Hustead.Vq_1N7PHPY4Bzg';
let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken(accessToken);

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      userId: '',
      userPlaylistId: '',
      artist: [],
      artistName: [],
      artistId: '',
      topTracks: [],
      topTracksIds: [],
      count: 0 
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
          this.createPlaylist()
        },
        (err) => {
        console.error(err);
        }
    );
  }

  addArtist = (artist) => {
    spotifyApi.searchArtists(artist).then(
      (data) => {
          if(data !== undefined) {
              let artistName = data.artists.items[0].name
              this.setState({
                  artistName: this.state.artistName.concat(artistName), // index is 0 because most popular query's index is 0 
              })
              console.log(this.state.artistName)
          }
      },
      (err) => {
          console.log(err)
      }
  );
  }

  searchArtist = (artist) => {
    artist.map((artist) => {
      spotifyApi.searchArtists(artist).then(
        (data) => {
            if(data !== undefined) {
                let artistName = data.artists.items[0].name
                let id = data.artists.items[0].id
                this.setState({
                    artist: this.state.artist.concat(artistName), // index is 0 because most popular query's index is 0 
                    artistId: id, // index is 0 because most popular query's index is 0 
                    count: this.state.count + 1
                  })
            }
            this.getTopTracks(this.state.artistId, 'TR');
        },
        (err) => {
            console.log(err)
        }
      );
    })
  }

  getTopTracks = (artistId, country) => {
      spotifyApi.getArtistTopTracks(artistId, country, {limit: 5}).then(
          (data) => {
            this.setState({
                topTracks: data.tracks, // track info
            })
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

  createPlaylist = () => {
    console.log(' ' +this.state.count + '  ' + this.state.artistName.length)
    if(this.state.count == this.state.artistName.length) {
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

      this.setState({
        userPlaylistId: '',
        artist: [],
        artistId: '',
        topTracks: [],
        topTracksIds: [],
        count: 0 
      })
  }
  
  handleDeselect = (value) => {
    this.setState({
      artistName: this.state.artistName.filter(name => !name.includes(value))
    })
  }

  handleCreate = () => {
    this.searchArtist(this.state.artistName)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="artistInput">
            <Search
              placeholder="input search text"
              onSearch={ value => this.addArtist(value)}
              style={{ width: 200 }}
            />
            <Button id="searchButton" type="primary" onClick={this.handleCreate} shape="circle" icon={<SearchOutlined />} />
          </div>
          <div>
          <Select
            mode="multiple"
            style={{ width: 200 + 'px' }}
            placeholder="select one country"
            value={this.state.artistName}
            onDeselect={this.handleDeselect}
            optionLabelProp="label"
          >
            {this.state.artistName.map((artist, key) => {
              return(
                <Option key={key} value={artist} label={artist}>
                <div className="demo-option-label-item">
                  <span role="img" aria-label={key}>
                    {artist}
                  </span>
                </div>
              </Option>
              )
            })}
            </Select>
          </div>
        </header>
      </div>
    );
  }
}

export default Playlist;