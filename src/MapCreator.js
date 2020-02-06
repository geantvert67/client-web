import React, { useState, useEffect } from 'react';
import GameMap from './GameMap';

function MapCreator() {
    const [action, setAction] = useState('mainZone');

    const [devicePosition, setDevicePosition] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            setDevicePosition([e.coords.latitude, e.coords.longitude]);
        }) || setDevicePosition([48.529918, 7.737041]);
    }, []);

    console.log(action);
    return (
        <>
            {devicePosition.length !== 0 && (
                <>
                    <GameMap defaultPosition={devicePosition} action={action} />
                    <div className="center">
                        <button onClick={e => setAction('mainZone')}>
                            Créer une zone de jeu
                        </button>
                        <button onClick={e => setAction('flags')}>
                            Placer des drapeaux
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default MapCreator;
