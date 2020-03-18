import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const TeamMembers = ({ configurationId, teamId, member }) => {
    const deleteMember = () => {};

    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                <span className="redirect">
                                    {member.username}
                                </span>
                            </Card.Title>
                        </Col>
                        <Col xs="auto">
                            <FontAwesomeIcon
                                icon={faMinus}
                                className="danger"
                                size="lg"
                                onClick={() => deleteMember()}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default TeamMembers;
