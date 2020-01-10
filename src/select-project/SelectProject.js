import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import './SelectProject.css';
import DataService from '../data-service/DataService'

class SelectProject extends Component {

    constructor(props) {
        super(props)

        DataService.executeGetProjects().then((result) => {
            this.setState({
                projects: result
            })

            console.log("done")
        })

    }

    render() {

        var projects = []

        if (this.state && this.state.projects) {
            this.state.projects.projects.forEach(function (project) {
                projects.push(<span>{project.name}</span>)
            })
        }


        return (<div>{projects}</div>)

    }

}

export default SelectProject;
