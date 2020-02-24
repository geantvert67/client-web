import React from 'react';
import { addRandomFlags } from '../../utils/utils';

function FlagsButtons({ setFlagsPositions, polygonPosition, forbiddenZones }) {
    return (
        <>
            <div className="center">
                <button onClick={e => setFlagsPositions([])}>
                    Supprimer les drapeaux
                </button>
                <button
                    onClick={e =>
                        setFlagsPositions(
                            addRandomFlags(polygonPosition, forbiddenZones)
                        )
                    }
                >
                    Ajouter des drapeaux aléatoirement
                </button>
            </div>
        </>
    );
}

export default FlagsButtons;
