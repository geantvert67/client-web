import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import {
    removeConfiguration,
    updateConfiguration
} from '../../service/configuration';

const FormModifConfig = (configuration, setConfiguration) => {
    const { configurationId } = useParams();

    const [name, setName] = useState(configuration.configuration.name);
    const [isPrivate, setIsPrivate] = useState(
        configuration.configuration.isPrivate
    );
    const [maxPlayers, setMaxPlayers] = useState(
        configuration.configuration.maxPlayers
    );
    const [inventorySize, setInventorySize] = useState(
        configuration.configuration.inventorySize
    );
    const [gameMode, setGameMode] = useState(
        configuration.configuration.gameMode
    );
    const [duration, setDuration] = useState(
        configuration.configuration.duration
    );
    const [flagVisibilityRadius, setFlagVisibilityRadius] = useState(
        configuration.configuration.flagVisibilityRadius
    );
    const [flagActionRadius, setFlagActionRadius] = useState(
        configuration.configuration.flagActionRadius
    );
    const [flagCaptureDuration, setFlagCaptureDuration] = useState(
        configuration.configuration.flagCaptureDuration
    );
    const mode = ['SUPREMACY', 'FLAG', 'TIME'];

    const removeConf = () => {
        removeConfiguration(configurationId)
            .then(res => {
                history.push(`/games`);
            })
            .catch(err => {});
    };

    const updateConf = () => {
        updateConfiguration(configurationId, {
            name,
            isPrivate,
            maxPlayers,
            inventorySize,
            gameMode,
            duration,
            flagVisibilityRadius,
            flagActionRadius,
            flagCaptureDuration
        })
            .then(res => {
                history.push(`/games`);
            })
            .catch(err => {});
    };
    console.log(configuration.configuration);
    return (
        <>
            <form>
                <>
                    <label for="name">Choix du nom de la partie :</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={name}
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
                        checked={isPrivate ? true : false}
                        onChange={e => setIsPrivate(true)}
                    />
                    <label for="public">Partie publique:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="public"
                        checked={isPrivate ? false : true}
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
                        defaultValue={maxPlayers}
                        onChange={e => setMaxPlayers(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label for="nbrTeam">Taille de l'inventaire</label>
                    <input
                        type="number"
                        name="inventorySize"
                        id="inventorySize"
                        defaultValue={inventorySize}
                        onChange={e => setInventorySize(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label for="mode">Choix du mode de jeu:</label>
                    <select
                        type="text"
                        name="mode"
                        id="mode"
                        defaultValue={gameMode}
                        onChange={e => setGameMode(e.target.value)}
                    >
                        {mode.map(m => (
                            <option value={m}> {m} </option>
                        ))}
                    </select>
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
                            defaultValue={duration}
                            onChange={e => setDuration(e.target.value)}
                        />
                    </>
                )}
                <br />
                <>
                    <label for="flagVisibilityRadius">
                        Rayon de visibilité des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagVisibilityRadius"
                        id="flagVisibilityRadius"
                        defaultValue={flagVisibilityRadius}
                        onChange={e => setFlagVisibilityRadius(e.target.value)}
                    />
                </>
                <br />
                <br />
                <>
                    <label for="flagActionRadius">
                        Rayon d'action des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagActionRadius"
                        id="flagActionRadius"
                        defaultValue={flagActionRadius}
                        onChange={e => setFlagActionRadius(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label for="flagCaptureDuration">
                        Temps de capture des cristaux
                    </label>
                    <input
                        type="number"
                        name="flagCaptureDuration"
                        id="flagCaptureDuration"
                        defaultValue={flagCaptureDuration}
                        onChange={e => setFlagCaptureDuration(e.target.value)}
                    />
                </>
            </form>
            <>
                <br />
                <button
                    onClick={e => {
                        updateConf();
                    }}
                >
                    Modifier
                </button>
            </>
            <>
                <button
                    onClick={e => {
                        removeConf();
                    }}
                >
                    Supprimer
                </button>
                <button
                    onClick={e => {
                        history.push(`/${configurationId}/mapcreator`);
                    }}
                >
                    Modifier la carte
                </button>
            </>
        </>
    );
};

export default FormModifConfig;
