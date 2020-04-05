import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getItemsModel } from '../../service/configuration';
import ConfigMenu from '../configuration/ConfigMenu';
import { itemModels } from '../../utils/items';
import Item from './Item';
import {
    addItemsModel,
    updateItemsModel,
    deleteItemsModel
} from '../../service/configuration';
import { serializeModels } from '../../utils/config';
import Switch from '../forms/Switch';
import history from '../../utils/history';

function ItemsWrapper() {
    const { configurationId } = useParams();
    const [items, setItems] = useState([]);
    const [newItems, setNewItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [on, setOn] = useState(false);

    useEffect(() => {
        getItemsModel(configurationId)
            .then(res => {
                setItems(res.data);
                setNewItems(res.data);
                res.data.length > 0 && setOn(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const addItem = name => {
        setNewItems([...newItems, { name }]);
    };

    const removeItem = name => {
        setNewItems(newItems.filter(i => i.name !== name));
    };

    const updateItem = (name, values) => {
        setNewItems([
            ...newItems.filter(i => i.name !== name),
            ...[{ name, ...values }]
        ]);
    };

    const addAll = () => {
        setNewItems(
            itemModels.map(i => {
                return { name: i.name };
            })
        );
    };

    const removeAll = () => {
        setNewItems([]);
    };

    const handleSwitch = () => {
        if (on) {
            removeAll();
        } else {
            addAll();
        }
        setOn(!on);
    };

    const save = () => {
        setSaving(true);
        return Promise.all(
            newItems.map(i => {
                i = serializeModels(i);
                const item = items.filter(j => j.name === i.name);
                if (item.length === 0) {
                    return addItemsModel(configurationId, i);
                } else {
                    return updateItemsModel(configurationId, item[0].id, i);
                }
            })
        )
            .then(() => {
                return Promise.all(
                    items.map(i => {
                        if (
                            newItems.filter(j => j.name === i.name).length === 0
                        ) {
                            return deleteItemsModel(configurationId, i.id);
                        }
                    })
                );
            })
            .then(() => {
                return getItemsModel(configurationId).then(res => {
                    history.push(`/configs/${configurationId}/map`);
                });
            });
    };

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <ConfigMenu level={3} configId={configurationId} />

                    <h3 className="mb-5">Gestion des items</h3>

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col>
                                    <p>{`Tout ${on ? 'dés' : ''}activer`}</p>
                                </Col>
                                <Col xs="auto">
                                    <Switch on={on} setOn={handleSwitch} />
                                </Col>
                            </Row>
                            {itemModels.map(im => {
                                return (
                                    <Item
                                        key={im.name}
                                        itemModel={im}
                                        items={newItems}
                                        removeItem={removeItem}
                                        addItem={addItem}
                                        updateItem={updateItem}
                                    />
                                );
                            })}
                        </>
                    )}

                    <Row className="justify-content-end mt-5">
                        <Col xs="auto">
                            <Button
                                type="button"
                                variant="success"
                                className="btn-primary"
                                disabled={saving}
                                onClick={() => !saving && save()}
                            >
                                {saving ? 'Enregistrement ...' : 'Enregistrer'}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default ItemsWrapper;
