import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';

import { Form, Container, Button, Row, Col } from 'react-bootstrap';

const Signin = () => {
    const { signin } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        signin({ username, password }).catch(err => {
            setUsername('');
            setPassword('');
            setMessage(err.message);
        });
    };

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3 className="mb-3">Connexion</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Control
                                    placeholder="Nom d'utilisateur"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Mot de passe"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <Button variant="success" type="submit">
                                        Se connecter{' '}
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <p>
                                        {' '}
                                        Pas encore inscrit ?{' '}
                                        <a className="redirect" href="/signup">
                                            {' '}
                                            S'inscrire
                                        </a>
                                    </p>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Signin;
