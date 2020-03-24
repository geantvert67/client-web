import React, { useState } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Color from './Color';
import { createTeam } from '../../service/configuration';
import ModalColor from './ModalColor';

const CreateTeam = ({ configurationId, setIsOpen, teams, setTeams }) => {
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

    const { register, handleSubmit, errors } = useForm();
    const [color, setColor] = useState(null);
    const [colorChange, setColorChange] = useState(colors);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const create = ({ name }) => {
        if (color) {
            createTeam(configurationId, { name, color })
                .then(res => {
                    setTeams([...teams, res.data]);
                    setIsOpen(false);
                })
                .catch(err => {
                    if (err.response.status === 500) {
                        setError('Ce nom ou cette couleur est déjà utilisé');
                    } else setError('Une erreur est survenue');
                });
        } else {
            setError('Veuillez choisir une couleur');
        }
    };

    const handleShow = () => setShow(true);

    return (
        <Form onSubmit={handleSubmit(create)}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group>
                <label>Nom *</label>
                <Form.Control
                    placeholder="Entrez un nom"
                    name="name"
                    ref={register({
                        required: 'Ce champ est obligatoire',
                        minLength: {
                            value: 2,
                            message:
                                'Le nom doit faire entre 2 et 50 caractères'
                        },
                        maxLength: {
                            value: 50,
                            message:
                                'Le nom doit faire entre 2 et 50 caractères'
                        }
                    })}
                />
                <div className="danger mt-2">
                    {errors.name && errors.name.message}
                </div>
            </Form.Group>

            <label>Couleur *</label>
            <Row name="color" id="color" className="div-createcolor">
                {colorChange.map(c => (
                    <Col xs="auto" key={c}>
                        <Color c={c} color={color} setColor={setColor} />
                    </Col>
                ))}
                <Col xs="auto">
                    <div className="mb-4 div-color" onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </div>
                </Col>
            </Row>
            <Row className="mt-5 justify-content-between">
                <Col xs="auto">
                    <Button variant="light" onClick={() => setIsOpen(false)}>
                        Annuler
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="success"
                        className="btn-primary"
                        type="submit"
                    >
                        Créer
                    </Button>
                </Col>
            </Row>
            <ModalColor
                show={show}
                setShow={setShow}
                color={color}
                setColor={setColor}
                colorChange={colorChange}
                setColorChange={setColorChange}
            />
        </Form>
    );
};

export default CreateTeam;
