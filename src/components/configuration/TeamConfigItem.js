import React from 'react';
import { Card, Row, Col, Accordion } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import Color from './Color';
import { removeTeam } from '../../service/configuration';
import AddMember from './AddMember';

const TeamConfigItem = ({ configurationId, team }) => {
    const deleteTeam = () => {
        removeTeam(configurationId, team.id)
            .then(res => {})
            .catch(err => {});
    };

    const { loading: loading, data: members } = useDataFromUrl(
        `/configs/${configurationId}/teams/${team.id}/users`
    );

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
                            <AddMember />
                        </Accordion.Collapse>
                    </Accordion>
                </>
            )}
        </>
    );
};

export default TeamConfigItem;
