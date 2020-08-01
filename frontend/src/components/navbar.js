import React, { useState } from 'react';
import { Navbar, Form, Button, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, InputGroup, Input } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../styles/navbar.css' 
import homePage from './home'
import concertPlaylist from './concertPlaylist'
import playlistPage from './playlist'
import userPage from './user.js'
import aboutUsPage from './aboutUs'


const Example = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  return (  
      <Router>
        <div>
          <Navbar color='light' light expand='md'>
          <NavbarToggler onClick={toggle} className='mr-2' />
            <NavbarBrand href="/">PLAYLISTAPP</NavbarBrand>
              <Nav className='mr-auto' navbar tabs>
                <NavItem>
                  <NavLink href="/playlist">PLAYLIST</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/concertPlaylist">CONCERT</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/user">USER</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/aboutus">ABOUT</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="http://localhost:8888">LOGIN</NavLink>
                </NavItem>
              </Nav>       
            </Navbar>
          </div>
          <Switch>
              <Route exact path = '/' component = {homePage} />
              <Route exact path = '/concertPlaylist' component = {concertPlaylist} />
              <Route exact path = '/playlist' component = {playlistPage} />
              <Route exact path = '/user' component = {userPage} />
              <Route exact path = '/aboutus' component = {aboutUsPage} />
            </Switch>
        </Router>
  );
}

export default Example;