import React from 'react';

function FlagsButtons({ setFlagsPositions }) {
    return (
        <>
            <div className="center">
                <button onClick={e => setFlagsPositions([])}>
                    Supprimer les drapeaux
                </button>
            </div>
        </>
    );
}

export default FlagsButtons;
