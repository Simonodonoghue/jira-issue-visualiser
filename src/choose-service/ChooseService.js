import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Container, Row, Col, Spinner, Badge } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import DataService from '../data-service/DataService'
import AuthService from '../auth-service/AuthService'
import { rgb } from 'd3';
import { Link } from 'react-router-dom'

class ChooseService extends Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <Row>
                <Col>
                    <Link to="/trello">Trello</Link>
                </Col>
                <Col>
                    <Link to="/jira">Jira</Link>
                </Col>
            </Row>
        )
    }
}

export default ChooseService;
