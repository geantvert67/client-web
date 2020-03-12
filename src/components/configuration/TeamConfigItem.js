import React from 'react';

import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

const TeamConfigItem = ({ team }) => {
    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col md={10}>
                            <Card.Title>
                                <span className="priority">{team.color}</span>
                                {' - '}
                                <span className="redirect">{team.name}</span>
                            </Card.Title>

                            <Col>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="danger"
                                    size="lg"
                                    onClick={() =>
                                        console.log('configuration.id')
                                    }
                                />
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default TeamConfigItem;
