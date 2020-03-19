import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Button, Card, Row, Col, Container, Badge } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import DataService from '../data-service/DataService'
import AuthService from '../auth-service/AuthService'
import { rgb } from 'd3';
import { Link } from 'react-router-dom'
import TrelloImg from '../../assets/trello.png'
import JiraImg from '../../assets/jira.png'

class ChooseService extends Component {

    constructor(props) {
        super(props)

    }


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Node Visualiser</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>ergheger</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={TrelloImg} />
                            <Card.Body>
                                <Card.Text>
                                    Connect with Trello to visualise the cards on your Trello board and make connections between related cards.
                                </Card.Text>
                                <Button variant="primary"><Link style={{ color: 'white' }} to="/trello">Connect with Trello</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                        <Card.Img variant="top" src={JiraImg} />
                            <Card.Body>
                                <Card.Text>
                                    Connect with Trello to visualise the cards on your Trello board and make connections between related cards.
                                </Card.Text>
                                <Button variant="primary"><Link style={{ color: 'white' }} to="/jira">Connect with JIRA</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ChooseService;
