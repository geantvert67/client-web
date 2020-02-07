import React, { useState } from 'react';
import history from '../../utils/history';
import { create } from '../../service/configuration';

const Configuration = () => {
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');
    const [nbrTeam, setNbrTeam] = useState('');
    const [gameMode, setGameMode] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        create({ name, isPrivate, maxPlayer, nbrTeam, gameMode })
            .then(res => {
                history.push(`/${res.data.id}/mapcreator`);
            })
            .catch(err => {
                setName('');
                setIsPrivate('');
                setMaxPlayer('');
                setNbrTeam('');
                setGameMode('');
            });
    };

    return (
        <>
            <h1>Choix des paramètres</h1>
            <form onSubmit={handleSubmit}>
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
                <>
                    <button type="submit">Valider</button>
                </>
            </form>
        </>
    );
};

export default Configuration;
