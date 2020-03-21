import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useItem } from '../../utils/useItem';
import { getItemImage } from '../../utils/utils';

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
                <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronUp} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    {modelItems.map(item => (
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
    const { modelItems, selectedModelItem, setSelectedModelItem } = useItem();
    const index = modelItems.indexOf(item);
    const iconUrl = getItemImage(item);

    return (
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
            <Image style={{ width: '50px' }} src={iconUrl} />
        </Col>
    );
}

export default ItemActions;
