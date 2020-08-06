import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'antd/dist/antd.css';
import '../styles/playlist.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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