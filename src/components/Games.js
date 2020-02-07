import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDataFromUrl } from '../utils/data';

/*
function createData(name, mode, nbrPlayeur) {
    return { name, mode, nbrPlayeur };
}


const rows = [
    createData('Apocalypse Now', 'Attaque et destruction', 6),
    createData('Survival Day', 'Control total', 24),
    createData('Strasbourg est en feu', 'Attaque et destruction', 10),
    createData('Peace of War', 'Cristal unique', 2),
    createData('Anarchy', 'Chacun pour soi', 10)
];
*/

const Games = () => {
    const { data: configurations, setData: setConfigurations } = useDataFromUrl(
        `/configs`
    );
    return (
        <>
            <h1>Parties en attentes de joueurs</h1>
            <table>
                <tr>
                    <td>Nom de partie</td>
                    <td>Mode de jeu</td>
                    <td>Nombre de joueurs</td>
                    <td>Rejoindre</td>
                </tr>
                {configurations !== null &&
                    configurations.map(configuration => (
                        <tr key={configuration.id}>
                            <td>{configuration.name}</td>
                            <td>{configuration.gameMode}</td>
                            <td>{configuration.maxPlayers}</td>
                            <td>
                                <Link to="/">Rejoindre</Link>
                            </td>
                        </tr>
                    ))}
            </table>
        </>
    );
};

export default Games;
