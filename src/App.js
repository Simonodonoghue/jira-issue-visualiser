import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPaneOpen: false
    }

    this.nodeClickHandler = this.nodeClickHandler.bind(this)

    var self = this

    AuthService.auth().then((result) => {
      self.executeQuery()
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

  nodeClickHandler() {
    this.setState({
      isPaneOpen: true
    })
  }

  render() {
    return (

      <div>

        <NavigationBar />

        <Container fluid={true}>

          <Row>
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
              <Row><Col>egre</Col></Row>



            </Col>
          </Row>

        </Container>


        <SlidingPane
          closeIcon={<div>Some div containing custom close icon.</div>}
          isOpen={this.state.isPaneOpen}
          title='Hey, it is optional pane title.  I can be React component too.'
          from='right'
          width='700px'
          onRequestClose={() => this.setState({ isPaneOpen: false })}>
          <div>And I am pane content on left.</div>
        </SlidingPane>



      </div>

    );
  }
}

export default App;
