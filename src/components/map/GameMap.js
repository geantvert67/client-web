import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import { isInZone, getCenterZoneBox } from '../../utils/utils';
import Markers from './Markers';
import {
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
import { toast } from 'react-toastify';

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
        create: createMainZone
    } = useMainZone();
    const {
        forbiddenZoneIndex,
        setForbiddenZoneIndex,
        forbiddenZones,
        setForbiddenZones,
        create: createForbiddenZone
    } = useForbiddenZone();
    const { flagsPositions, setFlagsPositions, create: createFlag } = useFlag();
    const { items, setItems, setModelItems, create: createItem } = useItem();

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
        checkItems();
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
            setFlagsPositions(otherFlags);
        }
    };

    const checkItems = () => {
        let conflict = false;
        let otherItems = [];
        items.filter(item => {
            let valid = true;
            forbiddenZones.map(zone => {
                valid = !isInZone(item.position.lat, item.position.lng, zone);
                conflict = conflict || !valid;
            });
            let validZone = isInZone(
                item.position.lat,
                item.position.lng,
                mainZone
            );
            conflict = conflict || !validZone;
            valid && validZone && otherItems.push(item);
        });

        if (conflict) {
            setItems(otherItems);
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
                : toast.error('Veuillez créer une première zone interdite')
            : action === 'items'
            ? createItem(e)
            : '';
    };

    return (
        defaultPosition.length !== 0 && (
            <Map center={position} zoom={zoom} onClick={handleClick}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <Polygon color="green" positions={mainZone} />

                {forbiddenZones.map(zone => (
                    <Polygon
                        key={zone.id}
                        color="red"
                        positions={forbiddenZones[forbiddenZones.indexOf(zone)]}
                    />
                ))}

                <Markers
                    polygonPosition={mainZone}
                    flagsPositions={flagsPositions}
                    forbiddenZones={forbiddenZones}
                    action={action}
                    setAction={setAction}
                    setSleepingAction={setSleepingAction}
                    items={items}
                />
            </Map>
        )
    );
}

export default GameMap;
