import React, { useState, useEffect } from 'react';
import GameMap from './GameMap';

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

    return (
        <>
            {devicePosition.length !== 0 && (
                <>
                    <div className="center">
                        <button
                            className={
                                action === 'mainZone' ? 'selected' : undefined
                            }
                            onClick={e => setAction('mainZone')}
                        >
                            Créer une zone de jeu
                        </button>
                        <button
                            className={
                                action === 'flags' ? 'selected' : undefined
                            }
                            onClick={e => setAction('flags')}
                        >
                            Placer des drapeaux
                        </button>
                        <button
                            className={
                                action === 'forbiddenZone'
                                    ? 'selected'
                                    : undefined
                            }
                            onClick={e => setAction('forbiddenZone')}
                        >
                            Gérer les zones interdites
                        </button>
                    </div>
                    <GameMap
                        defaultPosition={devicePosition}
                        action={action}
                        setAction={setAction}
                        setSleepingAction={setSleepingAction}
                    />
                </>
            )}
        </>
    );
}

export default MapCreator;
