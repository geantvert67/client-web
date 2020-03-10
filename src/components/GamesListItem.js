import React from 'react';
import history from '../utils/history';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';

import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const GamesListItem = ({ configuration }) => {
    const handleClone = value => {
        cloneConfiguration(value)
            .then(res => {
                history.push(`/${res.data.id}/modifconfig`);
            })
            .catch(err => {});
    };

    console.log(configuration);
    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col md={10}>
                            <Card.Title>
                                {configuration.name}
                                {' - '}
                                <span className="redirect">
                                    {configuration.gameMode}
                                </span>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted subtitle">
                                Créée le{' '}
                                {moment(
                                    configuration.createdAt,
                                    'yyyy-MM-DDThh:mm:ssZ[UTC]'
                                ).format('DD/MM/YYYY')}{' '}
                                par {configuration.Owner.username}
                            </Card.Subtitle>
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
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default GamesListItem;
