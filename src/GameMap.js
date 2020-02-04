import React, { useState, useEffect } from 'react';
import { iconWhiteFlag } from './FlagIcons';
import { Map, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';

function GameMap({ defaultPosition, action }) {
    const [zoom, setZoom] = useState(17);
    const [polygonPosition, setPolygonPosition] = useState([]);
    const [flagsPositions, setFlagsPositions] = useState([]);

    useEffect(() => {
        let conflict = false;
        flagsPositions.filter(
            flag => (conflict = conflict || !isInZone(flag[0], flag[1]))
        );

        if (conflict) {
            if (
                // eslint-disable-next-line no-restricted-globals
                confirm(
                    'Attention ! La nouvelle zone ne contient pas tous les drapeaux déjà disposés. Les drapeaux hors de la zone seront supprimés. Voulez-vous continuer ?'
                )
            ) {
                setFlagsPositions(
                    flagsPositions.filter(point => isInZone(point[0], point[1]))
                );
            } else
                setPolygonPosition(
                    polygonPosition.filter(
                        point =>
                            polygonPosition.indexOf(point) !=
                            polygonPosition.length - 1
                    )
                );
        }
    }, [polygonPosition]);

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

    const addFlag = point => {
        const newPositon = [[point.latlng.lat, point.latlng.lng]];
        return isInZone(point.latlng.lat, point.latlng.lng)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert('Veuillez placer les drapeaux dans une zone de jeu.');
    };

    const moveFlag = (e, flag) => {
        const otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = [
            [e.target.getLatLng().lat, e.target.getLatLng().lng]
        ];
        return isInZone(e.target.getLatLng().lat, e.target.getLatLng().lng)
            ? setFlagsPositions(otherFlags.concat(newPositon))
            : setFlagsPositions(otherFlags);
    };

    const isInZone = (x, y) => {
        var inside = false;
        for (
            var i = 0, j = polygonPosition.length - 1;
            i < polygonPosition.length;
            j = i++
        ) {
            let xi = polygonPosition[i][0],
                yi = polygonPosition[i][1];
            let xj = polygonPosition[j][0],
                yj = polygonPosition[j][1];

            let intersect =
                yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }

        return inside;
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
