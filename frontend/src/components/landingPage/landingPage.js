import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {Link} from "react-router-dom";
import './landingPage.css'
import concertBackground from '../../images/concert.jpg';

import Header from './header';
import AppFunctions from './appFunctions'
import { CssBaseline } from '@material-ui/core';


class LandingPage extends Component{
    constructor(){
        super();
    }
    render() {
        return (
          <div className='root'>
            <CssBaseline/>
            <Header/>
           
        
          
          </div>
        );
      }
}
export default LandingPage;