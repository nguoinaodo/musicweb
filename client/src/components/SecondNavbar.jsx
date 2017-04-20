import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class SecondNavbar extends React.Component {
  render() {
    return (
      <div className="SecondNavbar" id="second-navbar">
        <Navbar>
          <Nav>
            <NavItem href="#/home" >Trang chu</NavItem>
            <NavItem href="#/song">Bai hat</NavItem>
            <NavDropdown title="Playlist">
              <MenuItem>Action</MenuItem>
              <MenuItem>Another action</MenuItem>
              <MenuItem>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem>Separated link</MenuItem>
            </NavDropdown>
            <NavItem href="#/video">Video</NavItem>
            <NavDropdown title="BXH">
              <MenuItem href="#/top/us-uk">US-UK</MenuItem>
              <MenuItem href="#/top/vn">VN</MenuItem>
              <MenuItem href="#/top/kr">Korea</MenuItem>
            </NavDropdown>
            <NavDropdown title="Chu de">
              <MenuItem>Action</MenuItem>
              <MenuItem>Another action</MenuItem>
              <MenuItem>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem>Separated link</MenuItem>
            </NavDropdown>
            <NavItem href="#/artist" >Nghe si</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default SecondNavbar;
