import React, { useState } from 'react';
import { iconWhiteFlag } from './FlagIcons';
import { Map, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';

function GameMap({ defaultPosition, action }) {
    const [zoom, setZoom] = useState(17);
    const [polygonPosition, setPolygonPosition] = useState([]);
    const [flagsPositions, setFlagsPositions] = useState([]);

    console.log(flagsPositions);

    const handleClick = e => {
        return action === 'flags'
            ? addFlag(e)
            : action === 'mainZone'
            ? createMainZone(e)
            : '';
    };

    const createMainZone = e => {
        const newPositon = [[e.latlng.lat, e.latlng.lng]];
        setPolygonPosition(polygonPosition.concat(newPositon));
    };

    const addFlag = e => {
        const newPositon = [[e.latlng.lat, e.latlng.lng]];
        return polygonPosition.length >= 3
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert(
                  'Veuillez créer une zone de jeu valide avant de positionner des drapeaux.'
              );
    };

    const moveFlag = (e, flag) => {
        console.log(e);

        const otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = [
            [e.target.getLatLng().lat, e.target.getLatLng().lng]
        ];
        setFlagsPositions(otherFlags.concat(newPositon));
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
            {defaultPosition.length !== 0 && (
                <>
                    <Map
                        center={defaultPosition}
                        zoom={zoom}
                        onClick={handleClick}
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                        <Polygon color="purple" positions={polygonPosition} />

                        {flagsPositions.map(flag => (
                            <Marker
                                key={flag}
                                position={flag}
                                icon={iconWhiteFlag}
                                draggable
                                onDragend={e => moveFlag(e, flag)}
                            ></Marker>
                        ))}
                    </Map>
                </>
            )}
        </>
    );
}

export default GameMap;
