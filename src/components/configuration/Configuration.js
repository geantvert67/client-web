import React, { useState } from 'react';
import history from '../../utils/history';
import { create } from '../../service/configuration';

const Configuration = () => {
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [maxPlayer, setMaxPlayer] = useState(0);
    const [inventorySize, setInventorySize] = useState(0);
    const [gameMode, setGameMode] = useState('SUPREMACY');
    const [duration, setDuration] = useState(null);
    const [flagVisibilityRadius, setFlagVisibilityRadius] = useState(0);
    const [flagActionRadius, setFlagActionRadius] = useState(0);
    const [flagCaptureDuration, setFlagCaptureDuration] = useState(60);
    const mode = ['SUPREMACY', 'FLAG', 'TIME'];

    const handleSubmit = e => {
        e.preventDefault();
        create({
            name,
            isPrivate,
            maxPlayer,
            inventorySize,
            gameMode,
            duration,
            flagVisibilityRadius,
            flagActionRadius,
            flagCaptureDuration
        })
            .then(res => {
                history.push(`/${res.data.id}/mapcreator`);
            })
            .catch(err => {
                setName('');
                setIsPrivate(true);
                setMaxPlayer(0);
                setInventorySize('');
                setGameMode('SUPREMACY');
                setDuration(null);
                setFlagVisibilityRadius(0);
                setFlagActionRadius(0);
                setFlagCaptureDuration(0);
            });
    };

    return (
        <>
            <h1>Choix des paramètres</h1>
            <form onSubmit={handleSubmit}>
                <>
                    <label htmlFor="name">Choix du nom de la partie :</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="private">Partie privée:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="private"
                        checked={isPrivate}
                        onChange={e => setIsPrivate(true)}
                    />
                    <label htmlFor="public">Partie publique:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="public"
                        onChange={e => setIsPrivate(false)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="nbrMaxPlayer">
                        Nombre maximum de joueurs?
                    </label>
                    <input
                        type="number"
                        name="nbrMaxPlayer"
                        id="nbrMaxPlayer"
                        value={maxPlayer}
                        onChange={e => setMaxPlayer(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="nbrTeam">Taille de l'inventaire</label>
                    <input
                        type="number"
                        name="inventorySize"
                        id="inventorySize"
                        value={inventorySize}
                        onChange={e => setInventorySize(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="mode">Choix du mode de jeu:</label>
                    <select
                        type="text"
                        name="mode"
                        id="mode"
                        onChange={e => setGameMode(e.target.value)}
                    >
                        {mode.map(m => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </>
                <br />
                <br />
                {(gameMode === 'FLAG' || gameMode === 'TIME') && (
                    <>
                        <label htmlFor="mode">Durée de la partie:</label>
                        <input
                            type="number"
                            name="duration"
                            id="duration"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                        />
                    </>
                )}
                <br />
                <>
                    <label htmlFor="flagVisibilityRadius">
                        Rayon de visibilité des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagVisibilityRadius"
                        id="flagVisibilityRadius"
                        value={flagVisibilityRadius}
                        onChange={e => setFlagVisibilityRadius(e.target.value)}
                    />
                </>
                <br />
                <br />
                <>
                    <label htmlFor="flagActionRadius">
                        Rayon d'action des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagActionRadius"
                        id="flagActionRadius"
                        value={flagActionRadius}
                        onChange={e => setFlagActionRadius(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="flagCaptureDuration">
                        Temps de capture des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagCaptureDuration"
                        id="flagCaptureDuration"
                        value={flagCaptureDuration}
                        onChange={e => setFlagCaptureDuration(e.target.value)}
                    />
                </>
                <br />
                <>
                    <button type="submit">Valider</button>
                </>
            </form>
        </>
    );
};

export default Configuration;
