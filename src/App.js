import React, { useState, useEffect } from 'react';
import MapCreator from './MapCreator';

function App() {
    const [devicePosition, setDevicePosition] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(e => {
            setDevicePosition([e.coords.latitude, e.coords.longitude]);
        });
    }, []);

    return (
        <>
            <MapCreator defaultPosition={devicePosition} />
        </>
    );
}

export default App;
