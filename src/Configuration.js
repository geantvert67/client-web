import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Configuration = () => {
    const history = useHistory();
    const handleSubmit = e => {
        e.preventDefault();
        history.push('./mapcreator');
    };

    return (
        <>
            <h1>Choix des paramètres</h1>
            <form onSubmit={handleSubmit}>
                <>
                    <label for="name">Choix du nom de la partie :</label>
                    <input type="text" name="name" id="name" />
                </>
                <br />
                <>
                    <label for="private">Partie privée:</label>
                    <input type="radio" name="private" id="private" />
                    <label for="public">Partie publique:</label>
                    <input type="radio" name="public" id="public" />
                </>
                <br />
                <>
                    <label for="nbrMaxPlayer">Nombre maximum de joueurs?</label>
                    <input
                        type="number"
                        name="nbrMaxPlayer"
                        id="nbrMaxPlayer"
                    />
                </>
                <br />
                <>
                    <label for="nbrTeam">Nombre d'équipes?</label>
                    <input type="number" name="nbrTeam" id="nbrTeam" />
                </>
                <br />
                <>
                    <label for="mode">Choix du mode de jeu:</label>
                    <input type="text" name="mode" id="mode" />
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
