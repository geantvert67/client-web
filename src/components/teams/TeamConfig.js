import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import TeamConfigItem from './TeamConfigItem';
import history from '../../utils/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ConfigMenu from '../configuration/ConfigMenu';
import CreateTeam from './CreateTeam';

const TeamConfig = () => {
    const { configurationId } = useParams();

    const { loading: loading, data: teams, setData: setTeams } = useDataFromUrl(
        `/configs/${configurationId}/teams`
    );

    const [create, setCreate] = useState(false);
    const [update, setUdpdate] = useState(false);
    const [updatedTeam, setUdpdatedTeam] = useState(null);

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <ConfigMenu level={3} configId={configurationId} />

                    <h3 className="mb-5">Gestion des équipes</h3>

                    {create || update ? (
                        <CreateTeam
                            configurationId={configurationId}
                            team={updatedTeam}
                            setIsOpen={
                                create
                                    ? setCreate
                                    : e => {
                                          setUdpdate(e);
                                          setUdpdatedTeam(null);
                                      }
                            }
                            teams={teams}
                            setTeams={setTeams}
                        />
                    ) : (
                        <>
                            <Card onClick={() => setCreate(true)}>
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            <div
                                                className="div-color"
                                                style={{
                                                    backgroundColor: '#26292f'
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    size="lg"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <Card.Title className="mb-0">
                                                <span>Créer une équipe</span>
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {loading ? (
                                <Row className="mt-3 justify-content-center">
                                    <Col xs="auto">
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                        />
                                    </Col>
                                </Row>
                            ) : (
                                teams !== null &&
                                teams.map(team => (
                                    <TeamConfigItem
                                        key={team.id}
                                        configurationId={configurationId}
                                        setIsOpen={e => {
                                            setUdpdatedTeam(team);
                                            setUdpdate(e);
                                        }}
                                        team={team}
                                        teams={teams}
                                        setTeams={setTeams}
                                    />
                                ))
                            )}

                            <Row className="mt-5 justify-content-end">
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
                                        Enregistrer
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamConfig;
