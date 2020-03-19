import React, { useEffect, useState } from 'react';
import ConfigForm from './ConfigForm';
import { useParams } from 'react-router-dom';
import { getById } from '../../service/configuration';
import { Spinner, Row, Col, Container } from 'react-bootstrap';

function ConfigFormWrapper() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const { configurationId } = useParams();

    useEffect(() => {
        setLoading(true);
        getById(configurationId)
            .then(res => setConfig(res.data))
            .finally(() => setLoading(false));
    }, [configurationId]);

    return loading ? (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Spinner animation="border" variant="light" />
                </Col>
            </Row>
        </Container>
    ) : config ? (
        <ConfigForm config={config} />
    ) : (
        <p>erreur</p>
    );
}

export default ConfigFormWrapper;
