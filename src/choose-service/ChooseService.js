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
                        <p>The Node Visualiser allows you to view your JIRA projects and Trello boards as a force-directed graph.</p>
                            
                        <p>With  JIRA, view your project through an entirely new lense, highlighting dependencies in a visual, interactive way.</p>

                        <p>With Trello, draw dependencies between your cards to better organise your work. Something you cannot do in the Trello application</p>
                        
                        <p>This project is in beta, but with the recent uptake in home working, maybe a half-baked product will help 1 or 2 projects collaborate. For that, it's worth it.</p>

                        <p>Enjoy</p>
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
