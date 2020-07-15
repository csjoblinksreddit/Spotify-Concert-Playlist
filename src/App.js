import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Genres from './components/Genres';
import ZipForm from './components/ZipForm';
import { Button } from 'reactstrap';

require('dotenv').config();
class App extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      input: "",
      evaluated: false 
    };
    this.addToInput = this.addToInput.bind(this);
  }
  
  addToInput = val => {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            INDEX PAGE 
          </h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <ZipForm
            addToInput = {this.addToInput}/>
          
  
        </header>
      </div>
    );
  }

}




export default App;