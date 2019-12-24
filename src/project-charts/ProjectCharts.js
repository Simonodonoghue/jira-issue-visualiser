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

class ProjectCharts extends Component {

    constructor(props) {
        super(props)

        // sum the worklogs array data for each array to get updates over time for SPI chart
        // hours on left y, number of tasks on right y

    }


    render() {
        return (

            <div>


            </div>

        );
    }
}

export default ProjectCharts;
