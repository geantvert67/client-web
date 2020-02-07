import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { iconWhiteFlag } from './FlagIcons';

function Markers({
    polygonPosition,
    flagsPositions,
    movePolygon,
    moveFlag,
    deletePolygonPosition,
    deleteFlagPosition
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
                    onDragend={e => moveFlag(e, flag)}
                >
                    <Popup>
                        <button onClick={e => console.log(e)}>Supprimer</button>
                    </Popup>
                </Marker>
            ))}

            {polygonPosition.map(point => (
                <Marker
                    key={point}
                    position={point}
                    draggable
                    autoPan
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
        </>
    );
}

export default Markers;
