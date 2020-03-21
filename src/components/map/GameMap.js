import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import {
    isInZone,
    getDistance,
    getCenterZoneBox,
    getActionZoneAuto
} from '../../utils/utils';
import Markers from './Markers';
import {
    updateConfig,
    formatMainZone,
    formatForbiddenZone,
    formatFlags,
    formatItems
} from '../../utils/config';
import {
    getAreas,
    getFlags,
    getItemsModel,
    getItems
} from '../../service/configuration';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import { useItem } from '../../utils/useItem';

function GameMap({
    defaultPosition,
    action,
    setAction,
    setSleepingAction,
    configId
}) {
    const [position, setPosition] = useState(defaultPosition);
    const [zoom, setZoom] = useState(17);

    const {
        position: mainZone,
        setPosition: setMainZone,
        create: createMainZone,
        move: movePolygon,
        remove: deletePolygonPosition
    } = useMainZone();
    const {
        forbiddenZoneIndex,
        setForbiddenZoneIndex,
        forbiddenZones,
        setForbiddenZones,
        create: createForbiddenZone,
        move: moveForbiddenZone,
        remove: deleteForbiddenZonePoint
    } = useForbiddenZone();
    const {
        flagsPositions,
        setFlagsPositions,
        create: createFlag,
        move: moveFlag,
        remove: deleteFlagPosition
    } = useFlag();
    const {
        items,
        setItems,
        setModelItems,
        create: createItem,
        move: moveItem,
        remove: deleteItem,
        updateItemQuantity
    } = useItem();

    useEffect(() => {
        let forbZones = [];
        let zoneIndex = -1;
        getAreas(configId).then(zones => {
            zoneIndex++;
            zones.data.map(zone =>
                !zone.forbidden
                    ? (setMainZone(formatMainZone(zone)),
                      setPosition(getCenterZoneBox(formatMainZone(zone))))
                    : forbZones.push(formatForbiddenZone(zoneIndex, zone))
            );
        });

        setForbiddenZoneIndex(zoneIndex);
        setForbiddenZones(forbZones);

        getFlags(configId).then(flags => setFlagsPositions(formatFlags(flags)));

        getItemsModel(configId).then(res => setModelItems(res.data));

        getItems(configId).then(items => setItems(formatItems(items)));
    }, []);

    useEffect(() => {
        checkFlags();
    }, [mainZone, forbiddenZones]);

    const checkFlags = () => {
        let conflict = false;
        let otherFlags = [];
        flagsPositions.filter(flag => {
            let valid = true;
            forbiddenZones.map(zone => {
                valid = !isInZone(flag.lat, flag.lng, zone);
                conflict = conflict || !valid;
            });
            let validZone = isInZone(flag.lat, flag.lng, mainZone);
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

    const handleClick = e => {
        return action === 'flags'
            ? createFlag(e)
            : action === 'mainZone'
            ? createMainZone(e)
            : action === 'forbiddenZone'
            ? forbiddenZoneIndex !== -1
                ? createForbiddenZone(e)
                : alert('Veuillez créer une première zone interdite.')
            : action === 'items'
            ? createItem(e)
            : '';
    };

    return (
        <>
            {defaultPosition.length !== 0 && (
                <>
                    <Map center={position} zoom={zoom} onClick={handleClick}>
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                        <Polygon color="green" positions={mainZone} />

                        {forbiddenZones.map(zone => (
                            <Polygon
                                key={zone.id}
                                color="red"
                                positions={
                                    forbiddenZones[forbiddenZones.indexOf(zone)]
                                }
                            />
                        ))}

                        <Markers
                            polygonPosition={mainZone}
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
                            items={items}
                            moveItem={moveItem}
                            deleteItem={deleteItem}
                            updateItemQuantity={updateItemQuantity}
                        />
                    </Map>
                </>
            )}
        </>
    );
}

export default GameMap;
