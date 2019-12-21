import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog  } from 'react-icons/io'
import './NavigationBar.css';
import {
  NavLink
} from "react-router-dom";

class NavigationBar extends Component {

  render() {
    return (

      <div>

        <Navbar fixed="left" bg="nav" variant="dark">
          <Nav className="flex-column">
            <Nav.Link as={NavLink} exact to="/"><IoIosAddCircleOutline style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
            <Nav.Link as={NavLink} to="/visualiser"><IoIosGitNetwork style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
            <Nav.Link href="#charts"><IoIosPodium style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
            <Nav.Link href="#settings"><IoIosCog style={{ margin: 'auto', display: 'block' }} color='white' size={32} /></Nav.Link>
          </Nav>


        </Navbar>

      </div>

    );
  }
}

export default NavigationBar;
