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
    const [isPrivate, setIsPrivate] = useState(true);
    const [maxPlayer, setMaxPlayer] = useState(0);
    const [inventorySize, setInventorySize] = useState(0);
    const [gameMode, setGameMode] = useState('SUPREMACY');
    const [duration, setDuration] = useState(null);
    const [flagVisibilityRadius, setFlagVisibilityRadius] = useState(0);
    const [flagActionRadius, setFlagActionRadius] = useState(0);
    const [flagCaptureDuration, setFlagCaptureDuration] = useState(60);
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
                                        ? parseInt(maxPlayer, 10)
                                        : parseInt(configuration.maxPlayer, 10)
                                }
                                onChange={e => setMaxPlayer(e.target.value)}
                            />
                        </>
                        <br />
                        <>
                            <label for="nbrTeam">Taille de l'inventaire</label>
                            <input
                                type="number"
                                name="inventorySize"
                                id="inventorySize"
                                defaultValue={
                                    configuration.inventorySize === undefined
                                        ? parseInt(inventorySize, 10)
                                        : parseInt(
                                              configuration.inventorySize,
                                              10
                                          )
                                }
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
                                defaultValue={configuration.gameMode}
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
                            <label for="flagVisibilityRadius">
                                Rayon de visibilité des cristaux
                            </label>
                            <input
                                type="number"
                                name="flagVisibilityRadius"
                                id="flagVisibilityRadius"
                                defaultValue={
                                    configuration.flagVisibilityRadius ===
                                    undefined
                                        ? parseInt(flagVisibilityRadius, 10)
                                        : parseInt(
                                              configuration.flagVisibilityRadius,
                                              10
                                          )
                                }
                                onChange={e =>
                                    setFlagVisibilityRadius(e.target.value)
                                }
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
                                defaultValue={
                                    configuration.flagActionRadius === undefined
                                        ? parseInt(flagActionRadius, 10)
                                        : parseInt(
                                              configuration.flagActionRadius,
                                              10
                                          )
                                }
                                onChange={e =>
                                    setFlagActionRadius(e.target.value)
                                }
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
                                defaultValue={
                                    configuration.flagCaptureDuration ===
                                    undefined
                                        ? parseInt(flagCaptureDuration, 10)
                                        : parseInt(
                                              configuration.flagCaptureDuration,
                                              10
                                          )
                                }
                                onChange={e =>
                                    setFlagCaptureDuration(e.target.value)
                                }
                            />
                        </>
                        <>
                            <br />
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
                        <button
                            onClick={e => {
                                history.push(`/${configurationId}/mapcreator`);
                            }}
                        >
                            Modifier la carte
                        </button>
                    </>
                </>
            )}
        </>
    );
};

export default ModifConfig;
