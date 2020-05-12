import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';

const ConfigsButtons = ({ community, setCommunity }) => {
    return (
        <Row className="mb-5 justify-content-between">
            <Col xs="auto">
                <Row>
                    <Col xs="auto">
                        <Button
                            variant="success"
                            className={!community ? 'btn-primary' : 'btn-dark'}
                            onClick={() => setCommunity(false)}
                        >
                            Mes configs
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="success"
                            className={community ? 'btn-primary' : 'btn-dark'}
                            onClick={() => setCommunity(true)}
                        >
                            Configs publiques
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col xs="auto">
                <Button
                    variant="success"
                    className="btn-primary"
                    onClick={() => history.push('/configs/create')}
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Créer
                </Button>
            </Col>
        </Row>
    );
};

export default ConfigsButtons;
