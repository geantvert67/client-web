import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTrashAlt,
    faChevronUp,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useForbiddenZone } from '../../utils/useForbiddenZone';

function ForbiddenZoneActions({ action, setAction }) {
    const { forbiddenZones, createZone, removeAll } = useForbiddenZone();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Row
                className="mt-4 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>Zones interdites</h3>
                <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronUp} />
            </Row>

            {isOpen && (
                <>
                    <Row className="mt-3 ml-1">
                        <Col
                            xs="auto"
                            className="mr-3 actions-item"
                            onClick={() => {
                                setAction('forbiddenZone');
                                createZone();
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Col>
                        <Col
                            xs="auto"
                            className={`mr-3 actions-item`}
                            onClick={() => removeAll()}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="danger"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2 ml-1">
                        {forbiddenZones.map((f, index) => (
                            <ForbiddenZoneItem
                                action={action}
                                setAction={setAction}
                                zone={f}
                                key={index}
                            />
                        ))}
                    </Row>
                </>
            )}
        </>
    );
}

function ForbiddenZoneItem({ action, setAction, zone }) {
    const {
        forbiddenZones,
        forbiddenZoneIndex,
        setForbiddenZoneIndex,
        removeZone
    } = useForbiddenZone();

    const index = forbiddenZones.indexOf(zone);

    return (
        <Col xs={12} className="mt-1">
            <h4>{`Zone interdite n°${index + 1}`}</h4>

            <Row className="mt-1 ml-1">
                <Col
                    xs="auto"
                    className={`mb-3 mr-3 actions-item ${action ===
                        'forbiddenZone' &&
                        index === forbiddenZoneIndex &&
                        'actions-item-selected'}`}
                    onClick={() => {
                        setAction('forbiddenZone');
                        setForbiddenZoneIndex(index);
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Col>
                <Col
                    xs="auto"
                    className={`mb-3 mr-3 actions-item`}
                    onClick={() => removeZone(index)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                </Col>
            </Row>
        </Col>
    );
}

export default ForbiddenZoneActions;
