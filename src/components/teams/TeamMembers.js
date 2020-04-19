import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { removeMember } from '../../service/configuration';
import { toast } from 'react-toastify';
import { IconOverlay } from '../OverlayTip';

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
            .catch(() => toast.error('Une erreur est survenue'));
    };

    return (
        <Card className="mt-2">
            <Card.Body>
                <Row className="align-items-center">
                    <Col>
                        <Card.Subtitle className="subtitle">
                            {member.username}
                        </Card.Subtitle>
                    </Col>
                    <Col xs="auto">
                        <IconOverlay tipKey="deleteMember">
                            <FontAwesomeIcon
                                icon={faMinus}
                                className="danger"
                                size="lg"
                                onClick={() => deleteMember()}
                            />
                        </IconOverlay>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TeamMembers;
