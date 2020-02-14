import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { iconWhiteFlag, iconPoint } from './FlagIcons';

function Markers({
    polygonPosition,
    flagsPositions,
    forbiddenZones,
    movePolygon,
    moveFlag,
    moveForbiddenZone,
    deletePolygonPosition,
    deleteFlagPosition,
    deleteForbiddenZonePoint
}) {
    const [movedPoint, setMovedPoint] = useState([]);
    return (
        <>
            {flagsPositions.map(flag => (
                <Marker
                    key={flag}
                    position={flag}
                    icon={iconWhiteFlag}
                    draggable
                    onClick={e => console.log(e)}
                    onDragend={e => moveFlag(e, flag, movedPoint)}
                    onDragStart={e => setMovedPoint(e.target.getLatLng())}
                >
                    <Popup>
                        <button onClick={e => deleteFlagPosition(flag)}>
                            Supprimer
                        </button>
                    </Popup>
                </Marker>
            ))}

            {polygonPosition.map(point => (
                <Marker
                    key={point}
                    position={point}
                    icon={iconPoint}
                    draggable
                    autoPan
                    onClick={e => console.log(e)}
                    onDragend={e => movePolygon(e, point, movedPoint)}
                    onDragStart={e => setMovedPoint(e.target.getLatLng())}
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
                        onDragend={e => moveForbiddenZone(e, point)}
                        onDragStart={e => setMovedPoint(e.target.getLatLng())}
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
