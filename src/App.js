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

import NavigationBar from './navigation-bar/NavigationBar'
import NodeVisualiser from './node-visualiser/NodeVisualiser'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPaneOpen: false
    }

    var self = this

    // Retrieve the authorization code from the query params
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('code');

    // Send the code to lambda and swap it for an access token
    var Http = new XMLHttpRequest();
    var url = 'https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-OAuth';
    Http.open("POST", url, true);
    Http.send(JSON.stringify({
      authCode: myParam
    }))

    Http.onreadystatechange = (e) => {
      if (Http.readyState == 4 && Http.status == 200) {
        console.log("auth response")
        console.log(JSON.parse(JSON.parse(Http.responseText)))
        var at = JSON.parse(JSON.parse(Http.responseText)).access_token

        if (!at) {
          window.location = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=IbpP46v0z5mLlBLgI2CStabBldUwT9P0&scope=read%3Ajira-user%20read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent'
        } else {
          Http = new XMLHttpRequest();
          var jql = prompt("Please enter a JQL URL");
          url = 'https://jok6vsojnh.execute-api.eu-west-2.amazonaws.com/default/JiraNodeVisualiser-Query';
          Http.open("POST", url, true);
          console.log("access token")
          console.log(at)
          Http.send(JSON.stringify({
            jql: jql,
            access_token: at,
            fields: "project,issuelinks,status,issuetype,subtasks"
          }))

          Http.onreadystatechange = (e) => {
            if (Http.readyState == 4 && Http.status == 200) {
              console.log(Http.responseText);

              self.setState({
                jiraData: JSON.parse(Http.responseText)
              })

            }
          }
        }
      }
    }
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
                  {this.state.jiraData ? <NodeVisualiser data={this.state.jiraData} /> : 'loading'}
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
