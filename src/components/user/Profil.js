import React, { useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../utils/auth';

const Profil = () => {
    const { user } = useAuth();
    const [username, setUsername] = useState(user.username);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const updateUsername = () => {
        // TODO: update username
    };

    const updatePassword = () => {
        // TODO: update password
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3 className="mb-5">Profil</h3>

                    <Form onSubmit={updateUsername}>
                        <Form.Group>
                            <Form.Control
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    <h3 className="mb-5 mt-5">Changer de mot de passe</h3>

                    <Form onSubmit={updatePassword}>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Mot de passe actuel"
                                value={currentPassword}
                                onChange={e =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <Button
                                    variant="success"
                                    className="btn-primary"
                                    type="submit"
                                >
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Profil;
