import React, { useState, useEffect } from 'react';
import ZoneButtons from './ZoneButtons';
import { Map, TileLayer, Polygon, GeoJSON } from 'react-leaflet';
import FlagsButtons from './FlagsButtons';
import { isInZone, getDistance } from '../../utils/utils';
import Markers from './Markers';
import ForbiddenZonesList from './ForbiddenZonesList';
import {
    updateConfig,
    formatMainZone,
    formatForbiddenZone,
    formatFlags
} from '../../utils/config';
import { getAreas, getFlags } from '../../service/configuration';
import { loadavg } from 'os';
import { useParams } from 'react-router-dom';
import DownloadButton from '../DownloadButton';

function GameMap({ defaultPosition, action, setAction, setSleepingAction }) {
    const [zoom, setZoom] = useState(17);
    const [polygonPosition, setPolygonPosition] = useState([]);
    const [flagsPositions, setFlagsPositions] = useState([]);
    const [forbiddenZones, setForbiddenZones] = useState([]);
    const [forbiddenZoneIndex, setForbiddenZoneIndex] = useState(-1);
    const { idconfiguration } = useParams();

    console.log(flagsPositions);
    useEffect(() => {
        let forbZones = [];
        let zoneIndex = -1;
        getAreas(idconfiguration).then(zones => {
            zoneIndex++;
            zones.data.map(zone =>
                !zone.forbidden
                    ? setPolygonPosition(formatMainZone(zone))
                    : forbZones.push(formatForbiddenZone(zoneIndex, zone))
            );
        });

        setForbiddenZoneIndex(zoneIndex);
        setForbiddenZones(forbZones);

        getFlags(idconfiguration).then(flags =>
            setFlagsPositions(formatFlags(flags))
        );
    }, []);

    useEffect(() => {
        checkFlags();
        checkForbiddenZones();
    }, [polygonPosition, forbiddenZones]);

    const checkFlags = () => {
        let conflict = false;
        let otherFlags = [];
        flagsPositions.filter(flag => {
            let valid = true;
            forbiddenZones.map(zone => {
                valid = !isInZone(flag.lat, flag.lng, zone);
                conflict = conflict || !valid;
            });
            let validZone = isInZone(flag.lat, flag.lng, polygonPosition);
            conflict = conflict || !validZone;
            valid && validZone && otherFlags.push(flag);
        });

        if (conflict) {
            alert(
                'Attention, certains cristaux ne se situent plus dans la nouvelle zone. Ceux-ci ont été supprimés.'
            );
            setFlagsPositions(otherFlags);
        }
    };

    const checkForbiddenZones = () => {
        let conflict = false;
        let otherZones = [];
        forbiddenZones.filter(zone => {
            let valid = true;
            zone.map(point => {
                valid =
                    valid && isInZone(point.lat, point.lng, polygonPosition);
                conflict = conflict || !valid;
            });
            valid && otherZones.push(zone);
        });

        if (conflict) {
            alert(
                'Attention, certaines zones interdites ne se trouvent plus entièrement dans la zone de jeu. Celles-ci ont été supprimés.'
            );
            setForbiddenZones(otherZones);
        }
    };

    const handleClick = e => {
        return action === 'flags'
            ? addFlag(e)
            : action === 'mainZone'
            ? createMainZone(e)
            : action === 'forbiddenZone'
            ? forbiddenZoneIndex !== -1
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
            lng: e.latlng.lng,
            zone: forbiddenZoneIndex
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
        const newPositon = { lat: point.latlng.lat, lng: point.latlng.lng };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        !conflict &&
            flagsPositions.map(
                flag =>
                    getDistance(flag, {
                        lat: newPositon.lat,
                        lng: newPositon.lng
                    }) < 40 && (conflict = true)
            );

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, polygonPosition)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert(
                  'Veuillez placer les drapeaux dans une zone de jeu valide.'
              );
    };

    const moveFlag = (e, flag) => {
        let otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                zone
            ) && (conflict = true);
        });

        !conflict &&
            flagsPositions.map(
                flag =>
                    getDistance(flag, {
                        lat: newPositon.lat,
                        lng: newPositon.lng
                    }) < 40 && (conflict = true)
            );

        !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                polygonPosition
            ) &&
            otherFlags.push(newPositon);

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

    const moveForbiddenZone = (e, point) => {
        let otherPoints = [];
        forbiddenZones.map(zone => {
            otherPoints.push(zone.filter(f => f !== point));
        });

        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng,
            zone: point.zone
        };

        isInZone(newPositon.lat, newPositon.lng, polygonPosition) &&
            otherPoints[point.zone].splice(
                forbiddenZones[point.zone].indexOf(point),
                0,
                newPositon
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
                            action={action}
                            setAction={setAction}
                            setSleepingAction={setSleepingAction}
                        />
                    </Map>

                    {action === 'mainZone' ? (
                        <ZoneButtons setPolygonPosition={setPolygonPosition} />
                    ) : action === 'flags' ? (
                        <FlagsButtons
                            setFlagsPositions={setFlagsPositions}
                            polygonPosition={polygonPosition}
                            forbiddenZones={forbiddenZones}
                        />
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
                    <button
                        onClick={() =>
                            updateConfig(
                                idconfiguration,
                                polygonPosition,
                                forbiddenZones,
                                flagsPositions
                            )
                        }
                    >
                        {' '}
                        Enregistrer la carte{' '}
                    </button>
                    <DownloadButton />
                </>
            )}
        </>
    );
}

export default GameMap;
