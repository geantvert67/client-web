import React from 'react';
import history from '../utils/history';

import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const GamesButtons = ({ privateConfig }) => {
    return (
        <>
            <Row>
                <Col md="auto">
                    <Button
                        variant="success"
                        className={privateConfig ? 'btn-auth' : 'btn-dark'}
                        onClick={() => history.push('/games')}
                    >
                        {' '}
                        Mes configs{' '}
                    </Button>
                </Col>
                <Col md={7}>
                    <Button
                        variant="success"
                        className={!privateConfig ? 'btn-auth' : 'btn-dark'}
                        onClick={() => history.push('/publicgames')}
                    >
                        {' '}
                        Communauté{' '}
                    </Button>
                </Col>
                <Col md={2}>
                    <Button
                        variant="success"
                        className="btn-auth"
                        onClick={() => history.push('/configuration')}
                    >
                        {' '}
                        + Créer{' '}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="dark-back">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Rechercher par nom"
                        />
                    </InputGroup>
                </Col>
            </Row>
        </>
    );
};

export default GamesButtons;
