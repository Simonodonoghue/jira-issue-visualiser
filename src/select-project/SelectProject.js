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

        this.projectSelected = this.projectSelected.bind(this);


    }

    projectSelected(item) {
        console.log("project selected")
        this.props.projectSelectedHandler(item.key)
    }

    render() {

        var projects = []

        var self = this

        if (this.state && this.state.projects) {
            this.state.projects.projects.forEach(function (project) {
                projects.push(

                    <Col sm="3" className="project-container" onClick={() => {
                        console.log("selected")
                        self.projectSelected(project)
                    }}>

                        <Col className="project">
                            <Row>
                                <Col>
                                    {project.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img style={{ borderRadius: '50%' }} src={project.avatarUrls['32x32']} />
                                </Col>
                            </Row>

                        </Col>


                    </Col>)
            })
        }


        return (<Row>{projects}</Row>)

    }

}

export default SelectProject;
