import React, { useState } from 'react';
import { Collapse, Navbar, Form, Input, Button, InputGroup, NavbarText, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import indexPage from '../App'
import playlistPage from './playlist'
import userPage from './user.js'
import aboutUsPage from './aboutUs'

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Router>
      <div>
        <Navbar expand="navbar-expand-lg" color="light" light>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <NavbarBrand><Link to='/'>PLAYLISTAPP</Link></NavbarBrand>
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="mr-auto" >
            <NavItem><NavLink><Link to='/aboutus'>ABOUT US</Link></NavLink></NavItem>
            </Nav>
          </Collapse>
          <Nav className="mr-auto" tabs>
              <NavItem><NavLink><Link to='/playlist'>PLAYLIST</Link></NavLink></NavItem>
              <NavItem><NavLink><Link to='/user'>USER</Link></NavLink></NavItem>
          </Nav>  
          <Form inline>
              <InputGroup>
                  <Input placeholder = "keyword"></Input>
              </InputGroup>
              <Button variant="outline-success">Search</Button>
          </Form> 
        </Navbar>
      </div>
      <Switch>
        <Route exact path = '/' component = {indexPage} />
        <Route exact path = '/playlist' component = {playlistPage} />
        <Route exact path = '/user' component = {userPage} />
        <Route exact path = '/aboutus' component = {aboutUsPage} />
      </Switch>
    </Router>
  );
}

export default Example;