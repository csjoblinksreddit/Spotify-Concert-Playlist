import React, { useState } from 'react';
import { Navbar, Form, Button, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, InputGroup, Input } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import homePage from './home'
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
            <NavbarBrand><Link to='/'>PLAYLISTAPP</Link></NavbarBrand>
              <Nav className='mr-auto' navbar tabs>
                <NavItem><NavLink><Link to='/playlist'>PLAYLIST</Link></NavLink></NavItem>
                <NavItem><NavLink><Link to='/user'>USER</Link></NavLink></NavItem>
                <NavItem><NavLink><Link to='/aboutus'>ABOUT US</Link></NavLink></NavItem>
              </Nav>
              <Form inline>
                <InputGroup>
                    <Input placeholder = 'keyword'></Input>
                </InputGroup>
                <Button variant='outline-success'>Search</Button>
              </Form>        
            </Navbar>
          </div>
          <Switch>
          <Route exact path = '/' component = {homePage} />
              <Route exact path = '/playlist' component = {playlistPage} />
              <Route exact path = '/user' component = {userPage} />
              <Route exact path = '/aboutus' component = {aboutUsPage} />
            </Switch>
        </Router>
  );
}

export default Example;