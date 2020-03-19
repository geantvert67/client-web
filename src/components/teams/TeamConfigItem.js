import React from 'react';
import { Card, Row, Col, Accordion } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import Color from './Color';
import { removeTeam } from '../../service/configuration';
import AddMember from './AddMember';
import TeamMembers from './TeamMembers';

const TeamConfigItem = ({ configurationId, team, teams, setTeams }) => {
    const {
        loading: loading,
        data: members,
        setData: setMembers
    } = useDataFromUrl(`/configs/${configurationId}/teams/${team.id}/users`);

    const deleteTeam = () => {
        removeTeam(configurationId, team.id)
            .then(() => setTeams(teams.filter(t => t.id !== team.id)))
            .catch(err => {});
    };

    return (
        <>
            {loading ? (
                '...'
            ) : (
                <>
                    <Accordion>
                        <Accordion.Toggle
                            className="btn-dark priority"
                            as={Card.Header}
                        >
                            <Row>
                                <Col xs="auto">
                                    <Color c={team.color} />
                                </Col>
                                {' - '}
                                <Col md="9">
                                    <Card.Title>
                                        <span className="redirect">
                                            {team.name}
                                        </span>
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="danger"
                                        size="lg"
                                        onClick={() => deleteTeam()}
                                    />
                                </Col>
                            </Row>
                        </Accordion.Toggle>
                        <Accordion.Collapse className="btn-dark">
                            <>
                                <AddMember
                                    configurationId={configurationId}
                                    teamId={team.id}
                                    members={members}
                                    setMembers={setMembers}
                                />
                                {members !== null &&
                                    members.map(member => (
                                        <TeamMembers
                                            configurationId={configurationId}
                                            teamId={team.id}
                                            member={member}
                                            members={members}
                                            setMembers={setMembers}
                                        />
                                    ))}
                            </>
                        </Accordion.Collapse>
                    </Accordion>
                </>
            )}
        </>
    );
};

export default TeamConfigItem;
