import React, { Component } from 'react';
import SlidingPane from 'react-sliding-pane';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap'
import { IoIosAddCircleOutline, IoIosGitNetwork, IoIosPodium, IoIosCog } from 'react-icons/io'
import './JiraIssue.css';

class JiraIssue extends Component {

    render() {

        /* fields to display:
            1. Assignee
            2. Original Estimate
            3. Time tracking
            4. Description
            5. Comments
            6. Due Date
            7. Priority
            8. Last Updated
            9. Title
            10. Key
            11. Status
        */

        if (this.props.display) {

            var comments = []

            if (this.props.dataObject.fields.comment.comments) {
                this.props.dataObject.fields.comment.comments.forEach(function (item) {
                    comments.push((
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <img width='32' height='32' src={item.author.avatarUrls['32x32']} />
                                    </Col>
                                    <Col>
                                        {item.author.displayName}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        {item.body}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>))
                })
            }


            return (

                <SlidingPane
                    closeIcon={<div>X</div>}
                    isOpen={this.props.display}
                    title={this.props.dataObject.key}
                    from='right'
                    width='700px'
                    onRequestClose={this.props.paneClosedHandler}>
                    <Container>
                        <Row className='mb-3'>
                            <Col>
                                <label htmlFor="basic-url">Due Date</label>
                                {this.props.dataObject.fields.duedate}
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <label htmlFor="basic-url">Priority</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Badge pill variant="primary">High</Badge>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <label htmlFor="basic-url">Assignee</label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="2">
                                        {this.props.dataObject.fields.assignee && <img width="32" height="32" src={this.props.dataObject.fields.assignee.avatarUrls['32x32']} />}
                                    </Col>
                                    <Col>
                                        {this.props.dataObject.fields.assignee && this.props.dataObject.fields.assignee.name}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <b>{this.props.dataObject.fields.summary}</b>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <ProgressBar now={60} label={'12hrs'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.props.dataObject.fields.description}
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                Comments
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                {comments}
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
