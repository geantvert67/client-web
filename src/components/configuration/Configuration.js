import React, { useState } from 'react';
import history from '../../utils/history';
import { create } from '../../service/configuration';
import { useForm } from 'react-hook-form';

const Configuration = () => {
    const { register, handleSubmit, watch, errors } = useForm();
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

    const createConfig = e => {
        //e.preventDefault();
        setDuration(duration * 60);
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
                history.push(`/${res.data.id}/itemModelCreator`);
            })
            .catch(err => {
                setName('');
                setIsPrivate(true);
                setMaxPlayer(null);
                setInventorySize('');
                setGameMode('SUPREMACY');
                setDuration(null);
                setFlagVisibilityRadius(null);
                setFlagActionRadius(null);
                setFlagCaptureDuration(60);
            });
    };

    return (
        <>
            <h1>Choix des paramètres</h1>
            <form onSubmit={handleSubmit(createConfig)}>
                <>
                    <label htmlFor="name">Choix du nom de la partie :</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
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
                    <label htmlFor="private">Configuration privée:</label>
                    <input
                        type="radio"
                        name="isPrivate"
                        id="private"
                        checked={isPrivate}
                        onChange={e => setIsPrivate(true)}
                    />
                    <label htmlFor="public">Configuration publique:</label>
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
                        min="0"
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
                        min="0"
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
                        ref={register({ required: true })}
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
                            min="60"
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
                        min="0"
                        value={flagVisibilityRadius}
                        ref={register({ required: false })}
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
                        value={flagActionRadius}
                        ref={register({ required: false })}
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
                        min="60"
                        value={flagCaptureDuration}
                        ref={register({ required: false })}
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
