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
import DataService from './data-service/DataService'
import AuthService from './auth-service/AuthService'

import NavigationBar from './navigation-bar/NavigationBar'
import NodeVisualiser from './node-visualiser/NodeVisualiser'
import JiraIssue from './jira-issue/JiraIssue'
import ProjectCharts from './project-charts/ProjectCharts'
import { withRouter } from "react-router-dom";
import Settings from './settings/Settings';
import SelectProject from './select-project/SelectProject'

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
      if (result) {
        self.props.history.push('/');
      }
      self.executeQuery()
    })
  }

  paneClosedHandler() {
    this.setState({
      isPaneOpen: false
    })
  }

  executeQuery() {
    var selectedProject = sessionStorage.getItem("selectedProject")
    var self = this

    if (!selectedProject) {
      sessionStorage.setItem("selectedProject", prompt("Please enter a JQL URL"))
    }

    DataService.executeJiraQuery(sessionStorage.getItem("selectedProject")).then((result) => {
      this.setState({
        jiraData: result
      })

      self.props.history.push('/');

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

          <Row style={{ overflowX: 'hidden' }}>
            <Col>
              <Switch>
                <Route exact path="/">
                  <Container>
                    <SelectProject />
                  </Container>
                </Route>
                <Route path="/visualiser">
                  {() => {

                    if (this.state.jiraData) {
                      return (<NodeVisualiser data={this.state.jiraData} nodeClickHandler={this.nodeClickHandler} />)
                    } else {
                      return (
                        <Container fluid={true}>
                          <Row>
                            <Col>
                              <Spinner animation="border" />
                            </Col>
                          </Row>
                        </Container>
                      )
                    }
                  }
                  }
                </Route>
                <Route path="/charts">
                  {() => {

                    if (this.state.jiraData) {
                      return (
                        <Container fluid={true}>
                          <Row>
                            <Col>
                              <ProjectCharts issues={this.state.jiraData.issues} />
                            </Col>
                          </Row>
                        </Container>)
                    } else {
                      return (
                        <Container fluid={true}>
                          <Row>
                            <Col>
                              <Spinner animation="border" />
                            </Col>
                          </Row>
                        </Container>
                      )
                    }
                  }
                  }
                </Route>
                <Route path="/settings">
                  {() => {
                    return <Settings />
                  }
                  }
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

export default withRouter(App);
