import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class SecondNavbar extends React.Component {
  render() {
    return (
      <div className="SecondNavbar" id="second-navbar">
        <Navbar>
          <Nav>
            <NavItem eventKey={1} href="#" >Trang chu</NavItem>
            <NavItem eventKey={2} href="#" >Kham pha</NavItem>
            <NavDropdown eventKey={3} title="Bai hat">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Playlist">
              <MenuItem eventKey={4.1}>Action</MenuItem>
              <MenuItem eventKey={4.2}>Another action</MenuItem>
              <MenuItem eventKey={4.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={4.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={5} title="Video">
              <MenuItem eventKey={5.1}>Action</MenuItem>
              <MenuItem eventKey={5.2}>Another action</MenuItem>
              <MenuItem eventKey={5.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={5.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={6} title="BXH">
              <MenuItem eventKey={6.1}>Action</MenuItem>
              <MenuItem eventKey={6.2}>Another action</MenuItem>
              <MenuItem eventKey={6.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={6.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={7} title="Chu de">
              <MenuItem eventKey={7.1}>Action</MenuItem>
              <MenuItem eventKey={7.2}>Another action</MenuItem>
              <MenuItem eventKey={7.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={7.3}>Separated link</MenuItem>
            </NavDropdown>
            <NavItem eventKey={8} href="#" >Nghe si</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default SecondNavbar;
