import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import DataService from '../data-service/DataService'
import AuthService from '../auth-service/AuthService'

import TrelloNavigationBar from '../trello/navigation-bar/TrelloNavigationBar'
import NodeVisualiser from '../trello/node-visualiser/TrelloVisualiser'
import JiraIssue from '../jira/jira-issue/JiraIssue'
import ProjectCharts from '../jira/project-charts/ProjectCharts'
import { withRouter } from "react-router-dom";
import TrelloSettings from '../trello/settings/Settings';
import SelectProject from '../jira/select-project/SelectProject'
import ChooseService from '../choose-service/ChooseService'
import SelectBoard from '../trello/select-board/SelectBoard'


class TrelloManager extends Component {

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

        AuthService.handleTrelloAuth().then(() => {

            this.setState({
                isAuthd: true
            })

            if (sessionStorage.getItem('selectedBoard')) {
                DataService.getCards(sessionStorage.getItem('selectedBoard')).then((result) => {
                    DataService.getLists(sessionStorage.getItem('selectedBoard')).then((listResult) => {

                        this.setState({
                            data: result,
                            lists: listResult
                        })

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

        DataService.getCards(project).then((result) => {

            DataService.getLists(project).then((listResult) => {

                this.setState({
                    data: result,
                    lists: listResult
                })

                sessionStorage.setItem('selectedBoard', project)

                self.props.history.push('/trello/visualiser');

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

                <TrelloNavigationBar />

                <div style={{ paddingLeft: '64px', width: '100%' }}>

                    <Container fluid={true}>

                        <Row style={{ overflowX: 'hidden' }}>
                            <Col>
                                <Switch>
                                    <Route exact path="/trello">
                                        <SelectBoard projectSelectedHandler={this.projectSelectedHandler}></SelectBoard>
                                    </Route>
                                    <Route path="/trello/visualiser">
                                        {() => {

                                            if (this.state.data) {
                                                return (<NodeVisualiser lists={this.state.lists} data={this.state.data} nodeClickHandler={this.nodeClickHandler} />)
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
                                    <Route path="/trello/settings">
                                        {() => {
                                            return <TrelloSettings />
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

    }
}

export default withRouter(TrelloManager)
