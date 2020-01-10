import React, { Component } from 'react';
import './Settings.css';
import moment from 'moment';
import { Button } from 'react-bootstrap'

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

            <div>
                <Button variant="primary" onClick={this.deauthoriseAccount}>Deauthorise</Button>
            </div>

        );
    }
}

export default Settings;
