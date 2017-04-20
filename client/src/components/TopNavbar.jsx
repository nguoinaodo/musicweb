import React from 'react';
import { Navbar, Nav, NavItem, 
  FormGroup, Button, FormControl } from 'react-bootstrap';

class TopNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.doLogout();
  }

  render() {
    let rightNavbar;
    let notLoggedIn = (
      <Nav pullRight>
        <NavItem href="#/signup" >Signup</NavItem>
        <NavItem href="#/login" >Login</NavItem>
      </Nav>
    );
    try {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (!this.user) {
        rightNavbar = notLoggedIn;
      } else {
        rightNavbar = (
          <Nav pullRight>
            <NavItem className="DisplayName" href={"#/user/" + this.user.username}>{this.user.displayName}</NavItem>  
            <NavItem className="Logout" onClick={this.logout}>Logout</NavItem>  
          </Nav>
        );
      }
    } catch (err) {
      console.log(err);
      rightNavbar = notLoggedIn;
    }
    
    return (
      <div className="TopNavbar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#/home">Musicweb</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="#/music">Music</NavItem>
            <NavItem href="#/video">Video</NavItem>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>
              {' '}
              <Button type="submit">Search</Button>
            </Navbar.Form>                  
          </Nav>
          {rightNavbar}
        </Navbar>
      </div>
    );
  }
}

export default TopNavbar;
