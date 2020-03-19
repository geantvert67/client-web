import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { cloneConfiguration } from '../../service/configuration';
import moment from 'moment';
import DownloadButton from './DownloadButton';

const ConfigsListItem = ({ configuration, community, deleteConfig }) => {
    const cloneConfig = configId => {
        cloneConfiguration(configId)
            .then(res => {
                history.push(`/${res.data.id}/modifconfig`);
            })
            .catch(() => toast.error('Impossible de cloner la configuration'));
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="justify-content-between align-items-center">
                    <Col xs="auto">
                        <Card.Title>
                            <span className="priority">
                                {!community ? (
                                    <Link
                                        to={`/${configuration.id}/modifconfig`}
                                    >
                                        {configuration.name}
                                    </Link>
                                ) : (
                                    configuration.name
                                )}
                            </span>
                            {' - '}
                            <span className="redirect">
                                {configuration.gameMode}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="subtitle">
                            Créée le{' '}
                            {moment(configuration.createdAt).format(
                                'DD/MM/YYYY'
                            )}
                            {community
                                ? configuration.Owner &&
                                  ` par ${configuration.Owner.username}`
                                : configuration.isPrivate
                                ? ', visible uniquement par moi'
                                : ', visible par la communauté'}
                        </Card.Subtitle>
                    </Col>

                    <Col xs="auto">
                        <FontAwesomeIcon
                            icon={faCopy}
                            size="lg"
                            className="mr-2 ml-2"
                            onClick={() => cloneConfig(configuration.id)}
                        />
                        {!community && (
                            <>
                                <DownloadButton configId={configuration.id} />
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    size="lg"
                                    className="mr-2 ml-2 danger"
                                    onClick={() =>
                                        deleteConfig(configuration.id)
                                    }
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ConfigsListItem;