import React from 'react';

function ZoneButtons({ setPolygonPosition }) {
    return (
        <>
            <div className="center">
                <button onClick={e => setPolygonPosition([])}>
                    Effacer la zone
                </button>
            </div>
        </>
    );
}

export default ZoneButtons;
