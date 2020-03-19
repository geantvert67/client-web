import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import TeamConfigItem from './TeamConfigItem';
import history from '../../utils/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const TeamConfig = () => {
    const { configurationId } = useParams();

    const { loading: loading, data: teams, setData: setTeams } = useDataFromUrl(
        `/configs/${configurationId}/teams`
    );

    return (
        <>
            {loading ? (
                '...'
            ) : (
                <>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <h3>Gestion des équipes</h3>
                            <Card className="dark-back">
                                <Card.Body>
                                    <Row>
                                        <Col xs="auto">
                                            <FontAwesomeIcon
                                                icon={faPlusSquare}
                                                size="lg"
                                                onClick={() =>
                                                    history.push(
                                                        `/${configurationId}/createteam`
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <Card.Title>
                                                <span className="redirect">
                                                    Créer une équipe
                                                </span>
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {teams !== null &&
                                teams.map(team => (
                                    <TeamConfigItem
                                        configurationId={configurationId}
                                        team={team}
                                        teams={teams}
                                        setTeams={setTeams}
                                    />
                                ))}
                        </Col>

                        <Row className="justify-content-between">
                            <Col xs="auto">
                                <Button
                                    variant="light"
                                    type="button"
                                    onClick={() =>
                                        history.push(
                                            `/configs/${configurationId}/items`
                                        )
                                    }
                                >
                                    Retour
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    type="button"
                                    className="btn-primary"
                                    onClick={() =>
                                        history.push(
                                            `/configs/${configurationId}/map`
                                        )
                                    }
                                >
                                    Suivant
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                </>
            )}
        </>
    );
};

export default TeamConfig;
