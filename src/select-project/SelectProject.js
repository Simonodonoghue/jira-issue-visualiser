import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Container, Row, Col, Spinner, Badge } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import './SelectProject.css';
import DataService from '../data-service/DataService'
import { rgb } from 'd3';

class SelectProject extends Component {

    constructor(props) {
        super(props)

        DataService.executeGetProjects().then((result) => {
            this.setState({
                projects: result
            })

            console.log("done")
        })

        this.projectSelected = this.projectSelected.bind(this);


    }

    projectSelected(item) {
        this.props.projectSelectedHandler(item.key)
        this.setState({
            selectedProject: item.key
        })
    }

    render() {

        var projects = []

        var self = this

        if (this.state && this.state.projects) {
            this.state.projects.projects.forEach(function (project) {

                var projectCard;
                var projectClass = "project";

                if (sessionStorage.getItem('selectedProject') == project.key) {
                    projectClass = "project selected"
                }

                if (self.state.selectedProject && project.key == self.state.selectedProject) {
                    // we need to show the loader
                    projectCard = (
                        <div>
                            <Row>
                                <Col style={{ paddingTop: '15px' }}>
                                    <h2>
                                        {project.name}
                                    </h2>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center" style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(167, 167, 167, 0.5)' }}>
                                <Spinner animation="border" />
                            </div>
                        </div>
                    )
                } else {
                    projectCard = (
                        <Row>
                            <Col style={{ paddingTop: '15px' }}>
                                <h2>
                                    {project.name}
                                </h2>
                            </Col>
                        </Row>
                    )
                }

                projects.push(
                    <Col sm="3" className="project-container" onClick={() => {
                        console.log("selected")
                        self.projectSelected(project)
                    }}>

                        <Col className={projectClass}>
                            {projectCard}
                        </Col>


                    </Col>)
            })
        }


        return (
            <div style={{ paddingTop: '10px' }}>
                <Row>
                    <Col>
                        <h1>
                            Select a Project
                        </h1>
                        <p>
                            If you have already selected a project, it will be highlighted below. Else, pick a project. You can return here later to change projects.
                        </p>
                    </Col>
                </Row>
                <Row>{projects}</Row>
            </div>
        )

    }

}

export default SelectProject;
