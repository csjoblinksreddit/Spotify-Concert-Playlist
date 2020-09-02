import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


let Spotify = require('spotify-web-api-js');
let spotifyApi = new Spotify();
spotifyApi.setAccessToken('');
//CUSTOMIZE THE NAME, DESCRIPTION AND PRIVACY IN PLAYLIST

export default class CustomizePlaylist extends Component{
    constructor(props) {
        super(props);
        this.state={
          playlistName: '',
          public: false,
          description: "",
          isSubmitted: false,
          pictures: []
        }
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescription = this.handleDescription.bind(this);

    }

    handleName = (event) => 
    {
        this.setState({playlistName: event.target.value});
        this.setState({isSubmitted: false});
    }
    handleDescription = (event) => 
    {
        this.setState({description: event.target.value});
        this.setState({isSubmitted: false});
    }
    handleSubmit = (event) =>{
        this.editPlaylist();
        this.setState({isSubmitted: true});
        event.preventDefault();
    }
    editPlaylist = () =>{
        //PASS IN PLAYLIST ID THROUGH PROPS
        spotifyApi.changePlaylistDetails(this.props.playlistID, {name: this.state.playlistName, public: this.state.public, description: this.state.description}).then(
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
          Customize your playlist
          <Form className ="ZipForm" onSubmit={this.handleSubmit}>
            {/*EDIT PLAYLIST NAME */}
            <FormGroup>
              <Label for="playlistName"></Label>
                <Input type="text" value={this.state.playlistName} id="playlistName" onChange={this.handleName} placeholder="Enter Playlist Name" />
            </FormGroup>
            {/*EDIT PLAYLIST PRIVACY */}
            <FormGroup>
                <p>Select playlist privacy</p> 
                <Input type="radio" name="privacy" value={true} id="true"/>
                <Label for="true">public</Label><br></br>
                <Input type="radio" name="privacy" value={false} id="false"/>
                <Label for="false">private</Label>
            </FormGroup>
            {/*EDIT PLAYLIST DESCRIPTION */}
            <FormGroup>
              <Label for="playlistDescription"></Label>
                <Input type="text" value={this.state.description} id="playlistDescription" onChange={this.handleDescription} placeholder="Enter playlist description" />
            </FormGroup>
            <Button type ="submit" value={this.state.zip} placeholder="submit">Finalize</Button>
        </Form>

        </div>
      );
      }
}

