import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {Link} from "react-router-dom";
import './landingPage.css'
import concertBackground from '../../images/concert.jpg';


class LandingPage extends Component{
    constructor(){
        super();
    }
    render() {
        return (
          <Container className="landingPage-container">
          <Row id ="landingPage-row">
            <Col id="test">
             <h1>Create By Concert</h1>
             <p>Find artists performing in your area</p>
             <Link to={{
                        pathname:'../aboutUs',
                   
                    }}><Button id="buttonLink" type="submit">Enter Zipcode</Button></Link>

            </Col>
            <Col>
              <h1>Create By Artist</h1>
              <p>Choose your favorite artists</p>
              <Link to={{
                        pathname:'../aboutUs',
                   
                    }}><Button id="buttonLink" type="submit">Enter Artists</Button></Link>


            </Col>
          </Row>

          <Row id = "landingPage-mid">
            <Col><h2>Make playlist creation easy</h2></Col>
          </Row>
          <Row>
            <Col><p>Prepare for upcoming shows with the Create By Concert playlist generator!</p> 
            <p> Enter your postal code, sort by available genres and performing artists in your area to generate a playlist with their top songs  </p></Col>
            <Col><p>Make your new favorite playlist with the Create By Artist playlist generator!</p>
            <p>Enter your favorite artists and instantly have their top 10 songs added  </p></Col>
          </Row>

          <Row id = "landingPage-bot">
          </Row>
          </Container>
        );
      }
}
export default LandingPage;