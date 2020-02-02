import React, { useState } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';

function GameMap() {
    const [zoom, setZoom] = useState(17);
    const [position, setPosition] = useState([48.583079, 7.687539]);

    const [polygonPosition, setPolygonPosition] = useState([]);

    const handleClick = e => {
        const newPositon = [[e.latlng.lat, e.latlng.lng]];
        setPolygonPosition(polygonPosition.concat(newPositon));
    };

    return (
        <>
            <link
                rel="stylesheet"
                href="//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
            />
            <link
                rel="stylesheet"
                href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
            />
            <Map center={position} zoom={zoom} onClick={handleClick}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Polygon color="purple" positions={polygonPosition} />
            </Map>
        </>
    );
}

export default GameMap;
