import React, { useState } from 'react';
import { useAuth } from './auth';

const Configuration = () => {
    return (
        <>
            <h1>Choix des paramètres</h1>
            <form>
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
                    <label for="nbrTeam">Nombre d'équipe?</label>
                    <input type="number" name="nbrTeam" id="nbrTeam" />
                </>
                <br />
                <>
                    <label for="mode">Choix du mode de jeu:</label>
                    <input type="text" name="mode" id="mode" />
                </>
                <br />
                <>
                    <button>Mise en place de la carte</button>
                </>
                <br />
                <>
                    <button>Exporter une configurationn de base</button>
                    <button type="submit">Valider</button>
                </>
            </form>
        </>
    );
};

export default Configuration;
