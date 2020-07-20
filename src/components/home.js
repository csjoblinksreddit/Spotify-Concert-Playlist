import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ZipForm from './ZipForm';
class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            HOME PAGE
          </h1>
          <ZipForm/>
        </header>
      </div>
    );
  }
}

export default Home;