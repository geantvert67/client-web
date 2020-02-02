import React, { useState, useEffect } from 'react';
import GameMap from './Map';

function App() {
    const [devicePosition, setDevicePosition] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            setDevicePosition([e.coords.latitude, e.coords.longitude]);
        });
    }, []);

    console.log(devicePosition);
    return (
        <>
            <GameMap defaultPosition={devicePosition} />
        </>
    );
}

export default App;
