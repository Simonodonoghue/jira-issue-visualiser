import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog, IoIosRocket } from 'react-icons/io'
import './NavigationBar.css';
import {
  NavLink, Switch, Route
} from "react-router-dom";

class NavigationBar extends Component {

  // TODO - if there are no projects set - don't show the sub options

  render() {
    return (

      <div>
        <Navbar fixed="left" bg="nav" variant="dark">
          <Navbar.Brand as={NavLink} exact to="/">
            <IoIosRocket style={{ margin: 'auto', display: 'block' }} color='white' size={32} />
          </Navbar.Brand>
          <Route exact path='/:sub'>


            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/visualiser"><IoIosGitNetwork style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
              <Nav.Link as={NavLink} to="/charts"><IoIosPodium style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
              <Nav.Link as={NavLink} to="/settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
            </Nav>
          </Route>

        </Navbar>

      </div>

    );
  }
}

export default NavigationBar;
