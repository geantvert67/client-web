import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../utils/history';
import { useForm } from 'react-hook-form';
import {
    removeConfiguration,
    updateConfiguration
} from '../../service/configuration';

const FormModifConfig = configuration => {
    const { register, handleSubmit, watch, errors } = useForm();
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
                history.push(`/configs`);
            })
            .catch(err => {});
    };

    const handleChangeGameMode = value => {
        setGameMode(value);
        value === 'SUPREMACY' && setDuration(null);
    };

    const updateConf = () => {
        setDuration(duration * 60);
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
                history.push(`/configs`);
            })
            .catch(err => {});
    };

    return (
        <>
            <form>
                <>
                    <label htmlFor="name">Choix du nom de la partie :</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={name}
                        ref={register({
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        })}
                        onChange={e => setName(e.target.value)}
                    />
                    {errors.name &&
                        errors.name.type === 'required' &&
                        'Un nom est requis'}
                    {errors.name &&
                        errors.name.type === 'minLength' &&
                        'Le nom est trop court'}
                    {errors.name &&
                        errors.name.type === 'maxLength' &&
                        'Le nom est trop long'}
                </>
                <br />
                <>
                    <label htmlFor="private">Partie privée:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="private"
                        checked={isPrivate ? true : false}
                        onChange={e => setIsPrivate(true)}
                    />
                    <label htmlFor="public">Partie publique:</label>
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
                    <label htmlFor="nbrMaxPlayer">
                        Nombre maximum de joueurs?
                    </label>
                    <input
                        type="number"
                        name="nbrMaxPlayer"
                        id="nbrMaxPlayer"
                        min="0"
                        defaultValue={maxPlayers}
                        onChange={e => setMaxPlayers(e.target.value)}
                    />
                </>
                <br />
                <>
                    <label htmlFor="nbrTeam">Taille de l'inventaire</label>
                    <input
                        type="number"
                        name="inventorySize"
                        id="inventorySize"
                        min="0"
                        defaultValue={inventorySize}
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
                        defaultValue={gameMode}
                        onChange={e => handleChangeGameMode(e.target.value)}
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
                            min="0"
                            defaultValue={duration}
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
                        min="0"
                        defaultValue={flagVisibilityRadius}
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
                        min="0"
                        max={flagVisibilityRadius}
                        defaultValue={flagActionRadius}
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
