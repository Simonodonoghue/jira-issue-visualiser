import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DataService from './data-service/DataService'
import AuthService from './auth-service/AuthService'

import NavigationBar from './navigation-bar/NavigationBar'
import NodeVisualiser from './node-visualiser/NodeVisualiser'
import JiraIssue from './jira-issue/JiraIssue'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPaneOpen: false
    }

    this.paneClosedHandler = this.paneClosedHandler.bind(this)
    this.nodeClickHandler = this.nodeClickHandler.bind(this)

    var self = this

    AuthService.auth().then((result) => {
      self.executeQuery()
    })
  }

  paneClosedHandler() {
    this.setState({
      isPaneOpen: false
    })
  }

  executeQuery() {
    var jql = prompt("Please enter a JQL URL");
    DataService.executeJiraQuery(jql).then((result) => {
      this.setState({
        jiraData: result
      })
    })
  }

  nodeClickHandler(data) {
    this.setState({
      isPaneOpen: true,
      paneDataObject: data
    })
  }

  render() {
    return (

      <div>

        <NavigationBar />

        <Container fluid={true}>

          <Row style={{overflowX: 'scroll'}}>
            <Col>
              <Switch>
                <Route exact path="/">
                  <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                  <button onClick={() => this.setState({ isPaneOpen: true })}>Click me to open right pane!</button>

                </Route>
                <Route path="/visualiser">
                  {this.state.jiraData ? <NodeVisualiser data={this.state.jiraData} nodeClickHandler={this.nodeClickHandler} /> : 'loading'}
                </Route>
                <Route path="/test">
                  Testing
                  <Switch>
                    <Route path="/test/new">
                      Some sub route
                      </Route>
                  </Switch>
                </Route>
              </Switch>
            </Col>
          </Row>

        </Container>

        <JiraIssue display={this.state.isPaneOpen} dataObject={this.state.paneDataObject} paneClosedHandler={this.paneClosedHandler} />

        



      </div>

    );
  }
}

export default App;
