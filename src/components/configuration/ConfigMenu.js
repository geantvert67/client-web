import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSlidersH,
    faSuitcase,
    faUsers,
    faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';

function ConfigMenu({ level, configId }) {
    const goTo = url => {
        if (configId) history.push(`/configs/${configId}${url}`);
    };

    const getItemClassName = lvl => {
        return `config-menu-item ${level === lvl &&
            'config-menu-item-active'} ${lvl !== 1 &&
            !configId &&
            'config-menu-item-disabled'}`;
    };

    const getSeparatorClassName = () => {
        return `config-menu-item-separator ${!configId &&
            'config-menu-item-separator-disabled'}`;
    };

    return (
        <Row className="mb-5 justify-content-between align-items-center">
            <Col
                xs="auto"
                className={getItemClassName(1)}
                onClick={() => goTo('/edit')}
            >
                <FontAwesomeIcon icon={faSlidersH} size="lg" />
            </Col>
            <Col className={getSeparatorClassName()}></Col>

            <Col
                xs="auto"
                className={getItemClassName(2)}
                onClick={() => goTo('/items')}
            >
                <FontAwesomeIcon icon={faSuitcase} size="lg" />
            </Col>
            <Col className={getSeparatorClassName()}></Col>

            <Col
                xs="auto"
                className={getItemClassName(3)}
                onClick={() => goTo('/teams')}
            >
                <FontAwesomeIcon icon={faUsers} size="lg" />
            </Col>
            <Col className={getSeparatorClassName()}></Col>

            <Col
                xs="auto"
                className={getItemClassName(4)}
                onClick={() => goTo('/map')}
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
            </Col>
        </Row>
    );
}

export default ConfigMenu;
