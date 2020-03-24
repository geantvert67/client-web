import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faDice,
    faPlus,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { useItem } from '../../utils/useItem';
import { getItemImage } from '../../utils/utils';
import { useForm } from 'react-hook-form';

function ItemActions({ action, setAction }) {
    const [isOpen, setIsOpen] = useState(false);
    const { modelItems } = useItem();

    return (
        <>
            <Row
                className="mt-4 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>Items</h3>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    {modelItems.length === 0
                        ? "Vous n'avez activé aucun modèle d'item."
                        : modelItems.map(item => (
                              <Item
                                  item={item}
                                  action={action}
                                  setAction={setAction}
                                  key={item.id}
                              />
                          ))}
                </Row>
            )}
        </>
    );
}

function Item({ item, action, setAction }) {
    const {
        modelItems,
        selectedModelItem,
        setSelectedModelItem,
        createRandom,
        removeAll
    } = useItem();
    const { register, handleSubmit, reset } = useForm();
    const index = modelItems.indexOf(item);
    const iconUrl = getItemImage(item);

    const _createRandom = ({ nbItems }) => {
        reset({ nbFlags: null });
        createRandom(nbItems, index);
    };

    const _removeAll = () => {
        removeAll(index);
    };

    return (
        <Col xs={12} className="mt-1">
            <h4>{item.name}</h4>

            <Row className="mt-1 ml-1 align-items-center">
                <Col
                    xs="auto"
                    className={`mr-3 mb-3 actions-item ${action === 'items' &&
                        selectedModelItem === index &&
                        'actions-item-selected'}`}
                    onClick={() => {
                        setAction('items');
                        setSelectedModelItem(index);
                    }}
                >
                    <Image style={{ width: '25px' }} src={iconUrl} />
                </Col>
                <Col xs="auto" className="mb-3 mr-3 actions-item">
                    <form onSubmit={handleSubmit(_createRandom)}>
                        <input
                            className="input-map"
                            style={{ width: '75px' }}
                            type="number"
                            name="nbItems"
                            ref={register}
                            required
                            min={1}
                            max={100}
                        />

                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: '0'
                            }}
                        >
                            <FontAwesomeIcon
                                className="ml-2"
                                icon={faDice}
                                color="white"
                            />
                        </button>
                    </form>
                </Col>
                <Col
                    xs="auto"
                    className="mb-3 actions-item"
                    onClick={_removeAll}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                </Col>
            </Row>
        </Col>
    );
}

export default ItemActions;
