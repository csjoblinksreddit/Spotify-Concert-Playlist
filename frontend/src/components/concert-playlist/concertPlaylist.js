import React, { Component } from 'react';
import ZipForm from './ZipForm';
import '../normal-playlist/playlist.css'; 
import { Container } from 'reactstrap';

class ConcertPlaylist extends Component {
    constructor() {
        super();
    
    }
    render() {
        return (
        <Container>
            <ZipForm/>
        </Container>
        );
    }
}

export default ConcertPlaylist;