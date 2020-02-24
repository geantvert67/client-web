import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import { useDataFromUrl } from '../../utils/data';
import { removeConfiguration } from '../../service/configuration';

const ModifConfig = () => {
    const { configurationId } = useParams();

    const {
        loading: loading,
        data: configuration,
        setData: setConfiguration
    } = useDataFromUrl(`/configs/${configurationId}`);

    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState('');
    const [maxPlayer, setMaxPlayer] = useState('');
    const [nbrTeam, setNbrTeam] = useState('');
    const [gameMode, setGameMode] = useState('');
    const [duration, setDuration] = useState('');

    const mode = ['SUPREMACY', 'FLAG', 'TIME'];

    const removeConf = () => {
        removeConfiguration(configurationId)
            .then(res => {
                history.push(`/`);
            })
            .catch(err => {});
    };

    return (
        <>
            {loading ? (
                '...'
            ) : (
                <>
                    <h1>Choix des paramètres</h1>
                    <form>
                        <>
                            <label for="name">
                                Choix du nom de la partie :
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={
                                    configuration.name === undefined
                                        ? name
                                        : configuration.name
                                }
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
                                checked={configuration.isPrivate ? true : false}
                                onChange={e => setIsPrivate(true)}
                            />
                            <label for="public">Partie publique:</label>
                            <input
                                type="radio"
                                name="isPrivate"
                                id="public"
                                checked={configuration.isPrivate ? false : true}
                                onChange={e => setIsPrivate(false)}
                            />
                        </>
                        <br />
                        <>
                            <label for="nbrMaxPlayer">
                                Nombre maximum de joueurs?
                            </label>
                            <input
                                type="number"
                                name="nbrMaxPlayer"
                                id="nbrMaxPlayer"
                                defaultValue={
                                    configuration.maxPlayer === undefined
                                        ? maxPlayer
                                        : configuration.maxPlayer
                                }
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
                                defaultValue={nbrTeam}
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
                                defaultValue={
                                    configuration.gameMode === undefined
                                        ? gameMode
                                        : configuration.gameMode
                                }
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
                                    defaultValue={
                                        configuration.duration === undefined
                                            ? duration
                                            : configuration.duration
                                    }
                                    onChange={e => setDuration(e.target.value)}
                                />
                            </>
                        )}
                        <br />
                        <>
                            <button type="submit">Modifier</button>
                        </>
                    </form>
                    <>
                        <button
                            onClick={e => {
                                removeConf();
                            }}
                        >
                            Supprimer
                        </button>
                    </>
                </>
            )}
        </>
    );
};

export default ModifConfig;
