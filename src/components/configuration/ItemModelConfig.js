import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/data';
import { Card, Row, Col, Accordion } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ItemModelConfig = ({ model, rang }) => {
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
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};

export default ItemModelConfig;
