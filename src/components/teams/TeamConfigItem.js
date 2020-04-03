import React from 'react';
import { Card, Row, Col, Accordion, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { removeTeam } from '../../service/configuration';
import AddMember from './AddMember';
import TeamMembers from './TeamMembers';
import { toast } from 'react-toastify';

const TeamConfigItem = ({
    configurationId,
    setIsOpen,
    team,
    teams,
    setTeams
}) => {
    const { loading, data: members, setData: setMembers } = useDataFromUrl(
        `/configs/${configurationId}/teams/${team.id}/users`
    );

    const deleteTeam = () => {
        removeTeam(configurationId, team.id)
            .then(() => setTeams(teams.filter(t => t.id !== team.id)))
            .catch(() => toast.error('Une erreur est survenue'));
    };

    return (
        <Accordion className="mt-4">
            <Accordion.Toggle as={Card}>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <div
                                className="div-color"
                                style={{ backgroundColor: team.color }}
                            ></div>
                        </Col>
                        <Col>
                            <Row className="justify-content-between align-items-center">
                                <Col xs="auto">
                                    <Card.Title className="mb-0">
                                        {team.name}
                                    </Card.Title>
                                </Col>
                                <Col xs="auto">
                                    <Row>
                                        <Col xs="auto">
                                            <FontAwesomeIcon
                                                icon={faPencilAlt}
                                                size="lg"
                                                onClick={() => setIsOpen(true)}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className="danger"
                                                size="lg"
                                                onClick={() => deleteTeam()}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Toggle>
            <Accordion.Collapse className="mt-2">
                <>
                    <AddMember
                        configurationId={configurationId}
                        teamId={team.id}
                        members={members}
                        setMembers={setMembers}
                    />
                    {loading ? (
                        <Row className="mt-3 justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : (
                        members.map(member => (
                            <TeamMembers
                                key={member.id}
                                configurationId={configurationId}
                                teamId={team.id}
                                member={member}
                                members={members}
                                setMembers={setMembers}
                            />
                        ))
                    )}
                </>
            </Accordion.Collapse>
        </Accordion>
    );
};

export default TeamConfigItem;
