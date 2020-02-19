import React from 'react';
import ForbiddenZoneButtons from './ForbiddenZoneButtons';

function ForbiddenZonesList({
    forbiddenZones,
    forbiddenZoneIndex,
    setForbiddenZones,
    setForbiddenZoneIndex
}) {
    return (
        <>
            <div>
                <button
                    onClick={e => {
                        setForbiddenZones(forbiddenZones.concat([[]]));
                        setForbiddenZoneIndex(forbiddenZones.length);
                    }}
                >
                    Ajouter une nouvelle zone interdite
                </button>
            </div>
            <ul>
                {forbiddenZones.map(f => (
                    <li
                        key={forbiddenZones.indexOf(f)}
                        className={
                            forbiddenZones.indexOf(f) === forbiddenZoneIndex &&
                            'selected'
                        }
                    >
                        {' '}
                        <p>Zone interdite n°{forbiddenZones.indexOf(f) + 1} </p>
                        <ForbiddenZoneButtons
                            indexZone={forbiddenZones.indexOf(f)}
                            forbiddenZones={forbiddenZones}
                            forbiddenZoneIndex={forbiddenZoneIndex}
                            setForbiddenZones={setForbiddenZones}
                            setForbiddenZoneIndex={setForbiddenZoneIndex}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ForbiddenZonesList;
