import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';

import { Form, Container, Button, Row, Col } from 'react-bootstrap';

const Signup = () => {
    const { signup } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        signup({ username, password }).catch(err => {
            setUsername('');
            setPassword('');
            setPasswordCheck('');
            setMessage(err.message);
        });
    };

    const formValid = username && password && password === passwordCheck;

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3 className="mb-5">Inscription</h3>
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
                            <Form.Group controlId="formGroupPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Confirmer le mot de passe"
                                    onChange={e =>
                                        setPasswordCheck(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={!formValid}
                                        className="btn-primary"
                                        type="submit"
                                    >
                                        S'inscrire
                                    </Button>
                                </Col>
                            </Row>

                            <Row className="justify-content-md-center mt-2">
                                <Col md="auto">
                                    <p>
                                        {' '}
                                        Déjà inscrit ?
                                        <a className="redirect" href="/signin">
                                            {' '}
                                            Se connecter
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

export default Signup;
