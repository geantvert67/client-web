import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMainZone } from '../../utils/useMainZone';
import {
    faPlus,
    faTrashAlt,
    faChevronDown,
    faChevronUp
} from '@fortawesome/free-solid-svg-icons';

function MainZoneActions({ action, setAction }) {
    const { removeAll } = useMainZone();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Row
                className="ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>Zone de jeu</h3>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    <Col
                        xs="auto"
                        className={`mb-3 mr-3 actions-item ${action ===
                            'mainZone' && 'actions-item-selected'}`}
                        onClick={() => setAction('mainZone')}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Col>
                    <Col
                        xs="auto"
                        className="mb-3 actions-item"
                        onClick={removeAll}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                    </Col>
                </Row>
            )}
        </>
    );
}

export default MainZoneActions;
