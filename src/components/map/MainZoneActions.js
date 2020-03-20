import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMainZone } from '../../utils/useMainZone';
import {
    faPlus,
    faPencilAlt,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

function MainZoneActions({ action, setAction }) {
    const { position, removeAll } = useMainZone();

    return (
        <Row className="mt-3 ml-1">
            <Col
                xs="auto"
                className={`mr-3 actions-item ${action === 'mainZone' &&
                    'actions-item-selected'}`}
                onClick={() => setAction('mainZone')}
            >
                <FontAwesomeIcon
                    icon={position.length === 0 ? faPlus : faPencilAlt}
                />
            </Col>
            <Col xs="auto" className="actions-item" onClick={removeAll}>
                <FontAwesomeIcon icon={faTrashAlt} className="danger" />
            </Col>
        </Row>
    );
}

export default MainZoneActions;
