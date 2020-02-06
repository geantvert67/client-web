import React from 'react';
import { Marker } from 'react-leaflet';
import { iconWhiteFlag } from './FlagIcons';

function Markers({ polygonPosition, flagsPositions, movePolygon, moveFlag }) {
    return (
        <>
            {flagsPositions.map(flag => (
                <Marker
                    key={flag}
                    position={flag}
                    icon={iconWhiteFlag}
                    draggable
                    onDragend={e => moveFlag(e, flag)}
                ></Marker>
            ))}

            {polygonPosition.map(point => (
                <Marker
                    key={point}
                    position={point}
                    draggable
                    onDragend={e => movePolygon(e, point)}
                ></Marker>
            ))}
        </>
    );
}

export default Markers;
