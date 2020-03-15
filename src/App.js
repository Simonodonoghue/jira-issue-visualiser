import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Settings from './settings/Settings'


import { withRouter } from "react-router-dom";
import ChooseService from './choose-service/ChooseService'
import JiraManager from './app-managers/JiraManager';
import TrelloManager from './app-managers/TrelloManager';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Switch>
        <Route exact path="/">
          <ChooseService></ChooseService>
        </Route>
        <Route exact path="/jira*">
          <JiraManager></JiraManager>
        </Route>
        <Route exact path="/trello*">
          <TrelloManager></TrelloManager>
        </Route>
        <Route exact path="/settings">
          <Settings></Settings>
        </Route>

      </Switch>
    )

  }
}

export default withRouter(App);
