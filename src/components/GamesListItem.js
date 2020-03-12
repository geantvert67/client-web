import React from 'react';
import history from '../utils/history';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';

import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { removeConfiguration } from '../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

const GamesListItem = ({ configuration, privateConfig }) => {
    const handleClone = value => {
        cloneConfiguration(value)
            .then(res => {
                history.push(`/${res.data.id}/modifconfig`);
            })
            .catch(err => {});
    };

    const removeConf = configurationId => {
        removeConfiguration(configurationId)
            .then(res => {
                history.push(`/games`);
            })
            .catch(err => {});
    };

    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col md={privateConfig ? 9 : 10}>
                            <Card.Title>
                                <span className="priority">
                                    {configuration.name}
                                </span>
                                {' - '}
                                <span className="redirect">
                                    {configuration.gameMode}
                                </span>
                            </Card.Title>
                            {!privateConfig ? (
                                <Card.Subtitle className="mb-2 text-muted">
                                    Créée le{' '}
                                    {moment(
                                        configuration.createdAt,
                                        'yyyy-MM-DDThh:mm:ssZ[UTC]'
                                    ).format('DD/MM/YYYY')}{' '}
                                    par {configuration.Owner.username}
                                </Card.Subtitle>
                            ) : configuration.isPrivate ? (
                                <Card.Subtitle className="mb-2 text-muted subtitle">
                                    Configuration privée
                                </Card.Subtitle>
                            ) : (
                                <Card.Subtitle className="mb-2 text-muted subtitle">
                                    Configuration visible par la communauté
                                </Card.Subtitle>
                            )}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <FontAwesomeIcon
                                        icon={faCopy}
                                        size="lg"
                                        onClick={() =>
                                            handleClone(configuration.id)
                                        }
                                    />
                                </Col>
                                <Col>
                                    <DownloadButton
                                        configId={configuration.id}
                                    />
                                </Col>
                                {privateConfig && (
                                    <Col>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="danger"
                                            size="lg"
                                            onClick={() =>
                                                removeConf(configuration.id)
                                            }
                                        />
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default GamesListItem;
