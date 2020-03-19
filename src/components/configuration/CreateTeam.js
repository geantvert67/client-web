import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Color from './Color';
import history from '../../utils/history';
import { createTeam } from '../../service/configuration';

const CreateTeam = () => {
    const { configurationId } = useParams();

    const { register, handleSubmit, watch, errors } = useForm();

    const [name, setName] = useState('');
    const [color, setColor] = useState(null);

    const create = e => {
        createTeam(configurationId, { name, color })
            .then(res => {
                history.push(`/${configurationId}/teamconfig`);
            })
            .catch(err => {});
    };

    const colors = [
        '#E02828',
        '#DC813A',
        '#E8D83B',
        '#6AE93A',
        '#3AE980',
        '#3BD8E9',
        '#3B6FE9',
        '#453BE9',
        '#8B3BE8',
        '#EA3BBC',
        '#EA3B64'
    ];

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Gestion des équipes</h3>
                    <Form onSubmit={handleSubmit(create)}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Control
                                placeholder="Nom *"
                                ref={register({
                                    required: true,
                                    minLength: 2,
                                    maxLength: 50
                                })}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        {errors.name &&
                            errors.name.type === 'required' &&
                            'Un nom est requis'}
                        {errors.name &&
                            errors.name.type === 'minLength' &&
                            'Le nom est trop court'}
                        {errors.name &&
                            errors.name.type === 'maxLength' &&
                            'Le nom est trop long'}

                        <label htmlFor="name">Couleur *</label>
                        <Row
                            name="color"
                            id="color"
                            className="div-createcolor"
                        >
                            {colors.map(c => (
                                <Col>
                                    <Color
                                        key={c}
                                        c={c}
                                        color={color}
                                        setColor={setColor}
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Button variant="success" type="submit">
                                    Créer{' '}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default CreateTeam;
