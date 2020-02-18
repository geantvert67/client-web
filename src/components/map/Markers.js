import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { iconWhiteFlag, iconPylone } from './Icons';

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
    setSleepingAction
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
                        key={flag}
                        position={flag}
                        icon={iconWhiteFlag}
                        draggable
                        onClick={e => console.log(e)}
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

                    <Circle center={flag} radius={50} />
                </>
            ))}

            {polygonPosition.map(point => (
                <Marker
                    key={point}
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
                        key={point}
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
        </>
    );
}

export default Markers;
