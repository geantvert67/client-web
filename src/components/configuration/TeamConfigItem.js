import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import Color from './Color';
import { removeTeam } from '../../service/configuration';

const TeamConfigItem = ({ configurationId, team }) => {
    const deleteTeam = () => {
        removeTeam(configurationId, team.id)
            .then(res => {})
            .catch(err => {});
    };

    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col xs="auto">
                            <Color c={team.color} />
                        </Col>
                        {' - '}
                        <Card.Title>
                            <Col>
                                <span className="redirect">{team.name}</span>
                            </Col>
                        </Card.Title>

                        <Col>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="danger"
                                size="lg"
                                onClick={() => deleteTeam()}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default TeamConfigItem;
