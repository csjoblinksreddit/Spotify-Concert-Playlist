import React, { Component } from 'react';
import '../App.css';
import { Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../styles/playlist.css'
import { Container, Row, Col } from 'reactstrap';
const { Search } = Input;
const { Option } = Select;

let accessToken = 'BQC6c0vBe485ftSK1UK22oUGwA3COgoGtQuI1jDwVfrVWoggE9OxUd_aqqw33DBMhxhxDndwjuNXCjCESMoUa-V0t1RgdGg9YmDBogRk2zjMmlLNPAf-0cMlvypYJBe-6njTQ5XSNciO6kXll6EEtcUhPiRjBwUj200H2BBFz5gCuY3QwYpR6zaGGED9RD9U0O9lQw' 
let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken(accessToken);

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: {
          id: '',
          playlistId: ''
      },
      artist: {
          name: '',
          id: ''
      },
      selectedArtists: [], 
      searchedArtists: [],
      topTracksIds: [] 
    }
  }

  componentDidMount() {
      this.setState({
          topTracksIds: []
      })
      this.getUser();
  }

  sliceUserId = (url) => {
      let string = url.split(/[/?]/);
      return string[5]
  }

  getUser = () => {
      spotifyApi.getUserPlaylists().then(
        (data) => {
            this.setState({
                user: { id : this.sliceUserId(data.href)}
            })
        },
        (err) => {
        console.error(err);
        }
    );
  }

  getArtist = (artist) => {
    spotifyApi.searchArtists(artist).then(

        (data) => {
            if(data !== undefined) {
                this.setState({
                    searchedArtists: this.state.searchedArtists.concat(data.artists.items[0].name), // index is 0 because most popular query's index is 0 
                    selectedArtists: this.state.selectedArtists.concat(data.artists.items[0].name)
                })
            }
        },

        (err) => {
            console.log(err)
        }
    );
  }

  searchArtist = (artist) => {
    artist.map((artistName, key) => {
        spotifyApi.searchArtists(artistName).then(
            (data) => {
                if(data !== undefined) {
                    this.setState({
                        artist:{name: data.artists.items[0].name, id : data.artists.items[0].id}  // index is 0 because most popular query's index is 0 
                    })
                }
               this.getTopTracks(this.state.artist.id, 'TR');
            },
            (err) => {
                console.log(err)
            }
        );
    })
  }


  getTopTracks = (artistId, country) => {
      spotifyApi.getArtistTopTracks(artistId, country).then(
          
        (data) => {
            data.tracks.map((track) => {
                this.setState({
                    topTracksIds:this.state.topTracksIds.concat(track.uri) //storing track id's in an array
                })
            })
            console.log(this.state.topTracksIds)
          },

        (err) => {
            console.log(err)
        }
      )
  }


  createPlaylist = (userId, name='playlistApp', description='created with playlistApp') => {
      spotifyApi.createPlaylist(userId, {name, description}).then(
        (data) => {
            this.setState({
                user: { playlistId: data.id } 
            })
            this.addTracksToPlaylist(this.state.user.playlistId, this.state.topTracksIds);
        },
        (err) => {
            console.log(err)
        }
      )
  }

  addTracksToPlaylist = (playlistId, topTracksIds) => {
      spotifyApi.addTracksToPlaylist(playlistId, topTracksIds).then(
          (data) => {
              console.log('playlist data: ' + data)
              this.setState({
                  topTracksIds: []
              })
          },
          (err) => {
              console.log(err)
          }
      )
  }

  handleSelect = (value) => {
    this.setState({
        selectedArtists: this.state.selectedArtists.concat(value)
    }) 
}

  handleDeselect = (value) => {
    this.setState({
        selectedArtists: this.state.selectedArtists.filter(name => !name.includes(value))
    })
  }

  handleCreate = () => {
    this.searchArtist(this.state.selectedArtists)
    this.createPlaylist(this.state.user.id, 'yeni liste', 'açıklama');
  }



  render() {
    return (
        <Container className="playlistPage-container">
            <Row id="playlistPage-row">
                <Col>
                    <div id="form-container">
                        <div id="artistInput">
                            <div id="searchArtist">
                                <Search
                                    id="searchArtistInput"
                                    placeholder="Search Artist"
                                    onSearch={ value => this.getArtist(value)}
                                />
                            </div>
                            <Button id ="create-button" type="primary" onClick={this.handleCreate}> Create Playlist </Button>
                        </div>
                        <div id="pickArtists">
                            <Select
                            mode="multiple"
                            placeholder="Select Artists"
                            style={{display: this.state.searchedArtists.length > 0 ? 'block' : 'none'}}
                            value={this.state.selectedArtists}
                            onSelect={this.handleSelect}
                            onDeselect={this.handleDeselect}
                            optionLabelProp="label"
                            >
                            {this.state.searchedArtists.map((artist, key) => {
                                return (
                                    <Option id = {artist} key={key} value={artist} label={artist}>
                                        <div className="demo-option-label-item">
                                            <span role="img" aria-label={key}>{artist}</span>
                                        </div>
                                    </Option>
                                );
                            })}
                            </Select>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
      );
  }
}

export default Playlist;