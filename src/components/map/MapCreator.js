import React, { useState, useEffect } from 'react';
import GameMap from './GameMap';
import { Spinner } from 'react-bootstrap';

function MapCreator() {
    const [action, setAction] = useState('mainZone');
    const [sleepingAction, setSleepingAction] = useState('');
    const [devicePosition, setDevicePosition] = useState([]);

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
        <GameMap
            defaultPosition={devicePosition}
            action={action}
            setAction={setAction}
            setSleepingAction={setSleepingAction}
        />
    );
}

export default MapCreator;
