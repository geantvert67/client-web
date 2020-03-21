import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import MainZoneActions from './MainZoneActions';
import ForbiddenZoneActions from './ForbiddenZoneActions';
import FlagActions from './FlagActions';
import { useParams } from 'react-router-dom';
import { updateConfig } from '../../utils/config';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import ItemActions from './ItemActions';
import { useItem } from '../../utils/useItem';
import { toast } from 'react-toastify';

function MapMenu({ action, setAction }) {
    const [loading, setLoading] = useState(false);
    const { configurationId } = useParams();
    const { position: mainZone } = useMainZone();
    const { forbiddenZones } = useForbiddenZone();
    const { flagsPositions } = useFlag();
    const { items } = useItem();

    const saveMap = () => {
        if (mainZone.length === 0) {
            toast.error(
                "Veuillez créer une zone de jeu avant d'enregistrer la carte"
            );
        } else {
            setLoading(true);
            updateConfig(
                configurationId,
                mainZone,
                forbiddenZones,
                flagsPositions,
                items
            )
                .then(() => toast.success('Configuration enregistrée'))
                .catch(() => toast.error('Une erreur est survenue'))
                .finally(() => setLoading(false));
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <MainZoneActions action={action} setAction={setAction} />
                    <ForbiddenZoneActions
                        action={action}
                        setAction={setAction}
                    />
                    <FlagActions action={action} setAction={setAction} />
                    <ItemActions action={action} setAction={setAction} />
                </Col>
            </Row>
            <Row className="mt-4 justify-content-end">
                <Col xs="auto">
                    <Button
                        variant="success"
                        className="btn-primary"
                        disabled={loading}
                        onClick={() => !loading && saveMap()}
                    >
                        {loading ? 'Enregistrement ...' : 'Enregistrer'}
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
