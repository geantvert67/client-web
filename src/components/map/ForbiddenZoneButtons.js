import React from 'react';

function ForbiddenZoneButtons({
    indexZone,
    forbiddenZones,
    forbiddenZoneIndex,
    setForbiddenZones,
    setForbiddenZoneIndex
}) {
    const deleteZone = indexZone => {
        setForbiddenZones(
            forbiddenZones.filter(
                zone => forbiddenZones.indexOf(zone) != indexZone
            )
        );
        setForbiddenZoneIndex(forbiddenZoneIndex - 1);
    };
    return (
        <>
            <div className="center">
                <button onClick={e => setForbiddenZoneIndex(indexZone)}>
                    Modifier la zone
                </button>
                <button onClick={e => deleteZone(indexZone)}>
                    Supprimer la zone
                </button>
            </div>
        </>
    );
}

export default ForbiddenZoneButtons;
