import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Button, Modal, Spinner, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import DataService from '../data-service/DataService'
import AuthService from '../auth-service/AuthService'

import JiraNavigationBar from '../jira/navigation-bar/JiraNavigationBar'
import NodeVisualiser from '../jira/node-visualiser/NodeVisualiser'
import JiraIssue from '../jira/jira-issue/JiraIssue'
import ProjectCharts from '../jira/project-charts/ProjectCharts'
import { withRouter } from "react-router-dom";
import Settings from '../jira/settings/Settings';
import SelectProject from '../jira/select-project/SelectProject'
import ChooseService from '../choose-service/ChooseService'


class JiraManager extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPaneOpen: false,
            isAuthd: false,
            showError: false
        }

        this.handleClose = this.handleClose.bind(this)
        this.paneClosedHandler = this.paneClosedHandler.bind(this)
        this.nodeClickHandler = this.nodeClickHandler.bind(this)
        this.projectSelectedHandler = this.projectSelectedHandler.bind(this)


        var self = this

        AuthService.handleJiraAuth().then((result) => {

            this.setState({
                isAuthd: true
            })

            if (result) {
                self.props.history.push('/jira');
            }

            if (sessionStorage.getItem('selectedProject')) {
                DataService.executeJiraQuery('project = ' + sessionStorage.getItem('selectedProject')).then((result) => {
                    this.setState({
                        jiraData: result
                    })
                }).catch(err => {
                    this.setState({
                        showError: true
                    })
                })
            }


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

            self.props.history.push('/jira/visualiser');

        }).catch(err => {
            this.setState({
                showError: true
            })
        })
    }

    nodeClickHandler(data) {
        this.setState({
            isPaneOpen: true,
            paneDataObject: data
        })
    }

    handleClose() {
        sessionStorage.setItem('selectedProject', "")
        this.setState({
            showError: false
        })
    }

    render() {

        if (this.state.isAuthd) {
            return (

                <div>

                    <JiraNavigationBar />

                    <Modal show={this.state.showError} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Woops!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Sorry, we're still in beta. We'll fix this as soon as possible. Thanks for using our product.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div style={{ paddingLeft: '64px', width: '100%' }}>
                        <Container fluid={true}>

                            <Row style={{ overflowX: 'hidden' }}>
                                <Col>
                                    <Switch>
                                        <Route exact path="/jira">
                                            <SelectProject projectSelectedHandler={this.projectSelectedHandler} />
                                        </Route>
                                        <Route path="/jira/visualiser">
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
                                        <Route path="/jira/charts">
                                            {() => {

                                                if (this.state.jiraData) {
                                                    return (
                                                        <Row>
                                                            <Col>
                                                                <ProjectCharts issues={this.state.jiraData.issues} />
                                                            </Col>
                                                        </Row>
                                                    )
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
                                        <Route path="/jira/settings">
                                            {() => {
                                                return <Settings />
                                            }
                                            }
                                        </Route>
                                    </Switch>
                                </Col>
                            </Row>

                        </Container>

                    </div>

                    <JiraIssue display={this.state.isPaneOpen} dataObject={this.state.paneDataObject} paneClosedHandler={this.paneClosedHandler} />
                </div>

            );
        } else {
            return (<div></div>)
        }


    }
}

export default withRouter(JiraManager)
