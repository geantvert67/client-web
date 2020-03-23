import React, { useRef, useEffect, useState } from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { iconWhiteFlag, iconPylone, getItemIcon } from './Icons';
import { getVisibilityRadiusAuto } from '../../utils/utils';
import { useMainZone } from '../../utils/useMainZone';
import { useForbiddenZone } from '../../utils/useForbiddenZone';
import { useFlag } from '../../utils/useFlag';
import { useItem } from '../../utils/useItem';
import { getById } from '../../service/configuration';

function Markers({
    closePopups,
    polygonPosition,
    flagsPositions,
    forbiddenZones,
    action,
    setAction,
    setSleepingAction,
    items,
    configId
}) {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        getById(configId).then(res => setConfig(res.data));
    }, []);

    const startDragging = () => {
        closePopups();
        setAction('moveElement');
        setSleepingAction(action);
    };

    const stopDragging = () => {
        setAction('moveElementStop');
    };

    return (
        <>
            {flagsPositions.map((flag, index) => (
                <FlagMarker
                    key={index}
                    flag={flag}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                    flagVisibilityRadius={
                        config !== null && config.flagVisibilityRadius
                    }
                />
            ))}

            {polygonPosition.map((point, index) => (
                <MainZoneMarker
                    key={index}
                    point={point}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                />
            ))}

            {forbiddenZones.map(zone =>
                zone.map((point, index) => (
                    <ForbiddenZoneMarker
                        key={index}
                        point={point}
                        stopDragging={stopDragging}
                        startDragging={startDragging}
                    />
                ))
            )}

            {items.map((point, index) => (
                <ItemMarker
                    key={index}
                    point={point}
                    stopDragging={stopDragging}
                    startDragging={startDragging}
                />
            ))}
        </>
    );
}

function MainZoneMarker({ point, stopDragging, startDragging }) {
    const { move, remove } = useMainZone();
    const popup = useRef(null);

    return (
        <Marker
            key={point.id}
            position={point}
            icon={iconPylone}
            draggable
            autoPan
            onDragend={e => {
                move(e, point);
                stopDragging();
            }}
            onDragStart={e => {
                startDragging();
            }}
        >
            <Popup ref={popup}>
                <button
                    className="btn-danger"
                    onClick={e => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        remove(point);
                    }}
                >
                    Supprimer
                </button>
            </Popup>
        </Marker>
    );
}

function ForbiddenZoneMarker({ point, stopDragging, startDragging }) {
    const { move, remove } = useForbiddenZone();
    const popup = useRef(null);

    return (
        <Marker
            key={point.id}
            position={point}
            draggable
            autoPan
            onDragend={e => {
                move(e, point);
                stopDragging();
            }}
            onDragStart={e => {
                startDragging();
            }}
        >
            <Popup ref={popup}>
                <button
                    className="btn-danger"
                    onClick={e => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        remove(point);
                    }}
                >
                    Supprimer
                </button>
            </Popup>
        </Marker>
    );
}

function FlagMarker({
    key,
    flag,
    stopDragging,
    startDragging,
    flagVisibilityRadius
}) {
    const { move, remove } = useFlag();
    const { position: mainZone } = useMainZone();
    const popup = useRef(null);

    return (
        <>
            <Marker
                key={key}
                position={flag}
                icon={iconWhiteFlag}
                draggable
                onDragend={e => {
                    move(e, flag);
                    stopDragging();
                }}
                onDragStart={e => {
                    startDragging();
                }}
            >
                <Popup ref={popup}>
                    <button
                        className="btn-danger"
                        onClick={e => {
                            popup.current.leafletElement.options.leaflet.map.closePopup();
                            remove(flag);
                        }}
                    >
                        Supprimer
                    </button>
                </Popup>
            </Marker>

            <Circle
                center={flag}
                radius={
                    flagVisibilityRadius ||
                    getVisibilityRadiusAuto(mainZone, 0.05)
                }
            />
        </>
    );
}

function ItemMarker({ key, point, stopDragging, startDragging }) {
    const { move, updateItemQuantity, remove } = useItem();
    const popup = useRef(null);
    const icon = getItemIcon(point.modelItem);

    return (
        <Marker
            key={key}
            position={point.position}
            icon={icon}
            draggable
            onDragend={e => {
                move(e, point);
                stopDragging();
            }}
            onDragStart={e => {
                startDragging();
            }}
        >
            <Popup ref={popup}>
                <p>
                    {' '}
                    Quantité :{' '}
                    <input
                        type="number"
                        defaultValue={point.quantity}
                        onChange={e =>
                            updateItemQuantity(point, e.target.value)
                        }
                    />{' '}
                </p>

                <button
                    className="btn-danger"
                    onClick={e => {
                        popup.current.leafletElement.options.leaflet.map.closePopup();
                        remove(point);
                    }}
                >
                    Supprimer
                </button>
            </Popup>
        </Marker>
    );
}

export default Markers;
