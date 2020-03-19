import React, { useState } from 'react';
import { Form, Card, Row, Col, Accordion } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HelpButton } from '../OverlayTip';

const ItemModelConfig = ({ model, selectedModels, setSelectedModels }) => {
    const rang = selectedModels.indexOf(model);

    const handleChangeVisibility = e => {
        const models = selectedModels.filter(m => model !== m);
        selectedModels[rang].visibilityRadius = e.target.value;
        models.splice(rang, 0, selectedModels[rang]);
        setSelectedModels(models);
    };

    const handleChangeAction = e => {
        const models = selectedModels.filter(m => model !== m);
        selectedModels[rang].actionRadius = e.target.value;
        models.splice(rang, 0, selectedModels[rang]);
        setSelectedModels(models);
    };

    const handleChangePeriod = e => {
        const models = selectedModels.filter(m => model !== m);
        selectedModels[rang].waitingPeriod = e.target.value;
        models.splice(rang, 0, selectedModels[rang]);
        setSelectedModels(models);
    };

    const handleChangeAutoMove = e => {
        const models = selectedModels.filter(m => model !== m);
        selectedModels[rang].autoMove = !selectedModels[rang].autoMove;
        models.splice(rang, 0, selectedModels[rang]);
        setSelectedModels(models);
    };

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
                                <Form.Label column sm={7}>
                                    Rayon de visibilité (en mètres){' '}
                                    <HelpButton tipKey="visibilityRadius" />
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="number"
                                        value={model.visibilityRadius}
                                        onChange={e =>
                                            handleChangeVisibility(e)
                                        }
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="actionZone">
                                <Form.Label column sm={7}>
                                    Rayon d'action (en mètres){' '}
                                    <HelpButton tipKey="actionRadius" />
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="number"
                                        value={model.actionRadius}
                                        onChange={e => handleChangeAction(e)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="waitingPeriod">
                                <Form.Label column sm={7}>
                                    Période de carence{' '}
                                    <HelpButton tipKey="waitingPeriod" />
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        type="number"
                                        value={model.waitingPeriod}
                                        onChange={e => handleChangePeriod(e)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Check
                                inline
                                type="checkBox"
                                id={model}
                                checked={model.autoMove}
                                label="Déplacement automatique des items"
                                onClick={() => handleChangeAutoMove()}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};

export default ItemModelConfig;
