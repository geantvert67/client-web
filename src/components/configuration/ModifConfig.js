import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/data';

const ModifConfig = () => {
    const { configurationId } = useParams();

    const { data: configuration, setData: setConfiguration } = useDataFromUrl(
        `/configs/${configurationId}`
    );

    const [name, setName] = useState(configuration.name);
    const [isPrivate, setIsPrivate] = useState(configuration.isPrivate);
    const [maxPlayer, setMaxPlayer] = useState(configuration.maxPlayers);
    const [nbrTeam, setNbrTeam] = useState('');
    const [gameMode, setGameMode] = useState(configuration.gameMode);
    const [duration, setDuration] = useState(configuration.duration);
    const mode = ['SUPREMACY', 'FLAG', 'TIME'];

    return (
        <>
            <h1>Choix des paramètres</h1>
            <form>
                <>
                    <label for="name">Choix du nom de la partie :</label>
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
                    <label for="private">Partie privée:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="private"
                        onChange={e => setIsPrivate(true)}
                    />
                    <label for="public">Partie publique:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="public"
                        onChange={e => setIsPrivate(false)}
                    />
                </>
                <br />
                <>
                    <label for="nbrMaxPlayer">Nombre maximum de joueurs?</label>
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
                    <label for="nbrTeam">Nombre d'équipes?</label>
                    <input
                        type="number"
                        name="nbrTeam"
                        id="nbrTeam"
                        value={nbrTeam}
                        onChange={e => setNbrTeam(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label for="mode">Choix du mode de jeu:</label>
                    <input
                        type="text"
                        name="mode"
                        id="mode"
                        value={gameMode}
                        onChange={e => setGameMode(e.target.value)}
                    />
                </>
                <br />
                <br />
                {(gameMode === 'FLAG' || gameMode === 'TIME') && (
                    <>
                        <label for="mode">Durée de la partie:</label>
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
                    <button type="submit">Valider</button>
                </>
            </form>
        </>
    );
};

export default ModifConfig;
