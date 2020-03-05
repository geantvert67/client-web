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
                    onClick={e => {
                        const flags = addRandomFlags(
                            polygonPosition,
                            forbiddenZones
                        );
                        flags.length != 10 &&
                            alert(
                                'Nous ne pouvons pas vous afficher plus de ' +
                                    flags.length +
                                    ' drapeaux dans cette zone. \nCelle-ci est probablement trop petite pour en contenir autant que vous souhaitiez.'
                            );
                        setFlagsPositions(flags);
                    }}
                >
                    Ajouter des drapeaux aléatoirement
                </button>
            </div>
        </>
    );
}

export default FlagsButtons;
