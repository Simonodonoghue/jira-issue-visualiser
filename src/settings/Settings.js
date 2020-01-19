import React, { Component } from 'react';
import './Settings.css';
import moment from 'moment';
import { Button, Row, Col } from 'react-bootstrap'

class Settings extends Component {

    constructor(props) {
        super(props)

        this.deauthoriseAccount = this.deauthoriseAccount.bind(this);
    }

    deauthoriseAccount() {
        // TODO - this needs to be moved into the AuthService in case it ever needs to be reused
        localStorage.clear()
        sessionStorage.clear()
    }

    render() {

        return (
            <Row>
                <Col>
                    <h1>
                        Deauthorise Atlassian Account
                        </h1>
                    <p>
                        Deauthorise your Atlassian account for use with the Jira Issue Visaliser by clicking the 'Deauthorise' Button below
                        </p>
                    <p>
                        <Button variant="primary" onClick={this.deauthoriseAccount}>Deauthorise</Button>
                    </p>
                </Col>
            </Row>
        );
    }
}

export default Settings;
