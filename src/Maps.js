import React, { useState } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';

function Maps() {
    const [zoom, setZoom] = useState(17);
    const [position, setPosition] = useState([48.583079, 7.687539]);

    const polygonPosition = [
        [48.583079, 7.687539],
        [48.584, 7.687539],
        [48.583079, 7.69]
    ];

    return (
        <Map center={position} zoom={zoom}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <Polygon color="purple" positions={polygonPosition} />
        </Map>
    );
}

export default Maps;
