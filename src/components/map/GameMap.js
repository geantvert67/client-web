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
import ItemsButtons from './ItemsButtons';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';

function GameMap({
    defaultPosition,
    action,
    setAction,
    setSleepingAction,
    configId
}) {
    const [position, setPosition] = useState(defaultPosition);
    const [zoom, setZoom] = useState(17);

    const [items, setItems] = useState([]);
    const [selectedModelItem, setSelectedModelItem] = useState();

    const [modelItems, setModelItems] = useState([]);
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
            ? addItem(e)
            : '';
    };

    const addItem = point => {
        const position = { lat: point.latlng.lat, lng: point.latlng.lng };

        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, mainZone)
            ? setItems(
                  items.concat({
                      modelItem: modelItems[selectedModelItem],
                      position,
                      quantity: 1
                  })
              )
            : alert('Veuillez placer les items dans une zone de jeu valide.');
    };

    const moveItem = (e, item) => {
        let otherItems = items.filter(i => i !== item);
        const newPosition = {
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
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            ) &&
            otherItems.push({
                modelItem: item.modelItem,
                newPosition,
                quantity: item.quantity
            });

        setItems(otherItems);
    };

    const deleteItem = point => {
        setItems(items.filter(p => p !== point));
    };

    const updateItemQuantity = (item, quantity) => {
        const otherItems = items.filter(i => i !== item);
        item.quantity = quantity;
        otherItems.splice(items.indexOf(item), 0, item);
        setItems(otherItems);
    };

    const handleUpdate = (
        configId,
        mainZone,
        forbiddenZones,
        flagsPositions,
        items
    ) => {
        console.log(items);
        mainZone.length === 0
            ? alert(
                  'Veuillez créer une zone de jeu avant de sauvegarder la carte.'
              )
            : updateConfig(
                  configId,
                  mainZone,
                  forbiddenZones,
                  flagsPositions,
                  items
              );
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

                    {action === 'items' ? (
                        <ItemsButtons
                            items={items}
                            setItems={setItems}
                            modelItems={modelItems}
                            selectedModelItem={selectedModelItem}
                            setSelectedModelItem={setSelectedModelItem}
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
