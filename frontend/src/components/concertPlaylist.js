import React, { Component } from 'react';
import ZipForm from './ZipForm';


class ConcertPlaylist extends Component {

    constructor() {
        super();

        this.state = {
          zipSubmit: false,
          zipCode: '',
          genreSubmit: false,
          genreCodes: [],
          artistSubmit: false,
          artists: [],
          test: 'testing'
        };
    

    
    }


    render() {
        return (
        <div>
            <ZipForm/>

           
        </div>
        );
    }
}

export default ConcertPlaylist;