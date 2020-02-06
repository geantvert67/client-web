import React, { useState, useEffect } from 'react';
import ZoneButtons from './ZoneButtons';
import { Map, TileLayer, Polygon, Marker } from 'react-leaflet';
import FlagsButtons from './FlagsButtons';
import { isInZone } from '../../utils/utils';
import Markers from './Markers';

function GameMap({ defaultPosition, action }) {
    const [zoom, setZoom] = useState(17);
    const [polygonPosition, setPolygonPosition] = useState([]);
    const [flagsPositions, setFlagsPositions] = useState([]);

    console.log(flagsPositions);

    useEffect(() => {
        let conflict = false;
        flagsPositions.filter(
            flag =>
                (conflict =
                    conflict || !isInZone(flag[0], flag[1], polygonPosition))
        );

        if (conflict) {
            if (
                // eslint-disable-next-line no-restricted-globals
                confirm(
                    'Attention ! La nouvelle zone ne contient pas tous les drapeaux déjà disposés. Les drapeaux hors de la zone seront supprimés. Voulez-vous continuer ?'
                )
            ) {
                setFlagsPositions(
                    flagsPositions.filter(point =>
                        isInZone(point[0], point[1], polygonPosition)
                    )
                );
            } else
                setPolygonPosition(
                    polygonPosition.filter(
                        point =>
                            polygonPosition.indexOf(point) !==
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
        return isInZone(point.latlng.lat, point.latlng.lng, polygonPosition)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert('Veuillez placer les drapeaux dans une zone de jeu.');
    };

    const moveFlag = (e, flag) => {
        const otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = [
            [e.target.getLatLng().lat, e.target.getLatLng().lng]
        ];
        return isInZone(
            e.target.getLatLng().lat,
            e.target.getLatLng().lng,
            polygonPosition
        )
            ? setFlagsPositions(otherFlags.concat(newPositon))
            : setFlagsPositions(otherFlags);
    };

    const movePolygon = (e, point) => {
        const otherPoints = polygonPosition.filter(f => f !== point);
        const newPositon = [
            [e.target.getLatLng().lat, e.target.getLatLng().lng]
        ];
        setPolygonPosition(otherPoints.concat(newPositon));
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
                        <Polygon color="green" positions={polygonPosition} />

                        <Markers
                            polygonPosition={polygonPosition}
                            flagsPositions={flagsPositions}
                            movePolygon={movePolygon}
                            moveFlag={moveFlag}
                        />
                    </Map>

                    {action === 'mainZone' ? (
                        <ZoneButtons
                            polygonPosition={polygonPosition}
                            setPolygonPosition={setPolygonPosition}
                        />
                    ) : action === 'flags' ? (
                        <FlagsButtons
                            flagsPositions={flagsPositions}
                            setFlagsPositions={setFlagsPositions}
                        />
                    ) : (
                        ''
                    )}
                </>
            )}
        </>
    );
}

export default GameMap;
