import React from 'react';

function ZoneButtons({ polygonPosition, setPolygonPosition }) {
    return (
        <>
            <div className="center">
                <button onClick={e => setPolygonPosition([])}>
                    Effacer la zone
                </button>
                <button
                    onClick={e =>
                        setPolygonPosition(
                            polygonPosition.filter(
                                point =>
                                    polygonPosition.indexOf(point) !=
                                    polygonPosition.length - 1
                            )
                        )
                    }
                >
                    Effacer le dernier point
                </button>
            </div>
        </>
    );
}

export default ZoneButtons;
