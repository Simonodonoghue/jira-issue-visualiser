import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Container, Row, Col } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import './JiraIssue.css';

class JiraIssue extends Component {

    render() {

        if (this.props.display) {
            return (

                <SlidingPane
                    closeIcon={<div>Some div containing custom close icon.</div>}
                    isOpen={this.props.display}
                    title='Hey, it is optional pane title.  I can be React component too.'
                    from='right'
                    width='700px'
                    onRequestClose={this.props.paneClosedHandler}>
                    <Container>
                        <Row>
                            <Col>
                                {this.props.dataObject.key}
                            </Col>
                        </Row>
                    </Container>
                </SlidingPane>

            );
        }

        return (<div></div>)

    }

}

export default JiraIssue;
