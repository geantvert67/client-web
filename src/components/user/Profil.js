import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';

import { Form, Container, Button, Row, Col } from 'react-bootstrap';

const Profil = () => {
    const { update, updatePassword } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (username !== '') {
            update({ username }).catch(err => {
                setUsername('');
                setMessage(err.message);
            });
        }

        if (password !== '') {
            updatePassword({ password }).catch(err => {
                setPassword('');
                setPasswordCheck('');
                setMessage(err.message);
            });
        }
    };

    const formValid = password === passwordCheck;

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
            <h2>Change Profil</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label>Password check</label>
                <input
                    type="password"
                    value={passwordCheck}
                    onChange={e => setPasswordCheck(e.target.value)}
                />
                <input disabled={formValid ? '' : 'disabled'} type="submit" />
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    );
};

export default Profil;
