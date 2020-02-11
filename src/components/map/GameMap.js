import React, { useState, useEffect } from 'react';
import ZoneButtons from './ZoneButtons';
import { Map, TileLayer, Polygon, Marker } from 'react-leaflet';
import FlagsButtons from './FlagsButtons';
import { isInZone } from '../../utils/utils';
import Markers from './Markers';
import ForbiddenZonesList from './ForbiddenZonesList';

function GameMap({ defaultPosition, action }) {
    const [zoom, setZoom] = useState(17);
    const [polygonPosition, setPolygonPosition] = useState([]);
    const [flagsPositions, setFlagsPositions] = useState([]);
    const [forbiddenZones, setForbiddenZones] = useState([]);
    const [forbiddenZoneIndex, setForbiddenZoneIndex] = useState(null);

    useEffect(() => {
        let conflict = false;
        flagsPositions.filter(flag => {
            conflict = conflict || !isInZone(flag[0], flag[1], polygonPosition);
        });

        if (conflict) {
            alert(
                'Attention, certains drapeaux ne se situent plus dans la nouvelle zone. Ceux-ci ont été supprimés.'
            );
            setFlagsPositions(
                flagsPositions.filter(point =>
                    isInZone(point[0], point[1], polygonPosition)
                )
            );
        }
    }, [polygonPosition]);

    const handleClick = e => {
        return action === 'flags'
            ? addFlag(e)
            : action === 'mainZone'
            ? createMainZone(e)
            : action === 'forbiddenZone'
            ? forbiddenZoneIndex !== null
                ? createForbiddenZone(e)
                : alert('Veuillez créer une première zone interdite.')
            : '';
    };

    const createMainZone = e => {
        const newPositon = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
        setPolygonPosition(polygonPosition.concat(newPositon));
    };

    const createForbiddenZone = e => {
        const newPositon = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
        const actualZones = forbiddenZones.filter(
            zone => forbiddenZones.indexOf(zone) !== forbiddenZoneIndex
        );
        const forbiddenZone = forbiddenZones[forbiddenZoneIndex].concat(
            newPositon
        );
        actualZones.splice(forbiddenZoneIndex, 0, forbiddenZone);
        isInZone(newPositon.lat, newPositon.lng, polygonPosition) &&
            setForbiddenZones(actualZones);
    };

    const addFlag = point => {
        const newPositon = [[point.latlng.lat, point.latlng.lng]];
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, polygonPosition)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert(
                  'Veuillez placer les drapeaux dans une zone de jeu valide.'
              );
    };

    console.log(polygonPosition);

    const moveFlag = (e, flag, movedPoint) => {
        let otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = [e.target.getLatLng().lat, e.target.getLatLng().lng];
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                zone
            ) && (conflict = true);
        });

        !conflict &&
        isInZone(
            e.target.getLatLng().lat,
            e.target.getLatLng().lng,
            polygonPosition
        )
            ? otherFlags.push(newPositon)
            : otherFlags.push(movedPoint);

        setFlagsPositions(otherFlags);
    };

    const movePolygon = (e, point) => {
        const otherPoints = polygonPosition.filter(f => f !== point);
        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };

        otherPoints.splice(polygonPosition.indexOf(point), 0, newPositon);

        setPolygonPosition(otherPoints);
    };

    const moveForbiddenZone = (e, point, movedPoint, movedPointIndex) => {
        let otherPoints = [];
        forbiddenZones.map(zone => {
            otherPoints.push(zone.filter(f => f !== point));
        });

        console.log(otherPoints);

        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };

        otherPoints[movedPointIndex].splice(
            otherPoints[movedPointIndex].indexOf(point),
            0,
            newPositon
        );

        !isInZone(newPositon.lat, newPositon.lng, polygonPosition) &&
            otherPoints[movedPointIndex].splice(
                otherPoints[movedPointIndex].indexOf(point),
                0,
                movedPoint
            );

        setForbiddenZones(otherPoints);
    };

    const deletePolygonPosition = point => {
        setPolygonPosition(polygonPosition.filter(p => p !== point));
    };

    const deleteFlagPosition = point => {
        setFlagsPositions(flagsPositions.filter(p => p !== point));
    };

    const deleteForbiddenZonePoint = point => {
        setForbiddenZones(
            forbiddenZones.map(zone => zone.filter(p => p !== point))
        );
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
                        {forbiddenZones.map(zone => (
                            <Polygon
                                color="red"
                                positions={
                                    forbiddenZones[forbiddenZones.indexOf(zone)]
                                }
                            />
                        ))}

                        <Markers
                            polygonPosition={polygonPosition}
                            flagsPositions={flagsPositions}
                            forbiddenZones={forbiddenZones}
                            movePolygon={movePolygon}
                            moveFlag={moveFlag}
                            moveForbiddenZone={moveForbiddenZone}
                            deletePolygonPosition={deletePolygonPosition}
                            deleteFlagPosition={deleteFlagPosition}
                            deleteForbiddenZonePoint={deleteForbiddenZonePoint}
                        />
                    </Map>

                    {action === 'mainZone' ? (
                        <ZoneButtons setPolygonPosition={setPolygonPosition} />
                    ) : action === 'flags' ? (
                        <FlagsButtons setFlagsPositions={setFlagsPositions} />
                    ) : action === 'forbiddenZone' ? (
                        <ForbiddenZonesList
                            forbiddenZones={forbiddenZones}
                            forbiddenZoneIndex={forbiddenZoneIndex}
                            setForbiddenZones={setForbiddenZones}
                            setForbiddenZoneIndex={setForbiddenZoneIndex}
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
