import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import GameMap from './GameMap';

import MapMenuWrapper from './MapMenuWrapper';

function MapCreator() {
    const [action, setAction] = useState('mainZone');
    const [sleepingAction, setSleepingAction] = useState('');
    const [devicePosition, setDevicePosition] = useState([]);
    const { configurationId } = useParams();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            setDevicePosition({
                lat: e.coords.latitude,
                lng: e.coords.longitude
            });
        }) || setDevicePosition({ lat: 48.529918, lng: 7.737041 });
    }, []);

    useEffect(() => {
        action === 'moveElementStop' &&
            setAction(sleepingAction) &&
            setSleepingAction('');
    }, [action]);

    return devicePosition.length === 0 ? (
        <Spinner animation="border" variant="light" />
    ) : (
        <div className="map-container">
            <MapMenuWrapper />
            <GameMap
                configId={configurationId}
                defaultPosition={devicePosition}
                action={action}
                setAction={setAction}
                setSleepingAction={setSleepingAction}
            />
        </div>
    );
}

export default MapCreator;
