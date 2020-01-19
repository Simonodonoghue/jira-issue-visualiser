import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog, IoIosRocket } from 'react-icons/io'
import './NavigationBar.css';
import {
  NavLink, Switch, Route
} from "react-router-dom";
import AuthService from '../auth-service/AuthService'

class NavigationBar extends Component {

  // TODO - if there are no projects set - don't show the sub options

  renderSecondaryNavs() {
    if (sessionStorage.getItem('selectedProject')) {
      return (<Nav className="flex-column">
        <Nav.Link as={NavLink} to="/visualiser"><IoIosGitNetwork style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
        <Nav.Link as={NavLink} to="/charts"><IoIosPodium style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
        <Nav.Link as={NavLink} to="/settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
      </Nav>
      )
    } else if (AuthService.isAuthenticated) {
      return (<Nav className="flex-column">
        <Nav.Link as={NavLink} to="/settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
      </Nav>)
    } else {
      return (<div></div>)
    }
  }

  render() {

    return (

      <div>
        <Navbar fixed="left" bg="nav" variant="dark">
          <Navbar.Brand as={NavLink} exact to="/">
            <IoIosRocket style={{ margin: 'auto', display: 'block' }} color='white' size={32} />
          </Navbar.Brand>

          {this.renderSecondaryNavs()}

        </Navbar>

      </div>

    );
  }
}

export default NavigationBar;
