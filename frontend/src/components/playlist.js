import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import '../styles/playlist.css'
const { Search } = Input;



class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectedArtists: [],
      artistId: []
    }
  }

  addArtist = (artist, id) => {
    let gonnaBeAdded = [`${artist}`];
    let artistId = id;
    this.setState({ 
        selectedArtists: this.state.selectedArtists.concat(gonnaBeAdded), // adding item to array
        artistId: this.state.artistId.concat(artistId) // adding item to array
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="artistInput">
            <Search placeholder="input search text" onSearch={ value => this.addArtist(value, 'idWillComeHere')} enterButton />
          </div>
          <ul>
          {this.state.selectedArtists.map((artist, index) => (
            <li key={index + 1}>{index + 1} - {artist}</li>
          ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default Playlist;