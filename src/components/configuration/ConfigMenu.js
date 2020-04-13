import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSlidersH,
    faUsers,
    faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';
import history from '../../utils/history';
import { IconOverlay } from '../OverlayTip';

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
                <IconOverlay tipKey="config">
                    <FontAwesomeIcon icon={faSlidersH} size="lg" />
                </IconOverlay>
            </Col>
            <Col
                className={`${getSeparatorClassName()} d-none d-lg-block`}
            ></Col>

            <Col
                xs="auto"
                className={getItemClassName(2)}
                onClick={() => goTo('/teams')}
            >
                <IconOverlay tipKey="teams">
                    <FontAwesomeIcon icon={faUsers} size="lg" />
                </IconOverlay>
            </Col>
            <Col
                className={`${getSeparatorClassName()} d-none d-lg-block`}
            ></Col>

            <Col
                xs="auto"
                className={getItemClassName(3)}
                onClick={() => goTo('/map')}
            >
                <IconOverlay tipKey="map">
                    <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
                </IconOverlay>
            </Col>
        </Row>
    );
}

export default ConfigMenu;
