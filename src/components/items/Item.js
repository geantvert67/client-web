import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Image, Form } from 'react-bootstrap';
import { getItemImage } from '../../utils/utils';
import Switch from '../forms/Switch';
import { useForm } from 'react-hook-form';

function Item({ items, itemModel, removeItem, addItem, updateItem }) {
    const [on, setOn] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
        let item = items.filter(i => i.name === itemModel.name);
        setItem(item.length === 0 ? null : item[0]);
        setOn(item.length != 0);
    }, [items]);

    const handleSwitch = () => {
        if (on) {
            removeItem(itemModel.name);
        } else {
            addItem(itemModel.name);
        }
        setOn(!on);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Image
                            style={{ width: '50px' }}
                            src={getItemImage(itemModel)}
                        />
                    </Col>
                    <Col>
                        <Card.Title>{itemModel.name}</Card.Title>
                        <Card.Subtitle className="subtitle">
                            {itemModel.description}
                        </Card.Subtitle>
                    </Col>
                    <Col xs="auto">
                        <Switch on={on} setOn={handleSwitch} />
                    </Col>
                </Row>
                {on && (
                    <Row className="mt-4">
                        <Col>
                            <ItemForm
                                item={item}
                                itemModel={itemModel}
                                updateItem={updateItem}
                            />
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
}

function ItemForm({ itemModel, item, updateItem }) {
    const { register, handleSubmit, getValues, errors } = useForm();

    const onSubmit = data => {
        updateItem(itemModel.name, data);
    };

    return (
        <Form>
            <Row>
                <Col xs={12}>
                    <label>Rayon de visibilité : </label>
                    <input
                        className="ml-2 input-light"
                        name="visibilityRadius"
                        type="number"
                        defaultValue={item ? item.visibilityRadius : null}
                        onBlur={handleSubmit(onSubmit)}
                        ref={register({
                            min: {
                                value: 0.01,
                                message:
                                    'Le rayon de visibilité doit faire au minimum 0.01m'
                            }
                        })}
                    />
                    <label className="ml-2">mètres</label>
                </Col>
                <Col xs="auto" className="danger">
                    {errors.visibilityRadius && errors.visibilityRadius.message}
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <label>Rayon d'action : </label>
                    <input
                        className="ml-2 input-light"
                        name="actionRadius"
                        type="number"
                        defaultValue={item ? item.actionRadius : null}
                        onBlur={handleSubmit(onSubmit)}
                        ref={register({
                            min: {
                                value: 0.01,
                                message:
                                    "Le rayon d'action doit faire au minimum 0.01m"
                            },
                            validate: {
                                smallerThanVR: value => {
                                    const { visibilityRadius } = getValues();
                                    return (
                                        !visibilityRadius ||
                                        value <= visibilityRadius ||
                                        "Le rayon d'action doit être inférieur ou égal au rayon de visibilité"
                                    );
                                }
                            }
                        })}
                    />
                    <label className="ml-2">mètres</label>
                </Col>
                <Col xs="auto" className="danger">
                    {errors.actionRadius && errors.actionRadius.message}
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <label>Période de carence : </label>
                    <input
                        className="ml-2 input-light"
                        name="waitingPeriod"
                        defaultValue={item ? item.waitingPeriod : null}
                        type="number"
                        onBlur={handleSubmit(onSubmit)}
                        ref={register({
                            min: {
                                value: 1,
                                message:
                                    'La période de carence doit durer au moins 1 seconde'
                            }
                        })}
                    />
                </Col>
                <Col xs="auto" className="danger">
                    {errors.waitingPeriod && errors.waitingPeriod.message}
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <label>Déplacement automatique : </label>
                    <label className="ml-2 radio-buttons-wrapper">
                        Oui
                        <input
                            name="autoMove"
                            type="radio"
                            value={true}
                            defaultChecked={item ? item.autoMove : false}
                            onBlur={handleSubmit(onSubmit)}
                            ref={register({
                                required: 'Ce champ est obligatoire'
                            })}
                        />
                        <span className="checkmark checkmark-light"></span>
                    </label>
                    <label className="ml-2 radio-buttons-wrapper">
                        Non
                        <input
                            name="autoMove"
                            type="radio"
                            value={false}
                            defaultChecked={item ? !item.autoMove : true}
                            onBlur={handleSubmit(onSubmit)}
                            ref={register({
                                required: 'Ce champ est obligatoire'
                            })}
                        />
                        <span className="checkmark checkmark-light"></span>
                    </label>
                </Col>
                <Col xs="auto" className="danger">
                    {errors.autoMove && errors.autoMove.message}
                </Col>
            </Row>
        </Form>
    );
}

export default Item;
