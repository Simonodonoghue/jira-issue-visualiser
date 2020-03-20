import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { IoIosKeypad, IoIosGitNetwork, IoIosPodium, IoIosCog, IoIosRocket } from 'react-icons/io'
import '../../navigation-bar/NavigationBar.css';
import {
  NavLink, Switch, Route
} from "react-router-dom";
import AuthService from '../../auth-service/AuthService'

class TrelloNavigationBar extends Component {

  // TODO - if there are no projects set - don't show the sub options

  renderSecondaryNavs() {
    if (sessionStorage.getItem('selectedBoard')) {
      return (<Nav className="flex-column">
        <Nav.Link as={NavLink} exact to="/trello"><IoIosKeypad style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
        <Nav.Link as={NavLink} exact to="/trello/visualiser"><IoIosGitNetwork style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
        <Nav.Link as={NavLink} exact to="/trello/settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
      </Nav>
      )
    } else {
      return (<Nav className="flex-column">
         <Nav.Link as={NavLink} exact to="/trello/settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
      </Nav>)
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

export default TrelloNavigationBar;
