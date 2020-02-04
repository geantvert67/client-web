import React, { useState } from 'react';
import GameMap from './GameMap';

function MapCreator({ defaultPosition }) {
    const [action, setAction] = useState('mainZone');

    console.log(action);
    return (
        <>
            {defaultPosition.length !== 0 && (
                <>
                    <GameMap
                        defaultPosition={defaultPosition}
                        action={action}
                    />
                    <div className="center">
                        <button onClick={e => setAction('mainZone')}>
                            Créer une zone de jeu
                        </button>
                        <button onClick={e => setAction('flags')}>
                            Placer des drapeaux
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default MapCreator;
