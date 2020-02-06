import React from 'react';

function FlagsButtons({ flagsPositions, setFlagsPositions }) {
    return (
        <>
            <div className="center">
                <button onClick={e => setFlagsPositions([])}>
                    Supprimer les drapeaux
                </button>
                <button
                    onClick={e =>
                        setFlagsPositions(
                            flagsPositions.filter(
                                point =>
                                    flagsPositions.indexOf(point) !=
                                    flagsPositions.length - 1
                            )
                        )
                    }
                >
                    Supprimer le dernier drapeau
                </button>
            </div>
        </>
    );
}

export default FlagsButtons;
