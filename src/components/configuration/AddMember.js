import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const AddMember = ({ configurationId, teamId }) => {
    const [valid, setValid] = useState(false);
    const isValid = () => {
        setValid(!valid);
    };
    const handleClick = () => {
        setValid(!valid);
    };

    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col md="9">
                            <Card.Title>
                                <span className="redirect">
                                    Entrez un nom d'utilisateur
                                </span>
                            </Card.Title>
                        </Col>
                        <Col>
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                size="lg"
                                onClick={() => isValid()}
                            />
                        </Col>
                        {valid && (
                            <>
                                <Col md="9">
                                    <input></input>
                                </Col>
                                <Col>
                                    <Button
                                        variant="success"
                                        type="button"
                                        onClick={() => handleClick()}
                                    >
                                        Ajouter{' '}
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddMember;
