import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import history from '../../utils/history';

const ConfigsButtons = ({ community, setCommunity }) => {
    return (
        <>
            <Row className="justify-content-between">
                <Col xs="auto">
                    <Row>
                        <Col xs="auto">
                            <Button
                                variant="success"
                                className={
                                    !community ? 'btn-primary' : 'btn-dark'
                                }
                                onClick={() => setCommunity(false)}
                            >
                                Mes configs
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="success"
                                className={
                                    community ? 'btn-primary' : 'btn-dark'
                                }
                                onClick={() => setCommunity(true)}
                            >
                                Communauté
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
            <Row>
                <Col>
                    <InputGroup className="mt-3 mb-5">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    color="white"
                                />
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

export default ConfigsButtons;
