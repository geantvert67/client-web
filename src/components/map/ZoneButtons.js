import React from 'react';

function ZoneButtons({ polygonPosition, setPolygonPosition }) {
    const handleClick = () => {
        let indexLastMove = -1;
        polygonPosition.map(
            point =>
                point.order <= indexLastMove ||
                (indexLastMove = polygonPosition.indexOf(point))
        );

        console.log(indexLastMove);
        setPolygonPosition(
            polygonPosition.filter(
                point => polygonPosition.indexOf(point) != indexLastMove
            )
        );
    };

    return (
        <>
            <div className="center">
                <button onClick={e => setPolygonPosition([])}>
                    Effacer la zone
                </button>
                <button onClick={handleClick}>Effacer le dernier point</button>
            </div>
        </>
    );
}

export default ZoneButtons;
