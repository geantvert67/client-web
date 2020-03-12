import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { iconWhiteFlag, iconPylone, getItemIcon } from './Icons';
import { getActionZoneAuto } from '../../utils/utils';

function Markers({
    polygonPosition,
    flagsPositions,
    forbiddenZones,
    movePolygon,
    moveFlag,
    moveForbiddenZone,
    deletePolygonPosition,
    deleteFlagPosition,
    deleteForbiddenZonePoint,
    action,
    setAction,
    setSleepingAction,
    items,
    moveItem,
    deleteItem
}) {
    const startDragging = () => {
        setAction('moveElement');
        setSleepingAction(action);
    };

    const stopDragging = () => {
        setAction('moveElementStop');
    };
    return (
        <>
            {flagsPositions.map(flag => (
                <>
                    <Marker
                        key={flag.id}
                        position={flag}
                        icon={iconWhiteFlag}
                        draggable
                        onDragend={e => {
                            moveFlag(e, flag);
                            stopDragging();
                        }}
                        onDragStart={e => {
                            startDragging();
                        }}
                    >
                        <Popup>
                            <button onClick={e => deleteFlagPosition(flag)}>
                                Supprimer
                            </button>
                        </Popup>
                    </Marker>

                    <Circle
                        center={flag}
                        radius={getActionZoneAuto(polygonPosition)}
                    />
                </>
            ))}

            {polygonPosition.map(point => (
                <Marker
                    key={point.id}
                    position={point}
                    icon={iconPylone}
                    draggable
                    autoPan
                    onDragend={e => {
                        movePolygon(e, point);
                        stopDragging();
                    }}
                    onDragStart={e => {
                        startDragging();
                    }}
                >
                    <Popup>
                        <button onClick={e => deletePolygonPosition(point)}>
                            Supprimer
                        </button>
                    </Popup>
                </Marker>
            ))}

            {forbiddenZones.map(zone =>
                zone.map(point => (
                    <Marker
                        key={point.id}
                        position={point}
                        draggable
                        autoPan
                        onDragend={e => {
                            moveForbiddenZone(e, point);
                            stopDragging();
                        }}
                        onDragStart={e => {
                            startDragging();
                        }}
                    >
                        <Popup>
                            <button
                                onClick={e => deleteForbiddenZonePoint(point)}
                            >
                                Supprimer
                            </button>
                        </Popup>
                    </Marker>
                ))
            )}

            {items.map(point => (
                <Marker
                    key={point.id}
                    position={point.position}
                    icon={getItemIcon(point.modelItem)}
                    draggable
                    onDragend={e => {
                        moveItem(e, point);
                        stopDragging();
                    }}
                    onDragStart={e => {
                        startDragging();
                    }}
                >
                    <Popup>
                        <button onClick={e => deleteItem(point)}>
                            Supprimer
                        </button>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

export default Markers;
