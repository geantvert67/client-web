import React, { useState } from 'react';
import history from '../../utils/history';
import { useAuth } from '../../utils/auth';

import { Form, Container, Button, Row, Col } from 'react-bootstrap';

const Profil = () => {
    const { changeUsername, changePassword } = useAuth();

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmitPassword = e => {
        e.preventDefault();
        changePassword({ currentPassword, newPassword })
            .then(history.push(`/signin`))
            .catch(err => {
                setCurrentPassword('');
                setNewPassword('');
            });
    };
    const handleSubmitUsername = e => {
        e.preventDefault();
        changeUsername({ username })
            .then(history.push(`/signin`))
            .catch(err => {
                setUsername('');
            });
    };

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3 className="mb-3">Nom d'utilisateur</h3>
                        <Form onSubmit={handleSubmitUsername}>
                            <Form.Group controlId="formUsername">
                                <Form.Control
                                    placeholder="Nom d'utilisateur"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <Button variant="success" type="submit">
                                        Modifier{' '}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h3 className="mb-3">Changement de mot de passe</h3>
                        <Form onSubmit={handleSubmitPassword}>
                            <Form.Group controlId="formPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Ancien mot de passe"
                                    onChange={e =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Control
                                    type="password"
                                    placeholder="Nouveau mot de passe"
                                    onChange={e =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <Button variant="success" type="submit">
                                        Modifier{' '}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profil;
