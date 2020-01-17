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
      isPaneOpen: false,
      isAuthd: false
    }

    this.paneClosedHandler = this.paneClosedHandler.bind(this)
    this.nodeClickHandler = this.nodeClickHandler.bind(this)
    this.projectSelectedHandler = this.projectSelectedHandler.bind(this)


    var self = this

    AuthService.auth().then((result) => {
      //if (result) {
      self.props.history.push('/');
      this.setState({
        isAuthd: true
      })

      //}


    })
  }

  paneClosedHandler() {
    this.setState({
      isPaneOpen: false
    })
  }

  projectSelectedHandler(project) {
    this.executeQuery(project)
  }

  executeQuery(project) {
    var self = this

    DataService.executeJiraQuery('project = ' + project).then((result) => {
      sessionStorage.setItem('selectedProject', project)
      
      this.setState({
        jiraData: result
      })

      self.props.history.push('/visualiser');

    })
  }

  nodeClickHandler(data) {
    this.setState({
      isPaneOpen: true,
      paneDataObject: data
    })
  }

  render() {

    if (this.state.isAuthd) {

      return (

        <div>

          <NavigationBar />

          <Container fluid={true}>

            <Row style={{ overflowX: 'hidden' }}>
              <Col>
                <Switch>
                  <Route exact path="/">
                      <SelectProject projectSelectedHandler={this.projectSelectedHandler} />
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
    } else {
      return (<div>loading</div>)
    }

  }
}

export default withRouter(App);
