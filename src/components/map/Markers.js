import React, { useState } from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import { iconWhiteFlag, iconPylone } from './Icons';
import FlagsButtons from './FlagsButtons';

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
    const [movedPoint, setMovedPoint] = useState([]);

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
                            moveFlag(e, flag, movedPoint);
                            stopDragging();
                        }}
                        onDragStart={e => {
                            setMovedPoint(e.target.getLatLng());
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
                    onClick={e => console.log(e)}
                    onDragend={e => {
                        movePolygon(e, point, movedPoint);
                        stopDragging();
                    }}
                    onDragStart={e => {
                        setMovedPoint(e.target.getLatLng());
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
                        onClick={e => console.log(e)}
                        onDragend={e => {
                            moveForbiddenZone(e, point);
                            stopDragging();
                        }}
                        onDragStart={e => {
                            setMovedPoint(e.target.getLatLng());
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
