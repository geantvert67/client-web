import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import MainZoneActions from './MainZoneActions';

function MapMenu({ action, setAction }) {
    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <h3>Zone de jeu</h3>

                    <MainZoneActions action={action} setAction={setAction} />
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
