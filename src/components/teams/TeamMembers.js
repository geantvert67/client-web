import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { removeMember } from '../../service/configuration';

const TeamMembers = ({
    configurationId,
    teamId,
    member,
    members,
    setMembers
}) => {
    const deleteMember = () => {
        removeMember(configurationId, teamId, member.id)
            .then(() => setMembers(members.filter(m => m.id !== member.id)))
            .catch(err => {});
    };

    return (
        <>
            <Card className="dark-team">
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                <span>{member.username}</span>
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
