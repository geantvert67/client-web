import React, { useState } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDataFromUrl } from '../../utils/data';
import { removeConfiguration } from '../../service/configuration';
import ConfigsListItem from './ConfigsListItem';
import ConfigsButtons from './ConfigsButtons';

const ConfigsWrapper = () => {
    const [community, setCommunity] = useState(false);

    const {
        loading,
        error,
        data: configurations,
        setData: setConfigurations
    } = useDataFromUrl(community ? '/configs' : '/user/configs');

    const deleteConfig = configId => {
        removeConfiguration(configId)
            .then(() =>
                setConfigurations(configurations.filter(c => c.id !== configId))
            )
            .catch(() =>
                toast.error('Impossible de supprimer la configuration')
            );
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <ConfigsButtons
                        community={community}
                        setCommunity={setCommunity}
                    />

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p>Une erreur est survenue.</p>
                    ) : configurations.length === 0 ? (
                        <p className="text-center">
                            Aucune configuration à afficher.
                        </p>
                    ) : (
                        configurations.map(config => (
                            <ConfigsListItem
                                key={config.id}
                                configuration={config}
                                community={community}
                                deleteConfig={deleteConfig}
                            />
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ConfigsWrapper;
