import React from 'react';
import { Navbar, Nav, NavItem, 
  FormGroup, Button, FormControl } from 'react-bootstrap';

class TopNavbar extends React.Component {
  render() {
    return (
      <div className="TopNavbar" id="top-navbar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Musicweb</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Music</NavItem>
            <NavItem eventKey={1} href="#">Video</NavItem>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button type="submit">Search</Button>
            </Navbar.Form>                  
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="#" >Signup</NavItem>
            <NavItem eventKey={4} href="#" >Login</NavItem>  
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopNavbar;
