import React, { useState } from 'react';
import { Form, Card, Row, Col, Accordion } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ItemModelConfig = ({ model, rang }) => {
    const [checked, setChecked] = useState(false);

    return (
        <>
            <Accordion>
                <Card className="dark-back">
                    <Accordion.Toggle
                        className="btn-dark priority"
                        as={Card.Header}
                        eventKey={rang}
                    >
                        {' '}
                        <Row>
                            <Col md="11">
                                Configuration de l'item "{model.name}"
                            </Col>
                            <Col>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    size="lg"
                                />
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse className="btn-dark" eventKey={rang}>
                        <Card.Body>
                            {' '}
                            <Form.Group as={Row} controlId="visibilityZone">
                                <Form.Label column sm={6}>
                                    Rayon de visibilité
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="number" value={null} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="actionZone">
                                <Form.Label column sm={6}>
                                    Rayon d'action
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="number" value={null} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="waitingPeriod">
                                <Form.Label column sm={6}>
                                    Période de carence
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="number" value={null} />
                                </Col>
                            </Form.Group>
                            <Form.Check
                                inline
                                type="checkBox"
                                id={model}
                                label="Déplacement automatique des items"
                                onClick={() => setChecked(!checked)}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};

export default ItemModelConfig;
