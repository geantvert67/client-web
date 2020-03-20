import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import MainZoneActions from './MainZoneActions';
import ForbiddenZoneActions from './ForbiddenZoneActions';

function MapMenu({ action, setAction }) {
    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <MainZoneActions action={action} setAction={setAction} />
                    <ForbiddenZoneActions
                        action={action}
                        setAction={setAction}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
